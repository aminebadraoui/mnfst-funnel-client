// src/components/LeadCard.jsx
import React from 'react';

function LeadCard({ lead }) {
    return (
        <div className="bg-gray-700 p-4 mb-2 rounded">
            <p className="text-gray-50 font-semibold mb-4">{lead.firstName} {lead.lastName}</p>
            <p className="text-gray-200 text-sm mb-2">
                <span className="font-semibold">Email: </span>{lead.email}
            </p>
            <p className="text-gray-200 text-sm mb-2">
                <span className="font-semibold">Phone: </span>{lead.phone}
            </p>
            {lead.notes && (
                <p className="text-gray-200 text-sm mt-1">
                    <span className="font-semibold">Notes: </span>
                    <span className="italic">{lead.notes}</span>
                </p>
            )}
        </div>
    );
}

export default LeadCard;