const express = require('express');
const app = express();
const  router  =  express.Router();
const Datastore = require('nedb');

const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended:  false }));
router.use(bodyParser.json());
const fs = require("fs");

const  jwt  =  require('jsonwebtoken');
const  bcrypt  =  require('bcryptjs'); 

const SECRET_KEY = "secretkey23456";

const users = new Datastore('users.db');
const visited = new Datastore('visited.db');
const destinations = new Datastore('destinations.db');
users.loadDatabase();
visited.loadDatabase();
destinations.loadDatabase();

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(express.static('public'));


router.get('/', (req, res) => {
    res.status(200).send('This is an authentication server');
});

router.post('/login', (req, res) => {
	console.log(req.body);
   const  email  =  req.body.email;
    const  password  =  req.body.password;
	users.findOne({email: email }, function(err,doc){
		if (err) return  res.status(500).send('Server error!');  
		const  expiresIn  =  24  *  60  *  60;
		const  accessToken  =  jwt.sign({ id:  doc.id }, SECRET_KEY, {
			expiresIn:  expiresIn
		});
		res.status(200).send({ "user":  doc.email, "access_token":  accessToken, "expires_in":  expiresIn          
		});
    });
});

router.post('/register', (req, res) => {

    const  name  =  req.body.name;
    const  email  =  req.body.email;
    const  password  =  bcrypt.hashSync(req.body.password);

    createUser([name, email, password], (err)=>{
        if(err) return  res.status(500).send("Server error!");
        findUserByEmail(email, (err, user)=>{
            if (err) return  res.status(500).send('Server error!');  
            const  expiresIn  =  24  *  60  *  60;
            const  accessToken  =  jwt.sign({ id:  user.id }, SECRET_KEY, {
                expiresIn:  expiresIn
            });
            res.status(200).send({ "user":  user.email, "access_token":  accessToken, "expires_in":  expiresIn          
            });
        });
    });
});

router.get('/firstUser', (req, res) => {
	const  name  =  'Chris';
    const  email  =  'user@email.com';
    const  password  =  bcrypt.hashSync('password');
    createUser([name, email, password], (err)=>{
        if(err) return  res.status(500).send("Server error!");
    });
});


router.get('/getvisited', (req, res) => {
	visited.find({}, function (err, docs){
		res.status(200).send({ 
			"docs":  docs      
		});
	});
});


router.post('/addvisited', (req, res) => {
	const doc = { 	name: req.body.name,
				    lat: req.body.lat,
				    lon: req.body.lon,
				    date: req.body.date
				   }

	visited.insert(doc, function (err, newDoc) {   // Callback is optional
		res.status(200).send({ 
			newDoc 
		});
	});
});


const  findUserByEmail  = (email) => {
    users.findOne({email: email }, function(err,doc){
		const user = doc;
    });
	return user;
}

const  createUser  = (user, cb) => {
   const newUser = {
	   name: user[0],
	   email: user[1],
	   password: user[2],
	   date: new Date()
   }

	users.insert(newUser, function (err, newDoc){
		console.log(newDoc);
	});
	return newDoc;
}



app.use(router);
const  port  =  process.env.PORT  ||  3000;
const  server  =  app.listen(port, () => {
    console.log('Server listening at http://localhost:'  +  port);
}); 

//app.listen(3000, () => console.log('listening at port 3000'));
