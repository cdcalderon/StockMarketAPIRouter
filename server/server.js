var express = require('express');
var schedule = require('node-schedule');
const axios = require('axios');

var app = express();
const port = process.env.PORT || 4700;

const baseUrl = 'http://localhost:4000';
const baseUdpUrl = 'http://localhost:4600';
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
    let from = '01/01/16';
    let to = '01/01/17';

//     setTimeout(() => {
//         // let stock = {
//         //     symbol:'test1',
//         //     name: 'test',
//         //     lastSale: 'test',
//         //     marketCap: 'test',
//         //     ipoYear: 'test',
//         //     sector: 'test',
//         //     industry: 'test',
//         //     summaryQuoteUrl: 'test',
//         //     exchange: 'test'
//         // };
//
//
//         let stocks = [{
//             symbol: 'test2',
//             name: 'test',
//             lastSale: 'test',
//             marketCap: 'test',
//             ipoYear: 'test',
//             sector: 'test',
//             industry: 'test',
//             summaryQuoteUrl: 'test',
//             exchange: 'test'
//         },
//             stock = {
//                 symbol: 'test3',
//                 name: 'test',
//                 lastSale: 'test',
//                 marketCap: 'test',
//                 ipoYear: 'test',
//                 sector: 'test',
//                 industry: 'test',
//                 summaryQuoteUrl: 'test',
//                 exchange: 'test'
//             }
//             ];
// // https://enigmatic-waters-56889.herokuapp.com
//         // http://localhost:4600
//             axios.post(`http://localhost:4600/api/udf/updatestocksingleheroku` , {
//                     params: stocks
//                 }).then(function(data) {
//                     console.log(`Got: ${data}`);
//                 }).catch(function(err){
//                     console.log(`Error::  ${err}`);
//                 });
//             }, 200);

    getStockSymbols()
        .then(function(data) {
            let allSymbols =  data;
            console.log(`Got: ${data}`);

                setTimeout(() => {
                        axios.post(`${baseStockMarketQuotesWithIndicatorsUrl + threeArrowSignalsEndpoint}`, {
                            params: {
                                symbols: allSymbols.data, from: from, to: to
                            }
                        }).then(function(data) {
                            console.log(`Got: ${data}`);
                        }).catch(function(err){
                            console.log(`Error::  ${err}`);
                        });
                    }, 1000);

                    // setTimeout(() => {
                    //     axios.post(`${baseUrl + gapsSignalsEndpoint}`, {
                    //         params: {
                    //             symbols: allSymbols, from: from, to: to
                    //         }
                    //     }).then(function(data) {
                    //         console.log(`Got: ${data}`);
                    //     }).catch(function(err){
                    //         console.log(`Error::  ${err}`);
                    //     });
                    // }, 2000);


            // let symbolChunks = _.chunk(allSymbols, 100);
            //
            //
            // let generatedThreeArrowSymbolChunks = genSymbols(symbolChunks);
            // let threeArrowChunk = generatedThreeArrowSymbolChunks.next();
            //
            // let intervalThreeArrowsId = setInterval(() => {
            //     axios.post(`${baseUrl + threeArrowSignalsEndpoint}`, {
            //         params: {
            //             symbols: threeArrowChunk.value, from: from, to: to
            //         }
            //     }).then(function(data) {
            //         console.log(`Got: ${data}`);
            //     }).catch(function(err){
            //         console.log(`Error::  ${err}`);
            //     });
            //
            //     threeArrowChunk = generatedThreeArrowSymbolChunks.next();
            //
            //     if(threeArrowChunk.done === true){
            //         clearInterval(intervalThreeArrowsId);
            //         console.log("Done with Three Arrow Signals");
            //     }
            //
            // },1000);
            //
            //
            // let generatedGapSymbolChunks = genSymbols(symbolChunks);
            // let gapChunk = generatedGapSymbolChunks.next();
            //
            // let intervalGapId = setInterval(() => {
            //     axios.post(`${baseUrl + gapsSignalsEndpoint}`, {
            //         params: {
            //             symbols: gapChunk.value, from: from, to: to
            //         }
            //     }).then(function(data) {
            //         console.log(`Got: ${data}`);
            //     }).catch(function(err){
            //         console.log(`Error::  ${err}`);
            //     });
            //
            //     gapChunk = generatedGapSymbolChunks.next();
            //
            //     if(gapChunk.done === true){
            //         clearInterval(intervalGapId);
            //         console.log("Done with Three Arrow Signals");
            //     }
            //
            // },2500);






            //
            // for(let symbol of allSymbols) {
            //
            //     setTimeout(() => {
            //         axios.post(`${baseUrl + threeArrowSignalsEndpoint}`, {
            //             params: {
            //                 symbol: symbol, from: from, to: to
            //             }
            //         }).then(function(data) {
            //             console.log(`Got: ${data}`);
            //         }).catch(function(err){
            //             console.log(`Error::  ${err}`);
            //         });
            //     }, 1000);
            //
            //     setTimeout(() => {
            //         axios.post(`${baseUrl + gapsSignalsEndpoint}`, {
            //             params: {
            //                 symbol: symbol, from: from, to: to
            //             }
            //         }).then(function(data) {
            //             console.log(`Got: ${data}`);
            //         }).catch(function(err){
            //             console.log(`Error::  ${err}`);
            //         });
            //     }, 2000);
            //
            // }

    }).catch(function(err){
        console.log(`Error::  ${err}`);
    });

});

function *genSymbols(array) {
    for (let i = 0; i < array.length; i++) {
        yield array[i];
    }
}

let getStockSymbols = () => {

    return axios.get(`${baseUdpUrl}${getAllSymbols}`);


  //return ['aapl', 'msft', 'amzn', 'pnra', 'pcln'];
};

app.listen(port, () => {
    console.log(`Started up at port ${port}`)
});

module.exports = { app };