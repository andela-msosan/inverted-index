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
  inverted.createIndex(book, 'file1');

  describe('Inverted Index classes', () => {
    it('should check that it the class has a createIndex method', () => {
      expect(typeof InvertedIndex.prototype.createIndex).toBe('function');
    });

    it('should check that class has a getIndex method', () => {
      expect(typeof InvertedIndex.prototype.getIndex).toBe('function');
    });

    it('should check that it has a searchIndex method', () => {
      expect(typeof InvertedIndex.prototype.searchIndex).toBe('function');
    });
  });

  describe('Read Book Data', () => {
    it('should check that uploaded file content is a valid json file', () => {
      expect(inverted.isValidJson(book)).toBeTruthy();
    });

    it('should read json file and assert it is not empty', () => {
      expect(inverted.isValidJson([])).toBeFalsy();
    });

    it('should read file and assert that it is a json file', () => {
      expect(inverted.isValidJson('String data')).toBeFalsy();
      expect(inverted.isValidJson(12345)).toBeFalsy();
    });
  });

  describe('Populate Index', () => {
    it('should verify that index has been created', () => {
      expect(Object.keys(inverted.getIndex('file1')).length).toBeGreaterThan(0);
    });
    it('should check that index maps the string to the correct objects in json array', () => {
      expect(inverted.getIndex('file1').index.alice).toEqual([0]);
    });
  });

  describe('Search Index', () => {
    it('should return an arrray of objects indexes of the searched words', () => {
      expect(inverted.searchIndex('of', 'file1')).toEqual({ file1: { index: { of: [0, 1] }, length: 2 } });
      expect(inverted.searchIndex('alice powerful', 'file1')).toEqual({ file1: { index: { alice: [0], powerful: [1] }, length: 2 } });
    });
    it('should return search result if an array is passed in as search term', () => {
      expect(inverted.searchIndex(['alice', 'in'], 'file1')).toEqual({ file1: { index: { alice: [0], in: [0] }, length: 2 } });
      expect(inverted.searchIndex(['moyosore', 'in', 'amity'], 'file1')).toEqual({ file1: { index: { in: [0] }, length: 2 } });
    });

    it('should return search result if a multidimensional array is passed in as search term', () => {
      expect(inverted.searchIndex(['powerful', ['wonderland', ['into', 'a']], 'seek'], 'file1')).toEqual({ file1: { index: { powerful: [1], wonderland: [0], into: [0], a: [0, 1], seek: [1] }, length: 2 } });
    });

    it('should return search result if a file name is not specified', () => {
      expect(inverted.searchIndex(['alice', 'in'])).toEqual({ file1: { index: { alice: [0], in: [0] }, length: 2 } });
      expect(inverted.searchIndex('moyosore in amity')).toEqual({ file1: { index: { in: [0] }, length: 2 } });
    });
  });
});
