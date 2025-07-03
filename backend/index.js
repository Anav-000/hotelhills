const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/hotelhills", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Basic route
app.get("/", (req, res) => {
  res.send("HotelHills API is running");
});

const roomRoutes = require("./routes/roomRoutes");
const guestRoutes = require("./routes/guestRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const tableRoutes = require("./routes/tableRoutes");
const tableBookingRoutes = require("./routes/tableBookingRoutes");
const kotRoutes = require("./routes/kotRoutes");
const menuRoutes = require("./routes/menuRoutes");
const banquetRoutes = require("./routes/banquetRoutes");
const banquetBookingRoutes = require("./routes/banquetBookingRoutes");
const quotationRoutes = require("./routes/quotationRoutes");
const billRoutes = require("./routes/billRoutes");

app.use("/api/rooms", roomRoutes);
app.use("/api/guests", guestRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/tables", tableRoutes);
app.use("/api/table-bookings", tableBookingRoutes);
app.use("/api/kots", kotRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/banquets", banquetRoutes);
app.use("/api/banquet-bookings", banquetBookingRoutes);
app.use("/api/bills", billRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
