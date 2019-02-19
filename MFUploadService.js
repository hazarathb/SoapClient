const bseSoapClient = require('./bseSoapClient.js');
const fs = require('fs');
const xml2Json = require('xml2json');
var xml2js = require('xml2js');

async function getPassword(json) {

    let xml = fs.readFileSync('../SoapClient/up-xml/login-request.xml', 'utf-8');
    let pos = xml.indexOf("<ns:getPassword");
	let xmlstart = xml.substring(0, pos);
	const loginRequest = xml2Json.toJson(xml, { object: true, alternateTextNode: true });
	let getPassword = loginRequest['soap:Envelope']['soap:Body']['ns:getPassword'];
	Object.keys(getPassword).forEach(function (key) {
		getPassword[key] = json[key.split(":")[1]];
	});
	const builder = new xml2js.Builder();
	let xmlResult = builder.buildObject(loginRequest);
	let index = xmlResult.indexOf("<ns:getPassword");
	xmlResult = xmlResult.substring(index);
    xmlResult = xmlstart.concat(xmlResult)
    console.log(xmlResult);
	let response = await bseSoapClient.makeMFUploadRequest(xmlResult);
	const loginresponse = xml2Json.toJson(response, { object: true });
	return loginresponse['s:Envelope']['s:Body']['getPasswordResponse']['getPasswordResult'].split("|")[1];
}

var MFUploadClient = {


    mfapi: async function (json) {
		let jsonObject = JSON.parse(json)
		let xml = fs.readFileSync('../SoapClient/up-xml/MFAPI.xml', 'utf-8');
		let pos = xml.indexOf("<ns:MFAPI");
		let xmlstart = xml.substring(0, pos);
		const mfapiRequest = xml2Json.toJson(xml, { object: true, alternateTextNode: true });
		let mfapiEntry = mfapiRequest['soap:Envelope']['soap:Body']['ns:MFAPI'];

		var loginjson = { "Password": "", "UserId": "", "PassKey": "" };
		loginjson.Password = jsonObject['Password'];
		loginjson.UserId = jsonObject['UserId'];
		loginjson.PassKey = jsonObject['PassKey'];
		console.log(loginjson);
		const passwordkey = await getPassword(loginjson);

		Object.keys(mfapiEntry).forEach(function (key) {
			let jsonkey = key.split(":")[1];
			if (jsonkey === 'EncryptedPassword') {
				mfapiEntry[key] = passwordkey;
			} else{
				mfapiEntry[key] = jsonObject[key.split(":")[1]];
			}
		});

		const builder = new xml2js.Builder();
		let xmlResult = builder.buildObject(mfapiRequest);
		let index = xmlResult.indexOf("<ns:MFAPI");
		xmlResult = xmlResult.substring(index);
		xmlResult = xmlstart.concat(xmlResult);
		let response = await bseSoapClient.makeMFUploadRequest(xmlResult);
		const mfapiResponse = xml2Json.toJson(response, { object: true });
		return orderEntryResponse['s:Envelope']['s:Body'];
	}


}

