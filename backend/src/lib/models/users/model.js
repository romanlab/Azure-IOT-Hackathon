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
    regex: /^[\d+]{7}$/,
    error: '`id` must be type string, contains only 7 digits and least 7 chars',
    expose: true
  },

  /**
   * @field name
   * @regex chars, nums, min-length = 3
   */
  name: {
    type: String,
    'default': '',
    regex: /^[a-zA-Z0-9|/d]{3,}$/,
    error: '`name` must be type string, and least 3 chars'
  },

  /**
   * @field email
   * @regex email, min-length = 10
   */
  email: {
    type: String
  },

  /**
   * @field number
   */
  phone: {
    type: Number
  },

  /**
   * @field number
   */
  troublemaker: {
    type: Boolean,
    'default': false
  }
};