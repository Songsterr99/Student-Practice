function load(skip, top, filters){
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/getPosts/" + skip + "&" + top, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
      if(xhr.readyState !== 4){
        return;
      }
      if(xhr.status !== 200) {
        reject(xhr.status + ": " + xhr.statusText);
      }
      else {
        resolve(xhr.responseText);
      }
    };
    xhr.send(filters);
  });
}

function foundAmount(filters) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/getPostsAmount", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
      if( xhr.readyState !== 4){
        return;
      }
      if(xhr.status !== 200) {
        reject(xhr.status + ": " + xhr.statusText);
      }
      else {
        resolve(xhr.responseText);
      }
    };
    xhr.send(filters);
  });
}

function editPost(id, curPost) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open("PUT", "/editPost/" + id, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
      if(xhr.readyState !== 4){
        return;
      }
      if(xhr.status !== 200) {
        reject(xhr.status + ": " + xhr.statusText);
      }
      else {
        resolve(true);
      }
    };
    xhr.send(curPost);
  });
}

function addPost(id, post) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/add", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
      if(xhr.readyState !== 4){
        return;
      }
      if(xhr.status !== 200) {
        reject(xhr.status + ": " + xhr.statusText);
      }
      else {
        resolve(true);
      }
    };
    xhr.send(post);
  });
}

async function loadNewPost() {
  let curPost = JSON.parse(localStorage.getItem("editPost"));
  let editID = localStorage.getItem("editID");
  curPost.description = document.getElementById("description-upload").value;
  curPost.hashTags = document.getElementById("tags-upload").value.split(" ");
  try{
    if(editID === null){
      let result = JSON.parse(await setMaxID());
      curPost.id = JSON.stringify(result.maxID + 1);
      curPost.author = localStorage.getItem("user");
      let isAdded = await addPost(editID, JSON.stringify(curPost));
      if(!isAdded){
        alert("post isn't added");
      }
    }
    else{
      let isEdited = editPost(parseInt(editID), JSON.stringify(curPost));
      if(!isEdited){
        alert("post isn't edited")
      }
    }
    location.hash = "#content";
  }
  catch(e){
    alert(e.message);
  }
  localStorage.removeItem("editPost");
  localStorage.removeItem("editID");
}

async function loadFirstPosts() {
  try{
    let skip = JSON.parse(localStorage.getItem("skip"));
    let top = JSON.parse(localStorage.getItem("top"));
    let filters = localStorage.getItem("filters");
    let search = JSON.parse(await foundAmount(filters));
    postsView.showFirstPosts();
    postsView.showSearchAmount(search.amount);
    document.getElementById("button-load").addEventListener("click", loadPosts);

    if(skip !== 0) {
      top = skip;
    }
    console.log(search.amount);
    let allPosts = JSON.parse(await load(0, top, filters));
    let isButton = search.amount > allPosts.length;
    postsView.showPosts(allPosts, isButton);
    localStorage.setItem("skip", JSON.stringify(top));
  }
  catch(e){
    alert(e.message);
  }
}

async function loadPosts() {
  try{
    let skip = JSON.parse(localStorage.getItem("skip"));
    let top = JSON.parse(localStorage.getItem("top"));
    let filters = localStorage.getItem("filters");

    let allPosts = JSON.parse(await load(skip, top, filters));
    console.log(allPosts);
    console.log(allPosts);
    let fullTop = JSON.parse(localStorage.getItem("top"));
    let isButton = fullTop === allPosts.length;
    localStorage.setItem("skip", JSON.stringify(skip + allPosts.length));
    postsView.showPosts(allPosts, isButton);
  }
  catch(e){
    alert(e.message);
  }
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

function loadImage(file) {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append('file', file);
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/uploadImage');
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) {
        return;
      }
      if (xhr.status !== 200) {
        reject(xhr.status + ': ' + xhr.statusText);
      } else {
        resolve(xhr.responseText);
      }
    };
    xhr.send(formData);
  })
}

async function handleFiles(file){
  try{
    let url = JSON.parse(await loadImage(file[0]));
    postsView.setURL(url);
    let editPost = JSON.parse(localStorage.getItem("editPost"));
    editPost.photoLink = url;
    localStorage.setItem("editPost", JSON.stringify(editPost));
  }
  catch(e){
    alert(e.message);
  }
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
      document.getElementById("tags-upload").addEventListener("keydown", addHash);
      if(post !== undefined && post.photoLink !== ""){
        postsView.loadEditPost(post);
      }
    }
  });
}

function loadEditPost(id) {
  return new Promise((resolve, reject) =>{
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/getPost/' + id, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) {
        return;
      }
      if (xhr.status !== 200) {
        reject(xhr.status + ': ' + xhr.statusText);
      } else {
        resolve(xhr.responseText);
      }
    };
    xhr.send();
  });
}

function like(elem, id, user) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/likePost/" + user + "&" + id, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
      if(xhr.readyState !== 4){
        return;
      }
      if (xhr.status !== 200) {
        reject(xhr.status + ": " + xhr.statusText);
      }
      else {
        resolve(xhr.responseText);
      }
    };
    xhr.send();
  });
}


function removePost(id){
  return new Promise((resolve, reject) =>{
    let xhr = new XMLHttpRequest();
    xhr.open("DELETE","/delPost/" + id, true );
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4){
        return;
      }
      if(xhr.status !== 200) {
        reject(xhr.status + ': ' + xhr.statusText);
      } else {
        resolve(true);
      }
    };
    xhr.send();
  });
}

async function editPosts(e){
  let user = localStorage.getItem("user");
  if(user !== null){
    let target = e.target || e.srcElement;
    let id = target.getAttribute("id");
    try{
      if(id && id.startsWith("like")){
        let likes = JSON.parse(await like(target, id.replace("like", ""), user));
        postsView.makeLike(id.replace("like", ""), likes.type, likes.amount);
      }
      if(id && id.startsWith("delete") && confirm("do you want to delete this post?")){
        let isDeleted = await removePost(id.replace("delete", ""));
        if(!isDeleted){
          return;
        }
        navigate();
      }
      if(id && id.startsWith("edit")){
        let post = JSON.parse(await loadEditPost(id.replace("edit", "")));
        let editPost = {"description": "", "photoLink":"", "hashTags":[]};
        editPost.description = post.description;
        editPost.hashTags = post.hashTags;
        editPost.photoLink = post.photoLink;
        localStorage.setItem("editID", id.replace("edit", ""));
        localStorage.setItem("editPost", JSON.stringify(editPost));
        location.hash = "#edit";
      }
    }
    catch(e){
      alert(e.message)
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
  localStorage.removeItem("editID");
  let editPost = {"description": "", "photoLink":"", "hashTags":[]};
  localStorage.setItem("editPost", JSON.stringify(editPost));
  location.hash = "#edit";
}

function firstLog(){
  localStorage.setItem("firstLog", "false");
  localStorage.setItem("isAddPost", "false");
  localStorage.setItem("skip", "0");
  localStorage.setItem("top", "10");
  localStorage.setItem("filters", '{"author":"", "date":"", "hashTags":[]}');
}

function setMaxID() {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/getMaxID/');
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) {
        return;
      }
      if (xhr.status !== 200) {
        reject(xhr.status + ': ' + xhr.statusText);
      } else {
        resolve(xhr.responseText);
      }
    };
    xhr.send();
  });
}

let isLoggedIn = localStorage.getItem("firstLog");
if(isLoggedIn === null){
  firstLog();

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
