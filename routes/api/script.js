const express = require("express");
const router = express.Router();

const User = require("../../models/Users");
const Order = require("../../models/Orders");

router.get("/ordersnumbers", async (req, res) => {
  try {
    const orders = await Order.find({}, "number");
    console.log(orders.length);
    return res.json(orders);
  } catch (err) {
    console.log(err);
    return res.json(err);
  }
});

router.get("/setuserstrusted", async (req, res) => {
  try {
    await User.update({}, { isTrusted: true });
    return res.json(orders);
  } catch (err) {
    console.log(err);
    return res.json(err);
  }
});

router.get("/getrealizationtime", async (req, res) => {
  try {
    const statuses = ["Wysłane", "Przygotowanie", "Lakierowanie"];
    const orders = await Order.find();
    let realizationTimeArray = [];

    orders.forEach(order => {
      if (order.pickUpDate) {
        const date = new Date(order.date);
        const pickUpDate = new Date(order.pickUpDate);

        const realizationTime = pickUpDate - date;
        const time = new Date(realizationTime);
        const timestring = `${time.getMonth()}miesięcy ${time.getDate()}dni ${time.getHours()}h ${time.getMinutes()}`;
        return realizationTimeArray.push(realizationTime);
      }
      return;
    });
    let sum = 0;
    realizationTimeArray.forEach(item => (sum += item));
    realizationTimeArray = realizationTimeArray.sort((a, b) => a - b);

    const middleIndex = Math.floor(realizationTimeArray.length / 2);
    console.log(realizationTimeArray.length, middleIndex);
    const middleDate = new Date(realizationTimeArray[middleIndex]);
    console.log(
      `Mediana czasów realizacji to: ${middleDate.getMonth()} miesięcy ${middleDate.getDate()} dni ${middleDate.getHours()} h ${middleDate.getMinutes()} minut`
    );

    const avg = sum / realizationTimeArray.length;

    const avgTime = new Date(avg);
    console.log(
      `Średni czas realizacji to: ${avgTime.getMonth()} miesięcy ${avgTime.getDate()} dni ${avgTime.getHours()} h ${avgTime.getMinutes()} minut`
    );
    return res.json(realizationTimeArray);
  } catch (err) {
    console.log(err);
    return res.json(err);
  }
});

module.exports = router;
