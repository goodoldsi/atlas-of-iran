export default function HeroStars() {
  const stars = [
    { top: "18%", left: "8%", size: 6, delay: "0s" },
    { top: "28%", left: "12%", size: 4, delay: "0.6s" },
    { top: "40%", left: "7%", size: 5, delay: "1.2s" },
    { top: "52%", left: "14%", size: 3, delay: "0.9s" },
    { top: "68%", left: "9%", size: 4, delay: "1.6s" },
    { top: "80%", left: "13%", size: 5, delay: "0.3s" },

    { top: "20%", right: "9%", size: 5, delay: "0.2s" },
    { top: "32%", right: "13%", size: 4, delay: "1.1s" },
    { top: "46%", right: "8%", size: 6, delay: "0.8s" },
    { top: "58%", right: "14%", size: 3, delay: "1.4s" },
    { top: "72%", right: "10%", size: 5, delay: "0.5s" },
    { top: "84%", right: "15%", size: 4, delay: "1.8s" },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((star, index) => (
        <span
          key={index}
          className="animate-starblink absolute rounded-full bg-amber-100"
          style={{
            top: star.top,
            left: "left" in star ? star.left : undefined,
            right: "right" in star ? star.right : undefined,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: star.delay,
            boxShadow: "0 0 8px rgba(255,248,220,0.9), 0 0 16px rgba(255,215,128,0.28)",
            opacity: 0.85,
          }}
        />
      ))}
    </div>
  );
}