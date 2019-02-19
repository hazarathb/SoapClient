const soapRequest = require('easy-soap-request');
const xml2Json = require('xml2json');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const url = 'https://bsestarmfdemo.bseindia.com/MFOrderEntry/MFOrder.svc/Secure';
const upurl = 'https://bsestarmfdemo.bseindia.com/MFUploadService/MFUploadService.svc/Secure';

const headers = { 'Content-Type': 'application/soap+xml' };

var bseSoapClient = {

    makeMFOrderRequest: async function (xml) {
        const { response } = await soapRequest(url, headers, xml);
        const { body, statusCode } = response;
        return body;
    },

    makeMFUploadRequest: async function (xml) {
        const { response } = await soapRequest(upurl, headers, xml);
        const { body, statusCode } = response;
        return body;
    }


}
module.exports = bseSoapClient;

