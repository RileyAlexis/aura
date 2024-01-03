import React, { useState } from "react";
import Draggable from "react-draggable";

import { Paper } from "@mui/material";

const MoveableWindow = ({ id, position, size, children }) => {
  const [windowPosition, setWindowPosition] = useState(position);
  const windowWidth = size.width;
  const windowHeight = size.height;

  const windows = []; // Maintain an array to track window positions

  const snapToGrid = (x, y) => {
    const gridSpacing = 20; // Adjust grid spacing as needed
    const snappedX = Math.round(x / gridSpacing) * gridSpacing;
    const snappedY = Math.round(y / gridSpacing) * gridSpacing;
    return { x: snappedX, y: snappedY };
  };

  const handleDrag = (e, ui) => {
    const { x, y } = snapToGrid(ui.x, ui.y);
    console.log(windows);
    // Check for collisions with other windows
    const newPosition = { x, y };
    const collides = windows.some((win) => {
      return (
        newPosition.x < win.x + windowWidth &&
        newPosition.x + windowWidth > win.x &&
        newPosition.y < win.y + windowHeight &&
        newPosition.y + windowHeight > win.y
      );
    });

    if (!collides) {
      setWindowPosition(newPosition);
    }
  };

  const handleStop = () => {
    // Update windows array with the new position of this window
    const newPosition = { x: windowPosition.x, y: windowPosition.y };
    windows.push(newPosition);
  };

  return (
    <Draggable
      // bounds="parent"
      handle=".window"
      defaultPosition={windowPosition}
      position={null}
      grid={[100, 100]} // Adjust grid size as needed
      onDrag={handleDrag}
      onStop={handleStop}
    >
      <Paper
        className="window"
        style={{ width: windowWidth, height: windowHeight }}
      >
        <Paper sx={{ height: "15px" }}>
          <h3>{id}</h3>
        </Paper>
        <div className="window-content">{children}</div>
      </Paper>
    </Draggable>
  );
};

export default MoveableWindow;
