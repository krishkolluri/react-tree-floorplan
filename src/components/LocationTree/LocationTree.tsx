import React from 'react';
import {Location} from "../../data/locations";

interface LocationTreeProps {
  data: Location[];
  onSelect: (location: Location) => void;
}

const LocationTree: React.FC<LocationTreeProps> = ({ data, onSelect }) => {
  const renderTree = (nodes: Location[]) => {
    return nodes.map((node:Location) => (
      <div key={node.id}>
        <button onClick={() => node.floorplan && onSelect(node)}>
          {node.name}
        </button>
        {node.children && (
          <div style={{ paddingLeft: 20 }}>
            {renderTree(node.children)}  {/* Recursively render children */}
          </div>
        )}
      </div>
    ));
  };

  return <div>{renderTree(data)}</div>;
};

export default LocationTree;
