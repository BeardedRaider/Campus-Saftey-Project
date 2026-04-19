// -------------------------------------------------------------
// AppVersionProvider
// Purpose: Provide a global "version" number that forces a SAFE
// remount of the app when bumpVersion() is called.
//
// - Does NOT remount on navigation
// - Does NOT break tracking
// - Used for login, settings save, and PWA resume
// -------------------------------------------------------------

import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface AppVersionContextValue {
  version: number;
  bumpVersion: () => void;
}

const AppVersionContext = createContext<AppVersionContextValue>({
  version: 0,
  bumpVersion: () => {},
});

interface ProviderProps {
  children: ReactNode; // FIXED TYPE
}

export function AppVersionProvider({ children }: ProviderProps) {
  const [version, setVersion] = useState(0);

  const bumpVersion = () => setVersion((v) => v + 1);

  return (
    <AppVersionContext.Provider value={{ version, bumpVersion }}>
      {children}
    </AppVersionContext.Provider>
  );
}

export function useAppVersion() {
  return useContext(AppVersionContext);
}
