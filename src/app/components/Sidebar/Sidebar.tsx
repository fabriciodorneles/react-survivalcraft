'use client'

import { useBoardContext } from "@/app/contexts/BoardContext";

export const Sidebar = () => {
    const { addFeature } = useBoardContext();

    return (
        <div className="bg-orange-400 p-2 w-60 flex flex-col gap-2">
            React Survival Craft
            <button className="bg-gray-900 p-2 text-white">Farm</button>            
            <button 
                className="bg-gray-900 p-2 text-white"
                onClick={() => addFeature('💩')}
            >
                Pop
            </button>            
        </div>
    )
}