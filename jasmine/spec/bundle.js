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

	const InvertedIndex = __webpack_require__(1);

	const book = [
	  {
	    title: 'Alice in Wonderland',
	    text: 'Alice falls into a rabbit hole and enters a world full of imagination.'
	  },

	  {
	    title: 'The Lord of the Rings: The Fellowship of the Ring.',
	    text: 'An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring.'
	  }
	];

	describe('Inverted Index', () => {
	  const inverted = new InvertedIndex();
	  inverted.createIndex(book);

	  describe('Read Book Data', () => {
	    it('should check that uploaded file content is a valid json file', () => {
	      expect(inverted.isValidJson(book)).toBeTruthy();
	    });

	    it('should read json file and assert it is not empty', () => {
	      expect(inverted.isValidJson([])).toBeFalsy();
	    });
	  });

	  describe('Populate Index', () => {
	    it('should verify that index has been created', () => {
	      expect(Object.keys(inverted.indexes).length).toBeGreaterThan(0);
	    });
	    it('should check that index maps the string to the correct objects in json array', () => {
	      expect(inverted.getIndex().alice).toEqual([0]);
	    });
	  });

	  describe('Search Index', () => {
	    it('should return an arrray of objects indexes of the searched words', () => {
	      expect(inverted.searchIndex('of')).toEqual([[0, 1]]);
	      expect(inverted.searchIndex('alice powerful')).toEqual([[0], [1]]);
	    });
	  });
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	/**
	 * inverted index class
	 * @class
	 */
	class InvertedIndex {
	  /**
	   * class constructor
	   * @constructor
	   */
	  constructor() {
	    this.indexes = {};
	  }

	  /**
	   * Check if a json file is valid
	   * @function isValidJson
	   * @param {Object} jsonArray Array of json objects
	   * @return {Boolean} True or false if json file is valid
	   */
	  isValidJson(jsonArray) {
	    if (typeof jsonArray !== 'object' || jsonArray.length === 0) {
	      return false;
	    }
	    jsonArray.forEach((item) => {
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
	  getToken(text) {
	    const invalid = /[^\w\s]/g;
	    return text.replace(invalid, ' ').toLowerCase()
	      .split(' ')
	      .filter(item => Boolean(item));
	  }

	    /**
	     * createIndex
	     * @param {JSON} fileContent Uploaded json file content
	     * @return {Object} words in file with thier index
	     */
	  createIndex(fileContent) {
	    if (this.isValidJson(fileContent)) {
	      fileContent.forEach((doc, docIndex) => {
	        const newString = `${doc.title} ${doc.text}`;
	        const tokenArray = this.getToken(newString);
	        tokenArray.forEach((token) => {
	          if (token in this.indexes) {
	            if (this.indexes[token].indexOf(docIndex) === -1) {
	              this.indexes[token].push(docIndex);
	            }
	          } else {
	            this.indexes[token] = [docIndex];
	          }
	        });
	      });
	    }
	  }

	    /**
	     * getIndex
	     * @return {Object} An object of each word and their indexex
	     */
	  getIndex() {
	    return this.indexes;
	  }

	    /**
	     * searchIndex
	     * @param {String} word Word to be searched in the index
	     * @return {Array} description
	     */
	  searchIndex(word) {
	    const result = [];
	    const cleanWord = this.getToken(word);
	    cleanWord.forEach((text) => {
	      if (this.indexes.hasOwnProperty(text)
	         ) {
	        result.push(this.indexes[text]);
	      } else {
	        return ('No result found');
	      }
	    });
	    return result;
	  }

	}

	module.exports = InvertedIndex;


/***/ }
/******/ ]);