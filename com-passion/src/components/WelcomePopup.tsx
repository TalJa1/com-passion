import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { PartyPopper } from "lucide-react";
import { useAuth, badgeFor } from "../context/AuthContext";
import { formatVND } from "../data/types";

function Confetti() {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0, borderRadius: "var(--radius-lg)" }}>
      {Array.from({ length: 4 }).map((_, burstIndex) => (
        <div key={burstIndex} style={{ 
          position: "absolute", 
          top: `${30 + Math.random() * 40}%`, 
          left: `${20 + Math.random() * 60}%` 
        }}>
          {Array.from({ length: 25 }).map((_, i) => {
            const angle = (Math.random() * 360 * Math.PI) / 180;
            const velocity = 60 + Math.random() * 120;
            const x = Math.cos(angle) * velocity;
            const y = Math.sin(angle) * velocity;
            const colors = ["#e07a3f", "#2e6b4f", "#d9b26f", "#f25c54", "#f4b942"];
            return (
              <motion.div
                key={i}
                initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                animate={{ 
                  x, 
                  y: y + 80,
                  scale: Math.random() * 0.8 + 0.4,
                  opacity: 0,
                  rotate: Math.random() * 360
                }}
                transition={{ 
                  duration: 1.2 + Math.random(), 
                  ease: "easeOut",
                  delay: burstIndex * 0.5 
                }}
                style={{
                  position: "absolute",
                  width: "10px",
                  height: "10px",
                  backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                  borderRadius: Math.random() > 0.5 ? "50%" : "2px",
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default function WelcomePopup() {
  const { user, totalContribution, justLoggedIn, setJustLoggedIn } = useAuth();

  // Handle auto-close timer
  useEffect(() => {
    if (justLoggedIn && totalContribution > 0) {
      const timer = setTimeout(() => {
        setJustLoggedIn(false);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [justLoggedIn, totalContribution, setJustLoggedIn]);

  if (!user || totalContribution <= 0) return null;
  const badge = badgeFor(totalContribution);

  return createPortal(
    <AnimatePresence>
      {justLoggedIn && (
        <motion.div
          className="interactive"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setJustLoggedIn(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(6px)",
            zIndex: 1100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            boxSizing: "border-box",
          }}
        >
          <Confetti />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
            style={{
              maxWidth: "500px",
              width: "100%",
              textAlign: "center",
              position: "relative",
              zIndex: 1,
              pointerEvents: "none",
            }}
          >
            <div 
              style={{ 
                fontSize: "7rem", 
                marginBottom: "1rem", 
                lineHeight: 1,
                filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.4))"
              }}
            >
              {badge.emoji}
            </div>
            
            <h2 style={{ 
              marginBottom: "1.5rem", 
              color: "#fff", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              gap: "0.75rem",
              fontSize: "2.5rem",
              textShadow: "0 4px 15px rgba(0,0,0,0.5)"
            }}>
              <PartyPopper size={40} color="#f4b942" /> Cảm ơn bạn!
            </h2>
            
            <p style={{ 
              lineHeight: 1.6, 
              color: "rgba(255,255,255,0.9)", 
              fontSize: "1.1rem",
              textShadow: "0 2px 10px rgba(0,0,0,0.5)"
            }}>
              Bạn đã đồng hành cùng <strong style={{ color: "#f4b942" }}>com·passion</strong> đóng góp <strong style={{ color: "#f4b942" }}>{formatVND(totalContribution)}</strong>. Sự ủng hộ tuyệt vời này đang mang lại niềm vui rất lớn cho các cô chú nghệ nhân và các em nhỏ vùng cao!
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
