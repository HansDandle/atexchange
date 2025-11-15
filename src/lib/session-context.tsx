'use client';

import React, { createContext, useContext } from 'react';

interface SessionContextType {
  user: any;
  isLoading: boolean;
}

const SessionContext = createContext<SessionContextType>({ user: null, isLoading: true });

export function SessionProvider({ children, user, isLoading }: { children: React.ReactNode; user: any; isLoading: boolean }) {
  return (
    <SessionContext.Provider value={{ user, isLoading }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}