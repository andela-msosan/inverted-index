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
    this.fileIndices = {};
  }

  /**
   * Set Index
   * It sets the indices of all indexed files
   * @param {String} filename Name of the indexed file
   * @param {Object} indices Indices of the file
   * @return {object} Indexed file name and it's indices'
   */
  setIndex(filename, indices) {
    this.fileIndices[filename] = indices;
  }

  /**
   * Valid json
   * It checks if a json file is valid
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
   * Get token
   * It splits sentence into an array of words
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
   * Create Index
   * It creates Indices for files
   * @param {String} fileContent Name of the uploaded file.
   * @param {Array} fileName Uploaded json file content
   * @return {null} no return value
   */
  createIndex(fileContent, fileName) {
    const indices = {};
    indices['index'] = {};
    if (this.isValidJson(fileContent)) {
      fileContent.forEach((doc, docIndex) => {
        const newString = `${doc.title} ${doc.text}`;
        const tokenArray = this.getToken(newString);
        tokenArray.forEach((token) => {
          if (token in indices['index']) {
            if (indices['index'][token].indexOf(docIndex) === -1) {
              indices['index'][token].push(docIndex);
            }
          } else {
            indices['index'][token] = [docIndex];
          }
        });
      });
      indices['length'] = fileContent.length;

      this.setIndex(fileName, indices);
      return 'Index created';
    }
    return 'Index not created';
  }


  /**
   * Get Index
   * It gets the index of a specified filename
   * @param {string} filename The filename of the index to get
   * @return {Object} An object of each word and their indexex
   */
  getIndex(filename) {
    return this.fileIndices[filename];
  }

  /**
   * Search Index
   * It searches the index of files for specified terms
   * @param {String} word Word to be searched in the index
   * @param {String} fileName The filename to search for words
   * @return {Object} Words and their indices
   */
  searchIndex(word, fileName = null) {
    const result = {};
    if (Array.isArray(word)) {
      word = word.join(',').split(',').join(' ');
    }
    const cleanWord = this.getToken(word);
    if (fileName === null) {
      Object.keys(this.fileIndices).forEach((fileName) => {
        result[fileName] = {};
        result[fileName]['index'] = {};
        result[fileName]['length'] = this.fileIndices[fileName]['length'];
        cleanWord.forEach((text) => {
          if (this.fileIndices[fileName]['index'].hasOwnProperty(text)) {
            result[fileName]['index'][text] = this.fileIndices[fileName]['index'][text];
          }
        });
      });
    } else {
      result[fileName] = {};
      result[fileName]['index'] = {};
      result[fileName]['length'] = this.fileIndices[fileName]['length'];
      cleanWord.forEach((text) => {
        if (this.fileIndices[fileName]['index'].hasOwnProperty(text)) {
          result[fileName]['index'][text] = this.fileIndices[fileName]['index'][text];
        }
      });
    }
    // console.log(result);
    return result;
  }

}
