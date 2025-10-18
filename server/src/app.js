import express from "express";
import cors from "cors";
import stores from "./routes/store.js";
import items from "./routes/items.js";
import inventory from "./routes/inventory.js";
import sales from "./routes/sales.js";
import employees from "./routes/employees.js";
import square from "./routes/square.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/stores", stores);
app.use("/items", items);
app.use("/inventory", inventory);
app.use("/sales", sales);
app.use("/employees", employees);
app.use("/square", square);

export default app;
