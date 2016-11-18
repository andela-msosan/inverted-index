"use strict"
var books = [{
    "title": "Alice in Wonderland",
    "text": "Alice falls into a rabbit hole ring and enters a world full of imagination."
  },

  {
    "title": "The Lord of the Rings: The Fellowship of the Ring.",
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  }];

class Index {
  constructor() {
    this.indexes = {};
    }

  /**
   * isValidJson
   * @param {Object} jsonArray Array of json objects
   * @return {Boolean} 
   */
    isValidJson(jsonArray) {
      if (typeof jsonArray !== 'object' || jsonArray.length === 0) {
          return false;
        }
      jsonArray.forEach( (item)=>{
        if ( !(item.hasOwnProperty("title") && item.hasOwnProperty("text")) ) {
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
      return text.replace(invalid, " ").toLowerCase()
      .split(" ")
      .filter((item)=>{
        return Boolean(item)
      });
    }

    /**
     * createIndex
     * @param {JSON} fileContent Uploaded json file content
     * @return {Object} words in file with thier index
     */
    createIndex(fileContent) {
      if (this.isValidJson(fileContent)) {
        fileContent.forEach((doc, docIndex)=>{
          let newString = `${doc.title} ${doc.text}`
          let tokenArray = this.getToken(newString)
           tokenArray.forEach((token)=>{
            if (token in this.indexes) {
              if (this.indexes[token].indexOf(docIndex) === -1){
                this.indexes[token].push(docIndex)
              }
            // this.indexes[token].push(docIndex)
            } else
            {
            this.indexes[token] = [docIndex]
            }
          })
       });
      }
    }
    
    /**
     * getIndex
     * @return {Object} An object of each word and their indexex
     */
    getIndex() {
      return this.indexes
    }

    /**
     * searchIndex
     * @param {String} word Word to be searched in the index
     * @return {Array} description
     */
    searchIndex(word) {
      const cleanWord = this.getToken(word);
      console.log(cleanWord);
      cleanWord.forEach((word)=>{
        // console.log(word)
        // console.log(this.indexes)
        if(word in this.indexes) {
        return this.indexes[word]
      } else {
        return "No result found"
      }
      })
      

    }

}
let ind = new Index()
console.log(typeof (ind.createIndex(books)));
console.log(ind.searchIndex("alice@.     in wonderland"))