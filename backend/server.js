const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const logger = require("./utils/logger");

dotenv.config();

const tablesRouter = require("./modules/tables");
const authRouter = require("./modules/auth");

const app = express();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:4200"
}));

app.use("/auth", authRouter);
app.use("/", tablesRouter);

app.get("/", (req, res) => {
  res.json({ message: "MoneyManager backend fut!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => logger.info(`Backend fut: http://localhost:${PORT}`));
