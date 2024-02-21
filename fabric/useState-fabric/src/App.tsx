import { useEffect, useState } from 'react'
import { fabric } from 'fabric'
import { getGridLines, getHeight, ruler, } from './fabric-components';
import './app.css';

function App() {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [draw, setDraw] = useState<boolean>(false);

  const [showGrid, setShowGrid] = useState(false);
  const [gridGroup, setGridGroup] = useState<fabric.Group | null>(null);

  useEffect(() => {
    const canvas = new fabric.Canvas('canvas', {
      width: 800,
      height: 600,
      backgroundColor: 'lightgrey',
      isDrawingMode: draw,
    });

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
    let link;
    if (op == "diff") link = "src/assets/diff.png";
    else if (op == "int") link = "src/assets/int.png";
    else if (op == "sum") link = "src/assets/sum.png";

    fabric.Image.fromURL(link, (img) => {
      img.scale(0.2);

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
        <button onClick={() => toggleDraw()}>Draw</button>
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
