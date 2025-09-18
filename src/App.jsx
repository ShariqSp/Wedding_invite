import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Distance calculation (Haversine)
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function App() {
  const [stage, setStage] = useState("askLocation");
  const [location, setLocation] = useState(null);
  const [name, setName] = useState("");
  const [distance, setDistance] = useState(null);

  // Venue coordinates (approximate) for distance calc (Kandukur)
  const venue = { lat: 15.2348, lon: 79.9922 };

  useEffect(() => {
    if (stage === "askLocation") {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude });
            setStage("askName");
          },
          () => alert("Location permission is required to proceed.")
        );
      } else alert("Geolocation is not supported by your browser.");
    }
  }, [stage]);

  useEffect(() => {
    if (location) {
      const d = getDistance(location.lat, location.lon, venue.lat, venue.lon);
      setDistance(d.toFixed(1));
    }
  }, [location]);

  // Heart colors: purples & pinks palette
  const heartColors = ["#b57edc", "#a97adc", "#d485f8", "#e0aaff", "#f59ecb", "#f4a7ca"];
  const heartCount = 12; // reduced hearts
  const hearts = Array.from({ length: heartCount });

  const stageVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  // Transparent card with blur for glass effect
  const cardStyle = {
    background: "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(15px)",
    borderRadius: "32px",
    border: "1.5px solid rgba(255, 255, 255, 0.4)",
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.1)",
    padding: "40px 32px 24px 32px",
    maxWidth: "520px",
    width: "90vw",
    maxHeight: "fit-content",
    textAlign: "center",
    position: "relative",
    zIndex: 4,
    overflow: "hidden",
    color: "#4b134f",
    fontWeight: "600",
    boxSizing: "border-box",
  };

  const titleStyle = {
    fontSize: "calc(22px + 2vw)",
    color: "#7c3aed",
    fontFamily: "'Great Vibes', cursive",
    fontWeight: "bold",
    textShadow: "0 2px 10px rgba(124, 58, 237, 0.6)",
    marginBottom: "14px",
    wordBreak: "break-word",
  };
  const quoteStyle = {
    fontStyle: "italic",
    color: "#7329ab",
    marginBottom: "24px",
    fontSize: "calc(13px + 0.5vw)",
    opacity: 0.8,
  };

  const buttonStyle = {
    padding: "12px 32px",
    backgroundColor: "rgba(124, 58, 237, 0.7)",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    borderRadius: "70px",
    cursor: "pointer",
    fontSize: "calc(13px + 0.7vw)",
    marginTop: "24px",
    boxShadow: "0 6px 20px rgba(124, 58, 237, 0.4)",
    fontFamily: "'Dancing Script', cursive",
    transition: "background-color 0.3s ease",
  };
  const mainBgStyle = {
    minHeight: "100vh",
    background: "radial-gradient(circle at 60% 40%,#ebe0ff 65%,#d8bcfa 100%)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Dancing Script', cursive",
    position: "relative",
    paddingTop: "40px",
    paddingBottom: "40px",
  };

  // Floating hearts from bottom->top, top-left->bottom-left, top-right->bottom-right
  const renderHearts = () =>
    hearts.map((_, i) => {
      const color = heartColors[i % heartColors.length];
      const opacity = 0.4 + Math.random() * 0.6;
      const scale = 0.6 + Math.random() * 0.9;
      const fontSize = 36 + scale * 48;
      const zIndex = 2;

      if (i % 3 === 0) {
        return (
          <motion.div
            key={`heart-bottom-${i}`}
            initial={{ x: Math.random() * window.innerWidth, y: window.innerHeight + 150, scale, opacity }}
            animate={{ y: -150, scale: scale + 0.1, opacity: opacity - 0.3 }}
            transition={{ repeat: Infinity, duration: 8 + Math.random() * 6, delay: Math.random() * 6, ease: "easeInOut" }}
            style={{
              position: "fixed",
              fontSize,
              color,
              userSelect: "none",
              pointerEvents: "none",
              filter: `drop-shadow(0 6px 10px ${color}88)`,
              zIndex,
            }}
          >
            ❤️
          </motion.div>
        );
      } else if (i % 3 === 1) {
        return (
          <motion.div
            key={`heart-left-${i}`}
            initial={{ x: 40 + Math.random() * 40, y: -150, scale, opacity }}
            animate={{ y: window.innerHeight + 150, scale: scale + 0.1, opacity: opacity - 0.3 }}
            transition={{ repeat: Infinity, duration: 12 + Math.random() * 8, delay: Math.random() * 5, ease: "linear" }}
            style={{
              position: "fixed",
              fontSize,
              color,
              userSelect: "none",
              pointerEvents: "none",
              filter: `drop-shadow(0 6px 10px ${color}bb)`,
              zIndex,
            }}
          >
            ❤️
          </motion.div>
        );
      } else {
        return (
          <motion.div
            key={`heart-right-${i}`}
            initial={{ x: window.innerWidth - 40 - Math.random() * 40, y: -150, scale, opacity }}
            animate={{ y: window.innerHeight + 150, scale: scale + 0.1, opacity: opacity - 0.3 }}
            transition={{ repeat: Infinity, duration: 10 + Math.random() * 8, delay: Math.random() * 4, ease: "linear" }}
            style={{
              position: "fixed",
              fontSize,
              color,
              userSelect: "none",
              pointerEvents: "none",
              filter: `drop-shadow(0 6px 10px ${color}bb)`,
              zIndex,
            }}
          >
            ❤️
          </motion.div>
        );
      }
    });

  const mapContainerStyle = {
    width: "90vw",
    maxWidth: "520px",
    height: "280px",
    marginTop: "26px",
    borderRadius: "20px",
    overflow: "hidden",
    border: "2px solid rgba(124, 58, 237, 0.3)",
    boxShadow: "0 12px 36px rgba(124, 58, 237, 0.15)",
    zIndex: 4,
  };

  if (stage === "askLocation")
    return (
      <div style={mainBgStyle}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <h1 style={titleStyle}>Engagement Invitation</h1>
          <p style={{ color: "#7329ab", fontSize: "21px" }}>Requesting location permission...</p>
        </motion.div>
        {renderHearts()}
      </div>
    );

  if (stage === "askName")
    return (
      <div style={mainBgStyle}>
        <motion.div initial="hidden" animate="visible" variants={stageVariants} style={cardStyle}>
          <h2 style={titleStyle}>Enter your name</h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            style={{
              padding: "12px",
              borderRadius: "12px",
              border: "1.5px solid rgba(124, 58, 237, 0.5)",
              width: "100%",
              marginBottom: "24px",
              fontSize: "calc(13px + 0.5vw)",
              background: "rgba(255,255,255,0.2)",
              color: "#4b134f",
              fontWeight: "600",
              outline: "none",
              fontFamily: "'Dancing Script', cursive",
              boxSizing: "border-box",
              boxShadow: "0 2px 10px rgba(124,58,237,0.2)",
            }}
          />
          <br />
          <button style={buttonStyle} onClick={() => name.trim() && setStage("invite")}>
            View Invitation
          </button>
        </motion.div>
        {renderHearts()}
      </div>
    );

  return (
    <div style={mainBgStyle}>
      {renderHearts()}
      <motion.div initial="hidden" animate="visible" variants={stageVariants} style={cardStyle}>
        <h1 style={titleStyle}>Engagement Invitation</h1>
        <div style={quoteStyle}>“Two souls, one heart. Forever begins on Sep 28th.”</div>
        <h2
          style={{
            fontFamily: "'Great Vibes', cursive",
            color: "#6b21a8",
            fontSize: "calc(22px + 1vw)",
            fontWeight: "700",
            marginBottom: "20px",
          }}
        >
          Shariq &nbsp;weds&nbsp; Sabiha
        </h2>
       <p style={{ color: "#7c3aed", fontSize: "calc(15px + 0.6vw)", marginBottom: "20px" }}>
           Hey <strong>{name || "Guest"}</strong>, you’re lovingly invited to celebrate this day of joy with us.
         </p>
        <div
          style={{
            color: "#4c1d95",
            fontSize: "calc(14px + 0.5vw)",
            marginBottom: "18px",
            lineHeight: "1.55",
            fontWeight: "600",
            wordBreak: "break-word",
          }}
        >
          <strong>Venue:</strong> SVS Function Hall, Pamuru Rd, Kandukur, Andhra Pradesh 523105
          <br />
          <strong>Date:</strong> Sep 28th, 2025 <br />
          <strong>Timing:</strong> 10 AM onwards
        </div>
        {distance && (
          <p style={{ fontSize: "calc(13px + 0.3vw)", marginTop: "18px", color: "#4c1d95" }}>
            You are approximately <strong>{distance} km</strong> away from the venue.
            <br />
            Start planning your travel!
          </p>
        )}
        <div style={{ marginTop: "30px", marginBottom: "12px" }}>
          <a
            href="https://www.irctc.co.in/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              marginRight: "28px",
              color: "#a855f7",
              textDecoration: "underline",
              fontFamily: "inherit",
              fontSize: "calc(14px + 0.4vw)",
            }}
          >
            Book Train Ticket
          </a>
          <a
            href="https://www.makemytrip.com/bus-tickets/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#a855f7",
              textDecoration: "underline",
              fontFamily: "inherit",
              fontSize: "calc(14px + 0.4vw)",
            }}
          >
            Book Bus
          </a>
        </div>
        <div style={mapContainerStyle}>
          <iframe
            title="Engagement Venue Location"
            src="https://www.google.com/maps?q=SVS+Function+Hall,+Pamuru+Rd,+Kandukur,+Andhra+Pradesh+523105&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <iframe
            src="public/music/BG.mp3"
            width="300"
            height="80"
            frameborder="0"
            allowtransparency="true"
            allow="encrypted-media">
          </iframe>
        </div>
      </motion.div>
    </div>
  );
}
