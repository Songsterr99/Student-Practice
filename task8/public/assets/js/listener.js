//load new html
function getContent(fragmentId, callback){
  const request = new XMLHttpRequest();

  request.onload = function () {
    callback(request.responseText);
  };

  request.open("GET", fragmentId + ".html");
  request.send(null);
}

function handleFiles(files){
  //console.log(window.URL.createObjectURL(files[0]))
  document.getElementById("edit-photo-load").innerHTML = "<img src="+ "https://pp.userapi.com/c837332/v837332102/3de75/nVeBreXYT-g.jpg" +" alt=\"\">";
  localStorage.setItem("editURL", "https://pp.userapi.com/c837332/v837332102/3de75/nVeBreXYT-g.jpg");

}

function loadImage(e) {
  const fileElem = document.getElementById("fileElem");
  if (fileElem) {
    fileElem.click();
  }
  e.preventDefault(); // prevent navigation to "#"
}

//work with pages
function navigate(){
  const fragmentId = location.hash.substr(1);
  getContent(fragmentId, function (content) {
    document.getElementById("main").innerHTML = content;
    if(fragmentId === "content"){
      DOM.showFirstPosts();
      document.getElementById("button-load").addEventListener("click", loadPosts);
      document.getElementById("album").addEventListener("click", editPosts);
      document.getElementById("hashtags").addEventListener("keydown", addHash, false);
    }
    if(fragmentId === "edit"){
/*
      let dropbox;

      dropbox = document.getElementById("edit-photo-load");
      dropbox.addEventListener("dragenter", drag, false);
      dropbox.addEventListener("dragover", drag, false);
      dropbox.addEventListener("drop", drop, false);
*/

      document.getElementById("tags-upload").addEventListener("keydown", addHash, false);

      document.getElementById("fileSelect").addEventListener("click", loadImage, false);

      const hashTagsString = localStorage.getItem("editHashtags");
      if(hashTagsString !== ""){
        document.getElementById("tags-upload").value = hashTagsString;
      }
      const description = localStorage.getItem("editDescription");
      if(description !== ""){
        document.getElementById("description-upload").value = description;
      }

      const url = localStorage.getItem("editURL");
      if(url !== ""){
        document.getElementById("edit-photo-load").innerHTML = "<img src="+ url +" alt=\"\">";
      }
    }
  });
}

function drop(e) {
  console.log("re");
  e.stopPropagation();
  e.preventDefault();

  let dt = e.dataTransfer;
  let files = dt.files;

  //handleFiles(files);
}

function drag(e) {
  console.log("hello");
  e.stopPropagation();
  e.preventDefault();
}

function like(elem, id, user) {
  let post = photoPosts.getPhotoPost(id);
  let index = post.likes.indexOf(user);
  let element;
  if( index === -1){
    post.likes.push(user);
    element = "<i class=\"fa fa-heart\" id=\"like" + post.id +"\"></i><p>" + post.likes.length +"</p>";
  }
  else{
    post.likes.splice(index, 1);
    element = "<i class=\"fa fa-heart-o\" id=\"like" + post.id +"\"></i><p>" + post.likes.length +"</p>";
  }
  document.getElementById("post-like" + id).innerHTML = element;
  photoPosts.loadNewPost(post);

}

function removePost(id){
  photoPosts.removePhotoPost(id);
  photoPosts.fillPosts();
  DOM.showFirstPosts();
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
      editPost(id.replace("edit", ""));
    }
  }
}

function editPost(id) {
  photoPosts.editPhotoPost(id);
  location.hash = "#edit";
  navigate();

}

function loadNewPhoto(){
  const id = localStorage.getItem("editID");
  const allPosts = JSON.parse( localStorage.getItem("posts"));
  const index = allPosts.findIndex(x => x.id === id);
  if(index !== -1){
    allPosts[index].description = document.getElementById("description-upload").value;
    allPosts[index].hashTags = document.getElementById("tags-upload").value.split(" ");
  }
  else{
    let post = {};
    post.id = id;
    post.description = document.getElementById("description-upload").value;
    post.author = localStorage.getItem("user");
    post.createdAt = new Date(Date.now());
    post.hashTags = document.getElementById("tags-upload").value.split(" ");
    post.photoLink = localStorage.getItem("editURL");
    post.likes = [];
    if(photoPosts.validatePhotoPost(post)){
      allPosts.push(post);
    }
    else{
      console.log("hi");
    }
  }
  localStorage.setItem("posts", JSON.stringify(allPosts));
  photoPosts.fillPosts();
  location.hash="#content";
  navigate();


}

function loginSubmit() {
  const userName = document.forms["login"]["user"].value;

  localStorage.setItem("user", userName);
  photoPosts.fillPosts();
  DOM.userLogIn();
  location.hash="#content";
  navigate();
}

function logout() {
  localStorage.removeItem("user");
  DOM.userLogIn();
  photoPosts.fillPosts();
  location.hash="#content";
  navigate();
}

function loadPosts() {
  DOM.showPosts();
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

function filterPosts(){
  let curPosts = JSON.parse(localStorage.getItem("posts"));

  let author = document.forms["filters"]["author"].value;
  localStorage.setItem("author", author);
  if(author !== ""){
    curPosts = curPosts.filter(x => x.author === author);
  }

  let date = document.forms["filters"]["date"].value;
  localStorage.setItem("date", JSON.stringify(date));
  if(date !== ""){
    curPosts = curPosts.filter(x => x.createdAt >= date);
  }

  let stringHashtags = document.forms["filters"]["hashtags"].value;
  localStorage.setItem("hashtags", stringHashtags);
  if(stringHashtags !== ""){
    let hashtags = stringHashtags.split(" ");
    for(let i = 0; i < hashtags.length; i++ ){
      curPosts = curPosts.filter(x => x.hashTags.indexOf(hashtags[i]) !== -1);
    }
  }

  localStorage.setItem("foundPosts", JSON.stringify(curPosts));
  localStorage.setItem("skip", JSON.stringify(photoPosts.firstSkip));
  DOM.showFirstPosts();
}

function clearLoad() {
  photoPosts.clearLoadData();
  const id = localStorage.getItem("addID");
  localStorage.setItem("editID", id);
  localStorage.setItem("addID", JSON.stringify( parseInt(id) + 1));
}


if(!location.hash) {
  location.hash = "#content";
}

DOM.userLogIn();
navigate();

window.addEventListener("hashchange", navigate);

let name = localStorage.getItem("user");
if(name !== null) {
  document.getElementById("logout").addEventListener("click", logout);
  document.getElementById("clear-load").addEventListener("click", clearLoad);
}







