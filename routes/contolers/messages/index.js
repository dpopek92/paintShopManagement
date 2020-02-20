const { post } = require("./post");
const { get } = require("./get");
const { update } = require("./update");
const { remove } = require("./remove");

const messagesControler = { post, get, update, remove };

module.exports = { messagesControler };
