import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const postedFormSchema = new Schema({
    formData: {
        type: Object,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      },
    });

const PostedForm = model('PostedForm', postedFormSchema);

export default PostedForm;
