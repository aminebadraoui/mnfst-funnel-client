// src/components/Sidebar.jsx
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuthStore from '../stores/authStore';


function Sidebar() {
    const location = useLocation();
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();
    const isActive = (path) => location.pathname.includes(path);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="w-64 h-screen bg-gray-950 p-4 border-r border-gray-950 overflow-y-auto">
            <Link to="/dashboard">
                <h2 className="text-xl font-bold mb-4 text-white">MNFST FUNNELS</h2>
            </Link>

            <nav className="mb-4">
                <ul>
                    <li>
                        <Link
                            to="/dashboard/designer"
                            className={`block py-2 px-4 ${isActive('designer') ? 'bg-blue-500 text-white' : 'text-gray-300 hover:bg-gray-800'} rounded mb-2`}
                        >
                            Design Funnel
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/dashboard/funnels"
                            className={`block py-2 px-4 ${isActive('funnels') ? 'bg-blue-500 text-white' : 'text-gray-300 hover:bg-gray-800'} rounded mb-2`}
                        >
                            My Funnels
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/dashboard/crm"
                            className={`block py-2 px-4 ${isActive('crm') ? 'bg-blue-500 text-white' : 'text-gray-300 hover:bg-gray-800'} rounded mb-2`}
                        >
                            CRM
                        </Link>
                    </li>
                </ul>
            </nav>

            <div>
                <button
                    onClick={handleLogout}
                    className="w-full py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                    Logout
                </button>
            </div>

        </div>
    );
}

export default Sidebar;