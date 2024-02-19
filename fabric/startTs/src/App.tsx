import { fabric } from 'fabric';
import { useRef, useCallback } from 'react';
import { Canvas } from './components/Canvas';
import React from 'react';

const App = () => {
  const ref = useRef<fabric.Canvas>(null);

  const onLoad = useCallback(
    (canvas: fabric.Canvas) => {
      canvas.setDimensions({
        width: window.innerWidth,
        height: 500,
      });
      const textValue = 'fabric.js sandbox';
      const text = new fabric.Textbox(textValue, {
        originX: 'center',
        top: 20,
        textAlign: 'center',
        styles: {
          0: {
            0: {
              fontWeight: 'bold',
              fontSize: 64,
            },
          },
        },
      });
      canvas.add(text);
      canvas.centerObjectH(text);

      const animate = (toState: number) => {
        text.animate(
          { scaleX: Math.max(toState, 0.1) * 2 },
          {
            onChange: () => canvas.renderAll(),
            onComplete: () => animate(Number(!toState)),
            duration: 1000,
            easing: toState
              ? fabric.util.ease.easeInOutQuad
              : fabric.util.ease.easeInOutSine,
          }
        );
      };
      animate(1);
    },
    [ref]
  );

  return (
    <div className="position-relative">
      <Canvas ref={ref} onLoad={onLoad} />
    </div>
  );
};

export default App; 
