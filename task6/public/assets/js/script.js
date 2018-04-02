(function(exp) {
  exp.firstSkip = 4;
  exp.top = 4;

  const photoPosts = [
    {
      id: '1',
      description: 'центр чего-то. ',
      createdAt: new Date('2017-02-21T12:15:00'),
      author: 'Dantes',
      photoLink: 'https://pp.userapi.com/c836128/v836128564/781db/oUTc-lJYU8Q.jpg',
      hashTags : ['#Warsaw', '#travel', '#happy'],
      likes : ['Veronikas', 'Dantes', 'Kuzmikas', 'Valaikas']
    },
    {
      id: '2',
      description: 'Лестница в прекрасной Праге.',
      createdAt: new Date('2014-03-21T12:30:00'),
      author: 'Dantes',
      photoLink: 'https://pp.userapi.com/c836128/v836128564/781d1/TIKk_kETArA.jpg',
      hashTags : ['#Prague', '#Love', '#Stairway'],
      likes : ['Veronikas', 'Dimaskas', 'Alexandras']
    },
    {
      id: '3',
      description: 'Прекрасные цвета Варшавы <3',
      createdAt: new Date('2014-03-24T13:12:00'),
      author: 'Dantes',
      photoLink: 'https://pp.userapi.com/c836128/v836128564/781c7/WbPudXBrktI.jpg',
      hashTags : ['#Warsaw', '#happy', '#silence', '#travel'],
      likes : ['Beauty_boy', 'Dimaskas', 'Money_maker']
    },
    {
      id: '4',
      description: 'Гуляем по улицам прекрасной Варшавы',
      createdAt: new Date('2014-02-10T08:10:00'),
      author: 'Kuzmikas',
      photoLink: 'https://pp.userapi.com/c836128/v836128564/781bd/p5HCV9Ogpp4.jpg',
      hashTags : ['#Warsaw', '#Poland', '#travel', '#life'],
      likes : ['Beauty_boy', 'Dimaskas', 'Money_maker', 'Veronikas']
    },
    {
      id: '5',
      description: 'Главная площадь в Варшаве',
      createdAt: new Date('2015-02-02T17:25:00'),
      author: 'Dima',
      photoLink: 'https://pp.userapi.com/c836128/v836128564/781b3/orYNGnLFpIc.jpg',
      hashTags : ['#Warsaw', '#Poland', '#happy'],
      likes : ['Cool_boy', 'Funny Hourse', 'Eva Maria']
    },
    {
      id: '6',
      description: 'Прогулка по Праге',
      createdAt: new Date('2018-02-20T08:10:00'),
      author: 'Greg',
      photoLink: 'https://pp.userapi.com/c836128/v836128564/781a9/LPwRjCiuBZE.jpg',
      hashTags : ['#Praha', '#square', '#people'],
      likes : ['Veronikas', 'Cool_boy', 'Funny Hourse', 'Eva Maria']
    },
    {
      id: '7',
      description: 'Трамвайчик на улице Праги.',
      createdAt: new Date('2015-01-17T20:18:00'),
      author: 'PhotoLife',
      photoLink: 'https://pp.userapi.com/c836128/v836128564/7819f/PIG85Xh6GYI.jpg',
      hashTags : ['#photo', '#travel', '#interesting'],
      likes : ['Dantes']
    },
    {
      id: '8',
      description: 'Дорога в никуда',
      createdAt: new Date('2018-01-28T16:41:00'),
      author: 'PhotoLife',
      photoLink: 'https://pp.userapi.com/c836128/v836128564/78195/Lzql3EPgQyA.jpg',
      hashTags : ['#photo', '#life',  '#road', '#night', '#light'],
      likes : ['Kristy133', 'Cool_boy', 'MindyK', 'Nelly_Mole']
    },
    {
      id: '9',
      description: 'Мотыльки...',
      createdAt: new Date('2018-01-17T16:46:00'),
      author: 'Kristy133',
      photoLink: 'https://pp.userapi.com/c836128/v836128564/78195/Lzql3EPgQyA.jpg',
      hashTags : ['#Prague', '#Life'],
      likes : ['KevinAdams', 'Freddy14_03', 'Dantes']
    },
    {
      id: '10',
      description: 'Литва)))))))',
      createdAt: new Date('2018-01-20T17:37:00'),
      author: 'KevinAdams',
      photoLink: 'https://pp.userapi.com/c841130/v841130235/7615d/p6h6-Mq9Ynk.jpg',
      hashTags : ['#Vilnius', '#Litva', '#travel'],
      likes : ['Nik Reid', 'Linda Clain', 'MindyK']
    },
    {
      id: '11',
      description: 'Клевая фоточка с клевого места',
      createdAt: new Date('2018-02-01T14:38:00'),
      author: 'Mary Dale',
      photoLink: 'https://pp.userapi.com/c824409/v824409235/d75fd/U9CskC6GHeM.jpg',
      hashTags : ['#Switzerland', '#Berne', '#home'],
      likes : ['Kristy133', 'Nelly_Mole',  'KevinAdams', 'MindyK', 'Mary Nice']
    },
    {
      id: '12',
      description: 'Забрались и смотрим из крутого места на фонтачик...',
      createdAt: new Date('2018-01-29T11:07:00'),
      author: 'KevinAdams',
      photoLink: 'https://pp.userapi.com/c834300/v834300235/ddbb7/TPxaWfKpZoU.jpg',
      hashTags : ['#hashtag', '#life', '#travel', '#water'],
      likes : ['Mary Dale', 'Mike_Cool_Guy', 'Nata_Travel']
    },
    {
      id: '13',
      description: 'Классная гора',
      createdAt: new Date('2013-01-15T15:43:00'),
      author: 'PhotoLife',
      photoLink: 'https://pp.userapi.com/c834104/v834104235/db573/nSqaJbfcrbw.jpg',
      hashTags : ['#France', '#beauty', '#mountains', '#nature'],
      likes : []
    },
    {
      id: '14',
      description: 'Еще одна дорога в никуда',
      createdAt: new Date('2014-02-10T12:15:00'),
      author: 'PhotoLife',
      photoLink: 'https://sun9-7.userapi.com/c840628/v840628235/5f578/6TmHkD-gUUo.jpg',
      hashTags : ['#terribly', '#mountains', '#life', '#travel'],
      likes : ['Kristy133', 'Mike_Cool_Guy', 'Linda Clain']
    },
    {
      id: '15',
      description: 'Гуляем по Литве',
      createdAt: new Date('2018-01-26T14:54:00'),
      author: 'Mike_Cool_Guy',
      photoLink: 'https://pp.userapi.com/c837332/v837332102/3de75/nVeBreXYT-g.jpg',
      hashTags : ['#Litva', '#Vilnius', '#Life'],
      likes : ["Cool_guy"]
    },
    {
      id: '16',
      description: 'Прикольные птички))))',
      createdAt: new Date('2018-03-02T19:22:00'),
      author: 'PhotoLife',
      photoLink: 'https://pp.userapi.com/c841236/v841236399/75a00/WTScqnwKses.jpg',
      hashTags : ['#France', '#birds', 'dreams'],
      likes : ['Freddy', 'MindyK', 'Mary Nice']
    },
    {
      id: '17',
      description: 'Вильнюс)))))))))))))))))',
      createdAt: new Date('2018-01-20T17:37:00'),
      author: 'KevinAdams',
      photoLink: 'https://pp.userapi.com/c837332/v837332102/3de63/6X1KqJ5ngcg.jpg',
      hashTags : ['#Vilnius', '#Litva', '#travel'],
      likes : ['Nik Reid', 'Linda Clain', 'Dantes']
    },
    {
      id: '18',
      description: 'Красивая школа',
      createdAt: new Date('2014-02-19T21:10:00'),
      author: 'Mary',
      photoLink: 'https://pp.userapi.com/c834303/v834303399/dbbfd/6Yf14H7mjd8.jpg',
      hashTags : ['#pupil', '#school', '#magic'],
      likes : ['Mike_Cool_Guy', 'Mary Nice', 'KevinAdams']
    },
    {
      id: '19',
      description: 'Вокзал',
      createdAt: new Date('2018-01-12T23:50:00'),
      author: 'Dantes',
      photoLink: 'https://pp.userapi.com/c841424/v841424399/773ea/OJ1B63EBlRU.jpg',
      hashTags : ['#night'],
      likes : []
    },
    {
      id: '20',
      description: 'Фонарь',
      createdAt: new Date('2018-03-01T13:16:00'),
      author: 'Mike_Cool_Guy',
      photoLink: 'https://pp.userapi.com/c638031/v638031102/1e439/hfjgkWiv2E4.jpg',
      hashTags : ['#life', '#travel', '#lights', '#square'],
      likes : ['Dantes', 'Veronikas', 'Trello', 'Mary Dale']
    }
  ];

  //get all posts
  exp.getPhotoPosts = function getPhotoPosts() {
    return photoPosts;
  };


  function sortByDate(array) {
    var findPosts = array.slice();
    return findPosts.sort(function(a,b){return new Date(b.createdAt) - new Date(a.createdAt) });
  }

  exp.getPhotoPost = function getPhotoPost(id) {
    const posts = JSON.parse(localStorage.getItem("foundPosts"));
    return posts.find(x => x.id === id);
  };

  exp.validatePhotoPost = function validatePhotoPost(photoPost) {
    if (photoPost.id === undefined)
      return false;
    if (photoPost.description === undefined || photoPost.description === "" )
      return false;
    if (photoPost.createdAt === undefined)
      return false;
    if (photoPost.author === undefined)
      return false;
    if (photoPost.photoLink === undefined )
      return false;
    if (photoPost.hashTags === undefined || photoPost.hashTags.every(item => item ===""))
      return false;
    if (photoPost.likes === undefined)
      return false;

    if (photoPost.description.length >= 200)
      return false;
    if (photoPost.author.length === 0)
      return false;
    return photoPost.photoLink.length !== 0;
  };


  exp.loadNewPost = function loadNewPost(post) {
    let allPosts = JSON.parse(localStorage.getItem("posts"));
    let postsIndex = allPosts.findIndex(x => x.id === post.id);
    allPosts[postsIndex].likes = post.likes;
    localStorage.setItem("posts", JSON.stringify(allPosts));

    let allFoundPosts = JSON.parse(localStorage.getItem("foundPosts"));
    let foundPostsIndex = allFoundPosts.findIndex(x => x.id === post.id);
    allFoundPosts[foundPostsIndex].likes = post.likes;
    localStorage.setItem("foundPosts", JSON.stringify(allFoundPosts));
  };


  exp.editPhotoPost = function editPhotoPost(id) {
    let allPosts = JSON.parse(localStorage.getItem("posts"));
    let post = allPosts.find(x => x.id === id);
    let hashTagsString ="";
    for(let i = 0; i < post.hashTags.length; i++){
      hashTagsString += post.hashTags[i] + " ";
    }
    localStorage.setItem("editHashtags", hashTagsString);
    localStorage.setItem("editDescription", post.description);
    localStorage.setItem("editURL", post.photoLink);
    localStorage.setItem("editID", post.id);

  };

  exp.removePhotoPost = function removePhotoPost(id) {
    console.log(id);
    const allPosts = JSON.parse(localStorage.getItem("posts"));
    let postsIndex = allPosts.findIndex(x => x.id === id);
    console.log(postsIndex);
    allPosts.splice(postsIndex, 1);
    localStorage.setItem("posts", JSON.stringify(allPosts));

  };

  exp.clearLoadData = function clearLoadData(){
    localStorage.setItem("editHashtags", "");
    localStorage.setItem("editDescription", "");
    localStorage.setItem("editURL", "");
  };


  exp.fillPosts = function fillPosts() {
    const curPosts = JSON.parse(localStorage.getItem("posts"));
    localStorage.setItem("foundPosts", JSON.stringify(sortByDate(curPosts)));


    photoArray.clearLoadData();

    localStorage.setItem("author", "");
    localStorage.setItem("hashtags", "");
    localStorage.setItem("date", "");
    localStorage.setItem("skip", JSON.stringify(photoArray.firstSkip));
  };

  //fill localStorage
  let allPosts = JSON.parse(localStorage.getItem("posts"));
  if(allPosts === null){
    localStorage.setItem("posts", JSON.stringify(photoPosts));
    localStorage.setItem("editID", "21");
    localStorage.setItem("addID", "21");
  }

  let foundPosts = JSON.parse(localStorage.getItem("foundPosts"));
  if(foundPosts === null){
    photoArray.fillPosts();
  }

})(this.photoArray = {});