var express = require('express');
var router = express.Router();
var path = require('path');
var base64 = require('base-64');
var fs = require('fs');
const axios = require('axios');

router.use('/api', async (req, res, next) => {
    
    var empresa = req.hostname.replace('www.', '').split(".")[0];
    var configFile = require(path.join(__dirname ,"/public/", empresa, "/config.json"));
    var microServiceName = req.body.microService;
    var microServiceIndex = configFile.MicroService.findIndex(service => service.MicroServices == microServiceName);
    var microService = configFile.MicroService[microServiceIndex];

    console.log(global["token" + microServiceName + configFile.Config.IdEmpresa])
    if(global["token" + microServiceName + configFile.Config.IdEmpresa] == undefined || global["token" + microServiceName + configFile.Config.IdEmpresa].expirationDate < new Date()){
        try {
            var body = {
                "userName": base64.encode(microService.UserName),
                "password": base64.encode(microService.Password),
                "storeID": base64.encode(configFile.Config.IdEmpresa)
            }
            const response = await axios.post(microService.Url + "/api/v1/auth", body);
            console.log(new Date(new Date().getTime() + ((parseInt(response.data.expires_in) - 5) * 1000)).toLocaleString("pt-BR", {timeZone: "America/Sao_Paulo"}));
            var token = {
                access_token: response.data.access_token,
                expirationDate: new Date(new Date().getTime() + ((parseInt(response.data.expires_in) - 5) * 1000))
            }
            global["token" + microServiceName + configFile.Config.IdEmpresa] = token;
        } catch (error) {
            return res.status(400).json({
                error: error
            })
        }
    }

    var access_token = global["token" + microServiceName + configFile.Config.IdEmpresa].access_token;
    axios({
        method: req.body.method,
        url: microService.Url + "/" + req.body.path,
        data: req.body.json,
        headers: {
            "Authorization": "Bearer " + access_token
        }
    })
    .then(function (responseApi) {
        res.status(200).json(responseApi.data)
    })
    .catch(function (error) {
        res.status(400).json({
            error: error
        })
    });
});

module.exports = router;