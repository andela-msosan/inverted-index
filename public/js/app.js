/* eslint-disable */
angular.module('myApp', [])
angular.module('myApp', ['toastr'])
  .controller('mainController', ($scope, toastr) => {
    $scope.fileContent = null;
    $scope.myIndex = null;
    $scope.count = [];
    $scope.filesCount = []
    $scope.indexedFiles = null;
    const myInverted = new InvertedIndex();
    $scope.showTable = false;
    $scope.titles = [];
    $scope.uploadedFiles = [];

    /**
     * Reads uploaded file content
     */
    document.getElementById("file-input")
      .addEventListener('change', (e) => {
        loadedFiles = Array.from(e.target.files);
        loadedFiles.forEach(file => {
           reader = new FileReader();
           reader.onload = (e) => {
             $scope.$apply(() => {
               try {
              const fileContent = JSON.parse(e.target.result)
              $scope.uploadedFiles[file.name] = fileContent
              $scope.titles.push(file.name)
              $scope.filesCount[file.name] = fileContent.length;
              toastr.success('file Uploaded');
               }
               catch(err) {
                 toastr.error("check your file")
                 return false;
               }
             })
           }
           reader.readAsText(file);
        });
      })

    $scope.message = (message) => {
      Materialize.toast(message, 1000);
    }

    /**
     * Checks if the content passed is Valid
     * @function checkValid
     * @param {Object} content Created file index
     * @return {Boolean} True if not valid
     */
    $scope.checkInvalid = (content) => {
        if (content.hasOwnProperty(undefined)) {
        return true;
      }
    };

    /**
     * Creates index of the uploaded file content and displays it in a table
     * @function createIndex
     */
    $scope.createIndex = () => {
        const selected = document.getElementById('selected').value;
        if (selected === 'Select a file to create index') {
          toastr.error("Upload and/or Select a file")
          return false;
        }
        if(selected) {
          const data = $scope.uploadedFiles[selected]
          if (data.length === 0) {
            toastr.error("Please Check Your File", "Empty File");
            return false;
          }
          myInverted.createIndex(data, selected);
          $scope.myIndex = myInverted.getIndex(selected);
          if ($scope.checkInvalid($scope.myIndex)) {
            toastr.error("Check your file", "Invalid File Format")
            return false;
          }
          $scope.lengths = $scope.range($scope.filesCount[selected]);
          $scope.showTable = true;
          $scope.indexedFiles = myInverted.fileIndices;
        }
      };

    /**
     * Gets the number of books/elements in the uploaded file
     * @function getCount
     */
$scope.range = (lengths) => {
        let arr = []
        for (let i = 0; i < lengths; i++) {
            arr.push(i);
        }
        return arr
      };

    /**
     * Searches through the created indexes for user's input
     * @function searchIndex
     * @param {text} searchWord Texts entered to be searched.
     */
    $scope.searchIndex = (query) => {
        // const selected = document.getElementById('selected').value;
        if ($scope.myIndex === null) {
        toastr.error('Upload a file and create Index');
        return false;
        }
        if ((query === '') || (query === undefined)) {
          toastr.error('Enter words to search!');
          $scope.showTable = false;
          return false;
        }
        const searched = document.getElementById('searched').value;
        if (searched === 'Select a file to search') {
          toastr.error("Select file to search")
          showTable = false;
          return false;
        }
        if(searched) {
          $scope.lengths = $scope.range($scope.filesCount[searched]);
          $scope.myIndex = myInverted.searchIndex(query, searched);
            if (Object.keys($scope.myIndex).length === 0) {
              toastr.error("search result not found")
              $scope.showTable = false;
              return false;
            }
          $scope.showTable = true;
        }
      }

  });
