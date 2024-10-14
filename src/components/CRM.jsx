import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import PageHeader from './PageHeader';
import AddLeadModal from './AddLeadModal';
import LeadCard from './LeadCard';
import useAuthStore from '../stores/authStore';

function CRM() {
    const [funnels, setFunnels] = useState([]);
    const [currentFunnel, setCurrentFunnel] = useState(null);
    const [leads, setLeads] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const token = useAuthStore((state) => state.token);

    useEffect(() => {
        fetchFunnels();
    }, []);

    useEffect(() => {
        if (currentFunnel) {
            fetchLeads(currentFunnel.id);
        }
    }, [currentFunnel]);

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

    const fetchLeads = async (funnelId) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/leads?funnelId=${funnelId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch leads');
            }
            const data = await response.json();
            setLeads(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };


    const onDragEnd = (result) => {
        if (!result.destination) return;

        const sourceIndex = parseInt(result.source.droppableId);
        const destinationIndex = parseInt(result.destination.droppableId);
        const draggedLead = leads.find(lead => lead.id === result.draggableId);

        if (draggedLead) {
            const updatedLeads = leads.map(lead => {
                if (lead.id === draggedLead.id) {
                    return { ...lead, currentStep: currentFunnel.steps[destinationIndex] };
                }
                return lead;
            });

            setLeads(updatedLeads);
            updateLeadStep(draggedLead.id, currentFunnel.steps[destinationIndex]);
        }
    };

    const updateLeadStep = async (leadId, newStep) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/leads/${leadId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ currentStep: newStep }),
            });
            if (!response.ok) {
                throw new Error('Failed to update lead');
            }
        } catch (error) {
            console.error('Error updating lead:', error);
        }
    };

    const addNewLead = async (newLead) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/leads`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ ...newLead, funnelId: currentFunnel.id }),
            });
            if (!response.ok) {
                throw new Error('Failed to add new lead');
            }
            const addedLead = await response.json();
            setLeads([...leads, addedLead]);
        } catch (error) {
            console.error('Error adding new lead:', error);
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!currentFunnel) return <div>No funnels available</div>;

    const leftContent = (
        <select
            className="p-2 bg-gray-700 text-white rounded"
            onChange={(e) => setCurrentFunnel(funnels.find(f => f.id === e.target.value))}
            value={currentFunnel.id}
        >
            {funnels.map((funnel) => (
                <option key={funnel.id} value={funnel.id}>{funnel.name}</option>
            ))}
        </select>
    );

    const rightContent = (
        <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
            Add New Lead
        </button>
    );
    return (
        <div className="flex flex-col h-full">
            <PageHeader leftContent={leftContent} rightContent={rightContent} />
            <div className="flex-grow p-4 overflow-hidden">
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="flex space-x-4 overflow-x-auto h-full">
                        {currentFunnel.steps.map((step, stepIndex) => (
                            <div key={stepIndex} className="flex flex-col min-w-[250px]">
                                <div className="bg-gray-900 p-4 rounded-t">
                                    <h4 className="font-medium text-gray-50 font-semibold mb-2 text-center">{step}</h4>
                                </div>
                                <Droppable droppableId={stepIndex.toString()}>
                                    {(provided) => (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            className="bg-gray-600 p-4 rounded-b min-w-[250px] flex-grow overflow-y-auto"
                                        >
                                            {leads.filter(lead => lead.currentStep === step).map((lead, index) => (
                                                <Draggable key={lead.id} draggableId={lead.id} index={index}>
                                                    {(provided) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >
                                                            <LeadCard lead={lead} />
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </div>
                        ))}
                    </div>
                </DragDropContext>
            </div>

            <AddLeadModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={addNewLead}
                funnelSteps={currentFunnel.steps}
            />
        </div>
    );
}

export default CRM;
