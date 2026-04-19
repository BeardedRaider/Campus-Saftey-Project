// -------------------------------------------------------------
// AppVersionProvider (FINAL — NO REMOUNTING AT ALL)
// -------------------------------------------------------------

import { createContext, useContext, useState } from "react";

interface AppVersionContextValue {
  version: number;
  bumpVersion: () => void;
}

const AppVersionContext = createContext<AppVersionContextValue | null>(null);

export function AppVersionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [version, setVersion] = useState(0);

  const bumpVersion = () => {
    setVersion((v) => v + 1);
    console.log("App version bumped:", version + 1);
  };

  return (
    <AppVersionContext.Provider value={{ version, bumpVersion }}>
      {children} {/* ❗ NO key here */}
    </AppVersionContext.Provider>
  );
}

export function useAppVersion() {
  const ctx = useContext(AppVersionContext);
  if (!ctx)
    throw new Error("useAppVersion must be used inside AppVersionProvider");
  return ctx;
}
