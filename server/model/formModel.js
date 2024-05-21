import { model, Schema } from "mongoose";

const FormSchema = new Schema(
  {
    title: String,
    fields: [{ name: String, type: String }],
    endDate: String,
  },
  {
    timestamps: true,
  }
);

export default model("Form", FormSchema);
