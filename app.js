const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const axios = require('axios');

const dev = process.env.NODE_ENV !== 'production';
const host = 'localhost'; // Change the host to localhost
const port = process.env.PORT ;
console.log("host name is", host , port)
const callApi = async () => {
  try {
    await axios.get('http://localhost:3000/api/hello');
  } catch (error) {
    console.error('API call failed:', error.message);
  }
};

const app = next({ dev, host, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      const forwardedHost = req.headers['x-forwarded-host'];

      if (
        forwardedHost === 'www.apkhub.mobi'
      ) {
        // Redirect to https://apkhub.mobi
        res.writeHead(301, { Location: `https://apkhub.mobi${req.url}` });
        res.end();
      } else {
        // Handle other cases
        parsedUrl.protocol = 'https';
        await handle(req, res, parsedUrl);
      }
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('Internal server error');
    }
  })
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, host, () => {
      console.log(`> Ready on http://${host}:${port}`);
      setInterval(callApi, 3600000);
    });
});
