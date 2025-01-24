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
const initialBoard: string[][] = [
    ['', 'text-blue-800', 'text-blue-800', 'text-blue-800', '',''],
    ['', 'text-blue-800', 'text-blue-800', 'text-blue-800', 'text-blue-800', ''],
    ['text-blue-800', 'text-blue-800', 'text-blue-800', 'text-blue-800', 'text-blue-800'],
    ['', 'text-blue-800', 'text-blue-800', 'text-blue-800', 'text-blue-800', ''],
    ['', 'text-blue-800', 'text-blue-800', 'text-blue-800', '','']
  ];

const HexagonBoard = () => {
  const [board, setBoard] = useState(initialBoard)  
  return (
    <>
      <div className="relative w-36 h-36">
        { board && board.map((row: string[],rowIndex: number) => 
            row.map((cel, cellIndex) => {
                const cellTop = rowIndex * 54;
                const cellLeft = rowIndex % 2 === 0 ? cellIndex * 58 : cellIndex*2*29-29
                if(cel==='') return null
                return (                    
                    <div 
                        key={v4()} 
                        className={`absolute w-[55.5%] pb-[86%] bg-current text-blue-800 clip-hex`}
                        style={{ top: `${cellTop}%`, left: `${cellLeft}%` }}
                    ></div>        
                )
            }))}
            
        {/* <div className="absolute w-[55.5%] pb-[86.6%] bg-current text-blue-800 clip-hex top-[0%] left-[58%]"></div>
        <div className="absolute w-[55.5%] pb-[86.6%] bg-current text-blue-800 clip-hex top-[0%] left-[116%]"></div>
        <div className="absolute w-[55.5%] pb-[86.6%] bg-current text-blue-800 clip-hex top-[0%] left-[174%]"></div>
        <div className="absolute w-[55.5%] pb-[86.6%] bg-current text-blue-800 clip-hex top-[0%] left-[232%]"></div>
        <div className="absolute w-[55.5%] pb-[86.6%] bg-current text-blue-800 clip-hex top-[0%] left-[290%]"></div>
        <div className="absolute w-[55.5%] pb-[86.6%] bg-current text-blue-800 clip-hex top-[0%] left-[348%]"></div>

        <div className="absolute w-[55.5%] pb-[86.6%] bg-current text-blue-800 clip-hex top-[54%] left-[29%]"></div>
        <div className="absolute w-[55.5%] pb-[86.6%] bg-current text-blue-800 clip-hex top-[54%] left-[87%]"></div>
        <div className="absolute w-[55.5%] pb-[86.6%] bg-current text-blue-800 clip-hex top-[54%] left-[145%]"></div>
        <div className="absolute w-[55.5%] pb-[86.6%] bg-current text-blue-800 clip-hex top-[54%] left-[203%]"></div>
        <div className="absolute w-[55.5%] pb-[86.6%] bg-current text-blue-800 clip-hex top-[54%] left-[261%]"></div>
        <div className="absolute w-[55.5%] pb-[86.6%] bg-current text-blue-800 clip-hex top-[54%] left-[319%]"></div>

        <div className="absolute w-[55.5%] pb-[86.6%] bg-current text-blue-800 clip-hex top-[108%] left-[0%]"></div>
        <div className="absolute w-[55.5%] pb-[86.6%] bg-current text-blue-800 clip-hex top-[108%] left-[58%]"></div>
        <div className="absolute w-[55.5%] pb-[86.6%] bg-current text-blue-800 clip-hex top-[108%] left-[116%]"></div>
        <div className="absolute w-[55.5%] pb-[86.6%] bg-current text-blue-800 clip-hex top-[108%] left-[174%]"></div>
        <div className="absolute w-[55.5%] pb-[86.6%] bg-current text-blue-800 clip-hex top-[108%] left-[232%]"></div>
        <div className="absolute w-[55.5%] pb-[86.6%] bg-current text-blue-800 clip-hex top-[108%] left-[290%]"></div>
        <div className="absolute w-[55.5%] pb-[86.6%] bg-current text-blue-800 clip-hex top-[108%] left-[348%]"></div>

        <div className="absolute w-[55.5%] pb-[86.6%] bg-current text-blue-800 clip-hex top-[162%] left-[29%]"></div>
        <div className="absolute w-[55.5%] pb-[86.6%] bg-current text-blue-800 clip-hex top-[162%] left-[87%]"></div>
        <div className="absolute w-[55.5%] pb-[86.6%] bg-current text-blue-800 clip-hex top-[162%] left-[145%]"></div>
        <div className="absolute w-[55.5%] pb-[86.6%] bg-current text-blue-800 clip-hex top-[162%] left-[203%]"></div>
        <div className="absolute w-[55.5%] pb-[86.6%] bg-current text-blue-800 clip-hex top-[162%] left-[261%]"></div>
        <div className="absolute w-[55.5%] pb-[86.6%] bg-current text-blue-800 clip-hex top-[162%] left-[319%]"></div>

        <div className="absolute w-[55.5%] pb-[86.6%] bg-current text-blue-800 clip-hex top-[216%] left-[58%]"></div>
        <div className="absolute w-[55.5%] pb-[86.6%] bg-current text-blue-800 clip-hex top-[216%] left-[116%]"></div>
        <div className="absolute w-[55.5%] pb-[86.6%] bg-current text-blue-800 clip-hex top-[216%] left-[174%]"></div>
        <div className="absolute w-[55.5%] pb-[86.6%] bg-current text-blue-800 clip-hex top-[216%] left-[232%]"></div>
        <div className="absolute w-[55.5%] pb-[86.6%] bg-current text-blue-800 clip-hex top-[216%] left-[290%]"></div>
        <div className="absolute w-[55.5%] pb-[86.6%] bg-current text-blue-800 clip-hex top-[216%] left-[348%]"></div>

        <div className="absolute w-[55.5%] pb-[86.6%] bg-current text-blue-800 clip-hex top-[270%] left-[29%]"></div>
        <div className="absolute w-[55.5%] pb-[86.6%] bg-current text-blue-800 clip-hex top-[270%] left-[87%]"></div>
        <div className="absolute w-[55.5%] pb-[86.6%] bg-current text-blue-800 clip-hex top-[270%] left-[145%]"></div>
        <div className="absolute w-[55.5%] pb-[86.6%] bg-current text-blue-800 clip-hex top-[270%] left-[203%]"></div>
        <div className="absolute w-[55.5%] pb-[86.6%] bg-current text-blue-800 clip-hex top-[270%] left-[261%]"></div>
        <div className="absolute w-[55.5%] pb-[86.6%] bg-current text-blue-800 clip-hex top-[270%] left-[319%]"></div> */}
      </div>
    </>
  );
};

export default HexagonBoard;