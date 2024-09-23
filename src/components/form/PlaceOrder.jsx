import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { AddOrderForm } from './PlaceOrderForm';
import { db } from '../../firebase'; 
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export const AddOrder = () => {
  const [orders, setOrders] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  // Fetch orders from Firestore
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersCollection = collection(db, 'orders');
        const ordersSnapshot = await getDocs(ordersCollection);
        const ordersList = ordersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        // Sort orders based on order number in descending order
        const sortedOrders = ordersList.sort((a, b) => {
          return b.orderNumber.localeCompare(a.orderNumber);
        });
        setOrders(sortedOrders);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchOrders();
  }, []);

  // Add new order to Firestore
  const handleAddOrder = async (newOrder) => {
    try {
      const ordersCollection = collection(db, 'orders');
      const timestamp = new Date().getTime();
      const orderWithTimestamp = { ...newOrder, createdAt: timestamp };
      const docRef = await addDoc(ordersCollection, orderWithTimestamp);
      setOrders((prevOrders) => [
        { id: docRef.id, ...orderWithTimestamp },
        ...prevOrders,
      ]);
      setShowForm(false);
    } catch (error) {
      console.error('Error adding order:', error);
    }
  };

  // Delete order from Firestore
  const handleDeleteOrder = async (orderId) => {
    try {
      const orderDoc = doc(db, 'orders', orderId);
      await deleteDoc(orderDoc);
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  // Filtered orders based on search term
  const filteredOrders = orders.filter(order => {
    return (
      order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Logout function
  const handleLogout = () => {
    // Clear any authentication state if needed
    // Navigate to home page
    navigate('/');
  };

  return (
    <>
      <div className='p-8 ml-4 mt-14 rounded-3xl shadow-lg mr-4 bg-neutral-100 md:ml-32 md:mr-32'>
        <h1 className="text-2xl font-bold">Add Order
          <button onClick={() => setShowForm(true)} className="bg-blue-500 text-white px-4 py-2 rounded float-right text-base font-normal">
            + Add new
          </button>
        </h1>
      </div>

      <div className="p-4 ml-4 mt-4 rounded-3xl shadow-lg mr-4 bg-neutral-100 md:ml-32 md:mr-32">
        <div className="p-4">
          {showForm && <AddOrderForm onClose={() => setShowForm(false)} onSubmit={handleAddOrder} />}
          <h1 className="text-2xl font-bold mb-8">POLLERIA Live Poultry </h1>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded float-right text-base font-normal">
            Logout
          </button>
          <div className="flex flex-col md:flex-row justify-between mb-4">
            <div className="flex mb-4 md:mb-0">
              <input 
                type="text" 
                placeholder="Search" 
                className="border rounded p-2 mr-2 w-full md:w-auto" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded">Search</button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border bg-white">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="p-3 text-center">Name</th>
                  <th className="p-3 text-center">Customer Id</th>
                  <th className="p-3 text-center">Order Number</th>
                  <th className="p-3 text-center">Phone Number</th>
                  <th className="p-3 text-center">Address</th>
                  <th className="p-3 text-center">Description</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-t hover:bg-gray-100">
                    <td className="p-3 text-center">{order.name}</td>
                    <td className="p-3 text-center">{order.customerId}</td>
                    <td className="p-3 text-center">{order.orderNumber}</td>
                    <td className="p-3 text-center">{order.phoneNumber}</td>
                    <td className="p-3 text-center">{order.address}</td>
                    <td className="p-3 text-center">{order.description}</td>
                    <td className="p-3 text-center">
                      <button className="text-red-500 mr-2" onClick={() => handleDeleteOrder(order.id)}>
                        <FontAwesomeIcon icon={faTrash} /> Delete
                      </button>
                      {/* <button className="text-green-500">
                        <FontAwesomeIcon icon={faEdit} /> Edit
                      </button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
