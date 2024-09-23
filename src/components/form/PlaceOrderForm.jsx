import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

export const AddOrderForm = ({ onClose, onSubmit }) => {
  const [newOrder, setNewOrder] = useState({
    name: '',
    customerId: '',
    orderNumber: '',
    phoneNumber: '',
    address: '',
    description: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    console.log(newOrder, "Before Form data");
  }, [newOrder]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewOrder((prevOrder) => ({ ...prevOrder, [name]: value }));
  };

  const formAnimation = useSpring({
    from: { opacity: 0, transform: 'translateX(100px)' },
    to: { opacity: 1, transform: 'translateX(0)' },
  });

  const validateForm = () => {
    const newErrors = {};
    if (!newOrder.name) newErrors.name = 'Name is required';
    if (!newOrder.customerId) newErrors.customerId = 'Customer ID is required';
    if (!newOrder.orderNumber) newErrors.orderNumber = 'Order Number is required';
    if (!newOrder.phoneNumber) newErrors.phoneNumber = 'Phone Number is required';
    if (!newOrder.address) newErrors.address = 'Address is required';
    if (!newOrder.description) newErrors.description = 'Description is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return; // Prevent multiple submissions

    if (validateForm()) {
      setIsSubmitting(true); // Disable button on submission
      try {
        onSubmit(newOrder); // Call the submit function passed from parent
        alert('Order added successfully!');
      } catch (error) {
        console.error('Error adding order:', error);
        alert('An error occurred while adding the order. Please try again.');
      } finally {
        setIsSubmitting(false); // Re-enable the button after submission
        onClose(); // Close the form after submission
      }
    }
  };

  return (
    <animated.div style={formAnimation} className="fixed top-0 right-0 h-full w-full sm:w-1/3 bg-white shadow-lg p-4 sm:p-8">
      <h2 className="text-2xl font-bold mb-4 text-black">Add New Order</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: 'Name', name: 'name', type: 'text' },
          { label: 'Customer ID', name: 'customerId', type: 'text' },
          { label: 'Order Number', name: 'orderNumber', type: 'text' },
          { label: 'Phone Number', name: 'phoneNumber', type: 'text' },
          { label: 'Address', name: 'address', type: 'text' },
          { label: 'Description', name: 'description', type: 'text' },
        ].map(({ label, name, type }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <input
              type={type}
              name={name}
              value={newOrder[name]}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring focus:border-blue-500"
            />
            {errors[name] && <p className="text-sm text-red-500">{errors[name]}</p>}
          </div>
        ))}

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded focus:outline-none focus:ring focus:border-blue-500 hover:bg-gray-400 transition duration-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none focus:ring focus:border-blue-500 hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </div>
      </form>
    </animated.div>
  );
};
