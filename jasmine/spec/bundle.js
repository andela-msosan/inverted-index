/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var InvertedIndex = __webpack_require__(1);

	var book = [{
	  title: 'Alice in Wonderland',
	  text: 'Alice falls into a rabbit hole and enters a world full of imagination.'
	}, {
	  title: 'The Lord of the Rings: The Fellowship of the Ring.',
	  text: 'An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring.'
	}];

	describe('Inverted Index', function () {
	  var inverted = new InvertedIndex();
	  inverted.createIndex(book);

	  describe('Read Book Data', function () {
	    it('should check that uploaded file content is a valid json file', function () {
	      expect(inverted.isValidJson(book)).toBeTruthy();
	    });

	    it('should read json file and assert it is not empty', function () {
	      expect(inverted.isValidJson([])).toBeFalsy();
	    });
	  });

	  describe('Populate Index', function () {
	    it('should verify that index has been created', function () {
	      expect(Object.keys(inverted.indexes).length).toBeGreaterThan(0);
	    });
	    it('should check that index maps the string to the correct objects in json array', function () {
	      expect(inverted.getIndex().alice).toEqual([0]);
	    });
	  });

	  describe('Search Index', function () {
	    it('should return an arrray of objects indexes of the searched words', function () {
	      expect(inverted.searchIndex('of')).toEqual([[0, 1]]);
	      expect(inverted.searchIndex('alice powerful')).toEqual([[0], [1]]);
	    });
	  });
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

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

/***/ }
/******/ ]);