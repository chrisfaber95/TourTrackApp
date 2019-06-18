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

const database = new Datastore('users.db');
database.loadDatabase();

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
   const  email  =  req.body.email;
    const  password  =  req.body.password;
    findUserByEmail(email, (err, user)=>{
        if (err) return  res.status(500).send('Server error!');
        if (!user) return  res.status(404).send('User not found!');
        const  result  =  bcrypt.compareSync(password, user.password);
        if(!result) return  res.status(401).send('Password not valid!');

        const  expiresIn  =  24  *  60  *  60;
        const  accessToken  =  jwt.sign({ id:  user.id }, SECRET_KEY, {
            expiresIn:  expiresIn
        });
        res.status(200).send({ "user":  user,email, "access_token":  accessToken, "expires_in":  expiresIn});
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


const  findUserByEmail  = (email) => {
    database.findOne({email: email }, function(err,doc){
		return doc;
    });
}

const  createUser  = (user, cb) => {
   const newUser = {
	   name: user.name,
	   email: user.email,
	   password: user.password,
	   date: new Date()
   }

	database.insert(doc, function (err, newDoc){
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
