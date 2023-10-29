const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
 
const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = process.env.PORT || 3000
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()
 
app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;
      const hostName = req.headers.host;


      // await handle(req, res, parsedUrl)
      // console.log("X FORWARDED HOST IS" , hostName , hostName)
      // console.log("the headers are", req.headers)
      if (
        req.headers.host !== process.env.HOST
      ) {
        // Redirect to https://apkhub.mobi
        res.writeHead(301, { Location: `https://${process.env.HOST}${req.url}` });
        res.end();
      } else {
        await handle(req, res, parsedUrl)
      }
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  })
    .once('error', (err) => {
      console.error(err)
      process.exit(1)
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`)
    })
})