import React, { useMemo } from "react";
import { motion } from "framer-motion";

interface FullWidthSlidingImageProps {
  src: string;
}

const smallImages = [
  "https://res.cloudinary.com/dvbbfcxdz/image/upload/v1748634874/OIP-removebg-preview_zko9hl.png",
  "https://res.cloudinary.com/dvbbfcxdz/image/upload/v1748634873/Hinh-Jack-Cuoi-vo-cung-dang-yeu-removebg-preview_fu6rc7.png",
  "https://res.cloudinary.com/dvbbfcxdz/image/upload/v1748634873/Loc-removebg-preview_c8zj0g.png",
  "https://res.cloudinary.com/dvbbfcxdz/image/upload/v1748634873/Cristiano-Ronaldo-Al-Nassr-1-removebg-preview_rudvmd.png",
  "https://res.cloudinary.com/dvbbfcxdz/image/upload/v1748634873/Screenshot_2025-05-31_022857-removebg-preview_kqnsif.png",
  "https://res.cloudinary.com/dvbbfcxdz/image/upload/v1748634872/Anhthien-removebg-preview_imvttd.png",
  "https://res.cloudinary.com/dvbbfcxdz/image/upload/v1748634871/5552a5f1-d599-4e47-b62e-dcaf5bd0ed78-removebg-preview_bmfhdi.png",
];

const FullWidthSlidingImage: React.FC<FullWidthSlidingImageProps> = ({ src }) => {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const randomPositions = useMemo(() => {
  const positions: { top: number; left: number; size: number }[] = [];

  const isOverlap = (
    pos1: { top: number; left: number; size: number },
    pos2: { top: number; left: number; size: number }
  ) => {
    // Khoảng cách tối thiểu giữa 2 ảnh để không chồng nhau (theo px)
    const minDistance = 80; // bạn điều chỉnh tùy size ảnh
    const dx = pos1.left - pos2.left;
    const dy = pos1.top - pos2.top;
    return Math.sqrt(dx * dx + dy * dy) < minDistance;
  };

  for (let i = 0; i < smallImages.length; i++) {
    let tries = 0;
    let top: number;
    let left: number;
    let sizePx: number;

    do {
      top = Math.random() * 70 + 10; // % theo chiều cao
      left = Math.random() * 70 + 10; // % theo chiều rộng
      sizePx = isMobile
  ? 100  // Mobile: cố định 100px
  : 90;  // Desktop: cố định 90px

      tries++;
      if (tries > 50) break; // tránh vòng lặp vô tận
    } while (
      positions.some(
        (pos) =>
          isOverlap(
            { top, left, size: sizePx },
            { top: pos.top, left: pos.left, size: pos.size }
          )
      )
    );

    positions.push({ top, left, size: sizePx });
  }

  // Convert % top,left thành string để dùng inline style
  return positions.map((pos) => ({
    top: `${pos.top}%`,
    left: `${pos.left}%`,
    size: `${pos.size}px`,
  }));
}, [isMobile]);


  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      {/* Ảnh lớn trượt qua màn hình */}
      <motion.img
        src={src}
        alt="Sliding Image"
        style={{
          height: "100vh",
          position: "absolute",
          top: 0,
          left: 0,
          objectFit: "contain",
          userSelect: "none",
          pointerEvents: "none",
          zIndex: 10,
        }}
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 1,
          ease: "linear",
        }}
      />

      {/* Ảnh nhỏ nổi bật và bay nhẹ nhàng */}
      {smallImages.map((imgSrc, idx) => {
        const { top, left, size } = randomPositions[idx];
        return (
          <motion.img
            key={idx}
            src={imgSrc}
            alt={`Small Image ${idx}`}
            style={{
              position: "absolute",
              top,
              left,
              width: size,
              height: size,
              borderRadius: "12px",
              objectFit: "cover",
              userSelect: "none",
              pointerEvents: "none",
              boxShadow: "0 0 10px rgba(255,255,255,0.8)",
              filter: "drop-shadow(0 0 4px rgba(255,255,255,0.7))",
              zIndex: 1,
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: 1,
              scale: [1, 1.3, 1],
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              delay: idx * 0.4,
              duration: 3,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
};

export default FullWidthSlidingImage;
