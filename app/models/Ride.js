import mongoose from 'mongoose';

const RideSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  origin: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  rideTime: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Ride = mongoose.models.Ride || mongoose.model('Ride', RideSchema);
export default Ride;
