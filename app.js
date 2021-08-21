const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api',(req, res) => {
    res.json({
        message: 'Welcome to api'
    });
});

app.post('/api/post', verifyToken ,(req, res) => {
    
    jwt.verify(req.token, 'secretkey', (err, authData) => {
     if(err){
         res.sendStatus(403);
     }else{
        res.json({
            message:'post created..',
            authData
        });
     
    }
    });
    
    
});

app.post('/api/login',(req, res) => {
    //mock user
    const user = {
        id:1,
        username:'abdul',
        password:'abdul@gmail.com'
    }
    jwt.sign({user}, 'secretkey', (err, token)=>{
        if(err){
            res.sendStatus(403);
        }else{
        res.json({
           token
        });
    }
    });
});

//format of token....authorization : Bearer <access_token>


//verifyToken

function verifyToken(req, res , next) {
    //get auth header value
    const bearerHeader = req.headers['authorization'];
    //check if beareris undefined
    if(typeof bearerHeader !== 'undefined'){
        //split the token
      const bearer = bearerHeader.split('');
       //get token from array
       const bearertoken = bearer[1];
       //set the verifyToken
       req.token = bearertoken;
       //next middelware
       next();
    }else{
        res.sendStatus(403);
    }

}









app.listen(5000, ()=> console.log('server started on server on 5000'));


