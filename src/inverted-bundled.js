(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * inverted index class
 * @class
 */
var InvertedIndex = function () {
  /**
   * class constructor
   * @constructor
   */
  function InvertedIndex() {
    _classCallCheck(this, InvertedIndex);

    this.indexes = {};
  }

  /**
   * Check if a json file is valid
   * @function isValidJson
   * @param {Object} jsonArray Array of json objects
   * @return {Boolean} True or false if json file is valid
   */


  _createClass(InvertedIndex, [{
    key: 'isValidJson',
    value: function isValidJson(jsonArray) {
      if ((typeof jsonArray === 'undefined' ? 'undefined' : _typeof(jsonArray)) !== 'object' || jsonArray.length === 0) {
        return false;
      }
      jsonArray.forEach(function (item) {
        if (!(item.hasOwnProperty('title') && item.hasOwnProperty('text'))) {
          return false;
        }
      });
      return true;
    }

    /**
     * getToken
     * @param {String} text strings of texts
     * @return {Array} An array of splitted texts
     */

  }, {
    key: 'getToken',
    value: function getToken(text) {
      var invalid = /[^\w\s]/g;
      return text.replace(invalid, ' ').toLowerCase().split(' ').filter(function (item) {
        return Boolean(item);
      });
    }

    /**
     * createIndex
     * @param {JSON} fileContent Uploaded json file content
     * @return {Object} words in file with thier index
     */

  }, {
    key: 'createIndex',
    value: function createIndex(fileContent) {
      var _this = this;

      if (this.isValidJson(fileContent)) {
        fileContent.forEach(function (doc, docIndex) {
          var newString = doc.title + ' ' + doc.text;
          var tokenArray = _this.getToken(newString);
          tokenArray.forEach(function (token) {
            if (token in _this.indexes) {
              if (_this.indexes[token].indexOf(docIndex) === -1) {
                _this.indexes[token].push(docIndex);
              }
            } else {
              _this.indexes[token] = [docIndex];
            }
          });
        });
      }
    }

    /**
     * getIndex
     * @return {Object} An object of each word and their indexex
     */

  }, {
    key: 'getIndex',
    value: function getIndex() {
      return this.indexes;
    }

    /**
     * searchIndex
     * @param {String} word Word to be searched in the index
     * @return {Array} description
     */

  }, {
    key: 'searchIndex',
    value: function searchIndex(word) {
      var _this2 = this;

      var result = [];
      var cleanWord = this.getToken(word);
      cleanWord.forEach(function (text) {
        if (_this2.indexes.hasOwnProperty(text)) {
          result.push(_this2.indexes[text]);
        } else {
          return 'No result found';
        }
      });
      return result;
    }
  }]);

  return InvertedIndex;
}();

module.exports = InvertedIndex;

},{}]},{},[1]);
