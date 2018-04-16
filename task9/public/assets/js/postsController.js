function load(skip, top, filters){
  let fullTop = JSON.parse(localStorage.getItem("top"));
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/getPosts/" + skip + "&" + top, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if(xhr.status !== 200 || xhr.readyState !== 4) {
      console.log(xhr.status + ": " + xhr.statusText);
    }
    else {
      let posts = JSON.parse(xhr.responseText);
      let isButton = fullTop === posts.length;
      localStorage.setItem("skip", JSON.stringify(skip + posts.length));
      postsView.showPosts(posts, isButton);
    }
  };
  xhr.send(filters);
}

function foundAmount(filters) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/getPostsAmount", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if(xhr.status !== 200 || xhr.readyState !== 4) {
      console.log(xhr.status + ": " + xhr.statusText);
    }
    else {
      let search = JSON.parse(xhr.responseText);
      postsView.showSearchAmount(search.amount);
    }
  };
  xhr.send(filters);
}

function editPost(id, curPost) {
  let xhr = new XMLHttpRequest();
  xhr.open("PUT", "/editPost/" + id, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if(xhr.status !== 200 || xhr.readyState !== 4) {
      console.log(xhr.status + ": " + xhr.statusText);
    }
    else {
      location.hash = "#content";
    }
  };
  xhr.send(curPost);
}

function addPost(id, post) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/add", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if(xhr.status !== 200 || xhr.readyState !== 4) {
      console.log(xhr.status + ": " + xhr.statusText);
    }
    else {
      localStorage.setItem("maxID", JSON.stringify(id + 1));
      location.hash = "#content";
      loadFirstPosts();
    }
  };
  xhr.send(post);

}

function loadNewPost() {
  let maxID = parseInt(localStorage.getItem("maxID"));
  let curPost = JSON.parse(localStorage.getItem("editPost"));
  let editID = parseInt(localStorage.getItem("editID"));
  curPost.description = document.getElementById("description-upload").value;
  curPost.hashTags = document.getElementById("tags-upload").value.split(" ");
  if(maxID < editID){
    curPost.author = localStorage.getItem("user");
    curPost.id = JSON.stringify(editID);
    console.log(curPost);
    addPost(editID, JSON.stringify(curPost));
  }
  else{
    editPost(editID, JSON.stringify(curPost));
  }
  localStorage.removeItem("editPost");
}

function loadFirstPosts() {
  let skip = JSON.parse(localStorage.getItem("skip"));
  let top = JSON.parse(localStorage.getItem("top"));
  let amount;
  if(skip !== 0) {
    amount = skip;
  }
  else{
    amount = top;
  }
  let filters = localStorage.getItem("filters");
  document.getElementById("button-load").addEventListener("click", loadPosts);
  foundAmount(filters);
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/getPosts/" + 0 + "&" + amount, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if(xhr.status !== 200 || xhr.readyState !== 4) {
      console.log(xhr.status + ": " + xhr.statusText);
    }
    else {
      let posts = JSON.parse(xhr.responseText);
      let isButton = top === posts.length;
      localStorage.setItem("skip", JSON.stringify(skip + posts.length));
      postsView.showFirstPosts();
      postsView.showPosts(posts, isButton);
    }
    //loadFirstPosts();
  };
  xhr.send(filters);
}

function loadPosts() {
  let skip = JSON.parse(localStorage.getItem("skip"));
  let top = JSON.parse(localStorage.getItem("top"));
  let filters = localStorage.getItem("filters");
  console.log(filters);
  load(skip, top, filters);
}

function filterPosts() {
  let filters = JSON.parse(localStorage.getItem("filters"));
  filters.author = document.forms["filters"]["author"].value;
  filters.date = document.forms["filters"]["date"].value;
  if(document.forms["filters"]["hashtags"].value !== ""){
    filters.hashTags = document.forms["filters"]["hashtags"].value.split(" ");
  }
  else{
    filters.hashTags = [];
  }
  localStorage.setItem("filters", JSON.stringify(filters));
  localStorage.setItem("skip", "0");
  loadFirstPosts();
}


//load new html
function getContent(fragmentId, callback){
  const request = new XMLHttpRequest();

  request.onload = function () {
    callback(request.responseText);
  };
  request.open("GET", fragmentId + ".html");
  request.send(null);
}

function handleFiles(file){
  let formData = new FormData();
  formData.append('file', file[0]);
  let xhr = new XMLHttpRequest();
  xhr.open('POST', '/uploadImage');
  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) {
      return;
    }
    if (xhr.status !== 200) {
      console.log(xhr.status + ': ' + xhr.statusText);
    } else {
      let url = JSON.parse(xhr.responseText);
      postsView.setURL(url);
      let editPost = JSON.parse(localStorage.getItem("editPost"));
      editPost.photoLink = url;
      localStorage.setItem("editPost", JSON.stringify(editPost));
    }
  };
  xhr.send(formData);

}



function beginLoadImage() {
  const fileElem = document.getElementById("fileElem");
  if (fileElem) {
    fileElem.click();
  }
}

