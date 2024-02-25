import { useEffect, useState } from 'react'
import { fabric } from 'fabric'
import { getGridLines, getHeight, ruler, } from './fabric-components';
import './app.css';
import Cookies from 'js-cookie';
import { emitAdd, emitDelete, emitEdit, emitMouse, handleAdd, handleEdit, handleMouse, handleRemove, socket } from './socket';


function App() {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [draw, setDraw] = useState<boolean>(false);
  const [socketId, setSocketId] = useState<string>("");

  const [showGrid, setShowGrid] = useState(false);
  const [gridGroup, setGridGroup] = useState<fabric.Group | null>(null);
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      // console.log("connect");
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on("id", (id) => {
      // console.log("id: ", id);
      setSocketId(id);
    })


    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  })

  useEffect(() => {
    if (!canvas) return;
    socket.on('new-add', (data) => {
      // console.log("new add");
      let canva = canvas;
      canva = handleAdd(data, canva);
      setCanvas(canva);
    });

    socket.on('new-edit', (data) => {
      // console.log("new edit");
      let canva = canvas;
      canva = handleEdit(data, canva);
      setCanvas(canva);
    });

    socket.on("new-delete", (data) => {
      // console.log("new delete");
      let canva = canvas;
      canva = handleRemove(data, canva);
      setCanvas(canva);
    })

    canvas.on("object:modified", (e) => {
      // console.log("object modified");
      emitEdit(e.target);
    })

    canvas.on("object:added", (e) => {
      // console.log("object added");
      if (e.target.id) return;
      e.target.id = Math.floor(Math.random() * 10000);
      emitAdd(e.target);
    })

    canvas.on("object:removed", (e) => {
      emitDelete(e.target);
    })

    socket.on("new_mouse_pos", (e) => {
      // console.log("new mouse pos");
      let canva = canvas;
      canva = handleMouse(e, canva);
      setCanvas(canva);
    })

  }, [canvas])

  useEffect(function mouseEvents() {
    document.addEventListener("mousemove", (event) => {
      const { clientX, clientY } = event;
      emitMouse({ x: clientX, y: clientY, id: socketId, name: Cookies.get("name") })
    }, false);
  }, [])

  useEffect(function initCanvas() {
    // console.log("init");
    const canvas = new fabric.Canvas('canvas', {
      width: 800,
      height: 600,
      backgroundColor: 'lightgrey',
      isDrawingMode: draw,
    });

    const originalToObject = fabric.Object.prototype.toObject;
    const myAdditional = ['id'];
    fabric.Object.prototype.toObject = function (additionalProperties) {
      return originalToObject.call(this, myAdditional.concat(additionalProperties));
    }

    setCanvas(canvas);

    return () => {
      canvas?.dispose();
    }
  }, [])

  const toggleDraw = () => {
    const newCanvas = canvas;
    newCanvas.isDrawingMode = !draw;
    setCanvas(newCanvas);
    setDraw(!draw);
  }

  const handleBrushSizeIncrease = () => {
    const newCanvas = canvas;
    newCanvas.freeDrawingBrush.width += 1;
    setCanvas(newCanvas);
  }

  const handleBrushSizeDecrease = () => {
    const newCanvas = canvas;
    newCanvas.freeDrawingBrush.width -= 1;
    setCanvas(newCanvas);
  }

  const addTringle = () => {
    // console.log("add tringle");
    const newCanvs = canvas;

    const input = prompt("Enter the sides of the triangle in the following format: x,y,z", "20,20,20");
    if (!input) return;
    const sides = input.split(",").map((side) => parseInt(side));

    const triangle = new fabric.Triangle({
      width: sides[0],
      height: getHeight(sides),
    })

    canvas?.add(triangle);
    setCanvas(newCanvs);
  }

  const handleGrid = () => {
    if (showGrid) {
      if (gridGroup) {
        canvas.remove(gridGroup);
        setGridGroup(null);
      }
      setShowGrid(false);
    } else {

      const gridLines = getGridLines(canvas);
      canvas.add(gridLines);
      setGridGroup(gridLines);
      setShowGrid(true);
    }
  }

  const showRuler = () => {
    let newcanvas = canvas;
    const group = ruler(canvas);
    newcanvas?.add(group);
    setCanvas(newcanvas);
  }

  const handleSympols = (op: string) => {
    let link: string;
    if (op == "diff") link = "src/assets/diff.png";
    else if (op == "int") link = "src/assets/int.png";
    else if (op == "sum") link = "src/assets/sum.png";

    fabric.Image.fromURL(link, (img) => {
      img.scale(0.2);

      // img.id = Math.floor(Math.random() * 10000);
      const newCanvas = canvas;
      newCanvas?.add(img);
      setCanvas(newCanvas);
    });
  }

  const handleDeleteSelection = () => {
    const newCanvas = canvas;
    newCanvas?.remove(...newCanvas?.getActiveObjects() || []);
    newCanvas?.discardActiveObject();
    newCanvas?.renderAll();
    setCanvas(newCanvas);
  }


  return (
    <>
      <h1>Canvas</h1>
      <div className='btn-cntr'>
        <button onClick={toggleDraw}>Draw</button>
        <button onClick={() => handleBrushSizeIncrease()}>+</button>
        <button onClick={() => handleBrushSizeDecrease()}>-</button>
        <button onClick={() => handleDeleteSelection()}>Delete selected</button>
        <br></br>
        <button onClick={() => addTringle()}>tringle</button>
        <button onClick={() => handleGrid()}>grid</button>
        <button onClick={() => showRuler()}>ruler</button>
        <button onClick={() => handleSympols("int")}>integration</button>
        <button onClick={() => handleSympols("diff")}>diff</button>
        <button onClick={() => handleSympols("sum")}>sum</button>
      </div>
      <canvas id="canvas"></canvas>
    </>

  )
}

export default App;
