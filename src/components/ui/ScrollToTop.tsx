"use client";
import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 rounded-full bg-neon-green text-black font-bold border-none p-3  shadow-lg transition-all hover:bg-white hover:text-black hover:shadow-[0_0_15px_#ccff00] hover:scale-110 animate-bounce"
      aria-label="Volver arriba"
    >
      <ArrowUp size={24} />
    </button>
  );
}
