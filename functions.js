const functions = {
    checkDuplicatePlayers : (arr) => {
    
      let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index)
      function _private() {
        if(findDuplicates.length === 0) {
          return false;
        }else {
          return true;
        }
      }
      return _private();
  }
}
module.exports = functions;