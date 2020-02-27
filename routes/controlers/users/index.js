const { post } = require("./post");
const { update } = require("./update");
const { remove } = require("./remove");

const usersControler = { post, update, remove };

module.exports = usersControler;
