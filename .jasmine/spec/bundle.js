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
/***/ function(module, exports) {

	'use strict';

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
	      expect(inverted.searchIndex('of')).toEqual({ of: [0, 1] });
	      expect(inverted.searchIndex('alice powerful')).toEqual({ alice: [0], powerful: [1] });
	    });
	  });
	});

/***/ }
/******/ ]);