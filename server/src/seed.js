import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import { Store } from "./models/Store.js";
import { Item } from "./models/Item.js";
import { Inventory } from "./models/Inventory.js";
import { Employee } from "./models/Employee.js";
import { Sale } from "./models/Sale.js";

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/megamind";

async function seed() {
  try {
    console.log("🌱 Connecting to database...");
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB.");

    // Clear existing data
    await Promise.all([
      Store.deleteMany({}),
      Item.deleteMany({}),
      Inventory.deleteMany({}),
      Employee.deleteMany({}),
      Sale.deleteMany({}),
    ]);
    console.log("🧹 Cleared existing collections.");

    // Seed stores
    const stores = await Store.insertMany([
      { name: "Downtown" },
      { name: "Uptown" },
      { name: "Airport" },
    ]);
    console.log(`🏪 Created ${stores.length} stores.`);

    // Seed items
    const items = await Item.insertMany([
      { sku: "SKU001", name: "Blue Widget", price: 9.99 },
      { sku: "SKU002", name: "Red Widget", price: 14.99 },
      { sku: "SKU003", name: "Green Widget", price: 12.49 },
    ]);
    console.log(`📦 Created ${items.length} items.`);

    // Create inventory for each store
    const inventoryData = [];
    for (const store of stores) {
      for (const item of items) {
        inventoryData.push({
          storeId: store._id,
          itemId: item._id,
          qty: Math.floor(Math.random() * 30) + 10,
        });
      }
    }
    await Inventory.insertMany(inventoryData);
    console.log(`📊 Created ${inventoryData.length} inventory records.`);

    // Seed employees
    const employees = await Employee.insertMany([
      { name: "Alice Johnson" },
      { name: "Bob Smith" },
      { name: "Charlie Davis" },
    ]);
    console.log(`👥 Created ${employees.length} employees.`);

    // Seed sample sales
    const sales = await Sale.insertMany([
      {
        storeId: stores[0]._id,
        items: [
          { name: "Blue Widget", price: 9.99, qty: 2 },
          { name: "Red Widget", price: 14.99, qty: 1 },
        ],
      },
      {
        storeId: stores[1]._id,
        items: [{ name: "Green Widget", price: 12.49, qty: 3 }],
      },
    ]);
    console.log(`💰 Created ${sales.length} sales.`);

    console.log("🌟 Seeding completed successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
}

seed();

