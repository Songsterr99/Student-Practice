(function (exp) {
  var user=null;
  exp.userLogIn = function logIn(name) {
    user = name;
    if (name !== undefined) {
      document.getElementById("album").innerHTML = "";
      document.getElementById("header-right").innerHTML = "<a href='#'><i>" +name + "</i></a>" + "<a href=\"\"><i class=\"fa fa-user\" ></i></a>" ;
    }
  };
  exp.showPosts = function showPosts(posts){
    document.getElementById("album").innerHTML = "";
    document.getElementById("search-amount").innerHTML = "<p>" + posts.length + " results found</p>"
    for (var i = 0; i < posts.length; i++){
      show(posts[i]);
    }
  };

  exp.showLoadButton = function showLoadButton() {
    document.getElementById("button-load").innerHTML = "<button>Load more</button>";
  }


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
        "                  <p class=\"post-hashTags\">" + getHasTags(post) +"</p></div>" +
        "              <div class=\"result-img\">\n" +
        "                <img src="+ post.photoLink +" alt=\"\">\n" +
        "              </div>\n" +
        "              <div class=\"result-description\">\n" +
        "                <div class=\"post-likes\">\n" +
        "                  <i class=\"fa fa-heart\"></i>\n" +
        "                  <p>Likes " + post.likes.length +"</p>\n" +
        "                </div>\n" +
        "              </div>\n" +
        "            </div>";
    }
  }

  function editPost(post) {
    var editItem = "";
    if(user === post.author){
      editItem = "<i class=\"fa fa-edit\"></i>";
    }
    return editItem;
  }


  function getFormatDate(post) {
    var date = post.createdAt;

    var day = date.getDate();
    if (day < 10)
      day = "0" + day;

    var month = date.getMonth() + 1;
    if (month < 10)
      month = "0" + month;

    var year = date.getFullYear();

    var hours = date.getHours();
    if (hours < 10)
      hours = "0" + hours;

    var minutes = date.getMinutes();
    if (minutes < 10)
      minutes = "0" + minutes;

    return day + "." + month + "." + year + "  " + hours + ":" + minutes;
  }

  function getHasTags(post){
    var hashTags = "";
    for (var i = 0; i < post.hashTags.length; i++) {
      hashTags += post.hashTags[i] + " ";
    }
    return hashTags;
  }


})(this.mainPage = {});

function showPosts(skip, top, filterConfig) {
  var photoPosts = photoArray.getPhotoPosts(skip, top, filterConfig);
  mainPage.showPosts(photoPosts);
  if(top >= photoPosts.length || top === undefined)
    mainPage.showLoadButton();
}

function userLogIn(user) {
  mainPage.userLogIn(user);
}

function addPost(post) {
  photoArray.addPhotoPost(post);
}

function removePost(id) {
  photoArray.removePhotoPost(id);
}

function editPost(id,post) {
  photoArray.editPhotoPost(id, post);
}