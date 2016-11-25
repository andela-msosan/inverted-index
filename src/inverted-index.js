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
    try {
      jsonArray.forEach((item) => {
        if (!(item.hasOwnProperty('title') && item.hasOwnProperty('text'))) {
          return false;
        }
      });
      return true;
    } catch (err) {
      return false;
    }
  }

  /**
   * getToken
   * @param {String} text Strings of texts
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
     * @param {String} fileContent Name of the uploaded file.
     * @param {Array} fileName Uploaded json file content
     * @return {null} no return value
     */
  createIndex(fileContent, fileName) {
    if (this.isValidJson(fileContent)) {
      if (!(this.indexes[fileName])) {
        this.indexes[fileName] = {};
        fileContent.forEach((doc, docIndex) => {
          const newString = `${doc.title} ${doc.text}`;
          const tokenArray = this.getToken(newString);
          tokenArray.forEach((token) => {
            if (this.indexes[fileName][token] === undefined) {
              this.indexes[fileName][token] = [];
              this.indexes[fileName][token].push(docIndex);
            } else if (this.indexes[fileName][token] &&
                this.indexes[fileName][token].indexOf(docIndex) === -1) {
              this.indexes[fileName][token].push(docIndex);
            }
          });
        });
      }
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
     * @param {String} fileName The filename to search for words
     * @return {Object} Words and their indexes
     */
  searchIndex(word, fileName = null) {
    const result = {};
    const cleanWord = this.getToken(word);
    cleanWord.forEach((text) => {
      if (this.indexes[fileName].hasOwnProperty(text)) {
        result[text] = this.indexes[fileName][text];
      }
    });
    return result;
  }

}
