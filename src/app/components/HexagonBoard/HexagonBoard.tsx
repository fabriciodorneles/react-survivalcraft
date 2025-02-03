'use client'

import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { useBoardContext } from '@/app/contexts/BoardContext';
import { agentState, playerState, turnState } from '@/app/types/types';
import { agentList } from '@/app/data/boardData';




const HexagonBoard = () => {
  const {  board, setBoard, selectedHexagon, setSelectedHexagon } = useBoardContext();
  const [playerState, setPlayerState] = useState<playerState>({ hex: { rowIndex: 1, cellIndex: 1 } });
  const [turn, setTurn] = useState<turnState>('player');

  useEffect(() => {
    if(turn === 'machine') {
      agentList.forEach(agent => moveNPC(agent))
      setTurn('player')
    }
    if(turn === 'player') {
      setSelectedHexagon(playerState.hex)
    }
  }, [turn])

  const moveNPC = (agent: agentState) => {
    const newBoard = board.map(row => [...row])    
    const boardWidth = 19; 
    const boardHeight = 15; 

    if(!agent) return
    const { rowIndex, cellIndex } = agent.hex
    const possibleMoves = [
      { rowIndex: rowIndex, cellIndex: cellIndex + 1 },
      { rowIndex: rowIndex, cellIndex: cellIndex - 1 },
      { rowIndex: rowIndex + 1, cellIndex: cellIndex + 1 },
      { rowIndex: rowIndex + 1, cellIndex: cellIndex },
      { rowIndex: rowIndex - 1, cellIndex: cellIndex },
      { rowIndex: rowIndex - 1, cellIndex: cellIndex - 1 },
      { rowIndex: rowIndex, cellIndex: cellIndex },
      { rowIndex: rowIndex, cellIndex: cellIndex },
      { rowIndex: rowIndex, cellIndex: cellIndex },
    ].filter(move => 
      move.rowIndex >= 0 && move.rowIndex < boardHeight &&
      move.cellIndex >= 0 && move.cellIndex < boardWidth
    );
    const move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)]
    if(rowIndex === move.rowIndex && cellIndex === move.cellIndex) return
    console.log('->', newBoard[move.rowIndex][move.cellIndex].agent)
    if(newBoard[move.rowIndex][move.cellIndex].agent !== '') return
    console.log(newBoard[rowIndex][cellIndex].agent, move.rowIndex, move.cellIndex, rowIndex, cellIndex)
    newBoard[move.rowIndex][move.cellIndex].agent = newBoard[rowIndex][cellIndex].agent
    newBoard[rowIndex][cellIndex].agent = ''
    agent.hex = move
    setBoard(newBoard)
  }

  const handleClick = (rowIndex: number, cellIndex: number) => {
    // if (turn === 'player') {
    //   setSelectedHexagon({ rowIndex, cellIndex });
      
      if (selectedHexagon && isInMoveRange(rowIndex, cellIndex)) {
        movePlayer(rowIndex, cellIndex);
      }
  };

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

  const movePlayer = (rowIndex: number, cellIndex: number) => {
    const newBoard = board.map(row => [...row])
    if (!selectedHexagon) return;
    const { rowIndex: selectedRowIndex, cellIndex: selectedCellIndex } = selectedHexagon
    newBoard[rowIndex][cellIndex].agent = board[selectedRowIndex][selectedCellIndex].agent
    newBoard[selectedRowIndex][selectedCellIndex].agent = ''
    setBoard(newBoard)
    setSelectedHexagon(null)
    setPlayerState({ hex: { rowIndex, cellIndex } })
    setTurn('machine')
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
                      <span className='text-4xl' style={{ position: 'absolute', zIndex: 2 }}>{cell.feature}</span>
                      <span className='text-4xl' style={{ position: 'relative', zIndex: 1 }}>{cell.agent}</span>
                      {/* {rowIndex}-{cellIndex} */}
                    </div>        
                )
            }))}
      </div>
    </div>
  );
};

export default HexagonBoard;