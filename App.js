const express = require("express");
const bodyParser = require("body-parser");
const router = require('./src/routes/root');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api',router )

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
