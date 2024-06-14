const express = require('express');
const path = require('path'); 


const pathToDistFolder = path.join(__dirname, '..', 'vite-project', 'dist');

const app = express();

//Controllers

const logRoutes = (req, res, next) => {
  const time = (new Date()).toLocaleString();
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next();
};


const serveStatic = express.static(pathToDistFolder);

const serveData = (req, res) => {
  const data = { message: "This is some data from the API." };
  res.json(data);
};
const serveHello = (req, res, next) => {
  const name = req.query.name || "stranger";
  res.send(`hello ${name}`);
}

//Routes

app.use(logRoutes);
app.use(serveStatic);

app.get('/api/hello', serveHello);
app.get('/api/data', serveData);

const port = 8081;
app.listen(port, () => {
  console.log(`Server is now running on http://localhost:${port}`);
});