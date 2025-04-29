import React, { useState } from "react";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { locationData, Location } from "./data/locations";
import SvgViewer from "./components/SVGViwer";

const generateColors = (): string[] =>
  Array.from({ length: 10 }, () => `#${Math.floor(Math.random() * 16777215).toString(16)}`);

const App: React.FC = () => {
  const [selectedBuilding, setSelectedBuilding] = useState<Location | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("#ff0000");
  const [shapeFilter, setShapeFilter] = useState<string>("all");
  const [colors] = useState(generateColors());
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set()); // To manage expanded/collapsed nodes

  // Toggle expand/collapse of nodes
  const handleToggleExpand = (nodeId: string) => {
    const newExpandedNodes = new Set(expandedNodes);
    if (newExpandedNodes.has(nodeId)) {
      newExpandedNodes.delete(nodeId);
    } else {
      newExpandedNodes.add(nodeId);
    }
    setExpandedNodes(newExpandedNodes);
  };

  // Handle building selection click
  const handleSelectBuilding = (location: Location) => {
    setSelectedBuilding(location);
  };

  // Recursively render the tree
  const renderLocationTree = (locations: Location[]) => {
    return locations.map((location) => (
      <div key={location.id} style={{ marginLeft: "20px" }}>
        <div>
          {/* Render the label and add click to handle the building */}
          {location.children && location.children.length > 0 ? (
            <span
              onClick={() => handleToggleExpand(location.id)}
              style={{ cursor: "pointer", fontWeight: "bold" }}
            >
              {expandedNodes.has(location.id) ? "[-] " : "[+] "}
              {location.name}
            </span>
          ) : (
            <span
              onClick={() => location.floorplan && handleSelectBuilding(location)}
              style={{ cursor: "pointer" }}
            >
              {location.name}
            </span>
          )}
        </div>

        {/* Render children if expanded */}
        {expandedNodes.has(location.id) && location.children && (
          <div style={{ marginTop: "10px" }}>
            {renderLocationTree(location.children)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "row", padding: 2 }}>
      {/* Location TreeView */}
      <Box sx={{ width: "20%", marginRight: 2 }}>
        <h3>Location Tree</h3>
        {renderLocationTree(locationData)}
      </Box>

      {/* Floor Plan Display */}
      <Box sx={{ flexGrow: 1 }}>
        {selectedBuilding && selectedBuilding.floorplan && (
          <>
            <SvgViewer src={selectedBuilding.floorplan} />

            <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Color</InputLabel>
                <Select
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                >
                  {colors.map((color) => (
                    <MenuItem key={color} value={color} style={{ backgroundColor: color }}>
                      {color}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Shape Filter</InputLabel>
                <Select
                  value={shapeFilter}
                  onChange={(e) => setShapeFilter(e.target.value)}
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="circle">Circle</MenuItem>
                  <MenuItem value="rect">Rectangle</MenuItem>
                  <MenuItem value="polygon">Star</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default App;
