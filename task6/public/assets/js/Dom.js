(function (exp) {

  //login
  exp.userLogIn = function logIn() {
    let name = localStorage.getItem("user");
    if(name !== null){
      document.getElementById("header-right").innerHTML = "" +
        "<a href=\"#content\"><i>" + name + "</i></a>" + "<a href=\"\"><i class=\"fa fa-user\" ></i></a>" +
        "<a href=\"#edit\" id=\"clear-load\"><i class=\"fa fa-cloud-download\"></i></a>\n" +
        "<a><i id=\"logout\" class=\"fa fa-sign-out\"></i></a>" ;
    }
    else{
      document.getElementById("header-right").innerHTML = "" +
        "<a href=\"#login\"><i class=\"fa fa-cloud-download\"></i></a>\n" +
        "<a href=\"#login\"><i class=\"fa fa-sign-in\"></i></a>";
    }
  };


  //show posts after filtration or reloading the page
  exp.showFirstPosts = function showFirstPosts(){
    const curPosts = JSON.parse(localStorage.getItem("foundPosts"));

    document.getElementById("author").value = localStorage.getItem("author");
    document.getElementById("hashtags").value = localStorage.getItem("hashtags");


    document.getElementById("search-amount").innerHTML = "<p>" + curPosts.length + " results found</p>";
    document.getElementById("album").innerHTML = "";

    if(photoArray.firstSkip < curPosts.length){
      document.getElementById("button-load").innerHTML = "<button id=\"load-new-posts\">Load more</button>";
    }
    else{
      document.getElementById("button-load").innerHTML = "";
    }

    let amount = JSON.parse(localStorage.getItem("skip"));
    if(amount > curPosts.length){
      amount = curPosts.length;
    }
    for(let i = 0; i < amount; i++){
      show(curPosts[i]);
    }

  };


  //show posts after pressing the button
  exp.showPosts = function showPosts(){
    const curPosts = JSON.parse(localStorage.getItem("foundPosts"));
    let skip = JSON.parse(localStorage.getItem("skip"));
    const newPosts = curPosts.slice(skip, skip + photoArray.top);
    skip += photoArray.top;
    localStorage.setItem("skip", JSON.stringify(skip));

    for (let i = 0; i < newPosts.length; i++){
      show(newPosts[i]);
    }

    if(skip >= curPosts.length){
      document.getElementById("button-load").innerHTML = "";
    }
  };

  //show post
  function show(post) {
    if(post !== null){
      document.getElementById("album").innerHTML +=  "<div class=\"result\">\n" +
        "              <div class=\"result-user-description\">\n" +
        "                <div class=\"user-description\">\n" +
        "                  <i class=\"fa fa-user\"></i>\n" +
        "                  <div class=post-information>\n" +
        "                    <h5>"+ post.author +"</h5>\n" +
        "                    <p>" + getFormatDate(post) +"</p>\n" +
        "                  </div>\n" +
        "                </div>\n" +
        "                <div class=\"post-edit\">" + editPost(post) + "</div>" +
        "              </div>\n" +
        "                <div class=\"result-post-description\">" +
        "                  <p>"+ post.description + "</p>" +
        "                  <p class=\"post-hashTags\">" + getHashTags(post) +"</p></div>" +
        "              <div class=\"result-img\">\n" +
        "                <img src="+ post.photoLink +" alt=\"\">\n" +
        "              </div>\n" +
        "              <div class=\"result-description\">\n" +
        "                <div class=\"post-likes\" id=\"post-like" + post.id + "\">"  + like(post) +
        "                 <p>" + post.likes.length +"</p>\n" +
        "                </div>\n" +
        "              </div>\n" +
        "            </div>";
    }
  }

  function like(post){
    let name = localStorage.getItem("user");
    if(post.likes.indexOf(name) === -1){
      return "<i class=\"fa fa-heart-o\" id=\"like" + post.id +"\"></i>";
    }
    else{
      return "<i class=\"fa fa-heart\" id=\"like" + post.id +"\"></i>";
    }
  }

  //ability to edit and delete post
  function editPost(post) {
    let name = localStorage.getItem("user");
    if(name === post.author){
      return "<i class=\"fa fa-edit\" id=\"edit"+ post.id +"\"></i> <i id=\"delete" + post.id + "\" class=\"fa fa-trash\"></i>";
    }

    return "";
  }

  //date of posting
  function getFormatDate(post) {
    const date = new Date(post.createdAt);

    let day = date.getDay();
    if (day < 10)
      day = "0" + day;

    let month = date.getMonth() + 1;
    if (month < 10)
      month = "0" + month;

    let year = date.getFullYear();

    let hours = date.getHours();
    if (hours < 10)
      hours = "0" + hours;

    let minutes = date.getMinutes();
    if (minutes < 10)
      minutes = "0" + minutes;

    return day + "." + month + "." + year + "  " + hours + ":" + minutes;
  }

  //get hashtags
  function getHashTags(post){
    let hashTags = "";
    for (let i = 0; i < post.hashTags.length; i++) {
      hashTags += post.hashTags[i] + " ";
    }
    return hashTags;
  }


})(this.DOM = {});
