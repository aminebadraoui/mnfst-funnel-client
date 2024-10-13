// src/pages/Designer.jsx
import React from 'react';
import { useCallback, useMemo, useState } from 'react';
import DesignerHeader from '../components/DesignerHeader';
import ReactFlow, {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    Background,
    Controls,
    MiniMap
} from 'reactflow';
import FunnelStep from './FunnelStep';
import useAuthStore from '../stores/authStore';

function Designer() {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [currentFunnelName, setCurrentFunnelName] = useState('Untitled Funnel');

    const newFunnel = () => {
        setNodes([]);
        setEdges([]);
        setCurrentFunnelName('Untitled Funnel');
        // Add any other state resets here
    };

    const checkFunnelExists = async (funnelName) => {
        console.log("checkFunnelExists", currentFunnelName)
        const token = useAuthStore.getState().token;
        if (!token) {
            throw new Error('No authentication token found');
        }

        const checkResponse = await fetch(`http://localhost:5000/api/funnels/check/${currentFunnelName}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        return checkResponse.status === 200;
    };

    const saveFunnel = async (funnelName, override = false) => {
        const sortedNodes = [];
        const nodeMap = new Map(nodes.map(node => [node.id, node]));
        const edgeMap = new Map();

        edges.forEach(edge => {
            if (!edgeMap.has(edge.source)) {
                edgeMap.set(edge.source, []);
            }
            edgeMap.get(edge.source).push(edge.target);
        });

        const startNodes = nodes.filter(node => !edges.some(edge => edge.target === node.id));

        const traverseNodes = (nodeId) => {
            const node = nodeMap.get(nodeId);
            if (node && !sortedNodes.includes(node.data.label)) {
                sortedNodes.push(node.data.label);
                const children = edgeMap.get(nodeId) || [];
                children.forEach(traverseNodes);
            }
        };

        startNodes.forEach(node => traverseNodes(node.id));

        try {
            const token = useAuthStore.getState().token;
            if (!token) {
                throw new Error('No authentication token found');
            }

            const method = override ? 'PUT' : 'POST';
            const url = override
                ? `http://localhost:5000/api/funnels/${funnelName}`
                : 'http://localhost:5000/api/funnels';

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ name: funnelName, steps: sortedNodes }),
            });

            if (!response.ok) throw new Error('Failed to save funnel');

            const savedFunnel = await response.json();
            console.log("savedFunnel", savedFunnel)

            setCurrentFunnelName(savedFunnel.name);
            return savedFunnel.name;
        } catch (error) {
            console.error("Error saving funnel:", error);
            throw error;
        }

    };

    const updateNodeName = useCallback((nodeId, newName) => {
        setNodes((nds) =>
            nds.map((node) => {
                if (node.id === nodeId) {
                    return { ...node, data: { ...node.data, label: newName } };
                }
                return node;
            })
        );
    }, []);

    const nodeTypes = useMemo(() => ({
        funnelStep: (props) => <FunnelStep {...props} updateNodeName={updateNodeName} />,
    }), [updateNodeName]);



    const addNewNode = (name) => {
        const newNode = {
            id: `node_${nodes.length + 1}`,
            type: 'funnelStep',
            position: { x: 250, y: nodes.length * 100 },
            data: { label: name },
        };
        setNodes((nds) => [...nds, newNode]);
    };

    const onConnect = useCallback((params) => {
        setEdges((eds) => {
            // Remove existing connection from the source node
            const filteredEdges = eds.filter(e => e.source !== params.source);
            // Add the new connection
            return addEdge({ ...params, type: 'smoothstep', animated: true, markerEnd: { type: 'arrowclosed' } }, filteredEdges);
        });
    }, []);



    const onNodesChange = useCallback((changes) => {
        setNodes((nds) => applyNodeChanges(changes, nds));
    }, []);

    const onEdgesChange = useCallback((changes) => {
        setEdges((eds) => applyEdgeChanges(changes, eds));
    }, []);

    return <>
        <DesignerHeader
            addNewNode={addNewNode}
            saveFunnel={saveFunnel}
            newFunnel={newFunnel}
            checkFunnelExists={checkFunnelExists}
            currentFunnelName={currentFunnelName}
            setCurrentFunnelName={setCurrentFunnelName}
        />
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            defaultEdgeOptions={{
                type: 'smoothstep',
                animated: true,
                style: { stroke: '#555' },
                markerEnd: {
                    type: 'arrowclosed',
                    color: '#555',
                },
            }}
        >
            <Background />
            <Controls />
            <MiniMap />
        </ReactFlow>
    </>
}

export default Designer;