import { useEffect, useRef, useState } from "react";
import styles from "./CanvasBoard.module.css";
import logo from "./logo.gif";
import socket from "../socket";
import useSocketEvent from "../hooks/useSocketEvent";

export default function CanvasBoard() {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const isDrawing = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const strokeRef = useRef([]);
  const currentStrokeRef = useRef([]);
  const [lineWeight, setLineWeight] = useState(5);

  const [color, setColor] = useState("black");

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    //Canvas Setup
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.lineCap = "round";
    ctxRef.current = ctx;
  }, []);

  const drawLine = (x1, y1, x2, y2, color, lineWeight) => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    ctx.lineWidth = lineWeight;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  };

  const onMouseDown = (e) => {
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    isDrawing.current = true;
    lastPos.current = { x, y };
  };

  const onMouseMove = (e) => {
    if (!isDrawing.current) return;

    const newX = e.nativeEvent.offsetX;
    const newY = e.nativeEvent.offsetY;

    drawLine(
      lastPos.current.x,
      lastPos.current.y,
      newX,
      newY,
      color,
      lineWeight
    );

    currentStrokeRef.current.push({
      x1: lastPos.current.x,
      y1: lastPos.current.y,
      x2: newX,
      y2: newY,
      color,
      lineWeight,
    });

    socket.emit("draw", {
      x1: lastPos.current.x,
      y1: lastPos.current.y,
      x2: newX,
      y2: newY,
      color,
      lineWeight,
    });

    lastPos.current = { x: newX, y: newY };
  };

  useSocketEvent("draw", ({ x1, y1, x2, y2, color, lineWeight }) => {
    drawLine(x1, y1, x2, y2, color, lineWeight);
  });

  const undo = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;

    if (strokeRef.current.length === 0) return;
    strokeRef.current.pop();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    strokeRef.current.forEach((stroke) => {
      stroke.path.forEach((seg) => {
        drawLine(seg.x1, seg.y1, seg.x2, seg.y2, seg.color, seg.lineWeight);
      });
    });
  };

  useEffect(() => {
    const endDrawing = () => {
      if (!isDrawing.current) return;

      if (currentStrokeRef.current.length > 0) {
        strokeRef.current.push({
          path: [...currentStrokeRef.current],
        });
      }
      currentStrokeRef.current = [];

      isDrawing.current = false;
    };

    window.addEventListener("mouseup", endDrawing);
    return () => {
      window.removeEventListener("mouseup", endDrawing);
    };
  }, []);

  const clearBtn = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  // const handleMouseLeave = () => {
  //   const canvas = canvasRef.current;
  //   const ctx = canvas.getContext("2d");
  //   console.log(ctx);
  //   ctx.beginPath();
  // };

  return (
    <div className={styles.game}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <a href="/">
            <img src={logo} />
          </a>
        </div>
        <div className={styles.bar}>
          <div className={styles.settings}>
            <div className={styles.icon}></div>
          </div>
          <div className={styles.clock}>
            <div>0</div>
          </div>
          <div className={styles.round}>
            <div>Round 5 of 5</div>
          </div>
          <div className={styles.word}>
            <div>Waiting</div>
          </div>
        </div>
        <div className={styles.players}>
          <div className={styles.playerList}>
            <div className={styles.playerFirst}>
              <div className={styles.background}></div>
              <div className={styles.info}>
                <div className={styles.playername}>Gomlumon</div>
                <div className={styles.playerrank}>#1</div>
                <div className={styles.playerscore}>0 points</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.playersFooter}></div>
        <div className={styles.chatInput}></div>
        <div className={styles.canvas}>
          <canvas
            style={{ border: "2px solid black" }}
            ref={canvasRef}
            width={800}
            height={400}
            onMouseDown={onMouseDown}
            // onMouseLeave={handleMouseLeave}
            onMouseMove={onMouseMove}
          />
        </div>
        <div className={styles.toolbar}>
          <div>
            <button
              className={styles.btn1}
              onClick={() => setColor("red")}
            ></button>
            <button onClick={() => setColor("purple")}>purple</button>
            <button onClick={clearBtn}>clear</button>
            <button onClick={undo}>undo</button>
            <input type="color" value={color} />
            <input
              type="range"
              min={1}
              max={10}
              value={lineWeight}
              onChange={(e) => setLineWeight(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.chat}></div>
      </div>
    </div>
  );
}
