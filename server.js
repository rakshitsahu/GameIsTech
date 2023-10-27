const { createServer } = require('http');
// import { connectToMongo } from '@/MongoDb/MongoDB';
const { parse } = require('url');
const next = require('next');
const https = require('https'); // Import the 'https' module

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;
      const hostName = req.headers.host;
      if (hostName !== process.env.HOST) {
        res.writeHead(301, { Location: `https://${process.env.HOST}${req.url}` });
        res.end();
      } else {
        await handle(req, res, parsedUrl);
      }
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  })
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});

// Function to make the API call every hour
function makeApiCall() {
  https.get(`https://${process.env.HOST}/api/callindex`, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      // You can process the API response data here
      console.log('API response:', data);
    });
  }).on('error', (error) => {
    console.error('API call error:', error);
  });
}
// process.on('SIGINT', async () => {
//   const client = connectToMongo();
//   await client.close();
//   process.exit(0);
// });
// Call the API every hour (in milliseconds)
// setInterval(makeApiCall, 3600000);
