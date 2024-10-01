import dbConnect from '../../models/dbConnect';
import Payment from '../../models/Payment'; // Ensure this model is set up correctly

export async function POST(req) {
  try {
    const { amount, userId, orderDetails } = await req.json(); // Parse the request body

    // Ensure db connection
    await dbConnect();

    // Validate that required fields are provided
    if (!amount || !userId || !orderDetails) {
      return new Response(JSON.stringify({ success: false, message: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Create a new payment record in MongoDB
    const newPayment = new Payment({
      userId,
      amount,
      orderDetails,
      paidOn: new Date(),
    });

    await newPayment.save();

    return new Response(JSON.stringify({ success: true, message: 'Payment recorded successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error recording payment:', error);
    return new Response(JSON.stringify({ success: false, message: 'Error recording payment', error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
