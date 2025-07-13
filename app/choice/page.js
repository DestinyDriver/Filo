'use client';

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Matrix from "./_components/Matrix";

export default function SvgMatrixPage() {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black relative overflow-hidden px-4">
      {/* Tooltip Box */}
      {hovered === "files" && (
        <div className="absolute left-[10%] sm:left-[20%] top-[25%] sm:top-[35%] bg-cyan-800 text-white p-3 rounded shadow-md z-10 w-40 sm:w-52 text-center text-xs sm:text-sm">
          <div className="font-bold">FiloDrop</div>
          <div>Upload, protect, and share files with passwords and short URLs.</div>
        </div>
      )}
      {hovered === "filopad" && (
        <div className="absolute right-[10%] sm:right-[20%] top-[25%] sm:top-[35%] bg-red-800 text-white p-3 rounded shadow-md z-10 w-40 sm:w-52 text-center text-xs sm:text-sm">
          <div className="font-bold">FiloPad</div>
          <div>Paste code or text anonymously and share short URLs easily.</div>
        </div>
      )}

      <Matrix />

      {/* Responsive SVG */}
      <div className="relative w-full max-w-[600px] aspect-[6/5]">
        <motion.svg
          viewBox="0 0 600 500"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          initial={{ y: 500, opacity: 0, scale: 0 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Background Image */}
          <image href="/bg-pills.jpg" x="0" y="0" width="600" height="500" />

          {/* Blue Hand Area */}
          <Link href="/files">
            <path
              d="M351.112 178.639C343.344 181.056 341.906 197.972 354.908 197.857 363.1917 196.3037 371.4753 194.7503 379.759 193.197 388.797 188.248 386.606 174.727 376.134 175.303 367.9363 176.3943 359.7387 177.4857 351.541 178.577Z"
              transform="translate(-193, 134)"
              fill="transparent"
              stroke="cyan"
              strokeWidth="1"
              onMouseEnter={() => setHovered("files")}
              onMouseLeave={() => setHovered(null)}
              className="hover:fill-cyan-500 hover:opacity-20 transition-all duration-300 cursor-pointer"
            />
          </Link>

          {/* Red Hand Area */}
          <Link href="/filopad">
            <path
              d="M419.04 307.48C426.613 309.42 434.187 311.36 441.76 313.3 454.8 315.92 450.27 335.67 437.86 332.59 429.983 330.507 422.107 328.423 414.23 326.34 408.61 324.53 403.63 309.95 418.3 307.41Z"
              transform="translate(-1, 0)"
              fill="transparent"
              stroke="red"
              strokeWidth="1"
              onMouseEnter={() => setHovered("filopad")}
              onMouseLeave={() => setHovered(null)}
              className="hover:fill-red-500 hover:opacity-20 transition-all duration-300 cursor-pointer"
            />
          </Link>
        </motion.svg>
      </div>
    </div>
  );
}
