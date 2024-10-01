import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import dbConnect from '../../models/dbConnect';
import Ride from '../../models/Ride';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    // Parse the incoming request body
    const { newAmount, origin, destination, userId } = await req.json();

    // Validate required fields
    if (!newAmount || !origin || !destination || !userId) {
      return new Response(
        JSON.stringify({ error: 'Amount, origin, destination, and userId are required' }),
        { status: 400 }
      );
    }

    // Create a payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: newAmount,
      currency: 'usd',
    });

    // If the payment intent is successfully created, connect to the database
    await dbConnect();

    // Create a new ride record
    const newRide = new Ride({
      userId,
      origin,
      destination,
      rideTime: new Date(), // Use the current time for the ride time
      amount: newAmount, // Store the amount in cents
      createdAt: new Date(),
    });

    // Save the ride to the database
    await newRide.save();

    // Return the client secret to the frontend
    return new Response(
      JSON.stringify({ clientSecret: paymentIntent.client_secret, message: 'Ride saved successfully!' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error creating payment intent or saving ride:', error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
