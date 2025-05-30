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


  // Thêm ảnh bạn bè khác vào đây nếu muốn
];

const FullWidthSlidingImage: React.FC<FullWidthSlidingImageProps> = ({ src }) => {
  const randomPositions = useMemo(() => {
    return smallImages.map(() => ({
      top: `${Math.random() * 80 + 10}%`,
      left: `${Math.random() * 80 + 10}%`,
      size: `${20 + Math.random() * 30}px`,
    }));
  }, []);

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
          zIndex: 10,  // Đảm bảo ảnh lớn nằm trên ảnh nhỏ
        }}
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 5,
          ease: "linear",
        }}
      />

      {/* Ảnh nhỏ */}
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
              boxShadow: "0 0 8px rgba(255,255,255,0.7)",
              filter: "drop-shadow(0 0 4px rgba(255,255,255,0.5))",
              zIndex: 1,  // Ảnh nhỏ nằm dưới ảnh lớn
            }}
            initial={{ opacity: 0, scale: 10 }}
            animate={{ opacity: 1, scale: [1, 10, 1] }} // scale lớn lên rồi thu nhỏ lại
            transition={{
              delay: idx * 0.5,
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
