require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const financialRecordRoutes = require("./routes/financialRecordRoutes");

app.use("/auth", authRoutes);
app.use("/financial-records", financialRecordRoutes);

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await sequelize.authenticate();
  console.log("Database connected!");
});
