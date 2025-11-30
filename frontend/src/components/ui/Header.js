import React from 'react';
import { MdMenu } from 'react-icons/md';

export const Header = () => {

    return (
        <>
            <header className="bg-white border-b border-gray-300 px-6 py-3 flex items-center justify-between shadow-sm">
                {/* Left section */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <MdMenu size={24} className="text-gray-700" />
                        <h1 className="text-lg font-bold text-gray-800">VectorShift</h1>
                    </div>
                    <div className="h-6 w-px bg-gray-300"></div>
                    <span className="text-sm text-gray-600">Pipeline Builder</span>
                </div>
            </header>
        </>
    );
};
