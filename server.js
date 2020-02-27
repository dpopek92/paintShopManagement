require("dotenv").config({ path: ".env" });
const express = require("express");
const cron = require("node-cron");
var cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");
// const timetableReset = require("./cron/timetableReset");

const app = express();

// connect DataBase
connectDB();

// init middleware
app.use(
  express.json({
    extended: false
  })
);

app.use(cors());

// Define routes
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/customers", require("./routes/api/customers"));
app.use("/api/settings", require("./routes/api/settings"));
// app.use("/api/employee", require("./routes/api/employee"));
// app.use("/api/orders", require("./routes/api/orders"));
// app.use("/api/prices", require("./routes/api/prices"));
// app.use("/api/verify", require("./routes/api/verify"));
// app.use("/api/sheet", require("./routes/api/sheet"));
// app.use("/api/stats", require("./routes/api/stats"));
// app.use("/api/messages", require("./routes/api/messages"));
// app.use("/api/paints", require("./routes/api/paints"));
// app.use("/api/timetable", require("./routes/api/timetable"));
// app.use("/api/script", require("./routes/api/script"));
// app.use(express.static(__dirname + "/uploads"));

// Update data every midnight
cron.schedule("00 00 00 * * * ", async () => {
  console.log("---------------------");
  console.log("Running Cron Job");
  console.log(new Date());
  // await timetableReset();
  console.log("Cron Job Ended");
  console.log("---------------------");
});

// serve static assets in prod
// if (process.env.NODE_ENV === "production") {
//set static folder
app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  console.log(req);
  res.sendFile(path.resolve(__dirname, "client/build", "index.html"));
});
// }

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
