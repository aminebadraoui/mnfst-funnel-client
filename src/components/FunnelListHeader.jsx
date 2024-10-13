import React from 'react';
import PageHeader from './PageHeader';

function FunnelListHeader({ funnels, currentFunnel, setCurrentFunnel }) {
    const leftContent = (
        <select
            className="p-2 bg-gray-700 text-white rounded"
            onChange={(e) => setCurrentFunnel(funnels.find(f => f.name === e.target.value))}
            value={currentFunnel.name}
        >
            {funnels.map((funnel, index) => (
                <option key={index} value={funnel.name}>{funnel.name}</option>
            ))}
        </select>
    );

    return <PageHeader leftContent={leftContent} />;
}

export default FunnelListHeader;