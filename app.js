
// Library
const prompt = require('prompt');
const req = require('request');

// 
// Start the prompt 
// 
prompt.start();

console.log("Para Birimi Giriniz (usd,eur) vb. ");

prompt.get(['currency'], (err, result) => {

    req('https://api.doviz.com/list/C', (error, response, body) => {

            body = JSON.parse(body);

            let getData = 0;
            let getDatas = () => {

                if( getData != body.value.length )
                {
                    if( body.value[getData].key === result.currency.toUpperCase() )
                    {
                        console.log("Time:" + body.time);
                        console.log(body.value[getData].adi);
                        console.log("Buy ==> " + body.value[getData].alis);
                        console.log("Sales ==> " + body.value[getData].satis);
                    }
                    getData++;
                    getDatas();
                }

            };
            getDatas();

    });    

});