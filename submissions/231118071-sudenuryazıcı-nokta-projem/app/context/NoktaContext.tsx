import React, { createContext, useContext, useState } from 'react';

export interface Nokta {
  id: string;
  title: string;
  problem: string;
  user: string;
  constraints: string;
  specReport: string;
  score: number;
  status: 'VERIFIED' | 'ANALYZING' | 'ACTIVE';
  timestamp: number;
}

interface NoktaContextType {
  noktalar: Nokta[];
  addNokta: (data: Omit<Nokta, 'id' | 'score' | 'status' | 'timestamp'>, explicitScore?: number) => void;
}

const NoktaContext = createContext<NoktaContextType | undefined>(undefined);

export function NoktaProvider({ children }: { children: React.ReactNode }) {
  const [noktalar, setNoktalar] = useState<Nokta[]>([]);

  const addNokta = (data: Omit<Nokta, 'id' | 'score' | 'status' | 'timestamp'>, explicitScore?: number) => {
    // Dynamic Scoring Logic
    const totalLength = data.title.length + data.problem.length + data.user.length + data.constraints.length;
    let finalScore = explicitScore || Math.min(70 + Math.floor(totalLength / 15), 98);
    
    // Penalize extremely short answers (minimum requirement)
    if (totalLength < 40) finalScore -= 10;

    const newNokta: Nokta = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      score: finalScore,
      status: 'VERIFIED',
      timestamp: Date.now(),
    };
    setNoktalar(prev => [newNokta, ...prev]);
  };

  return (
    <NoktaContext.Provider value={{ noktalar, addNokta }}>
      {children}
    </NoktaContext.Provider>
  );
}

export function useNoktalar() {
  const context = useContext(NoktaContext);
  if (context === undefined) {
    throw new Error('useNoktalar must be used within a NoktaProvider');
  }
  return context;
}
