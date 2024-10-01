import dbConnect from '../../models/dbConnect';
import Ride from '../../models/Ride';

export async function POST(req) {
  try {
    // Log the request body to verify the data being received
    console.log('Received request to /api/rides:', req.body);

    // Parse the request body
    const { userId, origin, destination, rideTime, amount } = await req.json();

    // Log parsed data
    console.log('Parsed ride details:', { userId, origin, destination, rideTime, amount });

    // Connect to the database
    await dbConnect();

    // Check if all required fields are present
    if (!userId || !origin || !destination || !rideTime || !amount) {
      console.error('Missing required fields');
      return new Response(
        JSON.stringify({ success: false, message: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create a new ride record
    const newRide = new Ride({
      userId,
      origin,
      destination,
      rideTime,
      amount,
      createdAt: new Date(),
    });

    // Save the new ride to the database
    await newRide.save();

    console.log('Ride recorded successfully');
    return new Response(
      JSON.stringify({ success: true, message: 'Ride recorded successfully' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error recording ride:', error.message);
    return new Response(
      JSON.stringify({ success: false, message: 'Error recording ride', error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
