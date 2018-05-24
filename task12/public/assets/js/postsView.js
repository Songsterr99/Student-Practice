(function (exp) {

  //login
  exp.userLogIn = function logIn(user) {
    if(user !== undefined && user !== null){
      document.getElementById("header-right").innerHTML = "" +
        "<a href=\"#content\"><i>" + user + "</i></a>" + "<a href=\"\"><i class=\"fa fa-user\" ></i></a>" +
        "<a id=\"clear-load\"><i class=\"fa fa-cloud-download\"></i></a>\n" +
        "<a><i id=\"logout\" class=\"fa fa-sign-out\"></i></a>" ;
    }
    else{
      document.getElementById("header-right").innerHTML = "" +
        "<a href=\"#login\"><i class=\"fa fa-cloud-download\"></i></a>\n" +
        "<a href=\"#login\"><i class=\"fa fa-sign-in\"></i></a>";
    }
  };

  exp.setURL = function setURL(url){
    document.getElementById("edit-photo-load").innerHTML = "<img src=" + url + " alt=\\\"\\\">";
  };

  exp.loadEditPost = function loadEditPost(post) {
    for(let i = 0; i < post.hashTags.length; i++){
      document.getElementById("tags-upload").value += post.hashTags[i] + " ";
    }
    document.getElementById("description-upload").value = post.description;
    document.getElementById("edit-photo-load").innerHTML = "<img src="+ post.photoLink +" alt=\"\">";
  };

  exp.makeLike = function makeLike(id, type, amount){
    let element = "<i class=\"fa fa-heart"+ type +"\" id=\"like" + id +"\"></i><p>" + amount +"</p>";
    document.getElementById("post-like" + id).innerHTML = element;
  };

  exp.setFilters = function setFilters(filters) {
    document.getElementById("author").value = filters.author;
    document.getElementById("hashtags").value = filters.hashTags.toString();
  };

  exp.showSearchAmount = function showSearchAmount(amount){
    document.getElementById("search-amount").innerHTML = "<p>" + amount + " results found</p>";
  };

  //show posts after filtration or reloading the page
  exp.showFirstPosts = function showFirstPosts(){
    document.getElementById("album").innerHTML = "";
    document.getElementById("button-load").innerHTML = "<button id=\"load-new-posts\">Load more</button>";
  };


  //show posts after pressing the button
  exp.showPosts = function showPosts(newPosts, isButton){
    for (let i = 0; i < newPosts.length; i++){
      show(newPosts[i]);
    }

    if(!isButton){
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
        "                <div class=\"post-likes\" id=\"post-like" + post._id + "\">"  + like(post) +
        "                 <p>" + post.likes.length +"</p>\n" +
        "                </div>\n" +
        "              </div>\n" +
        "            </div>";
    }
  }

  function like(post){
    let name = localStorage.getItem("user");
    if(post.likes.indexOf(name) === -1){
      return "<i class=\"fa fa-heart-o\" id=\"like" + post._id +"\"></i>";
    }
    else{
      return "<i class=\"fa fa-heart\" id=\"like" + post._id +"\"></i>";
    }
  }

  //ability to edit and delete post
  function editPost(post) {
    let name = localStorage.getItem("user");
    if(name === post.author){
      return "<i class=\"fa fa-edit\" id=\"edit"+ post._id +"\"></i> <i id=\"delete" + post._id + "\" class=\"fa fa-trash\"></i>";
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


})(this.postsView = {});
