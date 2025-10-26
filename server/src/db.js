import mongoose from 'mongoose';

export async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('❌ MONGO_URI is missing');
    process.exit(1);
  }

  // Optional: quick redacted log to confirm what host/db we’re hitting
  try {
    await mongoose.connect(uri, {
      // modern drivers generally don't need extra flags
      // leave options empty unless you have a reason
    });
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ Failed to connect to database:', err);
    throw err;
  }
}
