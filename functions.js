const functions = {
    checkDuplicatePlayers : (arr) => {
    
      let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index)
      function _private() {
        if(findDuplicates(arr).length === 0) {
          console.log(findDuplicates);
          return false;
        }else {
          return true;
        }
      }
      return _private();
  },
    
  checkEnoughPlayers : (arr) => {
    const selectedPlayers = arr;
    function _private(selectedPlayers) {
      return selectedPlayers[0] === "" ? true ? false;
    }
    
  }
}
module.exports = functions;