import React, { useState } from "react";

const Modal = ( {form, title} ) =>{
    const [showModal, setShowModal] = useState(false);

    return(
        <>
        <button 
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" 
        type="button"
        onClick={()=>setShowModal(true)}
        >
            Toggle modal
        </button>
 {/* MODAL */}       
        {showModal ?(
        <div 
        id="crud-modal" 
        tabIndex="-1" 
        aria-hidden="true" 
        className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
        >
        <div className="relative w-full max-w-md p-4">
            {/* <!-- Modal content --> */}
            <div className="relative bg-white rounded-lg shadow-lg dark:bg-gray-700 p-6">
            {/* <!-- Modal header --> */}
            <div className="flex items-center justify-between mb-4 border-b pb-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {title}
                </h3>
                <button 
                type="button" 
                className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg p-2 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" 
                onClick={() => setShowModal(false)}
                >
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l6 6m0 0l6 6M7 7L1 13m6-6L13 1" />
                </svg>
                <span className="sr-only">Close modal</span>
                </button>
            </div>
            {/* <!-- Modal body --> */}
            <div>
                {form}
            </div>
            </div>
        </div>
        </div>
        ) : 
        null}
    </> 
    )
}

export default Modal;