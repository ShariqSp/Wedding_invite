import React from "react";

function AudioPlayer() {
  return (
    <audio controls autoPlay loop style={{ width: "300px" }}>
      <source src="/music/BG.mp3" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  );
}

export default AudioPlayer;
