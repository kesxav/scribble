import { useEffect, useRef, useState } from "react";
import styles from "./CanvasBoard.module.css";

export default function CanvasBoard() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const [color, setColor] = useState("black");
  const [line, setLine] = useState("5");

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    console.log(ctx);
    //Canvas Setup
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";
  }, []);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const colorCng = (clr) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = clr;
  };

  const clearBtn = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  function handleColorChange(e) {
    setColor(e.target.value);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = color;
  }

  function handleLineChange(e) {
    setLine(e.target.value);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineWidth = line;
  }

  return (
    <div className={styles.game}>
      <div className={styles.wrapper}></div>
      <div className={styles.logo}></div>
      <div className={styles.bar}></div>
      <div className={styles.players}></div>
      <div className={styles.playersFooter}></div>
      <div className={styles.chatInput}></div>
      <div className={styles.canvas}>
        <canvas
          style={{ border: "2px solid black" }}
          ref={canvasRef}
          width={750}
          height={500}
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          onMouseMove={draw}
          onMouseLeave={stopDrawing}
        />
      </div>
      <div className={styles.toolbar}>
        <div>
          <button
            className={styles.btn1}
            onClick={() => colorCng("red")}
          ></button>
          <button onClick={() => colorCng("purple")}>purple</button>
          <button onClick={clearBtn}>clear</button>
          <input type="color" value={color} onChange={handleColorChange} />
          <input
            type="range"
            min={1}
            max={10}
            value={line}
            onChange={handleLineChange}
          />
        </div>
      </div>
      <div className={styles.chat}></div>
    </div>
  );
}
