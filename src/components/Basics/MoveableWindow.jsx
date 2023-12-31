import React, { useState } from "react";
import Draggable from "react-draggable";
import { Paper } from "@mui/material";

const MoveableWindow = ({ id, children, position, size, handleDrag }) => {
  const handleDragging = (e, ui) => {
    const { x, y } = ui;
    handleDrag({ x, y }, id);
  };

  return (
    <Draggable
      position={position}
      onDrag={handleDragging}
      grid={[20, 20]}
      bounds="parent"
    >
      <Paper style={{ width: size.x, height: size.y, padding: "20px" }}>
        {children}
      </Paper>
    </Draggable>
  );
};

export default MoveableWindow;
