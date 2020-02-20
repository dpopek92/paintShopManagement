const { get } = require("./get");
const { update } = require("./update");
const { remove } = require("./remove");
const { post } = require("./post");

const employeeControler = { get, update, remove, post };

module.exports = employeeControler;
