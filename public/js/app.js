angular.module('myApp', ['toastr'])
  .controller('mainController', ($scope, toastr) => {
    $scope.fileContent = null;
    $scope.myIndex = null;
    $scope.filesCount = [];
    $scope.indexedFiles = null;
    const myInverted = new InvertedIndex();
    $scope.showTable = false;
    $scope.showSearch = false;
    $scope.titles = [];
    $scope.tableTitle = false;
    $scope.uploadedFiles = [];
    $scope.selected = null;

    /**
     * Reads content of uploaded files
     */
    document.getElementById('file-input')
      .addEventListener('change', (e) => {
        loadedFiles = Array.from(e.target.files);
        loadedFiles.forEach((file) => {
          reader = new FileReader();
          reader.onload = (es) => {
            $scope.$apply(() => {
              try {
                const fileContent = JSON.parse(es.target.result);
                $scope.uploadedFiles[file.name] = fileContent;
                $scope.titles.push(file.name);
                $scope.filesCount[file.name] = fileContent.length;
                toastr.success('Your file has been uploaded', 'File Uploaded');
              } catch (err) {
                toastr.error('Check your file', 'Invalid JSON File');
              }
            });
          };
          reader.readAsText(file);
        });
      });


    /**
     * Check Invalid
     * It checks if the created indices has an invalid value
     * @param {Object} content Created file indeces
     * @return {Boolean} True if not valid
     */
    $scope.checkInvalid = (content) => {
      if (content.hasOwnProperty(undefined)) {
        return true;
      }
    };

    /**
     * Create Index
     * It creates index of the uploaded file content and displays it in a table
     * @function createIndex
     * @return {null} Displays a table of created indices;
     */
    $scope.createIndex = () => {
      $scope.myIndex = {};
      const selected = document.getElementById('selected').value;
      $scope.selected = selected;
      if (selected === 'Select a file to create index') {
        toastr.error('Upload and/or select a file', 'No File Selected');
        return false;
      }
      if (selected) {
        const data = $scope.uploadedFiles[selected];
        if (data.length === 0) {
          toastr.error('Please Check Your File', 'Empty File');
          return false;
        }
        myInverted.createIndex(data, selected);
        $scope.myIndex[selected] = myInverted.getIndex(selected);
        if ($scope.checkInvalid($scope.myIndex)) {
          toastr.error('Check your file', 'Invalid File Format');
          return false;
        }
        $scope.showTable = true;
        $scope.indexedFiles = myInverted.fileIndices;
      }
    };

    /**
     * Range
     * It gets the number of books/elements in the uploaded file
     * @param {number} lengths length of documents in loaded files
     * @return {Arrray} Array created from the file length
     */
    $scope.range = (lengths) => {
      const arr = [];
      for (let i = 0; i < lengths; i++) {
        arr.push(i);
      }
      return arr;
    };

    /**
     * Search Index
     * Searches through the created indexes for user's input
     * @param {text} query Texts entered to be searched.
     * @return {null} Displays table of serached results.
     */
    $scope.searchIndex = (query) => {
      if ($scope.myIndex === null) {
        toastr.error('Upload a file and create Index', 'No Index Created');
        return false;
      }
      if ((query === '') || (query === undefined)) {
        toastr.error('Enter word(s) to search!', 'No Search Parameter');
        $scope.showTable = false;
        $scope.tableTitle = false;
        return false;
      }
      const searched = document.getElementById('searched').value;
      $scope.selected = searched;
      if (searched === 'Select a file to search') {
        toastr.error('Select file to search', 'No File Selected');
        $scope.showTable = false;
        $scope.tableTitle = false;
      } else if (searched === 'All files') {
        $scope.myIndex = myInverted.searchIndex(query);
        Object.keys($scope.myIndex).forEach((file) => {
          if (Object.keys($scope.myIndex[file]['index']).length === 0) {
            toastr.error(`Search word(s) not in index of ${file}`, 'No Search Result');
            $scope.showTable = false;
            $scope.tableTitle = false;
          }
          $scope.showTable = true;
          $scope.tableTitle = true;
        });
      } else
       {
        $scope.myIndex = myInverted.searchIndex(query, searched);
        if (Object.keys($scope.myIndex[searched]['index']).length === 0) {
          toastr.error(`Search word(s) not in index of ${searched}`, 'No Search Result');
          $scope.showTable = false;
          $scope.tableTitle = false;
          return false;
        }
        $scope.showTable = true;
      }
    };
  });
