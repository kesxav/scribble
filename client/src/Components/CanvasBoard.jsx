import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import socket from "../socket.js";
import styles from "./CanvasBoard.module.css";
import ChatBox from "./ChatBox";
import PlayerList from "./PlayerList";
import StartOverlay from "./StartOverlay.jsx";
import WordChoices from "./WordChoices.jsx";

export default function CanvasBoard() {
  const { roomId } = useParams();

  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const isDrawing = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  const strokesRef = useRef([]); // ALL strokes
  const currentStrokeRef = useRef([]); // One stroke

  const [color, setColor] = useState("#00000");
  const [lineWidth, setLineWidth] = useState(5);

  const [started, setStarted] = useState(false);
  const [drawer, setDrawer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);

  const [correctWord, setCorrectWord] = useState(null);
  const [round, setRound] = useState(1);
  const [rounds, setRounds] = useState(null);
  const [wordChoices, setWordChoices] = useState([]);
  const [phase, setPhase] = useState("waiting");
  const [selected, setSelected] = useState(false);
  const [word, setWord] = useState(null);
  const [isHost, setIsHost] = useState(null);

  const canDraw = socket.id === drawer?.socketId;

  console.log(isHost);

  const handleStart = () => {
    socket.emit("round:start", roomId);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctxRef.current = ctx;
  }, []);

  const redrawAll = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;

    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    strokesRef.current.forEach((stroke) => {
      drawStroke(ctx, stroke);
    });
  }, []);

  useEffect(() => {
    socket.on("stroke:init", (strokes) => {
      console.log(strokes);
      console.log("INIT STROKES COUNT", strokes?.length);
      strokesRef.current = Array.isArray(strokes) ? strokes : [];
      redrawAll();
    });

    socket.on("stroke:add", (stroke) => {
      console.log("Added Stroke");
      strokesRef.current.push(stroke);
      drawStroke(ctxRef.current, stroke);
    });

    socket.on("stroke:undo", (roomId) => {
      console.log("Undo Stroke", roomId);
      strokesRef.current.pop();
      redrawAll();
    });

    socket.on("stroke:clear", () => {
      strokesRef.current = [];
      redrawAll();
    });

    socket.on("round:started", ({ drawerId, round, wordChoices, rounds }) => {
      setDrawer(drawerId);
      setRound(round);
      setWordChoices(wordChoices);
      setPhase("wordChoice");
      setSelected(false);
      setStarted(true);
      setRounds(rounds);
    });

    socket.on("update", ({ isHost }) => {
      setIsHost(isHost);
    });

    socket.on("timer", (time) => {
      setTimeLeft(time);
    });

    socket.on("word:selected", ({ word }) => {
      setSelected(true);
      setPhase("drawing");
      setWord(word);
    });

    socket.on("round:ended", (word) => {
      setCorrectWord(word);
      setPhase("roundEnd");
      setWord(null);
    });

    socket.on("gameEnded", () => {
      setPhase("ended");
    });

    return () => {
      socket.off("stroke:init");
      socket.off("stroke:add");
      socket.off("stroke:undo");
      socket.off("stroke:clear");
      socket.off("round:started");
      socket.off("timer");
      socket.off("round:ended");
      socket.off("gameEnded");
      socket.off("update");
    };
  }, [redrawAll]);

  const drawStroke = (ctx, stroke) => {
    ctx.strokeStyle = stroke.color;
    ctx.lineWidth = stroke.lineWidth;

    ctx.beginPath();
    stroke.points.forEach((p, i) => {
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.stroke();
  };

  const startDrawing = (e) => {
    if (!canDraw) return;
    isDrawing.current = true;
    currentStrokeRef.current = [];

    const rect = canvasRef.current.getBoundingClientRect();
    lastPos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const draw = (e) => {
    if (!canDraw) return;
    if (!isDrawing.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = ctxRef.current;
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;

    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(x, y);
    ctx.stroke();

    currentStrokeRef.current.push({ x, y });
    lastPos.current = { x, y };
  };

  const stopDrawing = () => {
    if (!canDraw) return;
    if (!isDrawing.current) return;
    isDrawing.current = false;

    const stroke = {
      points: currentStrokeRef.current,
      color,
      lineWidth,
    };

    console.log("STROKE");
    strokesRef.current.push(stroke);

    socket.emit("stroke:add", { roomId, stroke });
  };

  const undo = () => {
    if (!canDraw) return;
    strokesRef.current.pop();
    redrawAll();
    socket.emit("stroke:undo", { roomId });
  };

  const clear = () => {
    if (!canDraw) return;
    strokesRef.current = [];
    redrawAll();
    socket.emit("stroke:clear", { roomId });
  };

  const handleRestart = () => {
    socket.emit("game:restart", { roomId });
  };

  return (
    <div className={styles.game}>
      <div className={styles.wrapper}>
        {/* <div className={styles.logo}>
        <a href="/">
          <img src={logo} />
        </a>
      </div> */}
        <div className={styles.bar}>
          <div className={styles.settings}>
            <div className={styles.icon}></div>
          </div>
          {timeLeft ? (
            <div className={styles.clock}>
              <div>{timeLeft}</div>
            </div>
          ) : null}

          <div className={styles.round}>
            {rounds ? (
              <div>
                Round {round} of {rounds}
              </div>
            ) : null}
          </div>
          <div className={styles.word}>
            <div>{canDraw ? word : word?.length}</div>
          </div>
        </div>
        <PlayerList />
        <div className={styles.playersFooter}></div>
        <div className={styles.chatInput}></div>
        <div className={styles.canvas}>
          <canvas
            ref={canvasRef}
            width={730}
            height={400}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            style={{ border: "1px solid black", cursor: "crosshair" }}
          />
          {phase === "roundEnd" && (
            <div className={styles.correctWordOverlay}>
              The word was:
              <strong>{correctWord.word}</strong>
            </div>
          )}

          {phase === "ended" && isHost && (
            <div className={styles.correctWordOverlay}>
              <button onClick={handleRestart}>Restart</button>
            </div>
          )}
          {!started ? (
            <StartOverlay onStart={handleStart} isHost={isHost} />
          ) : (
            <WordChoices
              phase={phase}
              drawer={drawer}
              selected={selected}
              wordChoices={wordChoices}
              canDraw={canDraw}
            />
          )}
        </div>

        {canDraw ? (
          <div className={styles.toolbar}>
            <div className={styles.tools}>
              <div className={styles.colors}>
                <button
                  className={styles.btnClr1}
                  onClick={() => setColor("#000000")}
                ></button>
                <button
                  className={styles.btnClr2}
                  onClick={() => setColor("rgb(241, 17, 17)")}
                ></button>
                <button
                  className={styles.btnClr3}
                  onClick={() => setColor(" rgb(246, 235, 29)")}
                ></button>
                <button
                  className={styles.btnClr4}
                  onClick={() => setColor(" rgb(52, 222, 18)")}
                ></button>
                <button
                  className={styles.btnClr5}
                  onClick={() => setColor(" rgb(11, 227, 206)")}
                ></button>
                <button
                  className={styles.btnClr6}
                  onClick={() => setColor(" rgb(34, 17, 221)")}
                ></button>
                <button
                  className={styles.btnClr7}
                  onClick={() => setColor(" rgb(243, 9, 188)")}
                ></button>
                <button
                  className={styles.btnClr8}
                  onClick={() => setColor("  rgb(222, 18, 55)")}
                ></button>
                <button
                  className={styles.btnClr9}
                  onClick={() => setColor(" rgb(11, 210, 150)")}
                ></button>
                <button
                  className={styles.btnClr10}
                  onClick={() => setColor("rgb(255, 192, 203)")}
                ></button>
              </div>
              <div className={styles.pencils}>
                <button
                  className={styles.pencil1}
                  onClick={() => setLineWidth(5)}
                ></button>
                <button
                  className={styles.pencil2}
                  onClick={() => setLineWidth(10)}
                ></button>
                <button
                  className={styles.pencil3}
                  onClick={() => setLineWidth(20)}
                ></button>
                <button
                  className={styles.pencil4}
                  onClick={() => setLineWidth(30)}
                ></button>
              </div>
              <div className={styles.undos}>
                <button className={styles.undo} onClick={undo}></button>
              </div>
              <div className={styles.clear}>
                <button className={styles.delete} onClick={clear}></button>
              </div>
            </div>
          </div>
        ) : null}

        <div className={styles.chat}>
          <ChatBox canDraw={canDraw} />
        </div>
      </div>
    </div>
  );
}
