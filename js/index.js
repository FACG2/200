function dom() {

}

//getActor for Hana
function getActor(actorName) {
  var xhr = new XMLHttpRequest();
  var out = {};
  var objjj = {};
  var url = "https://api.themoviedb.org/3/search/person?api_key=814abd6ddb1281b2759956e55063ae9e&query=" + actorName.replace(/ /g, '%20');
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var result = JSON.parse(xhr.responseText);
// console.log("heba", result);
      var known = {};
      if (result.results.length>0){
        out.status=1;
      result.results.map(function(myData) {
        known = myData.known_for;
        out.profile = "https://image.tmdb.org/t/p/w640" + myData.profile_path;
        console.log("hana",myData.profile_path);
      })

      out.films = known.map(function(myData) {
        objjj = {};
        objjj.avater = "https://image.tmdb.org/t/p/w640" + myData.poster_path;
        objjj.filmName = myData.original_title;
        objjj.website = "https://www.themoviedb.org/movie/" + myData.id;
        objjj.overview = myData.overview;
        return objjj;
      })
    }
else {
  out.status=0;
}
  }
  };
  xhr.open("GET", url, true);
  xhr.send();
  console.log(out);
  return out;
}







function getAge(profileImg) {

  var xhr2 = new XMLHttpRequest();
  profile = profileImg.replace(/\//g, '%2F');
  profile2 = profile.replace(/:/g, '%3A');
  var age = 0;
  // console.log("image",profile2);
  var url = "https://faceplusplus-faceplusplus.p.mashape.com/detection/detect?attribute=glass%2Cpose%2Cgender%2Cage%2Crace%2Csmiling&url=" + profile2;
  console.log("link", url);
  xhr2.onreadystatechange = function() {
    if (xhr2.readyState == 4 && xhr2.status == 200) {
      console.log(xhr2.responseText);
      var result = JSON.parse(xhr2.responseText);
      console.log("res", result);
      age = result.face[0].attribute.age.value;
    }
  };
  xhr2.open("GET", url, true);
  xhr2.setRequestHeader("X-Mashape-Key", "CfmtogkcYLmsh7Vd55p4dPTL1iMjp1vX9JQjsnYIIVgERw93Bk");
  xhr2.setRequestHeader("Accept", "application/json")
  xhr2.send();
  return age;
}
// getGif for Mahmoud
function getGif(movieName) {

}
getActor("selena gomaz");
// console.log(getActor("selena gomaz"));
//
// module.exports = getActor;
// profileImg = "https://image.tmdb.org/t/p/w640/iD7KizfexCV7TlujWbxFI6AJeei.jpg";
// getAge(profileImg);
