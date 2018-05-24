(function(exp) {

  exp.sortByDate = function sortByDate(array) {
    let findPosts = array.slice();
    return findPosts.sort(function(a,b){return new Date(b.createdAt) - new Date(a.createdAt) });
  };

  exp.setFilters = function setFilters(body) {
    let filters = {};
    filters.deleted = false;
    if(body.author !== undefined && body.author !== "" ) {
      filters.author = body.author;
    }
    if(body.createdAt !== undefined && body.createdAt !== "" ) {
      filters.createdAt = body.createdAt;
    }

    if(body.hashTags !== undefined && body.hashTags.length !== 0) {
      filters.hashTags = {'$in': body.hashTags};
    }
    return filters;
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




})(this.postsModel = {});