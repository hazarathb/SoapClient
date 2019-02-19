const fs = require('fs');
const MFOrderClient = require('./MFOrderClient.js');

//const json = fs.readFileSync('../SoapClient/json/Order-Entry-Param.json', 'utf-8');

//const json = fs.readFileSync('../SoapClient/json/Order-Entry.json', 'utf-8');

//const json = fs.readFileSync('../SoapClient/json/Sip-Order-Entry-Param.json', 'utf-8');
//const json = fs.readFileSync('../SoapClient/json/Sip-Orde-rEntry.json', 'utf-8');
//const json = fs.readFileSync('../SoapClient/json/Xsip-Order-Entry-Param.json', 'utf-8');

//const json = fs.readFileSync('../SoapClient/json/Spread-Order-Entry-Param.json', 'utf-8');

//const json = fs.readFileSync('../SoapClient/json/Spread-Order-Entry.json', 'utf-8');

const json = fs.readFileSync('../SoapClient/json/Switch-Order-Entry-Param.json', 'utf-8');


MFOrderClient.switchOrderEntryParam(json).then((result) => {
	console.log(result);
}).catch(function(err) {
    console.log(result);  
});

