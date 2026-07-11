import { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { Leaf } from "lucide-react";

const SIZE = 28;

export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const [isHovering, setIsHovering] = useState(false);
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      x.set(e.clientX - SIZE / 2);
      y.set(e.clientY - SIZE / 2);
    };

    const updateHover = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof HTMLElement)) return;
      setIsHovering(!!target.closest("a, button, .interactive"));
    };
    
    const handleMouseEnter = (e: MouseEvent) => {
      x.set(e.clientX - SIZE / 2);
      y.set(e.clientY - SIZE / 2);
    };

    window.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("mouseover", updateHover);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("mouseover", updateHover);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [x, y]);

  return (
    <motion.div
      className="custom-cursor"
      aria-hidden="true"
      style={{
        x,
        y,
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: isHovering ? "var(--clay-500)" : "var(--green-700)",
      }}
    >
      <motion.div
        animate={{
          scale: isHovering ? 1.3 : 1,
        }}
        transition={{
          duration: 0.15,
          ease: "easeOut",
        }}
      >
        <Leaf
          size={SIZE}
          strokeWidth={1}
          fill="currentColor"
          style={{
            transform: "rotate(-90deg)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}
