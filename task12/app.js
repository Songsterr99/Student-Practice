const express = require('express');
const app = express();
const multer = require('multer');
const bodyParser = require('body-parser');
const posts = require("./server/postsModel.js");
const session = require('express-session');
const mongoose = require('mongoose');
const Post = require('./server/model/post');
const passport = require('./server/passport/index');

const url = "mongodb://localhost:27017/postsdb";

mongoose.Promise = global.Promise;
mongoose.connect(url);

let storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, __dirname + '/public/assets/img');
  },
  filename: function(req, file, callback) {
    let filename = file.fieldname + '-' + Date.now() + '-' + file.originalname;
    callback(null, filename);
  }
});


const upload = multer({ storage: storage });

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: false
}));

app.use(passport.initialize());
app.use(passport.session());


app.post('/uploadImage', upload.single('file'), (req, res) => {
  let url = req.file.filename;
  if(url !== null){
    url = 'assets/img/' + url;
    res.send(JSON.stringify(url));
  }
  else{
    res.status(404).end();
  }
});

app.post('/login', passport.authenticate('local'), (req, res) => {
  res.send(req.user.username);
});

app.put('/logout', (req, res) => {
  if(!req.isAuthenticated()){
    res.status(404).end();
  }
  req.session.destroy();
  res.status(200).end();

});

app.post('/add', (req, res) => {
  const post = new Post({
    description: req.body.description,
    author: req.body.author,
    photoLink: req.body.photoLink,
    deleted: false,
    hashTags: req.body.hashTags,
    likes: []
  });
  post.save(function(err){

    if(err) {
      res.status(404).end();
    } else{
      console.log("Сохранен объект", post);
      res.status(200).end();
    }
  });
});


app.get('/getPost/:id', (req, res) => {
  Post.findById(req.params.id, function(err, doc){
    if(err) {
      res.status(404).end();
    }
    else{
      res.send(doc);
    }
  });
});

app.post('/getPostsAmount', (req, res) =>{
  Post.find(posts.postsModel.setFilters(req.body),(err, docs) => {
    if(err) {
      res.status(404).end();
    } else {
      res.send({ 'amount': docs.length});
    }
  });
});

app.post('/getPosts/:skip&:top', (req, res) =>{
  Post.find(posts.postsModel.setFilters(req.body), (err, docs) => {
    if(err) {
      res.status(404).end();
    } else{
      res.send(posts.postsModel.sortByDate(docs.slice(parseInt(req.params.skip), parseInt(req.params.skip) + parseInt(req.params.top))));
    }
  });
});

app.delete('/delPost/:id', (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    if(err) {
      res.status(404).end();
    }
    else {
      post.deleted = true;
      post.save(function (err, updatedPost) {
        if (err){
          res.status(404).end();
        }
        else {
          res.status(200).end();
        }
      });
    }
  });
});



app.put('/editPost/:id', (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    console.log(post);

    if(err) {
      res.status(404).end();
    }
    else {
      post.hashTags = req.body.hashTags;
      post.description = req.body.description;
      post.save(function (err, updatedPost) {
        if (err){
          res.status(404).end();
        }
        else {
          res.status(200).end();
        }
      });
    }
  });

});

app.post('/likePost/:user&:id', (req, res) =>{
  Post.findById(req.params.id, (err, post) => {
    if(err) {
      res.status(404).end();
    }
    else {
      let like = {"type":"", "amount":""};

      let index = post.likes.indexOf(req.params.user);
      if(index > -1){
        post.likes.splice(index, 1);
        like.type = "-o";
      }
      else{
        post.likes.push(req.params.user);
      }
      like.amount = post.likes.length;
      post.save(function (err, updatedPost) {
        if (err){
          res.status(404).end();
        }
        else {
          res.send(like);
        }
      });
    }
  });

});

app.use((req, res) => {
  res.sendFile('error404.html', { root: 'public' });
});

app.listen(5050, () => console.log('Server started listening on 5050'));




