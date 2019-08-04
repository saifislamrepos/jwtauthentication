const jwt = require("../webtoken.js");
const models = require('../model');
const mongoose = require('mongoose');
exports.signin = function signin(req, res, next) {
    console.log(req.body)
    async function getl(){
        const d = await getlist(); 
        return d
    };
    getl().then((users) => {
        const { username, password } = req.body;
        let user = users.find(function(element) {
            return element.username == username;
        });
        if (typeof user == "undefined" || user.password != password) {
            console.log("user not present in db")
            return res.status(401).end();
        }
        const token = jwt.sign(
            { username },
            {
            issuer: "saif.islam",
            subject:  username,
            audience:  user.id
        });
        const cookies = {
            "token" : token,
            "userid":user.id
        }
        res.json(cookies);
        /* res.cookie('token', token, { maxAge: 24*60*60 * 1000 })
        res.cookie('user', username, { maxAge: 24*60*60 * 1000 })
        res.cookie('userid',  user.id, { maxAge: 24*60*60 * 1000 })
         */
        res.end()
    });
}
exports.verify = function signin(req, res, next) {
    //var username = req.body.username;
    const token = req.body.token;
    const userid = req.body.userid;
    const vtoken = jwt.verify(
        token,
        {
        issuer: "saif.islam",
        audience:  userid
    });
    if(!vtoken) {
        console.log("token not verified")
        return res.status(401).end();
    }
    console.log("suc")
    res.status(200).send(vtoken.sub).end();
}
exports.createadmin = function _createadmin(req, res, next) {
    const adminmodel = models.adminmodel;
    const data = {
        id: 0,
        username: req.body.username,
        password: req.body.password
    }
    data.id = data.username+'_admin';
    let newobj = new adminmodel(data);
    let error = newobj.validateSync();
    if (error) {
        console.log("some error occured in counting database");
        return next(error);
    } 
    adminmodel.find({
        'username': req.body.name,
        'id': data.id
    }, function (err, doc) {
        if (err) {
            console.log("some error occured in creating database")
            return next(new Error('some error occured in creating database'));
        }
        if (doc.length) {
            console.log("document already exists");
            return next(new Error('User Already Exists'));
        } else {
            newobj.save(function (err, newobj) {
                if (err) {
                    console.error(err);
                    return next(err)
                }
                console.log(data,"document created succesfully");
                res.send('sucesss');
            });
        }
    });
}
const getlist = function _getlist(req, res, next) {
    let resp = {}
    if (mongoose.connection.readyState != 1) {
        throw new Error('mongodb not connected');
        return
    }
    return new Promise(resolve => {
        models['adminmodel'].find((err, doc) => {
            console.log('find')
            if (err) {
                next(err)
            }
            console.log(doc.length + ' admins found');
            resolve(doc);
        });
    })
}