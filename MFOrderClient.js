const bseSoapClient = require('./bseSoapClient.js');
const fs = require('fs');
const xml2Json = require('xml2json');
var xml2js = require('xml2js');


async function getPassword(json) {

	let xml = fs.readFileSync('../SoapClient/xml/bse-login.xml', 'utf-8');
	let pos = xml.indexOf("<bses:getPassword");
	let xmlstart = xml.substring(0, pos);
	const loginRequest = xml2Json.toJson(xml, { object: true, alternateTextNode: true });
	let getPassword = loginRequest['soap:Envelope']['soap:Body']['bses:getPassword'];
	Object.keys(getPassword).forEach(function (key) {
		getPassword[key] = json[key.split(":")[1]];
	});
	const builder = new xml2js.Builder();
	let xmlResult = builder.buildObject(loginRequest);
	let index = xmlResult.indexOf("<bses:getPassword");
	xmlResult = xmlResult.substring(index);
	xmlResult = xmlstart.concat(xmlResult)
	let response = await bseSoapClient.makeMFOrderRequest(xmlResult);
	const loginresponse = xml2Json.toJson(response, { object: true });
	return loginresponse['s:Envelope']['s:Body']['getPasswordResponse']['getPasswordResult'].split("|")[1];
}
var MFOrderClient = {

	OrderEntry: async function (json) {
		let jsonObject = JSON.parse(json)
		const uniqueReference = Math.floor(Math.random() * 9000000000) + 1000000000;
		let xml = fs.readFileSync('../SoapClient/xml/Order-Entry.xml', 'utf-8');
		let pos = xml.indexOf("<bses:OrderEntry");
		let xmlstart = xml.substring(0, pos);
		const OrderEntryRequest = xml2Json.toJson(xml, { object: true, alternateTextNode: true });
		let OrderEntry = OrderEntryRequest['soap:Envelope']['soap:Body']['bses:OrderEntry']['bses:data'];

		var loginjson = { "Password": "", "UserId": "", "PassKey": "" };
		loginjson.Password = jsonObject['Password'];
		loginjson.UserId = jsonObject['UserId'];
		loginjson.PassKey = jsonObject['PassKey'];
		console.log(loginjson);
		const passwordkey = await getPassword(loginjson);

		Object.keys(OrderEntry).forEach(function (key) {
			let jsonkey = key.split(":")[1];
			if (jsonkey === 'Password') {
				OrderEntry[key] = passwordkey;
			} else if (jsonkey === 'TransNo') {
				OrderEntry[key] = uniqueReference;
			} else {
				OrderEntry[key] = jsonObject[key.split(":")[1]];
			}
		});

		const builder = new xml2js.Builder();
		let xmlResult = builder.buildObject(OrderEntryRequest);
		let index = xmlResult.indexOf("<bses:OrderEntry");
		xmlResult = xmlResult.substring(index);
		xmlResult = xmlstart.concat(xmlResult);
		let response = await bseSoapClient.makeMFOrderRequest(xmlResult);
		const orderEntryResponse = xml2Json.toJson(response, { object: true });
		return orderEntryResponse['s:Envelope']['s:Body']['OrderEntryResponse']['OrderEntryResult'];
	},

	OrderEntryParam: async function (json) {
		let jsonObject = JSON.parse(json)
		const uniqueReference = Math.floor(Math.random() * 9000000000) + 1000000000;
		const xml = fs.readFileSync('../SoapClient/xml/Order-Entry-Param.xml', 'utf-8');
		let pos = xml.indexOf("<bses:orderEntryParam");
		let xmlstart = xml.substring(0, pos);
		const orderEntryParamRequest = xml2Json.toJson(xml, { object: true, alternateTextNode: true });
		let orderEntryParam = orderEntryParamRequest['soap:Envelope']['soap:Body']['bses:orderEntryParam'];

		var loginjson = { "Password": "", "UserId": "", "PassKey": "" };
		loginjson.Password = jsonObject['Password'];
		loginjson.UserId = jsonObject['UserId'];
		loginjson.PassKey = jsonObject['PassKey'];
		console.log(loginjson);
		const passwordkey = await getPassword(loginjson);

		Object.keys(orderEntryParam).forEach(function (key) {
			let jsonkey = key.split(":")[1];
			if (jsonkey === 'Password') {
				orderEntryParam[key] = passwordkey;
			} else if (jsonkey === 'TransNo') {
				orderEntryParam[key] = uniqueReference;
			} else {
				orderEntryParam[key] = jsonObject[key.split(":")[1]];
			}
		});
		const builder = new xml2js.Builder();
		let xmlResult = builder.buildObject(orderEntryParamRequest);
		let index = xmlResult.indexOf("<bses:orderEntryParam");
		xmlResult = xmlResult.substring(index);
		xmlResult = xmlstart.concat(xmlResult);

		let response = await bseSoapClient.makeMFOrderRequest(xmlResult);
		console.log(response);
		const orderEntryParamResponse = xml2Json.toJson(response, { object: true });
		return orderEntryParamResponse['s:Envelope']['s:Body']['orderEntryParamResponse']['orderEntryParamResult'];
	},

	sipOrderEntry: async function (json) {

		let jsonObject = JSON.parse(json)
		const uniqueReference = Math.floor(Math.random() * 9000000000) + 1000000000;
		const xml = fs.readFileSync('../SoapClient/xml/Sip-Orde-rEntry.xml', 'utf-8');
		let pos = xml.indexOf("<bses:sipOrderEntry");
		let xmlstart = xml.substring(0, pos);
		const sipOrderEntryReq = xml2Json.toJson(xml, { object: true, alternateTextNode: true });
		let sipOrderEntry = sipOrderEntryReq['soap:Envelope']['soap:Body']['bses:sipOrderEntry']['bses:data'];

		var loginjson = { "Password": "", "UserId": "", "PassKey": "" };
		loginjson.Password = jsonObject['Password'];
		loginjson.UserId = jsonObject['UserID'];
		loginjson.PassKey = jsonObject['PassKey'];
		console.log(loginjson);
		const passwordkey = await getPassword(loginjson);

		Object.keys(sipOrderEntry).forEach(function (key) {
			let jsonkey = key.split(":")[1];
			if (jsonkey === 'Password') {
				sipOrderEntry[key] = passwordkey;
			} else if (jsonkey === 'UniqueRefNo') {
				sipOrderEntry[key] = uniqueReference;
			} else {
				sipOrderEntry[key] = jsonObject[key.split(":")[1]];
			}
		});

		const builder = new xml2js.Builder();
		let xmlResult = builder.buildObject(sipOrderEntryReq);
		let index = xmlResult.indexOf("<bses:sipOrderEntry");
		xmlResult = xmlResult.substring(index);
		xmlResult = xmlstart.concat(xmlResult);
		//console.log(xmlResult);
		let response = await bseSoapClient.makeMFOrderRequest(xmlResult);
		const sipOrderEntryResponse = xml2Json.toJson(response, { object: true });
		return sipOrderEntryResponse['s:Envelope']['s:Body'];
	},

	sipOrderEntryParam: async function (json) {

		let jsonObject = JSON.parse(json)
		console.log(jsonObject);

		const uniqueReference = Math.floor(Math.random() * 9000000000) + 1000000000;
		const xml = fs.readFileSync('../SoapClient/xml/Sip-Order-Entry-Param.xml', 'utf-8');
		let pos = xml.indexOf("<bses:sipOrderEntryParam");
		let xmlstart = xml.substring(0, pos);
		const sipOrderEntryParamReq = xml2Json.toJson(xml, { object: true, alternateTextNode: true });
		let sipOrderEntryParam = sipOrderEntryParamReq['soap:Envelope']['soap:Body']['bses:sipOrderEntryParam'];

		var loginjson = { "Password": "", "UserId": "", "PassKey": "" };
		loginjson.Password = jsonObject['Password'];
		loginjson.UserId = jsonObject['UserID'];
		loginjson.PassKey = jsonObject['PassKey'];
		console.log(loginjson);
		const passwordkey = await getPassword(loginjson);

		Object.keys(sipOrderEntryParam).forEach(function (key) {
			let jsonkey = key.split(":")[1];
			if (jsonkey === 'Password') {
				sipOrderEntryParam[key] = passwordkey;
			} else if (jsonkey === 'TransNo') {
				sipOrderEntryParam[key] = uniqueReference;
			}else if (jsonkey === 'UniqueRefNo')	{
				sipOrderEntryParam[key] = uniqueReference;
			} else {
				sipOrderEntryParam[key] = jsonObject[key.split(":")[1]];
			}
		});
	

		const builder = new xml2js.Builder();
		let xmlResult = builder.buildObject(sipOrderEntryParamReq);
		let index = xmlResult.indexOf("<bses:sipOrderEntryParam");
		xmlResult = xmlResult.substring(index);
		xmlResult = xmlstart.concat(xmlResult);
		//console.log(xmlResult);
		let response = await bseSoapClient.makeMFOrderRequest(xmlResult);
		const sipOrderEntryParamResponse = xml2Json.toJson(response, { object: true });
		return sipOrderEntryParamResponse['s:Envelope']['s:Body'];
	},

	spreadOrderEntry: async function (json) {

		let jsonObject = JSON.parse(json)
		const uniqueReference = Math.floor(Math.random() * 9000000000) + 1000000000;
		const xml = fs.readFileSync('../SoapClient/xml/Spread-Order-Entry.xml', 'utf-8');
		let pos = xml.indexOf("<bses:spreadOrderEntry");
		let xmlstart = xml.substring(0, pos);
		const spreadOrderEntryReq = xml2Json.toJson(xml, { object: true, alternateTextNode: true });
		let spreadOrderEntry = spreadOrderEntryReq['soap:Envelope']['soap:Body']['bses:spreadOrderEntry']['bses:data'];

		var loginjson = { "Password": "", "UserId": "", "PassKey": "" };
		loginjson.Password = jsonObject['Password'];
		loginjson.UserId = jsonObject['UserId'];
		loginjson.PassKey = jsonObject['PassKey'];
		console.log(loginjson);
		const passwordkey = await getPassword(loginjson);
		
		Object.keys(spreadOrderEntry).forEach(function (key) {
			let jsonkey = key.split(":")[1];
			if (jsonkey === 'Password') {
				spreadOrderEntry[key] = passwordkey;
			} else if (jsonkey === 'UniqueRefNo') {
				spreadOrderEntry[key] = uniqueReference;
			} else {
				spreadOrderEntry[key] = jsonObject[key.split(":")[1]];
			}
		});

	
		const builder = new xml2js.Builder();
		let xmlResult = builder.buildObject(spreadOrderEntryReq);
		
		let index = xmlResult.indexOf("<bses:spreadOrderEntry");
		xmlResult = xmlResult.substring(index);
		xmlResult = xmlstart.concat(xmlResult);
		
		let response = await bseSoapClient.makeMFOrderRequest(xmlResult);
		const spreadOrderEntryResponse = xml2Json.toJson(response, { object: true });
		return spreadOrderEntryResponse['s:Envelope']['s:Body'];
	},

	spreadOrderEntryParam: async function (json) {

		let jsonObject = JSON.parse(json)
		const uniqueReference = Math.floor(Math.random() * 9000000000) + 1000000000;
		const xml = fs.readFileSync('../SoapClient/xml/Spread-Order-Entry-Param.xml', 'utf-8');
		let pos = xml.indexOf("<bses:spreadOrderEntryParam");
		let xmlstart = xml.substring(0, pos);
		const spreadOrderEntryParamReq = xml2Json.toJson(xml, { object: true, alternateTextNode: true });
		let spreadOrderEntryParam = spreadOrderEntryParamReq['soap:Envelope']['soap:Body']['bses:spreadOrderEntryParam'];

		var loginjson = { "Password": "", "UserId": "", "PassKey": "" };
		loginjson.Password = jsonObject['Password'];
		loginjson.UserId = jsonObject['UserId'];
		loginjson.PassKey = jsonObject['PassKey'];
		console.log(loginjson);
		const passwordkey = await getPassword(loginjson);

		Object.keys(spreadOrderEntryParam).forEach(function (key) {
			let jsonkey = key.split(":")[1];
			if (jsonkey === 'Password') {
				spreadOrderEntryParam[key] = passwordkey;
			} else if (jsonkey === 'UniqueRefNo') {
				spreadOrderEntryParam[key] = uniqueReference;
			} else {
				spreadOrderEntryParam[key] = jsonObject[key.split(":")[1]];
			}
		});
		const builder = new xml2js.Builder();
		let xmlResult = builder.buildObject(spreadOrderEntryParamReq);
		let index = xmlResult.indexOf("<bses:spreadOrderEntryParam");
		xmlResult = xmlResult.substring(index);
		xmlResult = xmlstart.concat(xmlResult);
		let response = await bseSoapClient.makeMFOrderRequest(xmlResult);
		const spreadOrderEntryParamResponse = xml2Json.toJson(response, { object: true });
		return spreadOrderEntryParamResponse['s:Envelope']['s:Body'];
	},

	switchOrderEntry: async function (json) {

		let jsonObject = JSON.parse(json);
		const uniqueReference = Math.floor(Math.random() * 9000000000) + 1000000000;
		const xml = fs.readFileSync('../SoapClient/xml/Switch-Order-Entry.xml', 'utf-8');
		let pos = xml.indexOf("<bses:switchOrderEntry");
		let xmlstart = xml.substring(0, pos);
		const switchOrderEntryReq = xml2Json.toJson(xml, { object: true, alternateTextNode: true });
		let switchOrderEntry = switchOrderEntryReq['soap:Envelope']['soap:Body']['bses:switchOrderEntry']['bses:data'];

		var loginjson = { "Password": "", "UserId": "", "PassKey": "" };
		loginjson.Password = jsonObject['Password'];
		loginjson.UserId = jsonObject['UserId'];
		loginjson.PassKey = jsonObject['PassKey'];
		console.log(loginjson);
		const passwordkey = await getPassword(loginjson);

		Object.keys(switchOrderEntry).forEach(function (key) {
			let jsonkey = key.split(":")[1];
			if (jsonkey === 'Password') {
				switchOrderEntry[key] = passwordkey;
			} else if (jsonkey === 'TransNo') {
				switchOrderEntry[key] = uniqueReference;
			} else {
				switchOrderEntry[key] = jsonObject[key.split(":")[1]];
			}
		});
		const builder = new xml2js.Builder();
		let xmlResult = builder.buildObject(switchOrderEntryReq);
		let index = xmlResult.indexOf("<bses:switchOrderEntry");
		xmlResult = xmlResult.substring(index);
		xmlResult = xmlstart.concat(xmlResult);
		let response = await bseSoapClient.makeMFOrderRequest(xmlResult);
		const switchOrderEntryResponse = xml2Json.toJson(response, { object: true });
		return switchOrderEntryResponse['s:Envelope']['s:Body'];

	},

	switchOrderEntryParam: async function (json) {

		let jsonObject = JSON.parse(json);
		const uniqueReference = Math.floor(Math.random() * 9000000000) + 1000000000;
		const xml = fs.readFileSync('../SoapClient/xml/Switch-Order-Entry-Param.xml', 'utf-8');
		let pos = xml.indexOf("<bses:switchOrderEntryParam");
		let xmlstart = xml.substring(0, pos);
		const switchOrderEntryParamReq = xml2Json.toJson(xml, { object: true, alternateTextNode: true });
		let switchOrderEntryParam = switchOrderEntryParamReq['soap:Envelope']['soap:Body']['bses:switchOrderEntryParam'];

		var loginjson = { "Password": "", "UserId": "", "PassKey": "" };
		loginjson.Password = jsonObject['Password'];
		loginjson.UserId = jsonObject['UserId'];
		loginjson.PassKey = jsonObject['PassKey'];
		console.log(loginjson);
		const passwordkey = await getPassword(loginjson);

		Object.keys(switchOrderEntryParam).forEach(function (key) {
			let jsonkey = key.split(":")[1];
			if (jsonkey === 'Password') {
				switchOrderEntryParam[key] = passwordkey;
			} else if (jsonkey === 'TransNo') {
				switchOrderEntryParam[key] = uniqueReference;
			} else {
				switchOrderEntryParam[key] = jsonObject[key.split(":")[1]];
			}
		});
		const builder = new xml2js.Builder();
		let xmlResult = builder.buildObject(switchOrderEntryParamReq);
		let index = xmlResult.indexOf("<bses:switchOrderEntryParam");
		xmlResult = xmlResult.substring(index);
		xmlResult = xmlstart.concat(xmlResult);
		console.log(xml);
		let response = await bseSoapClient.makeMFOrderRequest(xml);
		const switchOrderEntryParamResponse = xml2Json.toJson(response, { object: true });
		return switchOrderEntryResponse['s:Envelope']['s:Body'];

	},

	xsipOrderEntry: async function (json) {
		let jsonObject = JSON.parse(json);
		const uniqueReference = Math.floor(Math.random() * 9000000000) + 1000000000;
		const xml = fs.readFileSync('../SoapClient/xml/Xsip-Order-Entry.xml', 'utf-8');
		let pos = xml.indexOf("<bses:xsipOrderEntry");
		let xmlstart = xml.substring(0, pos);
		const xsipOrderEntryReq = xml2Json.toJson(xml, { object: true, alternateTextNode: true });
		let xsipOrderEntry = xsipOrderEntryReq['soap:Envelope']['soap:Body']['bses:xsipOrderEntry']['bses:data'];

		var loginjson = { "Password": "", "UserId": "", "PassKey": "" };
		loginjson.Password = jsonObject['Password'];
		loginjson.UserId = jsonObject['UserId'];
		loginjson.PassKey = jsonObject['PassKey'];
		console.log(loginjson);
		const passwordkey = await getPassword(loginjson);

		Object.keys(xsipOrderEntry).forEach(function (key) {
			let jsonkey = key.split(":")[1];
			if (jsonkey === 'Password') {
				xsipOrderEntry[key] = passwordkey;
			} else if (jsonkey === 'UniqueRefNo') {
				xsipOrderEntry[key] = uniqueReference;
			} else {
				xsipOrderEntry[key] = jsonObject[key.split(":")[1]];
			}
		});

		const builder = new xml2js.Builder();
		let xmlResult = builder.buildObject(xsipOrderEntryReq);
		let index = xmlResult.indexOf("<bses:xsipOrderEntry");
		xmlResult = xmlResult.substring(index);
		xmlResult = xmlstart.concat(xmlResult);
		let response = await bseSoapClient.makeMFOrderRequest(xmlResult);
		const xsipOrderEntryResponse = xml2Json.toJson(response, { object: true });
		return xsipOrderEntryResponse['s:Envelope']['s:Body'];

	},

	xsipOrderEntryParam: async function (json) {

		let jsonObject = JSON.parse(json);
		const uniqueReference = Math.floor(Math.random() * 9000000000) + 1000000000;
		const xml = fs.readFileSync('../SoapClient/xml/Xsip-Order-Entry-Param.xml', 'utf-8');
		let pos = xml.indexOf("<bses:xsipOrderEntryParam");
		let xmlstart = xml.substring(0, pos);
		const xsipOrderEntryParamReq = xml2Json.toJson(xml, { object: true, alternateTextNode: true });
		let xsipOrderEntryParam = xsipOrderEntryParamReq['soap:Envelope']['soap:Body']['bses:xsipOrderEntryParam'];

		var loginjson = { "Password": "", "UserId": "", "PassKey": "" };
		loginjson.Password = jsonObject['Password'];
		loginjson.UserId = jsonObject['UserId'];
		loginjson.PassKey = jsonObject['PassKey'];
		console.log(loginjson);
		const passwordkey = await getPassword(loginjson);

		Object.keys(xsipOrderEntryParam).forEach(function (key) {
			let jsonkey = key.split(":")[1];
			if (jsonkey === 'Password') {
				xsipOrderEntryParam[key] = passwordkey;
			} else if (jsonkey === 'UniqueRefNo') {
				xsipOrderEntryParam[key] = uniqueReference;
			} else {
				xsipOrderEntryParam[key] = jsonObject[key.split(":")[1]];
			}
		});
		const builder = new xml2js.Builder();
		let xmlResult = builder.buildObject(xsipOrderEntryParamReq);
		let index = xmlResult.indexOf("<bses:xsipOrderEntryParam");
		xmlResult = xmlResult.substring(index);
		xmlResult = xmlstart.concat(xmlResult);
		let response = await bseSoapClient.makeMFOrderRequest(xmlResult);
		const xsipOrderEntryParamResponse = xml2Json.toJson(response, { object: true });
		return xsipOrderEntryParamResponse['s:Envelope']['s:Body'];
	}

}
module.exports = MFOrderClient;



