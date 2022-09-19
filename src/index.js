const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const multer = require('multer')
const { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(multer().any())
mongoose.connect("mongodb+srv://plutonium-co:Y7XVLNecywgcT8ky@cluster0.ognlwhp.mongodb.net/group58Database", {

})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))


app.use('/', route)


app.listen(3001, function () {
    console.log('Express app running on port ' + (3001))
});