(function(exp) {
  exp.firstSkip = 4;
  exp.top = 4;

  function sortByDate(array) {
    let findPosts = array.slice();
    return findPosts.sort(function(a,b){return new Date(b.createdAt) - new Date(a.createdAt) });
  }

  exp.getPhotoPost = function getPhotoPost(allPosts, id) {
    return allPosts.find(x => x.id === id);
  };

  function validatePhotoPost(photoPost) {
    if (photoPost.id === undefined)
      return false;
    if (photoPost.description === undefined || photoPost.description === "" )
      return false;
    if (photoPost.author === undefined)
      return false;
    if (photoPost.photoLink === undefined )
      return false;
    if (photoPost.hashTags === undefined)
      return false;
    if (photoPost.likes === undefined)
      return false;
    if (photoPost.description.length >= 200)
      return false;
    if (photoPost.author.length === 0)
      return false;
    return photoPost.photoLink.length !== 0;
  }


  exp.loadNewPost = function loadNewPost(allPosts, post) {
    if(post === undefined){
      return false;
    }
    if(validatePhotoPost(post)){
      allPosts.push(post);
      return true;
    }
    return false;
  };


  exp.editPhotoPost = function editPhotoPost(allPosts, id, editPost) {
    if(id === undefined || editPost === undefined){
      return false;
    }
    let oldPost = allPosts.find(x => x.id === id);
    if(oldPost && !oldPost.deleted && validatePhotoPost(editPost)){
      oldPost.description = editPost.description;
      oldPost.photoLink = editPost.photoLink;
      oldPost.hashTags = editPost.hashTags;
      return true
    }
    return false;
  };

  exp.removePhotoPost = function removePhotoPost(allPosts, id) {
    if(id === undefined){
      return false;
    }
    let post = allPosts.find(x => x.id === id);
    if(post){
      post.deleted = true;
      return true;
    }
    return false;
  };


})(this.photoPosts = {});