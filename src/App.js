import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Box from "@material-ui/core/Box";
import Components from "./Components";
import "./App.css";

function App() {
  const [components, updatecomponents] = useState(Components);

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(components);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    updatecomponents(items);
  }

  return (
    <div className="App">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="components" direction="horizontal">
          {(provided) => (
            <Box
              display="flex"
              justifyContent="space-between"
              padding="0.5rem"
              className="components-container"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {components.map(({ id, component }, index) => {
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {component}
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default App;
