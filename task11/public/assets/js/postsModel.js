((exp) => {
  exp.firstSkip = 4;
  exp.top = 4;

  exp.sortByDate = function sortByDate(array) {
    const findPosts = array.slice();
    return findPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };

  exp.getPhotoPost = function getPhotoPost(allPosts, id) {
    return allPosts.find(x => x.id === id);
  };


  exp.getPhotoPosts = function getPhotoPosts(allPosts, filters) {
    if (allPosts === undefined) {
      return null;
    }
    if (filters === undefined) {
      return allPosts;
    }

    if (filters.author !== undefined && filters.author !== '') {
      allPosts = allPosts.filter(x => x.author === filters.author);
    }

    if (filters.date !== undefined && filters.date !== '') {
      allPosts = allPosts.filter(x => x.createdAt >= filters.date);
    }

    if (filters.hashTags !== undefined && filters.hashTags.length !== 0) {
      for (let i = 0; i < filters.hashTags.length; i++) {
        allPosts = allPosts.filter(x => x.hashTags.indexOf(filters.hashTags[i]) !== -1);
      }
    }
    allPosts = allPosts.filter(x => x.deleted === false);
    return allPosts;
  };

  function validatePhotoPost(photoPost) {
    if (photoPost.id === undefined) {
      return false;
    }
    if (photoPost.description === undefined || photoPost.description === '') {
      return false;
    }
    if (photoPost.author === undefined) {
      return false;
    }
    if (photoPost.photoLink === undefined) {
      return false;
    }
    if (photoPost.hashTags === undefined) {
      return false;
    }
    if (photoPost.likes === undefined) {
      return false;
    }
    if (photoPost.description.length >= 200) {
      return false;
    }
    if (photoPost.author.length === 0) {
      return false;
    }
    return photoPost.photoLink.length !== 0;
  }


  exp.loadNewPost = function loadNewPost(allPosts, post) {
    if (allPosts === undefined || post === undefined) {
      return false;
    }
    if (validatePhotoPost(post)) {
      allPosts.push(post);
      return true;
    }
    return false;
  };


  exp.editPhotoPost = function editPhotoPost(allPosts, id, editPost) {
    if (allPosts === undefined || id === undefined || editPost === undefined) {
      return false;
    }
    const oldPost = allPosts.find(x => x.id === id);
    if (oldPost && !oldPost.deleted) {
      oldPost.description = editPost.description;
      oldPost.hashTags = editPost.hashTags;
      return true;
    }
    return false;
  };

  exp.likePhotoPost = function likePhotoPost(allPosts, id, user) {
    if (allPosts === undefined || id === undefined || user === undefined) {
      return null;
    }

    const oldPost = allPosts.find(x => x.id === id);
    if (oldPost && !oldPost.deleted) {
      const like = {};
      const index = oldPost.likes.indexOf(user);
      if (index > -1) {
        oldPost.likes.splice(index, 1);
        like.type = '-o';
      } else {
        oldPost.likes.push(user);
        like.type = '';
      }
      like.amount = oldPost.likes.length;
      return like;
    }
    return null;
  };

  exp.removePhotoPost = function removePhotoPost(allPosts, id) {
    if (allPosts === undefined || id === undefined) {
      return false;
    }
    const post = allPosts.find(x => x.id === id);
    if (post) {
      post.deleted = true;
      return true;
    }
    return false;
  };
})(this.postsModel = {});
