const axios = require('axios');
const excelJS = require('exceljs');

const URL = 'http://localhost:1337/api/products';

// create a product
exports.create = async (req, res) => {
	if (!req.body) {
		return res.status(400).send({
			message: 'Product content can not be empty',
		});
	}

	let body = {
		data: {
			Name: req.body.data.Name,
			Description: req.body.data.Description,
			Category: req.body.data.Category,
			Price: req.body.data.Price,
			Quantity: req.body.data.Quantity,
		},
	};
	await axios
		.post(URL, body)
		.then((response) => {
			res.json(response.data);
		})
		.catch((error) => res.status(400).send(error));
};

// get all or one product
exports.get = async (req, res) => {
	await axios
		.get(URL)
		.then((response) => res.send(response.data))
		.catch((error) => res.status(400).send(error));
};

// get  one product
exports.getOne = async (req, res) => {
	if (!req.params.id) {
		return res.status(400).send({
			message: 'Product ID can not be empty',
		});
	}
	await axios
		.get(`${URL}/${req.params.id}`)
		.then((response) => res.send(response.data))
		.catch((error) => res.status(400).send(error));
};

// update a product
exports.update = async (req, res) => {
	if (!req.body) {
		return res.status(400).send({
			message: 'Product content can not be empty',
		});
	}
	let body = {
		data: {
			Name: req.body.data.Name,
			Description: req.body.data.Description,
			Category: req.body.data.Category,
			Price: req.body.data.Price,
			Quantity: req.body.data.Quantity,
		},
	};
	await axios
		.put(`${URL}/${req.params.id}`, body)
		.then((response) => res.json(response.data))
		.catch((error) => res.status(400).send(error));
};

// delete a product
exports.delete = async (req, res) => {
	await axios
		.delete(`${URL}/${req.params.id}`)
		.then((response) => res.json(response.data))
		.catch((error) => res.status(400).send(error));
};

exports.exportExcel = async (req, res) => {
	const workbook = new excelJS.Workbook();
	const worksheet = workbook.addWorksheet('Products');
	const path = './files';
	workbook.views = [
		{
			x: 0,
			y: 0,
			width: 10000,
			height: 20000,
			firstSheet: 0,
			activeTab: 1,
			visibility: 'visible',
		},
	];

	worksheet.columns = [
		{ header: 'ID', key: 'id', width: 10 },
		{ header: 'Name', key: 'Name', width: 30 },
		{ header: 'Description', key: 'Description', width: 30 },
		{ header: 'Category', key: 'Category', width: 30 },
		{ header: 'Price', key: 'Price', width: 10 },
		{ header: 'Quantity', key: 'Quantity', width: 10 },
	];
	res.setHeader(
		'Content-Type',
		'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
	);
	res.setHeader('Content-Disposition', 'attachment; filename=products.xlsx');

	try {
		const response = await axios.get(URL);
		const data = res.json(response.data);
		Array.from(data).forEach((element, index) => {
			console.log(element);
			let id = element.id;
			let atrr = element.attribute;

			worksheet.addRow({
				...element,
				id: id,
				Name: atrr.Name,
				Description: atrr.Description,
				Category: atrr.Category,
				Price: atrr.Price,
				Quantity: atrr.Quantity,
			});
		});
		workbook.xlsx.writeFile(`${path}/products.xlsx`);
	} catch (error) {
		console.log(error);
	}
};
