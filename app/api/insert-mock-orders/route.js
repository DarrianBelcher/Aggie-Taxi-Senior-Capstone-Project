import dbConnect from '../../models/dbConnect';
import Order from '../../models/Orders'; // Ensure the model exists and is correct

export async function GET(req) {
  await dbConnect(); // Ensure the database connection is established

  const mockOrders = [
    { userId: '12345', origin: 'Location A', destination: 'Location B', price: 10 },
    { userId: '67890', origin: 'Location C', destination: 'Location D', price: 15 },
  ];

  try {
    const result = await Order.insertMany(mockOrders); // Insert mock orders into MongoDB
    console.log('Inserted mock orders:', result);
    return new Response(JSON.stringify({ success: true, message: 'Mock orders inserted successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error inserting mock orders:', error);
    return new Response(JSON.stringify({ success: false, message: 'Error inserting mock orders', error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
