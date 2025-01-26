'use client'

import React, { useState } from 'react';
import { v4 } from 'uuid';

interface HexState {  
  agent: string;
  environment: string;
  terrain: string;
}

const createHexState = (agent: string, environment: string, terrain: string): HexState => ({
  agent,
  environment,
  terrain,
});

const generateInitialBoard = (): HexState[][] => {
  const emptyHex = () => createHexState(' ', '', '');
  const agentHex = () => createHexState('🕴️', '', '');
  const environmentHex = () => createHexState('', '🌳', '');
  const tigerHex = () => createHexState('🐅', '', '');
  const deerHex = () => createHexState('🦌', '', '');
  const rockHex = () => createHexState('', '🪨', '');
  const houseHex = () => createHexState('', '🛖', '');

  return [
    Array(19).fill(null).map(emptyHex),
    [emptyHex(), agentHex(), environmentHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), environmentHex(), emptyHex(), emptyHex(), emptyHex(), environmentHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex()],
    [emptyHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), tigerHex(), environmentHex(), emptyHex(), emptyHex(), emptyHex(), environmentHex(), deerHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex()],
    [emptyHex(), emptyHex(), environmentHex(), environmentHex(), environmentHex(), emptyHex(), emptyHex(), rockHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex()],
    [emptyHex(), environmentHex(), emptyHex(), environmentHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex()],
    [emptyHex(), emptyHex(), environmentHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), environmentHex(), emptyHex(), emptyHex(), emptyHex(), environmentHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex()],
    [emptyHex(), emptyHex(), environmentHex(), houseHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), rockHex(), environmentHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex()],
    [emptyHex(), emptyHex(), environmentHex(), emptyHex(), emptyHex(), emptyHex(), rockHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex()],
    [emptyHex(), emptyHex(), environmentHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), deerHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex()],
    [emptyHex(), emptyHex(), environmentHex(), emptyHex(), emptyHex(), emptyHex(), rockHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex()],
    [emptyHex(), emptyHex(), environmentHex(), emptyHex(), emptyHex(), emptyHex(), rockHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex(), emptyHex()],
    Array(19).fill(null).map(emptyHex),
    Array(19).fill(null).map(emptyHex),
    Array(19).fill(null).map(emptyHex),
    Array(19).fill(null).map(emptyHex),
    Array(19).fill(null).map(emptyHex),
  ];
};

const initialBoard = generateInitialBoard();

const HexagonBoard = () => {
  const [board, setBoard] = useState<HexState[][]>(initialBoard);
  const [selectedHexagon, setSelectedHexagon] = useState<{ rowIndex: number, cellIndex: number } | null>(null)

  const handleClick = (rowIndex: number, cellIndex: number) => {
    if(!selectedHexagon){
      setSelectedHexagon({rowIndex, cellIndex})
    }

    if(selectedHexagon && isInMoveRange(rowIndex, cellIndex)) {
      moveCreature(rowIndex, cellIndex)
    }

    if(selectedHexagon && !isInMoveRange(rowIndex, cellIndex)) {
      setSelectedHexagon(null)
    }
      
  }

  const isInMoveRange = (rowIndex: number, cellIndex: number) => {
    if(!selectedHexagon) return false
    const { rowIndex: selectedRowIndex, cellIndex: selectedCellIndex } = selectedHexagon
    const sides = selectedRowIndex === rowIndex && ((selectedCellIndex - 1 === cellIndex) || (selectedCellIndex + 1 === cellIndex))
    const upDownCell = selectedRowIndex % 2 === 0 
      ? ((selectedCellIndex + 1 === cellIndex) || (selectedCellIndex === cellIndex))
      : ((selectedCellIndex - 1 === cellIndex) || (selectedCellIndex === cellIndex))

    const upDown = ((selectedRowIndex + 1 === rowIndex) || (selectedRowIndex - 1 === rowIndex)) && upDownCell
    return sides || upDown
  }

  const moveCreature = (rowIndex: number, cellIndex: number) => {
    const newBoard = board.map(row => [...row])
    if (!selectedHexagon) return;
    const { rowIndex: selectedRowIndex, cellIndex: selectedCellIndex } = selectedHexagon
    newBoard[rowIndex][cellIndex].agent = board[selectedRowIndex][selectedCellIndex].agent
    newBoard[selectedRowIndex][selectedCellIndex].agent = ' '
    setBoard(newBoard)
    setSelectedHexagon(null)
  } 

  return (
    <div
      className='bg-orange-900 pl-8'      
      style={{ width: `80rem`, height: `51.5rem`, overflow: 'hidden'}}            
    >    
      <div 
        data-testid="board"
        className="relative w-16 h-16"        
      >
        { board && board.map((row ,rowIndex: number) => 
            row.map((cell, cellIndex) => {
                const cellTop = rowIndex * 79;
                const cellLeft = rowIndex % 2 === 0 ? cellIndex * 104 : cellIndex*2*52-52                
                const isSelectedHex = selectedHexagon?.rowIndex === rowIndex && selectedHexagon?.cellIndex === cellIndex
                
                return (                    
                    <div 
                      key={v4()} 
                      className={`absolute w-[100%] h-[100%] flex items-center justify-center
                        cursor-pointer clip-hex 
                        ${isSelectedHex 
                          ? 'bg-green-500' 
                          : isInMoveRange(rowIndex,cellIndex) 
                            ? 'bg-green-200' 
                            : 'bg-orange-600'} 
                        
                      `}
                      style={{ top: `${cellTop}%`, left: `${cellLeft}%` }}
                      onClick={()=>handleClick(rowIndex, cellIndex)}
                    >
                      <span className='text-4xl' style={{ position: 'absolute', zIndex: 1 }}>{cell.environment}</span>
                      <span className='text-4xl' style={{ position: 'relative', zIndex: 2 }}>{cell.agent}</span>
                      {/* {rowIndex}-{cellIndex} */}
                    </div>        
                )
            }))}
      </div>
    </div>
  );
};

export default HexagonBoard;