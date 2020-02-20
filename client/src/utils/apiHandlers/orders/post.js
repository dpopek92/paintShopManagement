import Axios from "axios";
import FileSaver from "file-saver";
const signal = Axios.CancelToken.source();

//======================
//POST NEW ORDER
//======================
export const postOrder = async (order, type) => {
 try {
  const config = {
   headers: {
    "Content-Type": "application/json"
   }
  };
  const data = new FormData();
  data.append(`Order`, JSON.stringify(order));

  if (order.images) {
   if (order.customMilling.file) {
    const imgName = order.customMilling.file.name.split(".");
    const type = imgName[imgName.length - 1];
    data.append("file", order.customMilling.file, `customMilling.${type}`);
   }
   order.items.forEach(item => {
    if (item.image.file) {
     console.log(item.image.file.name);
     const imgName = item.image.file.name.split(".");
     const type = imgName[imgName.length - 1];
     data.append("file", item.image.file, `img_${item.id}.${type}`);
    }
   });
  }
  let res;
  if (type === "New" && !order._id) {
   res = await Axios.post("/api/orders/", data, config);
  } else {
   res = await Axios.post("/api/orders/updateorder", data, config);
  }
  console.log(res);
  return res.data._id;
 } catch (err) {
  console.log(err);
  return err;
 }
};
