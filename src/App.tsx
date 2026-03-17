import { Outlet } from "react-router-dom";
import Layout from "./components/Layout";
import PageContainer from "./components/PageContainer";
import BottomNav from "./components/BottomNav";

export default function App() {
  return (
    <Layout>
      <div className="safe-top safe-bottom min-h-screen flex flex-col">
        <PageContainer>
          <Outlet /> {/* This is where each page appears */}
        </PageContainer>

        <BottomNav /> {/* Persistent bottom navigation */}
      </div>
    </Layout>
  );
}
