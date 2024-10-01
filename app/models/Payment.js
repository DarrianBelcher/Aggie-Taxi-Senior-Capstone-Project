import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  amount: { type: Number, required: true },
  orderDetails: { type: String, required: true },
  paidOn: { type: Date, default: Date.now },
});

const Payment = mongoose.models.Payment || mongoose.model('Payment', PaymentSchema);
export default Payment;
