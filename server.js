
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = '*****************';

var port = process.env.PORT || 8080;

Olivia = {
		//"b": [14371.61,0.0343],
		"b": [0,0],
		"e1": [466.02,1.0571],
		"e2" : [1214.64,0.4548003],
		"l": [129.04,1.1392]
		}
console.log(Olivia["b"][0])


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {user: 'Enter Name', btc_price: null, eth_price: null, table: null, error: null});
})

app.post('/', function (req, res) {
  let user_name = req.body.user;
  var options_btc = {
  url: `https://api.gdax.com/products/BTC-USD/ticker`,
  headers: {
    'User-Agent': 'request'
  }
};
  var options_eth = {
  url: `https://api.gdax.com/products/ETH-USD/ticker`,
  headers: {
    'User-Agent': 'request'
  }
};

  var options_ltc = {
  url: `https://api.gdax.com/products/LTC-USD/ticker`,
  headers: {
    'User-Agent': 'request'
  }
};
  
  request(options_btc, function (err, response, body) {
	  var btc = JSON.parse(body);
	request(options_eth, function (err, response, body) {
		var eth = JSON.parse(body);
	request(options_ltc, function (err, response, body) {
		var ltc = JSON.parse(body);
	  if(err){
      res.render('index', {user: user_name, btc_price: null, table: null, error: 'Error, please try again'});
    } 
	else {
      if(btc.price == undefined){
        res.render('index', {user: user_name, table: null, error: 'Error, please try again'});
      } 
	  else {
		 if(user_name == "Olivia" || user_name == "olivia"){
			let weatherText = `Bitcoin's last trade price was ${btc.price}!`;
			res.render('index', {
				user: user_name, 
				btc_price: Math.round(btc.price * 100) / 100, 
				eth_price: Math.round(eth.price * 100) / 100, 
				ltc_price: Math.round(ltc.price * 100) / 100, 
				btc_diff: Math.round((btc.price-Olivia["b"][0])*Olivia["b"][1])*100/100, 
				eth_diff: Math.round((eth.price-Olivia["e1"][0])*Olivia["e1"][1]+(eth.price-Olivia["e2"][0])*Olivia["e2"][1])*100/100, 
				ltc_diff: Math.round((ltc.price-Olivia["l"][0])*Olivia["l"][1])*100/100,
				total: Math.round((btc.price-Olivia["b"][0])*Olivia["b"][1] + (eth.price-Olivia["e1"][0])*Olivia["e1"][1] + (eth.price-Olivia["e2"][0])*Olivia["e2"][1] + (ltc.price-Olivia["l"][0])*Olivia["l"][1])*100/100,
				table: "A", error: null
				});
			}
		 else if(user_name == "Alex"){ 
			let weatherText = `Bitcoin's last trade price was ${btc.price}!`;
			res.render('index', {user: user_name, btc_price: btc.price, table: "A", error: null});
			}
		else{
			res.render('index', {user: 'Enter Name', btc_price: null, table: null, error: 'Error, please try again'});
		}
		
      }
    }
  });
  });
  });
})

app.listen(port, function() {
	console.log('Our app is running on http://localhost:' + port);
});

//app.listen(3000, function () {
//  console.log('Example app listening on port 3000!')
//})