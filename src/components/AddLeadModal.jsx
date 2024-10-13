// src/components/AddLeadModal.jsx
import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';

function AddLeadModal({ isOpen, onClose, onSubmit, funnelSteps }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [currentStep, setCurrentStep] = useState(funnelSteps[0]);
    const [notes, setNotes] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ firstName, lastName, email, phone, currentStep, notes });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-950 flex items-center justify-center z-50">
            <button
                onClick={onClose}
                className="absolute top-4 left-4 text-gray-50 p-2 rounded-full hover:text-gray-200 focus:outline-none"
            >
                <IoClose size={24} />
            </button>
            <div className="-8 rounded-lg w-96">
                <h3 className="text-2xl font-bold mb-6 text-gray-50 text-center">Add New Lead</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full py-2 px-4 bg-gray-900 text-gray-50 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full py-2 px-4  bg-gray-900 text-gray-50 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full py-2 px-4  bg-gray-900 text-gray-50 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
                        required
                    />
                    <input
                        type="tel"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full py-2 px-4  bg-gray-900 text-gray-50 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
                        required
                    />
                    <select
                        value={currentStep}
                        onChange={(e) => setCurrentStep(e.target.value)}
                        className="w-full py-2 px-4  bg-gray-900 text-gray-50 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
                    >
                        {funnelSteps.map((step) => (
                            <option key={step} value={step}>
                                {step}
                            </option>
                        ))}
                    </select>
                    <textarea
                        placeholder="Notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full py-2 px-4  bg-gray-900 text-gray-50 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
                        rows="3"
                    />
                    <button
                        type="submit"
                        className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    >
                        Add Lead
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddLeadModal;