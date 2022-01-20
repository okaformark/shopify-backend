const express = require('express');
const path = require('path');
require('dotenv').config({ path: '.env' });

const app = express();

app.use(express.static(path.join(__dirname, '../public')));
// parse body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', require('./routes/router'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Example app listening on port ${PORT}!`);
});
