import { useState } from "react";
import profilePhoto from "../assets/pic.jpg";

export function PhotoPlaceholder() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl border border-white/70 shadow-2xl shadow-zinc-900/10">
        <img
          src={profilePhoto}
          alt="Developer Portrait"
          className="h-full w-full cursor-pointer object-cover transition-transform hover:scale-105"
          onClick={() => setIsOpen(true)}
        />
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setIsOpen(false)}
        >
          <img
            src={profilePhoto}
            alt="Developer Portrait"
            className="max-h-[90vh] max-w-[90vw] rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="absolute right-4 top-4 text-3xl text-white"
            onClick={() => setIsOpen(false)}
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}