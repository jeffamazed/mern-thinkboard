import connectDB from "../config/db.js";

async function startServer(app, uri, PORT) {
  let attempts = 0;
  const maxRetries = 5;

  while (attempts < maxRetries) {
    try {
      await connectDB(uri);
      console.log("Connected to MongoDB!");

      app.listen(PORT, () =>
        console.log(`Server is listening on port ${PORT}...`)
      );

      return;
    } catch (error) {
      attempts++;
      console.warn(`Connection failed on attempt ${attempts}!`, error.message);

      if (attempts < maxRetries) {
        console.log("Retrying connection in 3 seconds...");
        await new Promise((resolve) => setTimeout(resolve, 3000));
      } else {
        console.warn("Max retries reached, exiting...");
        process.exit(1);
      }
    }
  }
}

export default startServer;
