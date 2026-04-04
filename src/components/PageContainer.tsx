// -------------------------------------------------------------
// Component: PageContainer
// Purpose: Provides consistent spacing for all app pages.
//
// This wrapper:
// - Applies standard top/bottom padding (matching landing page rhythm)
// - Ensures consistent horizontal spacing across all screens
// - Inherits the 640px max-width from Layout
// - Keeps the layout mobile-first and responsive
//
// Notes:
// - We avoid fixed heights or widths here to prevent "mobile frame" issues.
// - Individual pages can add their own spacing inside this container.
// -------------------------------------------------------------

import type { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
}

export default function PageContainer({ children }: PageContainerProps) {
  return <div className="px-4 py-6">{children}</div>;
}
