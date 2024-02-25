import { io } from 'socket.io-client';
import { fabric } from 'fabric';
import FabricObjectProxy from './FabricObjectProxy';

const URL = 'http://localhost:3000';

export const socket = io(URL);

export const emitAdd = (object: fabric.Object) => {
  console.log('emit add ', object.id);
  socket.emit('add', object);
};

export const emitEdit = (object: fabric.Object) => {
  console.log('emit edit ', object.id);
  socket.emit('edit', object);
};

export const emitDelete = (object: fabric.Object) => {
  socket.emit('delete', object);
};

export const handleAdd = (
  object: fabric.Object,
  canvas: fabric.Canvas
): fabric.Canvas => {
  if (!canvas) return;

  console.log(object);

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
      canvas.add(img);
    });
    return canvas;
  }

  if (object.path && object.path.type == 'path') {
    const path = new fabric.Path(object.path.path, object.path);
    canvas.add(path);
    return canvas;
  }

  return canvas;
};

export const handleEdit = (
  object: fabric.Object,
  canvas: fabric.Canvas
): fabric.Canvas | undefined => {
  if (!canvas) return;

  // remove the old object
  const obj = canvas?.getObjects().find((o) => o.id === object.id);
  if (obj) {
    canvas.remove(obj);
    canvas.add(object);
  }
  return canvas;
};
