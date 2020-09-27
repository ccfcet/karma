const app = require('./app');

// Server start-up configuration
const PORT = process.env.PORT || 8000;
const HOST = '0.0.0.0';
app.listen(PORT, HOST, () => {
  console.log(`Listening for requests on http://${HOST}:${PORT}`);
});
