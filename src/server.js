const app = require('./app');

// Server start-up configuration
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Listening for requests on http://localhost:${port}`);
});
