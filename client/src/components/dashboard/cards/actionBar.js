import React, { useState } from 'react'

function ActionBar({view, setView}) {

  return (
    <div className="cursor-pointer transition duration-500 hover:border-emerald-700 flex justify-between bg-white h-12 rounded border border-neutral-100 shadow p-2 w-full">
        <div>
            <button 
            onClick={() => setView('verifications')}
            className={view === "verifications" 
            ? "transition duration-400 rounded pt-1 pb-1 pl-6 pr-6 text-white bg-emerald-600"
            :"transition duration-400 rounded pt-1 pb-1 pl-6 pr-6 bg-emerald-700 text-white hover:bg-emerald-600"}>
                Pre-Liminary Verifications
            </button>
        </div>
    </div>
  )
}

export default ActionBar