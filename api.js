const notifier = require('mail-notifier');
var https = require("https");

var body = JSON.stringify({
    "notification": "Hello World!",
    "accessCode": "ACCESS_CODE"
});
 
const imap = {
  user: "jay@jasengreen.com",
  password: "Jbone2424!!",
  host: "jmasolutions.net",
  port: 993, // imap port
  tls: true,// use secure connection
  tlsOptions: { rejectUnauthorized: false }
};
 
notifier(imap)
  .on('mail', mail => console.log(mail))
  .start();


  const n = notifier(imap);
n.on('end', () => n.start()).on('mail', function(mail){
    console.log(mail.from[0].address, mail.subject)
    console.log("Got Mail")



    https.request({
        hostname: "api.notifymyecho.com",
        path: "/v1/NotifyMe",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(body)
        }
    }).end(body);





}).start();