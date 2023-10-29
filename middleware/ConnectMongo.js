import { connectToMongo, closeMongoConnection } from '../src/MongoDb/MongoDb';

export default async function databaseMiddleware(req, res, next) {
  // Connect to the database
  const db = await connectToMongo();

  // Set the database object on the request object
  req.db = db;

  // Call the next middleware function
  next();

  // Close the database connection when the response is finished
  res.on('finish', async () => {
    // Check if the destination URL is within the same domain
    const destinationURL = req.headers['referer'];
    const currentDomain = process.env.HOST;

    if (destinationURL && destinationURL.startsWith(currentDomain)) {
      // Keep the database connection open
      return;
    }

    // Close the database connection
    await closeMongoConnection();
  });
}