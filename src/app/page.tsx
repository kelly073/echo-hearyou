"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const MOCK_QUESTIONS = [
  "What would it feel like to give yourself permission to feel this fully, without needing to fix it?",
  "When did you first notice this feeling? Can you trace it back to a moment or a thought?",
  "If a dear friend felt exactly this way, what would you want them to know?"
];

const MOCK_SNIPPETS = [
  { text: "Sometimes I wonder if anyone really gets me...", similarity: "94%" },
  { text: "I've been carrying this weight and I don't know how to put it down.", similarity: "89%" },
  { text: "It feels like everyone else has it figured out except me.", similarity: "87%" }
];

// Pale Lavender: #E8E4F3, #DDD8ED | Soft Mint: #D5F0E3, #B8E6D5
const LAVENDER = "#E8E4F3";
const LAVENDER_DEEP = "#DDD8ED";
const MINT = "#D5F0E3";
const MINT_DEEP = "#B8E6D5";

function TypewriterQuestion({
  text,
  isActive,
  onComplete
}: {
  text: string;
  isActive: boolean;
  onComplete: () => void;
}) {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    if (!isActive) {
      setDisplay("");
      return;
    }
    let i = 0;
    const interval = setInterval(() => {
      if (i <= text.length) {
        setDisplay(text.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
        onComplete();
      }
    }, 18);
    return () => clearInterval(interval);
  }, [isActive, text, onComplete]);

  return <span>{display}</span>;
}

export default function EchoLandingPage() {
  const [input, setInput] = useState("");
  const [showEcho, setShowEcho] = useState(false);
  const [showCommunity, setShowCommunity] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleEcho = () => {
    if (!input.trim()) return;
    setShowEcho(true);
    setShowCommunity(false);
    setCurrentQuestionIndex(0);
  };

  const handleQuestionComplete = useCallback(() => {
    setCurrentQuestionIndex((prev) => {
      if (prev < MOCK_QUESTIONS.length - 1) return prev + 1;
      setTimeout(() => setShowCommunity(true), 400);
      return prev;
    });
  }, []);

  const inputLength = input.length;
  const moodShift = Math.min(inputLength / 200, 1);

  return (
    <>
      <div
        className="fixed inset-0 -z-10 transition-all duration-[2000ms] ease-out"
        style={{
          background: `linear-gradient(${135 + moodShift * 12}deg, 
            ${LAVENDER} 0%, 
            ${MINT} ${22 + moodShift * 15}%, 
            ${LAVENDER_DEEP} 50%, 
            ${MINT_DEEP} ${78 - moodShift * 12}%, 
            ${LAVENDER} 100%)`,
          backgroundSize: "400% 400%",
          animation: "liquidFlow 25s ease-in-out infinite"
        }}
      />
      <div className="min-h-screen flex flex-col relative">
        {/* Header */}
        <header className="w-full max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-xl font-semibold text-[#2C3E50]/90 tracking-tight">
              Echo
            </span>
            <svg
              className="w-5 h-5 text-[#626C77]/80 transition-transform duration-700 ease-in-out group-hover:scale-105"
              fill="none"
              viewBox="0 0 24 12"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
            >
              <path d="M2 6c.5-2 2-4 4-4s3.5 2 4 4c.5-2 2-4 4-4s3.5 2 4 4" />
              <path d="M2 9c.5-1.5 2-3 4-3s3.5 1.5 4 3c.5-1.5 2-3 4-3s3.5 1.5 4 3" opacity="0.6" />
            </svg>
          </Link>
          <Link
            href="/reflections"
            className="text-sm text-[#626C77]/90 hover:text-[#2C3E50] transition-all duration-700 ease-in-out px-4 py-2 rounded-2xl hover:bg-white/20 backdrop-blur-sm"
          >
            My Echoes
          </Link>
        </header>

        {/* Hero */}
        <main className="flex-1 flex flex-col items-center justify-center px-6 pb-24 max-w-2xl mx-auto w-full">
          <div className="w-full space-y-6">
            <div className="rounded-3xl border border-white/20 bg-white/25 backdrop-blur-xl shadow-[0_0_40px_-10px_rgba(255,255,255,0.4)] p-1 transition-all duration-700 ease-in-out">
              <textarea
                className="w-full min-h-[200px] rounded-[22px] border-0 bg-transparent px-6 py-5 text-[#2C3E50] placeholder:text-[#626C77]/60 text-base leading-relaxed resize-none focus:outline-none focus:ring-0 font-sans"
                placeholder="How are you *actually* doing today? There is no one to judge you here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <button
              onClick={handleEcho}
              disabled={!input.trim()}
              className="w-full py-4 rounded-3xl bg-white/30 backdrop-blur-md border border-white/30 text-[#2C3E50] font-medium text-base hover:bg-white/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-700 ease-in-out shadow-sm"
            >
              Echo My Feelings
            </button>
          </div>

          {/* AI Echo Section */}
          {showEcho && (
            <div className="w-full mt-12 space-y-6 animate-fade-slide">
              <div className="rounded-3xl border border-white/20 bg-white/25 backdrop-blur-xl shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] p-8">
                <h2 className="text-lg font-medium text-[#2C3E50]/90 mb-6 font-sans">
                  AI Echo: A Reflection
                </h2>
                <ol className="space-y-6 list-decimal list-inside text-[#2C3E50]/85 leading-relaxed font-serif text-[17px]">
                  {MOCK_QUESTIONS.map((q, i) => (
                    <li key={i} className="pl-2">
                      {i < currentQuestionIndex ? (
                        <span>{q}</span>
                      ) : i === currentQuestionIndex ? (
                        <TypewriterQuestion
                          text={q}
                          isActive={true}
                          onComplete={handleQuestionComplete}
                        />
                      ) : (
                        <span className="invisible" aria-hidden>
                          {q}
                        </span>
                      )}
                    </li>
                  ))}
                </ol>
              </div>

              {/* You Are Not Alone */}
              {showCommunity && (
                <div className="space-y-4 animate-fade-slide">
                  <p className="text-sm text-[#626C77]/90 text-center">
                    Right now, 12 others are reflecting on similar themes...
                  </p>
                  <div className="space-y-3">
                    {MOCK_SNIPPETS.map((s, i) => (
                      <div
                        key={i}
                        className="rounded-2xl border border-white/20 bg-white/25 backdrop-blur-xl px-4 py-3 shadow-sm transition-all duration-700 ease-in-out"
                      >
                        <p className="text-sm text-[#2C3E50]/85 italic font-serif">
                          &ldquo;{s.text}&rdquo;
                        </p>
                        <p className="text-xs text-[#626C77]/70 mt-1">
                          {s.similarity} similar
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="py-6 text-center">
          <p className="text-xs text-[#626C77]/70">
            Echo is a safe space for you. You are anonymous.
          </p>
        </footer>
      </div>
    </>
  );
}
