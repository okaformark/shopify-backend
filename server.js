const express = require('express');
const path = require('path');
require('dotenv').config({ path: '.env' });

const app = express();

app.use('/', require('./routes/router'));
app.use(express.static(path.join(__dirname, '../public')));
// parse body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Example app listening on port ${PORT}!`);
});
