#include <iostream>
#include <ostream>
#include <vector>
#include <algorithm>
#include <sstream>
#include <fstream>
#include <cmath>

#include <opencv/cxcore.h>
#include <opencv/cv.h>
#include <opencv/highgui.h>
#include <cvblob.h>

using namespace cvb;

//#define WRITE_FEATURES
#ifndef WRITE_FEATURES
#include "features.h"
#endif

#define IMAGE1 "IMG_20150115_153403.jpg"
#define IMAGE2 "IMG_20150115_153408.jpg"

struct AreaGreater
{
public:
  bool operator() (CvBlob *a, CvBlob *b) {
    return a->area > b->area;
  }
};

struct XSmaller
{
public:
  bool operator() (CvBlob *a, CvBlob *b) {
    return a->centroid.x < b->centroid.x;
  }
};

double areaRatio(IplImage *labels,
                 int sx, int sy,
                 int ex, int ey,
                 CvLabel label)
{
  int ones = 0;
  int zeros = 0;

  for (int y = sy; y < ey; y++) {
    for (int x = sx; x < ex; x++) {
      if (cvGetLabel(labels, x, y) == label) {
        ones++;
      } else {
        zeros++;
      }
    }
  }

  int total = ones + zeros;
  return static_cast<double>(ones) / total;
}

void areaRatios(IplImage *labels,
                CvLabel label,
                int sx, int sy,
                int ex, int ey,
                int k, double *ratios)
{
  int m = 0;
  int dx = static_cast<double>(ex - sx) / k;
  int dy = static_cast<double>(ey - sy) / k;
  for (int i = 0; i < k; i++) {
    for (int j = 0; j < k; j++) {
      int startingY = sy + i * dy;
      int endingY = sy + i * dy + dy;
      int startingX = sx + j * dx;
      int endingX = sx + j * dx + dx;
      ratios[m] = areaRatio(labels, startingX, startingY,
                            endingX, endingY, label);
      m++;
    }
  }
}

double Distance(const std::vector<double> & v1,
                const std::vector<double> & v2)
{
  double s = 0;
  for (int i = 0; i < v1.size(); i++) {
    s += (v1[i] - v2[i]) * (v1[i] - v2[i]);
  }
  return sqrt(s);
}

void process(IplImage *input, const char *outputName)
{
  IplImage *output = cvCloneImage(input);
  cvThreshold(input, output, 128.0, 255.0, CV_THRESH_BINARY);

  cvSaveImage("threshold.jpg", output);

  for (int i = 0; i < 5; i++) {
    cvDilate(output, output);
  }
  for (int i = 0; i < 5; i++) {
    cvErode(output, output);
  }

  cvSubRS(output, cvScalar(255), output);

  cvSaveImage("morphology.jpg", output);

  IplImage *labels = cvCreateImage(cvGetSize(output), IPL_DEPTH_LABEL, 1);
  CvBlobs blobs;
  unsigned int result = cvLabel(output, labels, blobs);

  std::vector<CvBlob *> topBlobs;
  for (CvBlobs::const_iterator it = blobs.begin(); it != blobs.end(); ++it) {
    CvBlob *blob = it->second;
    topBlobs.push_back(blob);
  }

  std::sort(topBlobs.begin(), topBlobs.end(), AreaGreater());

  std::vector<CvBlob *> digitBlobs;

  int n = 0;
  for (int i = 0; i < topBlobs.size(); i++) {
    CvBlob *blob = topBlobs[i];
    double width = blob->maxx - blob->minx;
    double height = blob->maxy - blob->miny;
    double r = (width / height);
    if (r >= 0.5 && r <= 0.75) {
      std::cout << "Blob #" << blob->label
                << " area " << blob->area
                << " centroid " << blob->centroid.x << "," << blob->centroid.y
                << " bbox area " << (blob->maxx - blob->minx) * (blob->maxy - blob->miny)
                << " ratio " << (width / height)
                << "\n";
      n++;
      digitBlobs.push_back(blob);
    }
    if (n == 7) {
      break;
    }
  }

  std::sort(digitBlobs.begin(), digitBlobs.end(), XSmaller());

  int k = 5;
  int k2 = k * k;
  std::vector<std::vector<double> > allRatios;
  for (int i = 0; i < digitBlobs.size(); i++) {
    std::vector<double> ratios(k2);
    areaRatios(labels, digitBlobs[i]->label,
               digitBlobs[i]->minx, digitBlobs[i]->miny,
               digitBlobs[i]->maxx, digitBlobs[i]->maxy,
               k, &ratios[0]);
    std::cout << "digit #" << i << " - ";
    for (int j = 0; j < k2; j++) {
      std::cout << ratios[j] << " ";
    }
    allRatios.push_back(ratios);
    std::cout << "\n";
  }

  CvBlobs toRender;
  for (int i = 0; i < digitBlobs.size(); i++) {
    toRender[digitBlobs[i]->label] = digitBlobs[i];
  }

#ifdef WRITE_FEATURES
  std::vector<std::vector<double> > features(10);
  features[5] = allRatios[0];
  features[6] = allRatios[1];
  features[3] = allRatios[2];
  features[4] = allRatios[3];
  features[8] = allRatios[4];
  features[0] = allRatios[6];

  std::ofstream header("features.h");
  header << "double digitFeatures[10][" << k2 << "] = {\n";
  for (int i = 0; i < 10; i++) {
    if (features[i].empty()) {
      header << "{0},\n";
    } else {
      header << "{";
      for (int j = 0; j < features[i].size(); j++) {
        header << features[i][j] << ",";
      }
      header << "},\n";
    }
  }
  header << "};\n";
#else
  for (int i = 0; i < digitBlobs.size(); i++) {
    int bestJ = -1;
    double bestD = 1234.0;
    for (int j = 0; j < 10; j++) {
      std::vector<double> features(k2);
      std::copy(&digitFeatures[j][0], &digitFeatures[j][0] + k2, features.begin());
      double d = Distance(allRatios[i], features);
      if (d < bestD) {
        bestJ = j;
        bestD = d;
      }
    }
    std::cout << "DIGIT " << bestJ << "\n";
  }
#endif

  if (outputName) {
    IplImage *theBlobs = cvCreateImage(cvGetSize(input), IPL_DEPTH_8U, 3);
    cvRenderBlobs(labels, toRender, theBlobs, theBlobs);

    cvSaveImage(outputName, theBlobs);
  }
}

int main(int argc, char *argv[])
{
  if (argc < 2) {
    IplImage *input = cvLoadImage(IMAGE1, CV_LOAD_IMAGE_GRAYSCALE);
    process(input, "output1.jpg");
    //process(IMAGE2, "output2.jpg");
  } else {
    for (int i = 1; i < argc; i++) {
      std::ostringstream out;
      out << "out_" << argv[i];
      IplImage *input = cvLoadImage(argv[i], CV_LOAD_IMAGE_GRAYSCALE);
      process(input, out.str().c_str());
    }
  }
}
