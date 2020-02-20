import Axios from "axios";
const signal = Axios.CancelToken.source();

//======================
//USER REMOVE
//======================
export const userRemove = async (userId, onEnd) => {
 try {
  await Axios.delete(`/api/profile/user/${userId}`, {
   cancelToken: signal.token
  });
  onEnd();
 } catch (err) {
  if (Axios.isCancel(err)) {
   console.log("Error:" + err.message);
  } else {
   console.log(err.response);
   onEnd();
  }
 }
};
