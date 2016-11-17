'use strict';

const book = [
  {
    "title": "Alice in Wonderland",
    "text": "Alice falls into a rabbit hole and enters a world full of imagination."
  },

  {
    "title": "The Lord of the Rings: The Fellowship of the Ring.",
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  }
]


describe("Read Book Data", function() {
  beforeEach(function () {
    this.inverted = new Index();
    // this.index = this.inverted.Index(book);
  });

    describe("Json is valid", ()=> {
      it("should check that uploaded file content is a valid json file", function() {
        expect(this.inverted.isValidJson(book)).toBeTruthy();
      });
    });

    describe("Json not empty", ()=> {
      it("should see that the uploaded file is not empty", function() {
        expect(this.inverted.isValidJson([])).toBeFalsy();
      });
    });

});


describe("Populate Data", function() {
  beforeEach(function () {
    this.inverted = new Index();
    // this.index = this.inverted.Index(book);
  });

    describe("Ensures that index is created once json file is read", ()=> {
      it("should return an object once index is created", function() {
        expect(typeof this.inverted.createIndex(book)).toBe("object");
      });
    });
    
    describe("Ensures that string object is mapped to the correct index", ()=> {
      it("should return index of the object string", function() {
        let index = this.inverted.createIndex(book);
        expect(index.alice).toEqual([0]);
      });
    });

});

describe("Search Index", function() {
  beforeEach(function () {
    this.inverted = new Index();
    // this.index = this.inverted.Index(book);
  });

    describe("Ensures that search return the correct indices of the object", ()=> {
      it("should return indeces of the object", function() {
        let index = this.inverted.createIndex(book);
        expect(this.inverted.searchIndex("of")).toEqual([0]);
      });
    });

});
