const mongoose = require("mongoose");
const ratingSchema = require("./rating");

const productSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	description: {
		type: String,
		required: true,
		trim: true,
	},
	images: [
		{
			type: String,
			required: true,
		},
	],
	quantity: {
		type: Number,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	category: {
		type: Number,
		required: true,
	},
	ratings: [ratingSchema],
	// an average rating field that is calculated from the average of all ratings.
	avg_rating: {
		type: Number,
	},
});

const Product = mongoose.model("Product", productSchema);
module.exports = { Product, productSchema };
