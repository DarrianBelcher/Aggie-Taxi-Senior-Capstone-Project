import dbConnect from '../../models/dbConnect';
import Ride from '../../models/Ride';

export async function GET(req) {
  try {
    // Connect to the database
    await dbConnect();
    
    // Fetch all rides (orders) from the database
    const rides = await Ride.find({}); // Find all rides
    
    // Return the fetched data as JSON
    return new Response(JSON.stringify({ success: true, data: rides }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: 'Failed to fetch orders', error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
