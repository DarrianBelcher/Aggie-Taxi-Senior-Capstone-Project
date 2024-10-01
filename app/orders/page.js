"use client";
import { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaDollarSign } from 'react-icons/fa';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      const res = await fetch('/api/orders');
      const data = await res.json();
      setOrders(data.data);
    }

    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Order History</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div key={order._id} className="bg-white shadow-md rounded-lg p-4">
            <div className="flex items-center mb-3">
              <FaMapMarkerAlt className="text-green-500 mr-2" />
              <div>
                <p className="text-sm text-gray-600">From:</p>
                <p className="font-medium">{order.origin}</p>
              </div>
            </div>

            <div className="flex items-center mb-3">
              <FaMapMarkerAlt className="text-red-500 mr-2" />
              <div>
                <p className="text-sm text-gray-600">To:</p>
                <p className="font-medium">{order.destination}</p>
              </div>
            </div>

            <div className="flex items-center">
              <FaDollarSign className="text-yellow-500 mr-2" />
              <div>
                <p className="text-sm text-gray-600">Price:</p>
                <p className="font-medium">${(order.amount / 100).toFixed(2)}</p>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
