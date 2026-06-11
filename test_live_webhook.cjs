const https = require('https');
const { v4: uuidv4 } = require('uuid');

const webhookUrl = 'https://script.google.com/macros/s/AKfycbxA79KOZrS3whYS42m3aVdspz66T1tkWmJ0AoLvrGSRspZZxDF3LPPzX1IyFGuGBJRe6g/exec';

const payload = JSON.stringify({
  assessmentId: uuidv4(),
  studentName: "LIVE TEST STUDENT",
  className: "12th Grade Science",
  phone: "+91 9876543210",
  schoolName: "E-Brave Integration Academy",
  schoolCode: "EBG-TEST-001",
  archetype: "The Analytical Pioneer",
  topCareerMatch: "Data Scientist / Systems Engineer",
  primaryRiskFlag: "May experience burnout in non-structured environments.",
  pdfUrl: "https://ndoteayinrpxqvwfsftc.supabase.co/storage/v1/object/public/dossiers/1781120069210_test_dossier.pdf",
  assignedCounselor: "Unassigned",
  sessionStatus: "Pending"
});

console.log("SENDING LIVE PAYLOAD TO GOOGLE SHEETS...");
console.log(payload);

const url = new URL(webhookUrl);
const options = {
  hostname: url.hostname,
  path: url.pathname + url.search,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': payload.length
  }
};

const req = https.request(options, (res) => {
  let data = '';

  // A redirect (302) is normal for Google Apps Script Web Apps when handling POST requests
  if (res.statusCode === 302 || res.statusCode === 301) {
      console.log(`\nGoogle Script Redirected (Normal Behavior): ${res.headers.location}`);
      // Follow redirect
      const redirectUrl = new URL(res.headers.location);
      const redirectOptions = {
          hostname: redirectUrl.hostname,
          path: redirectUrl.pathname + redirectUrl.search,
          method: 'GET' // the redirect is usually a GET
      };
      
      https.get(redirectOptions, (redirectRes) => {
          let redirectData = '';
          redirectRes.on('data', (chunk) => redirectData += chunk);
          redirectRes.on('end', () => {
              console.log(`\n=== FINAL WEBHOOK RESPONSE (${redirectRes.statusCode}) ===`);
              console.log(redirectData);
          });
      }).on('error', (e) => console.error("Redirect Error:", e));
      return;
  }

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log(`\n=== WEBHOOK RESPONSE (${res.statusCode}) ===`);
    console.log(data);
  });
});

req.on('error', (error) => {
  console.error('\nHTTP Request Failed:', error);
});

req.write(payload);
req.end();
