import React from 'react';

function PageHeader({ leftContent, rightContent }) {
    return (
        <div className="flex justify-between items-center bg-gray-950 p-4">
            <div>{leftContent}</div>
            <div>{rightContent}</div>
        </div>
    );
}

export default PageHeader;