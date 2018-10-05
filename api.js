const notifier = require('mail-notifier');

const https = require("https");

console.log('Api is Running');

let body = JSON.stringify({
"notification": "",
"accessCode": ""
});

const imap = {
user: "",
password: "",
host: "",
port: 993, // imap port
tls: true,// use secure connection
tlsOptions: { rejectUnauthorized: false }
};


notifier(imap)
.on('mail', mail => console.log(mail)).start();


const n = notifier(imap);

n.on('end', () => n.start()).on('mail', function(mail){

if(mail.subject === "Activity Alert: Person detected"){

console.log(mail.from[0].address, mail.subject)

let request = https.request({
hostname: "api.notifymyecho.com",
path: "/v1/NotifyMe",
method: "POST",
headers: {
"Content-Type": "application/json",
"Content-Length": Buffer.byteLength(body)
}
});

request.on('error', function(err) {
console.log(err);
});

request.end(body);

}else{

console.log("Waiting on Data");
};


}).start();
