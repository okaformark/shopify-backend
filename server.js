const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: '.env' });

const app = express();

// parse body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', require('./routes/router'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Example app listening on port ${PORT}!`);
});
