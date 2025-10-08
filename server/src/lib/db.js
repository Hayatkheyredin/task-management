import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT || 3306,
    logging: false,
  }
);

try {
  await sequelize.authenticate();
  console.log("✅ MySQL connected successfully!");
} catch (error) {
  console.error("❌ MySQL connection error:", error);
}

export default sequelize;
