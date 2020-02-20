import Axios from "axios";

export const auth = async (authUser, onEnd, onError) => {
 try {
  const config = {
   headers: {
    "Content-Type": "application/json"
   }
  };
  const body = JSON.stringify(authUser);

  const res = await Axios.post("/api/auth/", body, config);

  onEnd(res.data);
 } catch (err) {
  onError();
  console.log("login fail", err.response);
 }
};

export const register = async (newUser, onEnd, onError) => {
 try {
  const config = {
   headers: {
    "Content-Type": "application/json"
   }
  };
  const body = JSON.stringify(newUser);

  await Axios.post("/api/users/", body, config);

  onEnd();
 } catch (err) {
  onError();
  console.log(err.response);
 }
};
