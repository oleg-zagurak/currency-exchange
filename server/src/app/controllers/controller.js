const request = require('request');

const Currency = require('./../models/model');
const config = require('./../../config/config')

exports.getData = function (req, res) {
    request(
        config.url,
        (err, response, body) => {
            const amount = parseFloat(req.params.amount);
            if (err) return res.status(500).send({ message: err });
            if (amount <= 0 || !amount){
                return res.status(404).send({ message: 'Please enter the amount more then 0' });
            }
            const data = JSON.parse(body)
            res.status(200).json(exchangeToInner(parseData(data), amount));
        }
    )
}

const parseData = function (body) {
    let data = [];
    for (let i = 0; i < body.length; i++) {
        let currency;
        const { ccy, buy } = body[i];
        switch(ccy){
            case "USD":
                currency = 'дол';
            break;
            case "RUR":
                currency = 'руб';
            break;
            case "EUR":
                currency = 'євро';
            break;
            default:
                currency = '';
        }
        if (ccy !== "BTC") {
            data.push(new Currency(ccy, buy, currency));
        }
    }
    return data;
}

const exchangeToInner = function(data, amount){
    const formatter = new Intl.NumberFormat("US");
    data.forEach(element => {
        let buy = parseFloat(element.buy);
        let sum = amount / buy;
        element.sum = formatter.format(sum.toFixed(2));
        element.amount = formatter.format(amount);
    });
    return data;
}