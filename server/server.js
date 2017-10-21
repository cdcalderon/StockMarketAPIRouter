var express = require('express');
var schedule = require('node-schedule');
const axios = require('axios');

var app = express();
const port = process.env.PORT || 4700;

const baseUrl = 'http://localhost:4000';
const baseUrl2 = 'http://localhost:5000';

const baseUdpUrl = 'http://localhost:4600';
const baseHerokuUdpUrl = 'https://enigmatic-waters-56889.herokuapp.com';

const baseStockMarketQuotesWithIndicatorsUrl = 'https://warm-journey-46979.herokuapp.com';
const getAllSymbols = '/api/udf/allsymbols';
const threeArrowSignalsEndpoint = '/api/threearrowsignals';
const gapsSignalsEndpoint = '/api/gapsignals';
const herokuUDFBaseUrl = 'https://enigmatic-waters-56889.herokuapp.com';
//
//
// let symbol = 'aapl';
// let from = '01/01/15';
// let to = '01/01/17';
//
// setTimeout(() => {
//     axios.post(`${baseUrl + gapsSignalsEndpoint}`, {
//         params: {
//             symbol: symbol, from: from, to: to
//         }
//     }).then(function(data) {
//         console.log(`Got: ${data}`);
//     }).catch(function(err){
//         console.log(`Error::  ${err}`);
//     });
// }, 300);


schedule.scheduleJob('*/1 * * * *', function() {
    //let symbol = 'aapl';
    let from = '01/01/14';
    let to = '10/01/17';

    getStockSymbols()
        .then(function(data) {
            let allSymbols =  data;
            console.log(`Got: ${data}`);

                    setTimeout(() => {
                        axios.post(`${baseStockMarketQuotesWithIndicatorsUrl + gapsSignalsEndpoint}`, {
                            params: {
                                symbols: allSymbols.data, from: from, to: to
                            }
                        }).then(function(data) {
                            console.log(`Got: ${data}`);
                        }).catch(function(err){
                            console.log(`Error::  ${err}`);
                        });
                    }, 2000);

    }).catch(function(err){
        console.log(`Error::  ${err}`);
    });

});

let getStockSymbols = () => {
    return axios.get(`${baseHerokuUdpUrl}${getAllSymbols}`);
};

app.listen(port, () => {
    console.log(`Started up at port ${port}`)
});

module.exports = { app };