const bcrypt = require('bcrypt');
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));

//setting up sessions
app.use(
    session({
        secret: 'superSecret', //encrypted data for session
        resave: false, //don’t save anything if nothing has been modified
        saveUninitialized: true, //always create a session for every single user
        cookie: ({
            secure: false,
            maxAge: 60000 * 60 //time the session will be active
        })
    })
);

//setting template engine 
app.set('view engine', 'ejs');

const models = require('./models');

app.get('', (req, res) => {
    res.render('main');
})

app.get('/login', (req, res) => {
    res.render('login');
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.get('/posts/:brew_id', (req, res) => {
    res.render('posts', {user_id: req.session.user.user_id, brew_id: req.params.brew_id});
})

app.get('/logout', (req, res) =>{
    req.session.destroy();
    res.redirect('/login')
})

app.get('/brew_list', (req, res) => {
    if (!req.session.user) {
        res.json({});
        return;
    }
    let user = req.session.user;
    console.log(user);
   
    models.brew_list.findAll({
        where: {
            user_id: user.id
        }
    }).then(breweries => {
        console.log(breweries.length);
        res.json(breweries)
    })
})

app.get('/user_post', (req, res) => {
    if (!req.session.user) {
        res.json({});
        return;
    }
    let user = req.session.user;
    console.log(user);
   
    models.user_post.findAll({
        where: {
            user_id: user.id
        }
    }).then(reviews => {
        console.log(reviews);
        res.json(reviews)
    })
})

app.get('/dashboard', (req, res) => {
    if (!req.session.user) {
        res.redirect('/login');
        return;
    }
    let user = req.session.user;
    console.log(user);
   res.render('dashboard', {username: req.session.user.username})
})

app.post('/register', (req, res) => {
    let { username, email, password } = req.body;

    bcrypt.hash(password, 10, (err, hash) => {
        models.user.create({
            username: username,
            email: email,
            password: hash,
        })
            .catch(err => { "error found: ", err })
            .then((result) => {
                res.json({ success: true });
            })
    });
});

app.post('/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    console.log(req.body);

    models.user.findOne({
        where: { email: email }
    }).then((user) => {
        if (!user) {
            res.json({ error: 'no user found with given email' })
            return;
        }

        bcrypt.compare(password, user.password, (err, match) => {
            if (match) {
                req.session.user = user;
                res.json({ user_id: user.id, success: true })
            } else {
                res.json({ error: 'incorrect password' })
            }
        })
    })
})

app.post('/posts', (req, res) => {
    let user_id = req.session.user.id;
    let brew_id = req.body.brew_id;
    let title = req.body.title;
    let body = req.body.review

    models.user_post.create({
        user_id: user_id,
        brew_id: brew_id,
        title: title,
        body: body
    }).catch(err => { "error found: ", err })
    .then((result) => {
        console.log(result);
        res.json({ success: true });
    })
})

app.post('/visited', (req, res) => {
    let { brew_id, visited } = req.body;
    let user_id = req.session.user.id;
    console.log(user_id);
    console.log(req.body);
    models.brew_list.create({
        user_id: user_id,
        brew_id: brew_id,
        visited: true
    }).then(result => {
        res.json(result)
    })
})


app.listen(3000, function () {
    console.log('app is now listening on port 3000...');
});
