import mongoose from 'mongoose';

const CheckinSchema = new mongoose.Schema(
  {
    member: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Checkin', CheckinSchema);
