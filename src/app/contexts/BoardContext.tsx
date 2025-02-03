'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { agentList, featureList } from '../data/boardData';
import { HexState } from '../types/types';

// Move these from HexagonBoard.tsx
const createHexState = (agent: string, feature: string, terrain: string): HexState => ({
  agent,
  feature,
  terrain,
});

interface BoardContextType {
    board: HexState[][];
    setBoard: React.Dispatch<React.SetStateAction<HexState[][]>>;
    selectedHexagon: { rowIndex: number, cellIndex: number } | null;
    setSelectedHexagon: React.Dispatch<React.SetStateAction<{ rowIndex: number, cellIndex: number } | null>>;
    addFeature: (feature: string) => void;
  }

const generateInitialBoard = (): HexState[][] => {
  const emptyHex = () => createHexState('', '', '');
  const agentHex = () => createHexState('🕴️', '', '');

  const initialBoard = [
    Array(19).fill(null).map(emptyHex),
    [emptyHex(), agentHex(), ...Array(17).fill(null).map(emptyHex)],
    ...Array(14).fill(null).map(() => Array(19).fill(null).map(emptyHex))
  ];

  agentList.forEach(agent => {
    initialBoard[agent.hex.rowIndex][agent.hex.cellIndex].agent = agent.agent;
  });

  featureList.forEach(feature => {
    initialBoard[feature.hex.rowIndex][feature.hex.cellIndex].feature = feature.type;
  });

  return initialBoard;
};

export const BoardContext = createContext<BoardContextType | undefined>(undefined);

export const useBoardContext = () => {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error('useBoardContext must be used within a BoardProvider');
  }
  return context;
};

export const BoardProvider = ({ children }: { children: ReactNode }) => {
  const [board, setBoard] = useState<HexState[][]>(generateInitialBoard());
  const [selectedHexagon, setSelectedHexagon] = useState<{ rowIndex: number, cellIndex: number } | null>(null);

  const addFeature = (feature: string) => {
    if (!selectedHexagon) return;
    
    const newBoard = board.map(row => [...row]);
    newBoard[selectedHexagon.rowIndex][selectedHexagon.cellIndex].feature = feature;
    setBoard(newBoard);
    // setSelectedHexagon(null);
  };

  return (
    <BoardContext.Provider value={{ board, setBoard, selectedHexagon, setSelectedHexagon, addFeature }}>
      {children}
    </BoardContext.Provider>
  );
};
