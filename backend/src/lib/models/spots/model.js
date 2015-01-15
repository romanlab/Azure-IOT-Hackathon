'use strict';

/**
 * @expose
 */
module.exports = {

  /**
   * @field id
   * @regex chars, nums, min-length = 3
   */
  id: {
    type: String,
    'default': '',
    regex: /^[\d*]{1,}$/,
    error: '`id` must be type string',
    expose: true
  },

  /**
   * @field name
   * @regex chars, nums, min-length = 3
   */
  location: {
    type: String,
    'default': '',
    regex: /^[a-zA-Z0-9|/d]{2,}$/,
    error: '`location` must be type string, and least 3 chars'
  },

  /**
   * @field email
   * @regex email, min-length = 10
   */
  assigned: {
    type: Boolean,
    'default': false
  },

  /**
   * @field number
   */
  owner: {
    type: Number,
    'default': 9999999,
    regex: /^[\d+]{7}$/,
    error: '`owner` must be type string, contains only 7 digits and least 7 chars'
  },

  /**
   * @field parkingOut
   */
  parkingOut: {
    type: String,
    'default': new Date(0).toString()
  }
};