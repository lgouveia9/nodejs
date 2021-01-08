var express = require('express');
var router = express.Router();
var path = require('path');

router.get('*', (req, res, next) => {
    if(req.originalUrl.includes('jetfiles')){
        let file = req.originalUrl.split('jetfiles')[1];
        res.sendFile(path.join(__dirname, "/public/jetfiles", file));
    }else{
        next();
    }
})

router.get('/*/p', (req, res) => {
    res.sendFile(path.join(__dirname + "/public/", req.hostname.replace('www.', '').split(".")[0], "/detalhes.html"));
});

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname ,"/public/", req.hostname.replace('www.', '').split(".")[0], "/index.html"));
})

router.get('/*', function(req, res) {
    let file = req.originalUrl.replace(req.hostname);
    res.sendFile(path.join(__dirname ,"/public/", req.hostname.replace('www.', '').split(".")[0], file));
})

module.exports = router;