/* eslint-disable */
angular.module('myApp', [])
  .controller('mainController', ($scope) => {
    $scope.fileContent = null;
    $scope.myIndex = null;
    const myInverted = new InvertedIndex();
    $scope.showTable = false;

    /**
     * Reads uploaded file content
     */
    const fileInput = document.getElementById('file-input');
    fileInput.addEventListener('change', () => {
      const fileLoaded = (fileInput.files[0]);
      const jsonFileType = 'application/json';
      const userFileType = fileLoaded.type;
      const isValidType = Object.is(userFileType, jsonFileType);
      if (!isValidType) {
        $scope.message('Invalid File Type!');
      } else {
        const readFile = new FileReader();
        readFile.onload = () => {
          const fileContent = JSON.parse(readFile.result);
          $scope.message('File Uploaded!');
          $scope.$apply(() => {
            $scope.fileContent = fileContent;
          });
        };
        readFile.readAsText(fileLoaded);
      }
    });

    $scope.message = (message) => {
      Materialize.toast(message, 1000);
    }

    /**
     * Checks if the content passed is Valid
     * @function checkValid
     * @param {Object} content Created file index
     * @return {Boolean} True if not valid
     */
    $scope.checkValid = (content) => {
      if (content.hasOwnProperty(undefined)) {
        return true;
      }
    };

    /**
     * Creates index of the uploaded file content and displays it in a table
     * @function createIndex
     */
    $scope.createIndex = () => {
      if (!$scope.fileContent) {
        $scope.message('Upload a Valid File!');
        $scope.showTable = false;
        return false;
      } else {
        myInverted.createIndex($scope.fileContent);
        $scope.myIndex = myInverted.getIndex();
        if (!(myInverted.isValidJson($scope.fileContent)) || $scope.checkValid($scope.myIndex)) {
          $scope.message('Please check your file!');
        } else {
          $scope.getCount();
          $scope.showTable = true;
        }
      }
    };

    /**
     * Gets the number of books/elements in the uploaded file
     * @function getCount
     */
    $scope.getCount = () => {
      const arrLength = $scope.fileContent.length;
      const count = [];
      for (let i = 0; i < arrLength; i++) {
        count.push(i);
      }
      $scope.count = count;
    };

    /**
     * Searches through the created indexes for user's input
     * @function searchIndex
     * @param {text} searchWord Texts entered to be searched.
     */
    $scope.searchIndex = (searchWord) => {
      if ($scope.myIndex === null) {
        $scope.message('Upload a file and create Index');
        return false;
      }
      if ((searchWord === '') || (searchWord === undefined)) {
        $scope.message('Enter words to search!');
      }
      $scope.myIndex = myInverted.searchIndex(searchWord);
      if (Object.keys($scope.myIndex).length === 0) {
        $scope.message('No result found');
      }
      $scope.getCount();
      $scope.showTable = true;
    };
  });