//work with pages
function navigate(){
  const fragmentId = location.hash.substr(1);
  getContent(fragmentId, function (content) {
    document.getElementById("main").innerHTML = content;
    if(fragmentId === "content"){
      let filters =  JSON.parse(localStorage.getItem("filters"));
      postsView.setFilters(filters);
      loadFirstPosts();
      document.getElementById("album").addEventListener("click", editPosts);
      document.getElementById("hashtags").addEventListener("keydown", addHash);
    }
    if(fragmentId === "edit"){
      let post = JSON.parse(localStorage.getItem("editPost"));
      if(post !== undefined && !(post.photoLink === "" && post.hashTags.length === 0 && post.description === "")){
        postsView.loadEditPost(post);
      } else{
        document.getElementById("fileSelect").addEventListener("click", beginLoadImage);
      }

      document.getElementById("tags-upload").addEventListener("keydown", addHash);

    }
  });
}

function loadEditPost(id) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', '/getPost/' + id, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) {
      return;
    }
    if (xhr.status !== 200) {
      console.log(xhr.status + ': ' + xhr.statusText);
    } else {
      let post = JSON.parse(xhr.responseText);
      let editPost = {"description": "", "photoLink":"", "hashTags":[]};
      editPost.description = post.description;
      editPost.hashTags = post.hashTags;
      editPost.photoLink = post.photoLink;
      localStorage.setItem("editID", id);
      localStorage.setItem("editPost", JSON.stringify(editPost));
      location.hash = "#edit";
    }
  };
  xhr.send();
}

function like(elem, id, user) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/likePost/" + user + "&" + id, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if(xhr.status !== 200 || xhr.readyState !== 4) {
      console.log(xhr.status + ": " + xhr.statusText);
    }
    else {
      let like = JSON.parse(xhr.responseText);
      postsView.makeLike(id, like.type, like.amount)
    }
  };
  xhr.send();

}

function removePost(id){
  let xhr = new XMLHttpRequest();
  xhr.open("DELETE","/delPost/" + id, true );
  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4 ||xhr.status !== 200) {
      console.log(xhr.status + ': ' + xhr.statusText);
    } else {
      console.log(xhr.responseText);
      loadFirstPosts();
    }
  };
  xhr.send();
}

function editPosts(e){
  let user = localStorage.getItem("user");
  if(user !== null){
    let target = e.target || e.srcElement;
    let id = target.getAttribute("id");
    if(id && id.startsWith("like")){
      like(target, id.replace("like", ""), user);
    }
    if(id && id.startsWith("delete") && confirm("do you want to delete this post?")){
      removePost(id.replace("delete", ""));
    }
    if(id && id.startsWith("edit")){
      loadEditPost(id.replace("edit", ""));
    }
  }
}

function loginSubmit() {
  const userName = document.forms["login"]["user"].value;
  localStorage.setItem("user", userName);
  firstLog();
  postsView.userLogIn(userName);
  document.getElementById("logout").addEventListener("click", logout);
  document.getElementById("clear-load").addEventListener("click", clearLoad);
  location.hash="#content";
}

function logout() {
  localStorage.removeItem("user");
  postsView.userLogIn();
  location.hash="#content";
}


function addHash(event) {
  if (event.keyCode === 32 && event.target.value.length) {
    event.preventDefault();

    let elem = event.target,
      val = elem.value;

    if (val.slice(-1) !== '#') {
      elem.value += ' #';
    }
  } else if (!event.target.value.length) {
    if (event.keyCode === 32) {
      event.preventDefault();
    }
    event.target.value = '#';
  }
}


function clearLoad() {
  //postsModel.clearLoadData();
  let id = localStorage.getItem("maxID");
  id = parseInt(id) + 1;
  localStorage.setItem("editID", JSON.stringify(id));
  let editPost = {"description": "", "photoLink":"", "hashTags":[]};
  localStorage.setItem("editPost", JSON.stringify(editPost));
  location.hash = "#edit";
}

function firstLog(){
  localStorage.setItem("firstLog", "no");
  localStorage.setItem("skip", "0");
  localStorage.setItem("top", "10");
  localStorage.setItem("filters", '{"author":"", "date":"", "hashTags":[]}');
}

function setMaxID() {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', '/getMaxID/');
  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) {
      return;
    }
    if (xhr.status !== 200) {
      console.log(xhr.status + ': ' + xhr.statusText);
    } else {
      let result = JSON.parse(xhr.responseText);
      localStorage.setItem("maxID", result.maxID);
    }
  };
  xhr.send();
}

let isLoggedIn = localStorage.getItem("firstLog");
if(isLoggedIn === null){
  firstLog();
  setMaxID();
}

let name = localStorage.getItem("user");
postsView.userLogIn(name);
if(name !== null) {
  document.getElementById("logout").addEventListener("click", logout);
  document.getElementById("clear-load").addEventListener("click", clearLoad);
}

if(!location.hash) {
  location.hash = "#content";
} else{
  navigate();
}


window.addEventListener("hashchange", navigate);





