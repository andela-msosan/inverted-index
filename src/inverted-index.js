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
   * @return {Boolean}
   */
  isValidJson(jsonArray) {
    if (typeof jsonArray !== 'object'||jsonArray.length === 0) {
      return false;
      }
    jsonArray.forEach( (item)=> {
      if (!(item.hasOwnProperty('title') && item.hasOwnProperty('text')) ) {
        return false;
        }
      });
      return true;
    }
}
