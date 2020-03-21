const { get } = require("./get");
// const { post } = require("./post");
const { update } = require("./update");
const { remove } = require("./remove");

const customersControler = { get, remove, update };

module.exports = customersControler;
