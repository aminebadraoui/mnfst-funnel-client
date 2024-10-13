import React, { useState, useEffect } from 'react';
import FunnelListHeader from './FunnelListHeader';
import { LuArrowBigDown } from 'react-icons/lu';
import useAuthStore from '../stores/authStore';

function FunnelList() {
    const [funnels, setFunnels] = useState([]);
    const [currentFunnel, setCurrentFunnel] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = useAuthStore((state) => state.token);

    useEffect(() => {
        fetchFunnels();
    }, []);

    const fetchFunnels = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/funnels`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch funnels');
            }
            const data = await response.json();
            setFunnels(data);
            setCurrentFunnel(data[0]);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };




    const colors = [
        'bg-blue-900',
        'bg-blue-800',
        'bg-blue-700',
        'bg-blue-600',
        'bg-blue-500',
    ];

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!currentFunnel) return <div>No funnels available</div>;

    return (
        <div className="flex flex-col h-full">
            <FunnelListHeader
                funnels={funnels}
                currentFunnel={currentFunnel}
                setCurrentFunnel={setCurrentFunnel}
            />
            <div className="p-4 m-4 flex-grow overflow-y-auto">
                <h3 className="text-2xl font-semibold mb-6 text-white">{currentFunnel.name}</h3>
                <div className="flex flex-col items-center w-full max-w-md mx-auto">
                    {currentFunnel.steps.map((step, index) => (
                        <React.Fragment key={index}>
                            <div className={`w-full ${colors[index % colors.length]} text-white p-4 flex items-center relative`}>
                                <div className="w-8 h-8 bg-white text-blue-900 rounded-full flex items-center justify-center font-bold mr-4">
                                    {index + 1}
                                </div>
                                <span className="font-semibold">{step}</span>
                                <div className={`absolute right-0 top-0 bottom-0 w-8 ${colors[index % colors.length]}`} style={{ clipPath: 'polygon(0 0, 0% 100%, 100% 50%)' }}></div>
                            </div>
                            {index < currentFunnel.steps.length - 1 && (
                                <div className="">
                                    <LuArrowBigDown size={80} className="text-blue-300" />
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FunnelList;