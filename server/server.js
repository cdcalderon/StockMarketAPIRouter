var express = require('express');
var schedule = require('node-schedule');
const axios = require('axios');

var app = express();
const port = process.env.PORT || 4500;

const earningUrl = 'http://localhost:4000/threearrowsignals';

schedule.scheduleJob('*/1 * * * *', function() {
    //let symbol = 'aapl';
    let from = '01/01/16';
    let to = '01/01/17';

    for(let symbol of getStockSymbols()) {

        setTimeout(() => {
            axios.get(earningUrl, {
                params: {
                    symbol: symbol, from: from, to: to
                }
            }).then(function(data) {
                console.log(`Got: ${data}`);
            }).catch(function(err){
                console.log(`Error::  ${err}`);
            });
        }, 200);

    }

});

let getStockSymbols = () => {
  return ['aapl', 'msft', 'amzn', 'pnra', 'pcln'];
};

app.listen(port, () => {
    console.log(`Started up at port ${port}`)
});



module.exports = { app };