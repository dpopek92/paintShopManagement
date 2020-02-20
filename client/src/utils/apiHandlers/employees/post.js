import Axios from "axios";
const signal = Axios.CancelToken.source();

//======================
//POST NEW EMPLOYEE
//======================
export const addNewEmployee = async (employeeData, onEnd, onError) => {
 try {
  const config = {
   headers: {
    "Content-Type": "application/json"
   }
  };
  const body = JSON.stringify(employeeData);

  await Axios.post("/api/employee/", body, config);

  onEnd();
 } catch (err) {
  if (err.response.data.msg === "email") {
   onError();
  }
  onEnd();
  console.log(err.response);
 }
};
