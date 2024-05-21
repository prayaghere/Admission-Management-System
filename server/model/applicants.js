import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ApplicantSchema = new Schema({
  formId: {
    type: String,
    required: true,
  },
  fields: [{ name: String, value: String }],
},  {
    timestamps: true,
  });

export default model("Applicant", ApplicantSchema);
