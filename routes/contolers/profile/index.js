const { get } = require("./get");
const { update } = require("./update");
const { remove } = require("./remove");

const profileControler = { get, update, remove };

module.exports = profileControler;
