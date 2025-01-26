'use client'

import React, { useState } from 'react';
import { v4 } from 'uuid';

// const initialBoard: string[][] = [
//     ['text-blue-800'],
//     ['text-blue-800'],
//     ['text-blue-800'],
//     ['text-blue-800'],
//     ['text-blue-800'],
//   ];
// const initialBoard: string[][] = [
//     ['text-blue-800', 'text-blue-800', 'text-blue-800', 'text-blue-800', 'text-blue-800', 'text-blue-800', 'text-blue-800', 'text-blue-800', 'text-blue-800', 'text-blue-800'],
//     ['text-blue-800', 'text-blue-800', 'text-blue-800', 'text-blue-800', 'text-blue-800', 'text-blue-800', 'text-blue-800', 'text-blue-800', 'text-blue-800', 'text-blue-800'],
//     ['text-blue-800', 'text-blue-800', 'text-blue-800', 'text-blue-800', 'text-blue-800', 'text-blue-800', 'text-blue-800', 'text-blue-800', 'text-blue-800', 'text-blue-800'],
//     ['text-blue-800', 'text-blue-800', 'text-blue-800', 'text-blue-800', 'text-blue-800', 'text-blue-800', 'text-blue-800', 'text-blue-800', 'text-blue-800', 'text-blue-800'],
//     ['text-blue-800', 'text-blue-800', 'text-blue-800', 'text-blue-800', 'text-blue-800', 'text-blue-800', 'text-blue-800', 'text-blue-800', 'text-blue-800', 'text-blue-800'],
//     ['text-blue-800', 'text-blue-800', 'text-blue-800', 'text-blue-800', 'text-blue-800', 'text-blue-800', 'text-blue-800', 'text-blue-800', 'text-blue-800', 'text-blue-800'],
//     ['text-blue-800', 'text-blue-800', 'text-blue-800', 'text-blue-800', 'text-blue-800', 'text-blue-800', 'text-blue-800', 'text-blue-800', 'text-blue-800', 'text-blue-800'],
//     ['text-blue-800', 'text-blue-800', 'text-blue-800', 'text-blue-800', 'text-blue-800', 'text-blue-800', 'text-blue-800', 'text-blue-800', 'text-blue-800', 'text-blue-800'],
//   ];
// const initialBoard: string[][] = [
//     ['text-blue-800'],
//   ];
const initialBoard: string[][] = [
    [' ', ' ', ' ', ' ', ' ',' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', '🕴️', '🌳', ' ', ' ',' ', ' ', '🌳', ' ', ' ', ' ', '🌳', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', '🐅', '🌳', ' ', ' ', ' ', '🌳', '🦌', ' '],
    [' ', ' ', '🌳', '🌳', '🌳', ' ', ' ', '🪨', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', '🌳', ' ', '🌳', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', '🌳', ' ', ' ',' ', ' ', '🌳', ' ', ' ', ' ', '🌳', ' ', ' '],
    [' ', ' ', '🌳', '🛖', ' ',' ', ' ', ' ', ' ', ' ', '🪨', '🌳', ' ', ' '],
    [' ', ' ', '🌳', ' ', ' ',' ', '🪨', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', '🌳', ' ', ' ',' ', ' ', ' ', ' ', '🦌', ' ', ' ', ' ', ' '],
    [' ', ' ', '🌳', ' ', ' ',' ', '🪨', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', '🌳', ' ', ' ',' ', '🪨', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ',' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  ];

const HexagonBoard = () => {
  const [board, setBoard] = useState(initialBoard)    
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
    newBoard[rowIndex][cellIndex] = board[selectedRowIndex][selectedCellIndex]
    newBoard[selectedRowIndex][selectedCellIndex] = ' '
    setBoard(newBoard)
    setSelectedHexagon(null)

  }

 console.log('---> selectedHexagon', selectedHexagon)

  return (
    <div
      className='bg-orange-900 pl-8'      
      style={{ width: `60rem`, height: `39rem`, overflow: 'hidden'}}            
    >    
      <div 
        data-testid="board"
        className="relative w-16 h-16"        
      >
        { board && board.map((row: string[],rowIndex: number) => 
            row.map((cell, cellIndex) => {
                const cellTop = rowIndex * 79;
                const cellLeft = rowIndex % 2 === 0 ? cellIndex * 104 : cellIndex*2*52-52
                if(cell==='') return null
                const isSelectedHex = selectedHexagon?.rowIndex === rowIndex && selectedHexagon?.cellIndex === cellIndex
                
                if(isSelectedHex) console.log('---> isSelectedHex', 
                  isSelectedHex, 
                  selectedHexagon?.rowIndex,
                  rowIndex,
                  selectedHexagon?.cellIndex, 
                  cellIndex)
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
                      <span className='text-4xl'>{cell}</span>
                      {/* {rowIndex}-{cellIndex} */}
                    </div>        
                )
            }))}
      </div>
    </div>
  );
};

export default HexagonBoard;