
// Library
const prompt = require('prompt');
const req = require('request');

// 
// Start the prompt 
// 
prompt.start();

console.log("Type 1 for currency information.");
console.log("Type 2 to calculate the currency.");

prompt.get(['status'], (err, result) => {

    if( result.status === '1' )
    {
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
    }
    else
    {
        console.log("The calculations are made in Turkish Lira currency.");

        prompt.get(['amount','currency'], (err, result) => {

            req('https://api.doviz.com/list/C', (error, response, body) => {
    
                body = JSON.parse(body);

                let currencyCalculator = 0;
                let currencyCalculators = () => {

                    if( currencyCalculator != body.value.length )
                    {
                        if( body.value[currencyCalculator].key === result.currency.toUpperCase() )
                        {
                            console.log(body.value[currencyCalculator].adi + " / TL  ");
                            console.log( body.value[currencyCalculator].satis * result.amount + " TL" );
                        }
                        currencyCalculator++;
                        currencyCalculators();
                    }

                };
                currencyCalculators();


            });

        });        
    }

});