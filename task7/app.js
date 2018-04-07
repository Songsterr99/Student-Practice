const express = require('express');

const app = express();
app.use('/public', express.static('public'));

app.listen(5050, () => console.log('Server started listening on 5050'));
