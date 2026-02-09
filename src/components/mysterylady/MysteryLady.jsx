import React, { useState } from "react";

const MysteryLady = () => {
  const [stage, setStage] = useState(1);
  const [noPos, setNoPos] = useState({ x: 90, y: 60 });

  const BUTTON_SIZE = 70;
  const TRIGGER_DISTANCE = 80;

  const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

  const moveNoIfClose = (e) => {
    const arena = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - arena.left;
    const mouseY = e.clientY - arena.top;

    const centerX = noPos.x + BUTTON_SIZE / 2;
    const centerY = noPos.y + BUTTON_SIZE / 2;

    const distance = Math.hypot(mouseX - centerX, mouseY - centerY);

    if (distance < TRIGGER_DISTANCE) {
      const newX = clamp(Math.random() * 240 + 30, 50, 400);
      const newY = clamp(Math.random() * 80 + 30, 40, 110);
      setNoPos({ x: newX, y: newY });
    }
  };

  const cardStyle = {
    position: "relative",
    width: "620px",
    padding: "60px 40px",
    borderRadius: "16px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
    overflow: "hidden",
    backgroundColor: "#f8bbd0",
    textAlign: "center",
    height: "40vh",
  };

  const bgStyle = () => ({
    position: "absolute",
    inset: 0,
    backgroundImage:
      stage === 1
        ? `url(/assets/cat.webp)`
        : stage === 2
          ? `url(/assets/smileCat.jpg)`
          : `url(/assets/pineapple.jpeg)`,
    backgroundSize: stage === 1
        ? `cover`
        : stage === 2
          ? `contain`
          : `cover`,
    backgroundPosition: "center",
    opacity: 0.65,
  });

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffebee",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
      }}
    >
      {/* STAGE 1 */}
      {stage === 1 && (
        <div style={cardStyle}>
          <div style={bgStyle(false)} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <h1 style={{ color: "#000000", textShadow: "2px 2px 8px #675e5e" }}>
              Hello Ishmeet Ji
            </h1>
            <h2
              style={{
                marginTop: "40px",
                color: "#000000",
                textShadow: "1px 1px 6px #7b6565",
              }}
            >
              Welcome to the Rabbit Hole!
            </h2>
            <p
              style={{
                marginBottom: "40px",
                color: "#000000",
                textShadow: "1px 1px 6px #7b6565",
              }}
            >
              Are you ready to dive deeper?
            </p>

            <button
              onClick={() => setStage(2)}
              style={{
                padding: "14px 30px",
                fontSize: "18px",
                borderRadius: "40px",
                border: "none",
                backgroundColor: "#a1d2b7",
                cursor: "pointer",
              }}
            >
              Sure, let&apos;s go!
            </button>
          </div>
        </div>
      )}

      {/* STAGE 2 */}
      {stage === 2 && (
        <div style={cardStyle}>
          <div style={bgStyle(false)} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <h2 style={{ color: "#fff", textShadow: "4px 4px 8px #000000" }}>
              Will you be my Valentine?
            </h2>

            <div
              style={{
                position: "relative",
                width: "100%",
                height: "150px",
                marginTop: "40px",
              }}
              onMouseMove={moveNoIfClose}
            >
              {/* YES */}
              <button
                onClick={() => setStage(3)}
                style={{
                  position: "absolute",
                  left: "10px",
                  top: "50px",
                  width: BUTTON_SIZE,
                  height: BUTTON_SIZE,
                  borderRadius: "50%",
                  fontSize: "16px",
                  fontWeight: "bold",
                  backgroundColor: "#388e3c",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                YES
              </button>

              {/* NO */}
              <button
                onMouseEnter={moveNoIfClose}
                style={{
                  position: "absolute",
                  left: `${noPos.x}px`,
                  top: `${noPos.y}px`,
                  width: BUTTON_SIZE,
                  height: BUTTON_SIZE,
                  borderRadius: "50%",
                  fontSize: "16px",
                  fontWeight: "bold",
                  backgroundColor: "#c8102e",
                  color: "#fff",
                  border: "none",
                  cursor: "not-allowed",
                  transition: "left 0.2s ease, top 0.2s ease",
                }}
              >
                NO
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STAGE 3 */}
      {stage === 3 && (
        <div style={cardStyle}>
          <div style={bgStyle()} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <h2 style={{ color: "#ffffff", textShadow: "3px 3px 8px #090909" }}>
              Yay! You&apos;re my Valentine! ❤️
            </h2>
            <h3
              style={{
                marginTop: "200px",
                color: "#ffffff",
                textShadow: "3px 3px 8px #090909",
              }}
            >
              That yes means more to Me than you know. I’m really happy we’re
              doing this together, and I can’t wait to spend Valentine’s Day
              with you ❤️
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default MysteryLady;
