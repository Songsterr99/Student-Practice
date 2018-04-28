const express = require('express');

const app = express();
const multer = require('multer');
const fs = require('fs');
const bodyParser = require('body-parser');

const posts = require('./public/assets/js/postsModel.js');

const jsonFile = 'server/data/posts.json';

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, __dirname + '/public/assets/img');
  },
  filename(req, file, callback) {
    const filename = file.fieldname + '-' + Date.now() + '-' + file.originalname;
    callback(null, filename);
  }
});

const upload = multer({ storage });

app.use(bodyParser.json());
app.use(express.static('public'), express.static('public'));

app.post('/uploadImage', upload.single('file'), (req, res) => {
  let url = req.file.filename;
  if (url !== null) {
    url = 'assets/img/' + url;
    res.send(JSON.stringify(url));
  } else {
    res.status(404).end();
  }
});

app.post('/add', (req, res) => {
  const post = req.body;
  post.createdAt = new Date();
  post.deleted = false;
  post.likes = [];
  const allPosts = JSON.parse(fs.readFileSync(jsonFile));
  if (posts.postsModel.loadNewPost(allPosts, post)) {
    fs.writeFile(jsonFile, JSON.stringify(allPosts), (error) => {
      if (error) {
        throw error;
      }
    });
    res.status(200).end();
  } else {
    res.status(404).end();
  }
});

app.get('/getPost/:id', (req, res) => {
  const allPosts = JSON.parse(fs.readFileSync(jsonFile));
  const photoPost = posts.postsModel.getPhotoPost(allPosts, req.params.id);
  if (photoPost && !photoPost.deleted) {
    res.send(photoPost);
  } else {
    res.status(404).end();
  }
});

app.post('/getPostsAmount', (req, res) => {
  const allPosts = JSON.parse(fs.readFileSync(jsonFile));
  const filteredPosts = posts.postsModel.getPhotoPosts(allPosts, req.body);
  if (filteredPosts !== null) {
    const search = {};
    search.amount = filteredPosts.length;
    res.send(search);
  } else {
    res.status(404).end();
  }
});

app.post('/getPosts/:skip&:top', (req, res) => {
  const allPosts = JSON.parse(fs.readFileSync(jsonFile));
  const skip = parseInt(req.params.skip, 10);
  const top = parseInt(req.params.top, 10);
  const filteredPosts = posts.postsModel.getPhotoPosts(allPosts, req.body).slice(skip, skip + top);
  if (filteredPosts !== null) {
    res.send(posts.postsModel.sortByDate(filteredPosts));
  } else {
    res.status(404).end();
  }
});

app.delete('/delPost/:id', (req, res) => {
  const allPosts = JSON.parse(fs.readFileSync(jsonFile));
  if (posts.postsModel.removePhotoPost(allPosts, req.params.id)) {
    fs.writeFile(jsonFile, JSON.stringify(allPosts), (error) => {
      if (error) {
        throw error;
      }
    });
    res.status(200).end();
  } else {
    res.status(404).end();
  }
});


app.put('/editPost/:id', (req, res) => {
  const allPosts = JSON.parse(fs.readFileSync(jsonFile));
  if (posts.postsModel.editPhotoPost(allPosts, req.params.id, req.body)) {
    fs.writeFile(jsonFile, JSON.stringify(allPosts), (error) => {
      if (error) {
        throw error;
      }
    });
    res.status(200).end();
  } else {
    res.status(404).end();
  }
});

app.post('/likePost/:user&:id', (req, res) => {
  const allPosts = JSON.parse(fs.readFileSync(jsonFile));
  const likeInfo = posts.postsModel.likePhotoPost(allPosts, req.params.id, req.params.user);
  if (likeInfo !== null) {
    fs.writeFile(jsonFile, JSON.stringify(allPosts), (error) => {
      if (error) {
        throw error;
      }
    });
    res.send(likeInfo);
  } else {
    res.status(404).end();
  }
});

app.get('/getMaxID', (req, res) => {
  const allPosts = JSON.parse(fs.readFileSync(jsonFile));
  const search = {};
  if (allPosts !== null) {
    fs.writeFile(jsonFile, JSON.stringify(allPosts), (error) => {
      if (error) {
        throw error;
      }
    });
    search.maxID = allPosts.length;
    res.send(search);
  } else {
    res.status(404).end();
  }
});

app.use((req, res) => {
  res.sendFile('error404.html', { root: 'public' });
});

app.listen(5050, () => console.log('Server started listening on 5050'));
