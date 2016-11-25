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

const bookTwo = [
  {
    title: 'About Jasmine',
    text: 'Jasmine is a name of a person as well as Javascript testing framework'
  },

  {
    title: 'The Trials of Brother Jero',
    text: 'A lovely book written by Nobel Prize winner, Professor Wole Soyinka'
  }
];

describe('Inverted Index', () => {
  const inverted = new InvertedIndex();
  inverted.createIndex(book, 'file-one');
  inverted.createIndex(bookTwo, 'file-two');

  describe('Read Book Data', () => {
    it('should check that uploaded file content is a valid json file', () => {
      expect(inverted.isValidJson(book)).toBeTruthy();
      expect(inverted.isValidJson(bookTwo)).toBeTruthy();
    });

    it('should read json file and assert it is not empty', () => {
      expect(inverted.isValidJson([])).toBeFalsy();
    });
  });

  describe('Populate Index', () => {
    it('should verify that index has been created', () => {
      expect(Object.keys(inverted.indexes).length).toBeGreaterThan(0);
    });

    it('should check that index maps the string to the correct filename', () => {
      inverted.createIndex(book, 'file-one');
      inverted.createIndex(bookTwo, 'file-two');
      expect(typeof (inverted.getIndex())['file-one']).toBe('object');
      expect(inverted.getIndex()['file-two'].jasmine).toEqual([0]);
    });
  });


  describe('Search Index', () => {
    it('should return an arrray of objects indexes of the searched words', () => {
      expect(inverted.searchIndex('of', 'file-two')).toEqual({ of: [0, 1] });
      expect(inverted.searchIndex('alice powerful', 'file-one')).toEqual({ alice: [0], powerful: [1] });
    });
  });
});
