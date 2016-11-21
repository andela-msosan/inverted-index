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
    const result = {};
    const cleanWord = this.getToken(word);
    cleanWord.forEach((text) => {
      if (this.indexes.hasOwnProperty(text)
         ) {
        result[text] = this.indexes[text];
      }
    });
    return result;
  }

}

module.exports = InvertedIndex;
