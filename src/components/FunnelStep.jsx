import React, { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';

function FunnelStep({ id, data, isConnectable, updateNodeName }) {
  const [name, setName] = useState(data.label);

  useEffect(() => {
    setName(data.label);
  }, [data.label]);

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setName(newName);
    updateNodeName(id, newName);
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-md">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} className="w-3 h-3" />
      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        className="w-full border-none text-center font-semibold focus:outline-none"
      />
      <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} className="w-3 h-3" />
    </div>
  );
}

export default FunnelStep;