import { io } from 'socket.io-client';
import { fabric } from 'fabric';

const URL = 'http://localhost:3000';

export const socket = io(URL);

export const emitAdd = (object: fabric.Object) => {
  socket.emit('add', object);
};

export const emitEdit = (object: fabric.Object) => {
  socket.emit('edit', object);
};

export const emitDelete = (object: fabric.Object) => {
  socket.emit('delete', object);
};
interface Mouse {
  name: string;
  id: string;
  x: number;
  y: number;
}
export const emitMouse = (mouse: Mouse) => {
  socket.emit('mouse_pos', mouse);
};

export const handleAdd = (
  object: fabric.Object,
  canvas: fabric.Canvas
): fabric.Canvas => {
  if (!canvas) return;

  let obj = object;
  if (object.type == 'triangle') {
    obj = new fabric.Triangle(obj);
    canvas.add(obj);

    return canvas;
  }

  if (object.type == 'image') {
    const img = object as fabric.Image;
    // TODO: fix this and pass the img options
    fabric.Image.fromURL(img.src, (img) => {
      img.scale(0.2);
      img.id = object.id;
      canvas.add(img);
    });
    return canvas;
  }

  if (object.type == 'path') {
    const path = new fabric.Path(object.path, object);
    canvas.add(path);
    return canvas;
  }

  return canvas;
};

export const handleEdit = (
  object: fabric.Object,
  canvas: fabric.Canvas
): fabric.Canvas => {
  if (!canvas) return;

  let obj = canvas?.getObjects().find((o) => o.id === object.id);
  if (obj) {
    obj.set(object);
    canvas.renderAll();
  }
  return canvas;
};

export const handleRemove = (
  object: fabric.Object,
  canvas: fabric.Canvas
): fabric.Canvas => {
  if (!canvas) return;

  const obj = canvas?.getObjects().find((o) => o.id === object.id);
  if (obj) {
    canvas.remove(obj);
  }
  return canvas;
};

export const handleMouse = (mouse: Mouse) => {
  if (mouse.id === socket.id) return;
  showRemoteCursor(mouse.name, { x: mouse.x, y: mouse.y });
};

function showRemoteCursor(clientName, position) {
  // Check if the cursor already exists
  let cursor = document.getElementById('cursor-' + clientName);

  if (!cursor) {
    // Create a new div element for the cursor
    cursor = document.createElement('div');
    cursor.id = 'cursor-' + clientName;

    // Style the cursor
    cursor.style.position = 'absolute';
    cursor.style.width = '10px';
    cursor.style.height = '10px';
    cursor.style.borderRadius = '50%';
    cursor.style.backgroundColor = 'red';
    cursor.style.transition = 'top 0.1s, left 0.1s'; // Add transition

    // Add a label for the client name
    let label = document.createElement('span');
    label.textContent = clientName;
    label.style.position = 'absolute';
    label.style.top = '15px';
    cursor.appendChild(label);

    // Add the cursor to the body
    document.body.appendChild(cursor);
  }

  // Update the position of the cursor
  cursor.style.top = position.y + 'px';
  cursor.style.left = position.x + 'px';
}
