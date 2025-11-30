import { useEffect, useState } from 'react'
import { Handle, Position } from 'reactflow'
import { calculateDimensions, calculateHandlePosition, extractVariables } from '../../utils';

export const TextNode = ({ id, data, selected }) => {
    const [text, setText] = useState(data.text || '');
    const [variables, setVariables] = useState([]);
    const [dimensions, setDimensions] = useState({ width: 200, height: 120 });

    useEffect(() => {
        const extracted = extractVariables(text);
        setVariables(extracted);
    }, [text]);

    useEffect(() => {
        const newDims = calculateDimensions(text);
        setDimensions(newDims);
    }, [text]);

    return (
        <div
            className={`bg-white rounded-lg shadow-md border-2 transition-all duration-200 ${
                selected
                    ? 'border-blue-500 shadow-lg ring-2 ring-blue-200'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
            }`}
            style={{ width: dimensions.width, minHeight: dimensions.height }}
        >
            {/* Node Header */}
            <div className="px-3 py-2 bg-gray-50 border-b border-gray-200 rounded-t-lg">
                <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                    Text
                </span>
            </div>

            {/* Node Content */}
            <div className="p-3">
                <label className="text-xs font-medium text-gray-600 mb-1 block">
                    Text Content
                </label>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none font-mono"
                    style={{
                        height: `${Math.max(dimensions.height - 80, 60)}px`,
                        minHeight: '60px'
                    }}
                    placeholder="Enter text here... Use {{ variableName }} to create input handles"
                />

                {/* Variable indicators */}
                {variables.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                        {variables.map((variable) => (
                            <span
                                key={variable}
                                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                            >
                                {variable}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Dynamic variable handles on the left */}
            {variables.map((variable, index) => (
                <Handle
                    key={variable}
                    type="target"
                    position={Position.Left}
                    id={`${id}-${variable}`}
                    className="w-3 h-3 !bg-blue-500 border-2 border-white transition-transform duration-200 hover:scale-150"
                    style={{ top: `${calculateHandlePosition(index, variables.length)}%` }}
                />
            ))}

            {/* Static output handle on right */}
            <Handle
                type="source"
                position={Position.Right}
                id={`${id}-output`}
                className="w-3 h-3 !bg-blue-500 border-2 border-white transition-transform duration-200 hover:scale-150"
            />
        </div>
    );
};