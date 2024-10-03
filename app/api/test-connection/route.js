import dbConnect from '../../models/dbConnect';

export async function GET(req) {
  try {
    await dbConnect();
    return new Response(JSON.stringify({ success: true, message: 'Database connection successful' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Database connection failed:', error);
    return new Response(JSON.stringify({ success: false, message: 'Database connection failed', error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
