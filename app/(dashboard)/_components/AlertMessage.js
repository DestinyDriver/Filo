"use client";

import { Toaster } from "sonner";

export default function AlertMessage() {
  return (
    <Toaster
      
      position="bottom-right"
      toastOptions={{
        style: {
          background: "#82181a66", // your original red glass
            color: "oklch(70.4% 0.191 22.216)",
            borderColor: "oklch(50.5% 0.213 27.518)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
        },
      }}
    />
  );
}
