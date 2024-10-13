import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from './PageHeader';
import ConfirmModal from './ConfirmModal';


function DesignerHeader({
    addNewNode,
    saveFunnel,
    newFunnel,
    checkFunnelExists,
    currentFunnelName,
    setCurrentFunnelName }) {
    const [nodeName, setNodeName] = useState('');

    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isOverrideModalOpen, setIsOverrideModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (nodeName) {
            addNewNode(nodeName);
            setNodeName('');
        }
    };

    const redirectToLogin = () => {
        navigate('/login');
    };

    const saveNewFunnel = async () => {
        console.log("saveNewFunnel")
        console.log("currentFunnelName", currentFunnelName)
        const newFunnelName = await saveFunnel(currentFunnelName, false);
        console.log("newFunnelName", newFunnelName)
        setCurrentFunnelName(newFunnelName);
        alert('Funnel saved successfully');
        setIsOverrideModalOpen(false);
    }


    const handleSaveFunnel = async () => {
        try {
            const exists = await checkFunnelExists(currentFunnelName);
            if (exists) {
                setIsOverrideModalOpen(true);
            } else {
                await saveNewFunnel()
            }
        } catch (error) {
            if (error.message === 'Unauthorized: Please log in again') {
                redirectToLogin();
            } else {
                alert(`Failed to save funnel: ${error.message}`);
            }
            console.error("Failed to save funnel:", error);
        }
    };

    const handleOverride = async () => {
        try {
            console.log("handleOverride")
            console.log("currentFunnelName", currentFunnelName)
            await saveFunnel(currentFunnelName, true);
            alert('Funnel overridden successfully');
            setIsOverrideModalOpen(false);
        } catch (error) {
            alert(`Failed to override funnel: ${error.message}`);
            console.error("Failed to override funnel:", error);
        }
    };

    const handleNewFunnel = () => {
        setIsConfirmModalOpen(true);

    };

    const leftContent = (
        <form onSubmit={handleSubmit} className="flex">
            <input
                type="text"
                value={nodeName}
                onChange={(e) => setNodeName(e.target.value)}
                placeholder="Enter node name"
                className="p-2 border border-gray-300 rounded mr-2 required:border-red-500"
            />
            <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
                Add Node
            </button>
        </form>
    );

    const rightContent = (
        <div className="flex items-center">
            <input
                type="text"
                value={currentFunnelName}
                onChange={(e) => setCurrentFunnelName(e.target.value)}
                placeholder="Funnel name"
                className="p-2 bg-transparent text-white rounded mr-2"
            />
            <button
                onClick={handleSaveFunnel}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mr-2"
            >
                Save Funnel
            </button>
            <button
                onClick={handleNewFunnel}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
                New Funnel
            </button>
        </div>
    );

    return (
        <>
            <PageHeader leftContent={leftContent} rightContent={rightContent} />

            <ConfirmModal
                isOpen={isOverrideModalOpen}
                onClose={() => setIsOverrideModalOpen(false)}
                onConfirm={handleOverride}
                onAlternative={saveNewFunnel}
                message="A funnel with this name already exists. Do you want to override it?"
                confirmText="Override"
                alternativeText="Save as New"
            />
        </>
    );
}

export default DesignerHeader;
