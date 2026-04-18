// -------------------------------------------------------------
// Component: Layout
// Purpose: Global wrapper for all app pages.
//
// Updated:
// - Uses global .page-bg for gradient + text color
// - Clean max-width container
// - Consistent spacing + padding
// - BottomNav anchored inside container
// - Tailwind v4 safe
// -------------------------------------------------------------

import type { ReactNode } from "react";
import BottomNav from "./BottomNav";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="page-bg safe-top safe-bottom flex justify-center min-h-screen">
      {/* 
        Inner content container:
        - max-w-160 (640px)
        - px-4 for consistent horizontal padding
        - pb-24 ensures content never hides behind BottomNav
        - relative allows BottomNav to anchor inside
      */}
      <div className="w-full max-w-160 px-4 pb-24 relative">
        {children}

        {/* Bottom navigation stays inside the same width */}
        <BottomNav />
      </div>
    </div>
  );
}
