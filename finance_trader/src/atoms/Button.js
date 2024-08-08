import React from "react";

export const MultiuseButton = ({content, margin, rotation, hover, onClick}) => {
    return(
        <button type="button" 
            className={`${margin} ${rotation} ${hover} w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`} 
            onClick={()=>onClick()}
        >
            {content}   
        </button>
    )
  };