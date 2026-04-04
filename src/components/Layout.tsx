// -------------------------------------------------------------
// Component: Layout
// Purpose: Global wrapper for all app pages.
//
// This component:
// - Applies the global dark gradient background (matching landing page)
// - Centers all content with a max-width of 640px (mobile-first responsive)
// - Ensures consistent padding and spacing across all pages
// - Renders the Bottom Navigation inside the same width container
// - Provides a unified visual structure for the entire app
// -------------------------------------------------------------

import type { ReactNode } from "react";
import BottomNav from "./BottomNav";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div
      className="
        min-h-screen 
        w-full 
        bg-linear-to-b from-[#0A0A0F] to-[#0D1A26] 
        text-white 
        flex 
        justify-center
      "
    >
      {/* 
        Inner content container:
        - max-w-[640px] matches landing page proportions
        - mx-auto centers the app on desktop
        - relative allows BottomNav to anchor inside this container
      */}
      <div className="w-full max-w-160 px-4 pb-24 relative">
        {children}

        {/* Bottom navigation stays inside the same width */}
        <BottomNav />
      </div>
    </div>
  );
}
