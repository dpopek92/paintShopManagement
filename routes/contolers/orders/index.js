const { update } = require("./update");
const { get } = require("./get");
const { post } = require("./post");
const { remove } = require("./remove");

const ordersContoler = { update, get, post, remove };

module.exports = { ordersContoler };
