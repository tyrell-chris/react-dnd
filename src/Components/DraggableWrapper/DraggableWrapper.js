import React, { useState } from "react";
import Draggable from "react-draggable";

function DraggableWrapper({ children, id }) {
  const position = JSON.parse(localStorage.getItem(`component${id}`));
  let localPosition = { x: 0, y: 0 };
  if (position) {
    localPosition = { x: position.x, y: position.y };
  }
  const [activeDrag, setActiveDrag] = useState({
    activeDrags: 0,
    deltaPosition: {
      x: localPosition.x,
      y: localPosition.y,
    },
  });
  const [zIndex, setZIndex] = useState(0);

  const dragHandlers = { onStart: onStart, onStop: onStop, onDrag: onDrag };

  function onStart() {
    setActiveDrag({ ...activeDrag, activeDrags: activeDrag.activeDrags + 1 });
    setZIndex(1000);
  }
  function onStop() {
    setActiveDrag({ ...activeDrag, activeDrags: activeDrag.activeDrags - 1 });
    setZIndex(1);
  }
  function onDrag(e, ui) {
    console.log("Component ", id, " is dragged");
    const { x, y } = activeDrag.deltaPosition;
    setActiveDrag({
      ...activeDrag,
      deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY,
      },
    });
    localStorage.setItem(
      `component${id}`,
      JSON.stringify({ x: x + ui.deltaX, y: y + ui.deltaY })
    );
  }

  return (
    <Draggable
      {...dragHandlers}
      position={{
        x: activeDrag.deltaPosition.x,
        y: activeDrag.deltaPosition.y,
      }}
    >
      {children}
    </Draggable>
  );
}

export default DraggableWrapper;