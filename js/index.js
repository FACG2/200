//DOM
(function dom() {
    var searchForm = document.getElementById('main');
    var body = document.getElementsByTagName('body')[0];
    if (searchForm) {
    searchForm.addEventListener('submit', function(event){
      event.preventDefault();
      document.getElementsByTagName('body')[0].classList.add('goTop');
      body.classList.remove('goCenter');
      var actorName = event.target.firstElementChild.value;
      event.target.firstElementChild.value = "";
    });
  }
})();

//getActor for Hana
function getActor(actorName) {

}

// getGif for Mahmoud
function getGif(movieName,fn) {
  var result = [];
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var myJSONRemote = JSON.parse(xhr.responseText);
      fn(myJSONRemote);
      myJSONRemote.data.map(function(myData) {
        myImgs.push(myData.embed_url);
      });
      return myImgs;
    }
  };
  xhr.open("GET", "http://api.giphy.com/v1/gifs/search?q="+ movieName.replace(/ /g , '+') + "&api_key=57d2a87757c84c429f37713f2339c68a&limit=4", true);
  xhr.send();
}
