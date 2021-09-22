const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const Profile = require('./models/profile');
const blogRoutes = require('./routes/blogRoutes');
const port = process.env.PORT || 3000;
const env = require('dotenv').config();

//db string
const dbUrl = process.env.dbUrl;

mongoose.connect(dbUrl,{useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => {
    console.log('Connected to MongoDB');
    app.listen(port);
})
.catch((err) => {
    console.log(err);
});

//middlewares
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))
app.use(require('body-parser').json());

// enable CORS without external module
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/', (req, res) => {

    res.redirect('/blogs');
    
});
app.use('/blogs',blogRoutes);
app.get('/about', (req, res) => {
    res.render('about',{title:"About"});
});

app.get('/data', (req, res) => {
    Profile.find().sort({createdAt: -1})
    .then(profile => {
        res.status(200).send({
            success: true,
            data: profile 
        });
    })
    .catch(err=>{
        res.status(500).send({
            error: err,
        });
    })
});

app.post('/data',(req,res) => {
    const profile = new Profile(req.body);

    profile.save()
    .then((result)=>{
        res.status(201).send({
            success: true,
            data: result,
            message: 'Message sent successfully'
        });
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).send({
            error: err
        })
    });
})

app.use((req, res) => {
    res.status(404).render('404',{title:"404"});
});

