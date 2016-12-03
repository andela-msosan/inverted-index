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
  inverted.createIndex(book, 'file-1');

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
      expect(Object.keys(inverted.getIndex('file-1')).length).toBeGreaterThan(0);
    });
    it('should check that index maps the string to the correct objects in json array', () => {
      expect(inverted.getIndex('file-1').alice).toEqual([0]);
    });
  });

  describe('Search Index', () => {
    it('should return an arrray of objects indexes of the searched words', () => {
      expect(inverted.searchIndex('of', 'file-1')).toEqual({ of: [0, 1] });
      expect(inverted.searchIndex('alice powerful', 'file-1')).toEqual({ alice: [0], powerful: [1] });
    });
    it('should return search result if an array is passed in as search term', () => {
      expect(inverted.searchIndex(['alice', 'in', 'ring'], 'file-1')).toEqual({ alice: [0], in: [0], ring: [1] });
      expect(inverted.searchIndex(['moyosore', 'in', 'amity'], 'file-1')).toEqual({ in: [0] });
    });

    it('should return search result if a multidimensional array is passed in as search term', () => {
      expect(inverted.searchIndex(['powerful', ['wonderland', ['into', 'a']], 'seek'], 'file-1'))
      .toEqual({ powerful: [1], wonderland: [0], into: [0], a: [0, 1], seek: [1] });
    });
  });
});
