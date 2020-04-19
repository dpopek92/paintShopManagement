/* eslint-disable import/prefer-default-export */
import Axios from 'axios';
import { NewOrderT } from 'services/store/types/newOrder/NewOrder';
import { getFileExtension } from 'services/utils/file';
import { OrderItemT } from 'services/store/types/orders/Orders';

const config = {
 headers: {
  'Content-Type': 'application/json',
 },
};

export const createNewOrder = async (
 order: NewOrderT,
 onEnd: () => void,
 onErr: () => void,
) => {
 try {
  const body = new FormData();
  body.append('order', JSON.stringify(order));

  if (order.customMilling?.file) {
   const fileExtension = getFileExtension(order.customMilling.file.name);
   body.append(
    'file',
    order.customMilling.file,
    `wzorfrezowania.${fileExtension}`,
   );
  }
  order.items.forEach((item: OrderItemT, index: number) => {
   if (item.image?.file) {
    const fileExtension = getFileExtension(item.image.file.name);
    body.append(
     'file',
     item.image.file,
     `rysunek_poz(${index + 1}).${fileExtension}`,
    );
   }
  });
  console.log(body);
  const res = await Axios.post(`/api/orders/`, body, config);
  console.log(res.data);
  onEnd();
  return res.data;
 } catch (err) {
  console.log(err);
  if (err.response) {
   console.log(`ERROR`, err.response);
   onErr();
  }
 }
};
