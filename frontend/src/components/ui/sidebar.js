import React, { useState } from 'react'
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import { DraggableNode } from '../../draggableNode';



const Sidebar = () => {
    const [open, setOpen] = useState(true);
    return (
        <div className={`${open ? "min-w-64" : "min-w-16"} overflow-hidden transition-all duration-300 ease-in-out bg-white border rounded-xl shadow-sm border-gray-300 h-[calc(100vh-76px)] flex flex-col animate-slideDown`}>
            {/* Header */}
            <div className='px-4 py-4 border-b border-gray-300 bg-gradient-to-b from-gray-50 to-white'>
                <div className={`flex items-center ${open ? 'justify-between' : 'justify-center'}`}>
                    {open && (
                        <div className='flex items-center gap-2 transition-opacity duration-200'>
                            <h2 className='text-sm font-semibold text-gray-700 uppercase tracking-wide whitespace-nowrap'>
                                Components
                            </h2>
                        </div>
                    )}
                    {open ? (
                        <GoSidebarExpand
                            size={18}
                            onClick={() => setOpen(false)}
                            className='cursor-pointer text-gray-500 hover:text-gray-700 hover:scale-110 transition-all duration-150 flex-shrink-0'
                            title="Collapse Sidebar"
                        />
                    ) : (
                        <GoSidebarCollapse
                            size={18}
                            onClick={() => setOpen(true)}
                            className='cursor-pointer text-gray-500 hover:text-gray-700 hover:scale-110 transition-all duration-150'
                            title="Expand Sidebar"
                        />
                    )}
                </div>
            </div>

            {/* Nodes Section */}
            <div className='flex-1 overflow-y-auto p-3'>
                <div className='space-y-1'>
                    <DraggableNode type='text' label='Text' collapsed={!open} />
                    <DraggableNode type='number' label='Number' collapsed={!open} />
                    <DraggableNode type='checkbox' label='Checkbox' collapsed={!open} />
                    <DraggableNode type='date' label='Date' collapsed={!open} />
                    <DraggableNode type='select' label='Dropdown' collapsed={!open} />
                </div>
            </div>
        </div>
    )
}

export default Sidebar