const { get } = require("./get");
const { update } = require("./update");
const { post } = require("./post");

const timetableControler = { get, update, post };

module.exports = { timetableControler };
