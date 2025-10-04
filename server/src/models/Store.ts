import { Schema, model, Types } from 'mongoose';
const StoreSchema = new Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true } // e.g. ST01
}, { timestamps: true });

export type StoreDoc = {
  _id: Types.ObjectId; name: string; code: string;
}
export default model('Store', StoreSchema);
