const express = require('express');
const app = express();
const fs = require("fs");
const bodyParser = require('body-parser');
const posts = require("./public/assets/js/script.js");
const jsonFile = "server/data/posts.json";




app.use(bodyParser.json());
app.use(express.static('public'), express.static('public'));


app.post('/add', (req, res) => {
  let post = req.body;
  post.createdAt = new Date();
  post.deleted = false;
  let allPosts = JSON.parse(fs.readFileSync(jsonFile));
  if (posts.photoPosts.loadNewPost(allPosts, post)) {
    fs.writeFile(jsonFile, JSON.stringify(allPosts), function (error) {
      if (error){
        throw error;
      }
    });
    res.status(200).end();
  }
  else {
    res.status(404).end();
  }
});

app.get('/getPost/:id', (req, res) => {
  let allPosts = JSON.parse(fs.readFileSync(jsonFile));
  let photoPost = posts.photoPosts.getPhotoPost( allPosts, req.params.id);
  if(photoPost && !photoPost.deleted){
    res.send(photoPost);
  }
  else{
    res.status(404).end();
  }
});


app.delete('/delPost/:id', (req, res) => {
  let allPosts = JSON.parse(fs.readFileSync(jsonFile));
  if (posts.photoPosts.removePhotoPost(allPosts, req.params.id)) {
    fs.writeFile(jsonFile, JSON.stringify(allPosts), function (error) {
      if (error) {
        throw error;
      }
    });
    res.status(200).end()
  } else {
    res.status(404).end();
  }
});

app.put('/editPost/:id', (req, res) => {
  let allPosts = JSON.parse(fs.readFileSync(jsonFile));
  if ( posts.photoPosts.editPhotoPost(allPosts, req.params.id, req.body)) {
    fs.writeFile(jsonFile, JSON.stringify(allPosts), function (error) {
      if (error) {
        throw error;
      }
    });
    res.status(200).end();
  } else {
    res.status(404).end();
  }

});



app.use((req, res) => {
  res.sendFile('error404.html', { root: 'public' });
});

app.listen(5050, () => console.log('Server started listening on 5050'));
