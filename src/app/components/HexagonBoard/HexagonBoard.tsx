import React from 'react';

const initialBoard: string[][] = [
    ['text-blue-800', 'text-blue-800', 'text-blue-800', 'text-blue-800', 'text-blue-800', 'text-blue-800', 'text-blue-800', 'text-blue-800'],
    Array(8).fill('text-blue-800'),
    Array(8).fill('text-blue-800'),
    Array(8).fill('text-blue-800'),
    Array(8).fill('text-blue-800'),
    Array(8).fill('text-blue-800'),
    Array(8).fill('text-blue-800'),
    Array(8).fill('text-blue-800'),
  ];

const HexagonBoard = () => {
  return (
    <>
      <div className="relative w-36 h-36">
        {/* { initialBoard && initialBoard.map((col: string[],index: number) => {

            return (
                <div key={`${col}${index}`} className="absolute w-[55.5%] pb-[86.6%] bg-current text-blue-800 clip-hex top-0 left-[55.5%]"></div>        
        )})} */}
        <div className="absolute w-[55.5%] pb-[86.6%] bg-current text-blue-800 clip-hex top-[54%] left-[0%]"></div>
        <div className="absolute w-[55.5%] pb-[86.6%] bg-current text-blue-800 clip-hex top-[27%] left-[43%]"></div>
        <div className="absolute w-[55.5%] pb-[86.6%] bg-current text-blue-800 clip-hex top-[81%] left-[43%]"></div>
        <div className="absolute w-[55.5%] pb-[86.6%] bg-current text-blue-800 clip-hex top-0 left-[86%]"></div>
        <div className="absolute w-[55.5%] pb-[86.6%] bg-current text-blue-800 clip-hex top-[54%] left-[86%]"></div>
        <div className="absolute w-[55.5%] pb-[86.6%] bg-current text-blue-800 clip-hex top-[108%] left-[86%]"></div>
        <div className="absolute w-[55.5%] pb-[86.6%] bg-current text-blue-800 clip-hex top-[27%] left-[129%]"></div>
        <div className="absolute w-[55.5%] pb-[86.6%] bg-current text-blue-800 clip-hex top-[81%] left-[129%]"></div>
      </div>

      {/* <svg style={{ visibility: 'hidden', position: 'absolute' }} width="0" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <clipPath id="hexClip" clipPathUnits="objectBoundingBox">
            <polygon points="0.25 0, 0.75 0, 1 0.5, 0.75 1, 0.25 1, 0 0.5" />
          </clipPath>
        </defs>
      </svg> */}
    </>
  );
};

export default HexagonBoard;