// -------------------------------------------------------------
// Page: NotFoundPage
// Purpose:
// - Display a branded 404 screen consistent with the app layout.
// - Provides a "Back to Main Page" button.
// -------------------------------------------------------------

import { Link } from "react-router-dom";
import { Compass } from "lucide-react";
import PageContainer from "../components/PageContainer";
import AppHeader from "../components/layout/AppHeader";

export default function NotFoundPage() {
  return (
    <div className="page-bg min-h-screen safe-top safe-bottom flex flex-col">
      {/* ---------------------------------------------------------
         App Header - hideLogout removes the Logout button
      ---------------------------------------------------------- */}
      <AppHeader hideLogout />

      {/* ---------------------------------------------------------
         Page content wrapped in PageContainer
         - Ensures consistent spacing, max-width, padding.
      ---------------------------------------------------------- */}
      <PageContainer>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="w-full max-w-160 text-center space-y-6">
            {/* Icon container */}
            <div className="flex justify-center">
              <div className="h-16 w-16 rounded-2xl bg-cyan-400/10 border border-cyan-400/40 flex items-center justify-center shadow-[0_0_20px_rgba(0,229,255,0.5)]">
                <Compass className="h-8 w-8 text-cyan-300" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-semibold text-white">
              Page Not Found
            </h1>

            {/* Supporting text */}
            <p className="text-sm text-slate-300 leading-relaxed">
              Looks like you’ve wandered off the safe path.
              <br />
              The page you’re looking for doesn’t exist or has moved.
            </p>

            {/* Back button */}
            <div className="flex justify-center">
              <Link to="/" className="btn-base btn-cyan max-w-60">
                Back to Main Page
              </Link>
            </div>

            {/* Optional hint */}
            <p className="text-xs text-slate-500">
              If this keeps happening, check the URL or return to the dashboard.
            </p>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
