const https = require('https');

function translate(text, callback) {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=es&tl=en&dt=t&q=${encodeURIComponent(text)}`;
  
  https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
      try {
        const parsed = JSON.parse(data);
        const translated = parsed[0][0][0];
        callback(null, translated);
      } catch (e) {
        callback(e);
      }
    });
  }).on('error', (err) => {
    callback(err);
  });
}

translate("Hola mundo. ¿Cómo estás?", (err, res) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log("Result:", res);
  }
});
