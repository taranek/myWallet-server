const clientAppPort = process.env.CLIENT_APP_PORT || 3333;
const whitelist = [`http://localhost:${clientAppPort}`, 'https://taranek.github.io', 'https://taranek-my-wallet.herokuapp.com'];
const options = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
function corsOptions() {
  console.log('Accessing cors:', options);
  console.log('WhiteList:', whitelist);
  return options;
}
module.exports = corsOptions;
