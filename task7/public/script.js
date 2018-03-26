(function(exp) {
  var photoPosts = [
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
      hashTags : ['#Warsaw', '#happy', '#silence', 'travel'],
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

  exp.getPhotoPosts = function getPhotoPosts(skip, top, filterConfig) {
    var newPosts = [];

    if(skip === undefined || skip < 0 || skip >= photoPosts.length)
      skip = 0;

    if(top === undefined || top <= 0)
      top = 12;

    if(filterConfig !== undefined)
    {
      if("author" in filterConfig)
        newPosts = filterByAuthor(filterConfig.author);
      if("date" in filterConfig)
        newPosts = filterByDate(filterConfig.date);
      if("hashTags" in filterConfig)
        newPosts = filterByHashTags(filterConfig.hashTags);

      newPosts = sortByDate(newPosts).slice(skip, skip + top);
    }
    else {
      newPosts = sortByDate(photoPosts).slice(skip, skip + top);
    }

    return newPosts;
  }

  function filterByAuthor(author) {
    var findPosts = [];

    if (author === undefined)
      return findPosts;

    for (var i = 0; i < photoPosts.length; i++)
      if (photoPosts[i].author === author)
        findPosts.push(photoPosts[i]);

    return findPosts;
  }

  function filterByDate(date) {
    var findPosts = [];

    if (date === undefined)
      return findPosts;
    for (var i = 0; i < photoPosts.length; i++)
      if (photoPosts[i].createdAt <= date)
        findPosts.push(photoPosts[i]);

    return findPosts;
  }

  function filterByHashTags(hashTag) {
    var findPosts = [];

    if (hashTag === undefined)
      return findPosts;

    for (var i = 0; i < photoPosts.length; i++)
      if (photoPosts[i].hashTags.indexOf(hashTag) !== -1)
        findPosts.push(photoPosts[i]);
    return findPosts;
  }


  function sortByDate(array) {
    var findPosts = array.slice();
    return findPosts.sort(function(a,b){return b.createdAt - a.createdAt });
  }

  function getPhotoPost(id) {
    if (id === undefined)
      return null;
    for (var i = 0; i < photoPosts.length; i++)
      if (photoPosts[i].id === id)
        return photoPosts[i];

    return null;
  }

  function validatePhotoPost(photoPost) {
    return photoPost.id === undefined || photoPost.author === undefined || photoPost.createdAt === undefined || photoPost.createdAt === undefined
    || photoPost.description.length >= 200 || photoPost.author.length === 0 || photoPost.photoLink === undefined || photoPost.description === undefined || photoPost.photoLink.length !== 0;
  }

  exp.addPhotoPost = function addPhotoPost(photoPost) {
    if (photoPost === undefined)
      return false;

    if (validatePhotoPost(photoPost) && getPhotoPost(photoPost.id) === null) {
      photoPosts.push(photoPost);
      return true;
    }

    return false;
  }

  exp.editPhotoPost = function editPhotoPost(id, photoPost) {
    var oldPhotoPost = getPhotoPost(id);
    var empty = true;
    if (oldPhotoPost === null || photoPost === undefined || id === undefined)
      return false;

    if (photoPost.description !== undefined) {
      if (photoPost.description.length >= 200)
        return false;
      else {
        oldPhotoPost.description = photoPost.description;
        empty = false;
      }
    }

    if (photoPost.photoLink !== undefined) {
      if (photoPost.photoLink.length === 0)
        return false;
      else {
        oldPhotoPost.photoLink = photoPost.photoLink;
        empty = false;
      }
    }

    return empty === false;
  }

  exp.removePhotoPost = function removePhotoPost(id) {
    if (id === undefined)
      return false;
    for (var i = 0; i < photoPosts.length; i++) {
      if (photoPosts[i].id === id) {
        photoPosts.splice(i, 1);
        return true;
      }
    }
    return false;
  }


  //check methods
  function consoleWork() {
    console.log("\nArray with sorting by date: ");
    console.log(sortByDate(photoPosts));

    console.log("\nArray without sorting : ");
    console.log(photoPosts);

    console.group("\n\n\ngetPhotoPosts:");
    console.log("With default parameters : first 10 posts sorted by date : ")
    console.log(getPhotoPosts());
    console.log("\nSkip = 9, top = 12 :  12 posts after the 9th(11 as a result) sorted by date")
    console.log(getPhotoPosts(9,12));
    console.log("\nSkip = 8 :  10 posts sorted by date starting from the 9th: ")
    console.log(getPhotoPosts(8));
    console.log("\nfilterConfig = {author : 'Dantes'} : 10 posts by Dantes(4 as a result) sorted by date: ");
    console.log(getPhotoPosts(0, 10, {author : 'Dantes'} ));
    console.log("\nfilterConfig = {date : '01.02.2018'} : 10 posts sorted by date until this date");
    console.log(getPhotoPosts(0, 10,{date : new Date('2018-02-01T22:14:00')} ));
    console.log("\nfilterConfig = {hashTag : '#travel'} : 8 posts sorted by date with this hashTag");
    console.log(getPhotoPosts(0, 10,{hashTags : '#travel'} ));
    console.log("\nfilterConfig = {likes : '10'} : no posts");
    console.log(getPhotoPosts(0, 10,{likes : '10'} ));
    console.groupEnd();

    console.group("\n\ngetPhotoPost:");
    console.log('photoPost with id 15 : ');
    console.log(getPhotoPost('15'));
    console.log('\nphotoPost with id 25(no photos) : ');
    console.log(getPhotoPost('25'));
    console.groupEnd();

    console.group("\n\nMethod validatePhotoPost");
    console.log('True : ');
    console.log(validatePhotoPost(getPhotoPost('2')));
    console.log('False because of long description : ');
    console.log(validatePhotoPost(getPhotoPost('1')));
    console.log('False because of not enough arguments : ');
    console.log(validatePhotoPost({id: '25', description: 'Just something', author: 'Lanny'}));
    console.log('False because of empty arguments : ');
    console.log(validatePhotoPost({
      id: '25',
      description: 'Just something',
      createdAt: new Date('2018-02-03T12:00:00'),
      author: 'Lanny',
      photoLink: ''
    }));
    console.groupEnd();


    console.group("\n\naddPhotoPost");
    console.log('Post with id = 21 is added : ');
    console.log(addPhotoPost({
      id: '21',
      description: 'Just something',
      createdAt: new Date('2018-02-03T12:00:00'),
      author: 'Lanny',
      photoLink: 'https://pp.userapi.com/c841537/v841537399/78135/Z_1P54xxqdc.jpg'
    }));
    console.log('\n\nReturn false because of existing post with the same ID : ');
    console.log(addPhotoPost(getPhotoPost('6')));
    console.log('Return false because of not enough arguments : ');
    console.log(addPhotoPost({id: '25', description: 'Just something', author: 'Lanny'}));
    console.groupEnd();

    console.group("\n\neditPhotoPost");
    console.log('Method with id=2 is edited : ');
    console.log(editPhotoPost('2', {description : 'Hi mark!!!'}));
    console.log("\nPhotoPost with id \'2\' after editing : ");
    console.log(photoPosts[1]);
    console.log('\nReturn false because such id doesn\'t exist: ');
    console.log(editPhotoPost('26', {description : 'Happy birtday!!!'}));
    console.log('\nReturn false because you can\'t change id : ');
    console.log(editPhotoPost('26', {id : '1'}));
    console.log('\nReturn false because of too long description) : ');
    console.log(editPhotoPost('26', {description : getPhotoPost('1').description}));
    console.groupEnd();

    console.group("\n\nremovePhotoPost");
    console.log('Delete photoPost with id=1 : ');
    console.log(removePhotoPost('1'));
    console.log('\nReturn false because id=100 doesn\'t exist : ');
    console.log(removePhotoPost('100'));
    console.groupEnd();
  }

})(this.photoArray = {});
