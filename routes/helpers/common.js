const isAdmin = async user => {
 return user.permission === "admin";
};
const isEmployee = async user => {
 return user.permission === "employee";
};

const isUser = async user => {
 return user.permission === "user";
};

const abandonRequest = async (msg = "") => {
 console.log("error");
 // return res.status(400).json({
 //  msg
 // });
};

module.exports = { isAdmin, isEmployee, isUser, abandonRequest };
