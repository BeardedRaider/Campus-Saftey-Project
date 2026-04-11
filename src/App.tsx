import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Layout from "./components/Layout";
import PageContainer from "./components/PageContainer";
import BottomNav from "./components/BottomNav";
import AppHeader from "./components/layout/AppHeader";
import LandingFooter from "./components/landing/LandingFooter";

export default function App() {
  return (
    <Layout>
      <div className="safe-top safe-bottom min-h-screen flex flex-col">
        <AppHeader />
        {/* Authenticated Header */}
        <PageContainer>
          {/* This Suspense wrapper allows us to show a loading state while the page component is being loaded. Stopping the page from "flashing" */}
          <Suspense fallback={<div className="page-bg min-h-screen" />}>
            <Outlet /> {/* This is where each page appears */}
          </Suspense>
        </PageContainer>
        <BottomNav /> {/* Persistent bottom navigation */}
        <LandingFooter />
      </div>
    </Layout>
  );
}
