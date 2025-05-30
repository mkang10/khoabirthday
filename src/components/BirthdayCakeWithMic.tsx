"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// Import font Roboto hỗ trợ tiếng Việt (bạn nhớ cài package @fontsource/roboto)
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/700.css';
import FullWidthSlidingImage from "./FullWidthSlidingImage";

const imageSrc =
    "https://res.cloudinary.com/dvbbfcxdz/image/upload/v1748633563/OIP__1_-removebg-preview_dnkeha.png";

const BirthdayCakeWithMic: React.FC = () => {
    const [candlesLit, setCandlesLit] = useState(true);
    const [showFireworks, setShowFireworks] = useState(false);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const dataArrayRef = useRef<Uint8Array | null>(null);
    const candleCount = 23;
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        let animationFrameId: number;
        let lastCheckTime = 0;

        const detectBlow = (time: number) => {
            if (!analyserRef.current || !dataArrayRef.current) return;

            // Chỉ check mỗi 100ms thôi (giảm tải)
            if (time - lastCheckTime > 100) {
                analyserRef.current.getByteFrequencyData(dataArrayRef.current);
                const volume = dataArrayRef.current.reduce((a, b) => a + b, 0) / dataArrayRef.current.length;

                if (volume > 50 && candlesLit) {
                    setCandlesLit(false);
                    setShowFireworks(true);
                    
                    if (audioRef.current) {
                        audioRef.current.play();
                    }

                }

                lastCheckTime = time;
            }

            // Chỉ tiếp tục check nếu còn nến đang cháy
            if (candlesLit) {
                animationFrameId = requestAnimationFrame(detectBlow);
            }
        };

        const initMic = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
                const source = audioContextRef.current.createMediaStreamSource(stream);
                const analyser = audioContextRef.current.createAnalyser();
                source.connect(analyser);
                analyser.fftSize = 512;

                const bufferLength = analyser.frequencyBinCount;
                const dataArray = new Uint8Array(bufferLength);

                analyserRef.current = analyser;
                dataArrayRef.current = dataArray;

                animationFrameId = requestAnimationFrame(detectBlow);
            } catch (err) {
                console.error("Không thể truy cập micro:", err);
            }
        };

        initMic();

        return () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            if (audioContextRef.current) audioContextRef.current.close();
        };
    }, [candlesLit]);


    return (
        <div className="relative flex flex-col items-center justify-between h-screen bg-gradient-to-br from-pink-300 via-yellow-100 to-blue-200 text-center overflow-hidden p-6 select-none font-sans" style={{ fontFamily: "'Roboto', sans-serif" }}>
            {/* Nền bokeh mờ */}
            <div className="pointer-events-none absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
                {Array.from({ length: 30 }).map((_, i) => (
                    <div
                        key={i}
                        className="bokeh-circle"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: `${10 + Math.random() * 40}px`,
                            height: `${10 + Math.random() * 40}px`,
                            animationDelay: `${Math.random() * 10}s`,
                        }}
                    />
                ))}
            </div>

            {/* Tiêu đề và mô tả */}
            <div className="z-10 mt-4 max-w-xl">
                <motion.h1
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-6xl font-extrabold text-pink-900 drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)] select-text"
                >
                    🎉 Thổi nến đi khoa!
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="text-xl text-pink-800 mt-2 drop-shadow-sm"
                >
                    Thổi vào micro để tắt {candleCount} cây nến 🎤🎂
                </motion.p>

                {!candlesLit && (
                    <>
                        <motion.p
                            className="mt-5 text-pink-700 text-2xl font-semibold select-text"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            ✨ Khoa đã thổi nến ! ✨
                        </motion.p>
                        <audio ref={audioRef} src="/assets/audio/Download.mp3" preload="auto" />

                        <FullWidthSlidingImage src={imageSrc} />

                        {/* Hiển thị ảnh bạn */}

                    </>
                )}
            </div>

            {/* Pháo hoa rực rỡ */}
            {showFireworks && (
                <>
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
                        {Array.from({ length: 10 }).map((_, i) => (
                            <div
                                key={i}
                                className="firework-enhanced"
                                style={{
                                    top: `${Math.random() * 90}%`,
                                    left: `${Math.random() * 100}%`,
                                    animationDelay: `${Math.random() * 2}s`,
                                }}
                            />
                        ))}
                    </div>

                    {/* Bong bóng bay */}
                    <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none z-0">
                        {Array.from({ length: 10 }).map((_, i) => (
                            <div
                                key={`bubble-${i}`}
                                className="bubble-enhanced"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    animationDelay: `${Math.random() * 6}s`,
                                    animationDuration: `${5 + Math.random() * 4}s`,
                                    width: `${15 + Math.random() * 15}px`,
                                    height: `${15 + Math.random() * 15}px`,
                                }}
                            />
                        ))}
                    </div>
                </>
            )}

            {/* Bánh kem sát dưới */}
            <div className="relative z-10 mb-6 flex flex-col items-center">
                <div className="relative w-[320px] h-24 bg-gradient-to-b from-pink-300 to-pink-500 rounded-t-3xl shadow-[inset_0_6px_20px_rgba(255,182,193,0.9)]">
                    {/* Lớp topping kem sáng */}
                    <div className="absolute top-0 left-0 w-full h-4 bg-white rounded-t-3xl opacity-60 shadow-[0_0_10px_#fff]" />
                    {Array.from({ length: candleCount }).map((_, idx) => {
                        const spacing = 320 / candleCount;
                        return (
                            <div
                                key={idx}
                                className="absolute w-[6px] h-14 bg-yellow-300 rounded-t-sm shadow-md flex flex-col items-center"
                                style={{
                                    left: `${idx * spacing + spacing / 2 - 3}px`,
                                    top: "-50px",
                                }}
                            >
                                {/* Chân nến */}
                                <div className="w-[8px] h-4 bg-yellow-600 rounded-b-full shadow-inner -mt-1" />
                                {/* Ngọn lửa */}
                                {candlesLit && (
                                    <div className="w-4 h-6 flame-3d relative mt-[-20px]">
                                        <div className="flame-inner" />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
                <div className="w-[270px] h-28 bg-pink-400 rounded-t-3xl mt-[-14px] shadow-lg" />
                <div className="w-[220px] h-36 bg-pink-600 rounded-t-3xl mt-[-14px] shadow-xl" />
            </div>

            {/* Flame & Fireworks styles */}
            <style jsx>{`
        .flame-3d {
          filter: drop-shadow(0 0 6px #ffa500);
          animation: flicker 0.6s infinite alternate;
          border-radius: 50% 50% 40% 40% / 70% 70% 60% 60%;
          position: relative;
          background: linear-gradient(45deg, #ffb347 0%, #ff4500 80%);
          box-shadow:
            0 0 15px 4px #ffae34,
            0 0 20px 8px #ff6e00;
        }
        .flame-inner {
          position: absolute;
          top: 3px;
          left: 50%;
          width: 50%;
          height: 80%;
          background: radial-gradient(ellipse at center, #fff3cc 0%, transparent 70%);
          border-radius: 50% 50% 40% 40% / 80% 80% 70% 70%;
          transform: translateX(-50%);
          filter: blur(1.5px);
          animation: flicker-inner 0.7s infinite alternate;
        }

        @keyframes flicker {
          0% {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
          100% {
            transform: scale(1.15) translateY(-2px);
            opacity: 0.85;
          }
        }
        @keyframes flicker-inner {
          0% {
            transform: translateX(-50%) scale(1);
            opacity: 0.6;
          }
          100% {
            transform: translateX(-50%) scale(1.3);
            opacity: 0.4;
          }
        }

        .firework-enhanced {
          position: absolute;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: radial-gradient(circle at center, #fff 0%, transparent 70%);
          filter: drop-shadow(0 0 10px #fff);
          animation: explodeEnhanced 1.8s ease-out forwards;
          box-shadow:
            0 0 20px 6px #ff4,
            8px 8px 18px 4px #f44,
            -8px -8px 18px 4px #4cf,
            8px -8px 18px 4px #4f9,
            -8px 8px 18px 4px #f4f;
        }
        .firework-enhanced::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: radial-gradient(circle, #fff 10%, transparent 70%);
          filter: blur(8px);
          opacity: 0.6;
          transform: translate(-50%, -50%);
          animation: sparkle 1.8s ease-out forwards;
        }
        @keyframes explodeEnhanced {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
            box-shadow:
              0 0 20px 6px #ff4,
              8px 8px 18px 4px #f44,
              -8px -8px 18px 4px #4cf,
              8px -8px 18px 4px #4f9,
              -8px 8px 18px 4px #f4f;
          }
          50% {
            transform: scale(3) rotate(180deg);
            opacity: 0.8;
            box-shadow:
              0 0 35px 10px #ff4,
              12px 12px 28px 8px #f44,
              -12px -12px 28px 8px #4cf,
              12px -12px 28px 8px #4f9,
              -12px 12px 28px 8px #f4f;
          }
          100% {
            transform: scale(3.8) rotate(360deg);
            opacity: 0;
            box-shadow: none;
          }
        }
        @keyframes sparkle {
          0% {
            opacity: 0.8;
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.5);
          }
        }

        .bubble-enhanced {
          position: absolute;
          bottom: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.7);
          animation: riseEnhanced linear infinite;
          box-shadow: 0 0 8px rgba(255, 255, 255, 0.9);
          filter: drop-shadow(0 0 2px #fff);
          transform-origin: center center;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          animation-direction: alternate;
          will-change: transform, opacity;
          /* animation-delay và duration set inline */
        }
        @keyframes riseEnhanced {
          0% {
            transform: translateY(0) scale(1) rotate(0deg);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-60vh) scale(1.3) rotate(15deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-120vh) scale(0.8) rotate(-15deg);
            opacity: 0;
          }
        }

        /* Bokeh circles */
        .bokeh-circle {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 80%);
          filter: blur(10px);
          animation: bokehMove 15s linear infinite;
          /* animation-delay set inline */
        }
        @keyframes bokehMove {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -20px) scale(1.1); }
          100% { transform: translate(0, 0) scale(1); }
        }
      `}</style>
        </div>
    );
};

export default BirthdayCakeWithMic;
