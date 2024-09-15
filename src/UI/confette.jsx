import React, { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";

export default function ConfettiComponent() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight * 1.5,
  });

  const detectSize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight * 1.5, 
    });
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);
    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, []);

  return (
    <>
      <ReactConfetti
        width={windowSize.width}
        height={windowSize.height}
        tweenDuration={60000} 
        numberOfPieces={500} 
        gravity={0.1}
        wind={Math.random() * 0.02 - 0.01}         colors={[
          "#FF0000", 
          "#FF7F00", 
          "#FFFF00", 
          "#00FF00", 
          "#0000FF", 
          "#4B0082", 
          "#8B00FF", 
        ]}
        opacity={0.7} 
        // confettiSource={{ x: windowSize.width / 2, y: 0, w: windowSize.width, h: 0 }} // Confetti falls from the center top
        initialVelocityY={10} 
        initialVelocityX={2} 
        recycle={true} 
        drawShape={ctx => {
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(10, 10);
          ctx.lineTo(0, 20);
          ctx.closePath();
          ctx.fill();
        }} 
      />
      <div
        style={{
          position: "fixed",
          top: "60%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1000,
          backgroundColor: "rgba(3, 3, 3, 0.9)",
          padding: "30px",
          borderRadius: "15px",
          textAlign: "center",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
          fontSize: "24px",
          color: "#333",
          maxWidth: "80%",
          maxHeight: "80%",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          style={{
            width: "250px", // Fixed width
            height: "auto", // Maintain aspect ratio
            borderRadius: "10px",
            marginBottom: "20px", // Space between image and text
            borderRadius:'10px'
          }}
          src="https://img.freepik.com/free-vector/flat-thank-you-composition-with-confetti_23-2147838271.jpg?t=st=1724229473~exp=1724233073~hmac=4e4440e8e8d1cfd736b12c674cf407d66f180cf9a4fdfbbbdab93504d9352849&w=740"
          alt="Thank You"
        />
        <p style={{ margin: 0,color:'#b4b4b4' }}>Thank you for purchasing!</p>
      </div>
    </>
  );
}
