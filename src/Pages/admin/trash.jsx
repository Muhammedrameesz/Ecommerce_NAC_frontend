import React from 'react';
import epty from "../../image/several-untidy-pile-white-sticky-post-note.jpg";
import Transparent from "../../image/transperent.svg"

export default function Trash() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh', // Full viewport height
      }}
    >
      <img
        src={Transparent}
        alt="empty"
        style={{
          width: '30%',
          boxSizing: 'border-box',
        }}
      />
    </div>
  );
}
