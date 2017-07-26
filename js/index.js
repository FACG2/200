//DOM
(function dom() {
    var searchForm = document.getElementById('main');
    var body = document.getElementsByTagName('body')[0];
    var actorAvatar = document.getElementsByClassName('actorImg')[0];
    if (searchForm) {
    searchForm.addEventListener('submit', function(event){
      event.preventDefault();
      body.classList.add('goTop');
      body.classList.remove('goCenter');
      var actorName = event.target.firstElementChild.value;
      // event.target.firstElementChild.value = "";

      setTimeout(function(){
          getActor(actorName, function(actor) {
            document.getElementsByClassName('actorName')[0].textContent = actorName;
            actorAvatar.setAttribute("src", actor.profile);
             console.log(actor);
             document.getElementById('myMovies').innerHTML = addMoviesDOM(actor.films);
             getAge(actor.profile , function(age){
               console.log("this is me :  ",age);
                document.getElementById('lookLike').textContent= "He looks "+ age +" years old";
             });
          });
          //
      }, 0);
    });
  }
})();

/*Return the DOM as a string*/
function addMoviesDOM(films) {
  var myDOM = '';
  films.forEach(function(film) {
    myDOM += '<div class="filmContent">'+
                '<img class="content-img" src="'+film.avater+'" alt="'+film.filmName+'">'+
                '<div class="contentText">'+
                  '<p id="overView">'+film.overview+'</p>'+
                  '<a href = "'+film.website+'" id="overView">'+film.website+'</a>'+
                '</div>'+
            '</div>';
  });
  return myDOM;
}

//getActor for Hana
function getActor(actorName , fn) {
  var xhr = new XMLHttpRequest();
  var out = {};
  var objjj = {};
  var url = "https://api.themoviedb.org/3/search/person?api_key=814abd6ddb1281b2759956e55063ae9e&query=" + actorName.replace(/ /g, '%20');
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var result = JSON.parse(xhr.responseText);
      var known = {};
      if (result.results.length>0){
        out.status=1;
        result.results.map(function(myData) {
        known = myData.known_for;
        out.profile = "https://image.tmdb.org/t/p/w640" + myData.profile_path;
        })
        out.films = known.map(function(myData) {
        objjj = {};
        objjj.avater = "https://image.tmdb.org/t/p/w640" + myData.poster_path;
        objjj.filmName = myData.original_title;
        objjj.website = "https://www.themoviedb.org/movie/" + myData.id;
        objjj.overview = myData.overview;
        return objjj;
        });
      }
      else {
        out.status=0;
      }
      console.log(fn);
    fn(out);
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
  return out;
}

function getAge(profileImg , fn) {
  var xhr2 = new XMLHttpRequest();
  profile = profileImg.replace(/\//g, '%2F');
  profile2 = profile.replace(/:/g, '%3A');
  var url = "https://faceplusplus-faceplusplus.p.mashape.com/detection/detect?attribute=glass%2Cpose%2Cgender%2Cage%2Crace%2Csmiling&url=" + profile2;
  xhr2.onreadystatechange = function() {
    if (xhr2.readyState == 4 && xhr2.status == 200) {
      var result = JSON.parse(xhr2.responseText);
      var age = result.face[0].attribute.age.value;
      fn(age);
    }
  };
  xhr2.open("GET", url, true);
  xhr2.setRequestHeader("X-Mashape-Key", "CfmtogkcYLmsh7Vd55p4dPTL1iMjp1vX9JQjsnYIIVgERw93Bk");
  xhr2.setRequestHeader("Accept", "application/json")
  xhr2.send();
}
// getGif for Mahmoud
function getGif(movieName,fn) {
  var result = [];
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var myJSONRemote = JSON.parse(xhr.responseText);
      myJSONRemote.data.map(function(myData) {
        myImgs.push(myData.embed_url);
      });
      fn(myImgs);
      return myImgs;
    }
  };
  xhr.open("GET", "http://api.giphy.com/v1/gifs/search?q="+ movieName.replace(/ /g , '+') + "&api_key=57d2a87757c84c429f37713f2339c68a&limit=4", true);
  xhr.send();
}
// console.log(getActor("selena gomaz"));
//
// module.exports = getActor;
// profileImg = "https://image.tmdb.org/t/p/w640/iD7KizfexCV7TlujWbxFI6AJeei.jpg";
// getAge(profileImg);
