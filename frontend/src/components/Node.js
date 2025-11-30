import { useState } from 'react';
import { Handle, useReactFlow } from 'reactflow';
import { MdContentCopy, MdDelete } from 'react-icons/md';

export const WrapperNode = ({ id, data, selected }) => {
    const { handleConfig, title, inputConfig, width = 200 } = data;
    const { deleteElements, getNode, addNodes } = useReactFlow();
    const [errors, setErrors] = useState({});

    const [fields, setFields] = useState(() => {
        const initialState = {};
        inputConfig?.forEach(f => {
            initialState[f.name] = f.defaultValue;
        })
        return initialState;
    })


    const handleFieldChange = (field, value) => {
        setFields(prev => ({
            ...prev,
            [field]: value
        }))
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: null
            }))
        }
    }

    const handleDelete = (e) => {
        e.stopPropagation();
        deleteElements({ nodes: [{ id }] });
    }

    const handleDuplicate = (e) => {
        e.stopPropagation();
        const node = getNode(id);
        if (node) {
            const newNode = {
                ...node,
                id: `${node.type}-${Date.now()}`,
                position: {
                    x: node.position.x + 20,
                    y: node.position.y + 20
                },
                selected: false
            };
            addNodes(newNode);
        }
    }

    const validateField = (field) => {
        const config = inputConfig?.find(f => f.name === field);
        if (!config) return true;

        const value = fields[field];

        // Add validation logic
        if (config.required && !value) {
            setErrors(prev => ({
                ...prev,
                [field]: 'This field is required'
            }));
            return false;
        }

        return true;
    }

    return (
        <div
            className={`bg-white rounded-lg shadow-md border-2 transition-all duration-200 ${selected
                ? 'border-blue-500 shadow-sm ring-2 ring-blue-200'
                : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
            style={{ width, minHeight: '80px' }}
        >
            {/* Node Header */}
            <div className="px-3 py-2 bg-gray-50 border-b border-gray-200 rounded-t-lg flex items-center justify-between group">
                <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">{title}</span>
                <div className={`flex gap-1 transition-opacity duration-150 ${selected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                    <button
                        onClick={handleDuplicate}
                        className="p-1 hover:bg-gray-200 rounded transition-colors duration-150"
                        title="Duplicate"
                    >
                        <MdContentCopy size={14} className="text-gray-600" />
                    </button>
                    <button
                        onClick={handleDelete}
                        className="p-1 hover:bg-red-100 rounded transition-colors duration-150"
                        title="Delete"
                    >
                        <MdDelete size={14} className="text-red-600" />
                    </button>
                </div>
            </div>

            {/* Node Content */}
            <div className="p-3 space-y-2">
                {inputConfig?.map((fl, idx) => (
                    <div key={idx} className="flex flex-col gap-1">
                        <label className="text-xs font-medium text-gray-600">
                            {fl.label}
                            {fl.required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                        {fl.type === "text" && (
                            <>
                                <input
                                    type='text'
                                    className={`w-full px-2 py-1.5 text-xs border rounded focus:outline-none focus:ring-1 transition-colors ${errors[fl.name]
                                            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                                            : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                        }`}
                                    value={fields[fl.name] || ''}
                                    onChange={(e) => handleFieldChange(fl.name, e.target.value)}
                                    onBlur={() => validateField(fl.name)}
                                />
                                {errors[fl.name] && (
                                    <span className="text-xs text-red-500">{errors[fl.name]}</span>
                                )}
                            </>
                        )}
                        {fl.type === 'select' && (
                            <>
                                <select
                                    className={`w-full px-2 py-1.5 text-xs border rounded focus:outline-none focus:ring-1 bg-white transition-colors ${errors[fl.name]
                                            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                                            : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                        }`}
                                    value={fields[fl.name] || ''}
                                    onChange={(e) => handleFieldChange(fl.name, e.target.value)}
                                    onBlur={() => validateField(fl.name)}
                                >
                                    {fl.options?.map((opt, i) => (
                                        <option key={i} value={opt}>{opt}</option>
                                    ))}
                                </select>
                                {errors[fl.name] && (
                                    <span className="text-xs text-red-500">{errors[fl.name]}</span>
                                )}
                            </>
                        )}
                        {fl.type === 'number' && (
                            <>
                                <input
                                    type='number'
                                    className={`w-full px-2 py-1.5 text-xs border rounded focus:outline-none focus:ring-1 transition-colors ${errors[fl.name]
                                            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                                            : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                        }`}
                                    value={fields[fl.name] || ''}
                                    onChange={(e) => handleFieldChange(fl.name, e.target.value)}
                                    onBlur={() => validateField(fl.name)}
                                />
                                {errors[fl.name] && (
                                    <span className="text-xs text-red-500">{errors[fl.name]}</span>
                                )}
                            </>
                        )}
                        {fl.type === 'checkbox' && (
                            <input
                                type='checkbox'
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                checked={fields[fl.name] || false}
                                onChange={(e) => handleFieldChange(fl.name, e.target.checked)}
                            />
                        )}
                        {fl.type === 'date' && (
                            <>
                                <input
                                    type='date'
                                    className={`w-full px-2 py-1.5 text-xs border rounded focus:outline-none focus:ring-1 transition-colors ${errors[fl.name]
                                            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                                            : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                        }`}
                                    value={fields[fl.name] || ''}
                                    onChange={(e) => handleFieldChange(fl.name, e.target.value)}
                                    onBlur={() => validateField(fl.name)}
                                />
                                {errors[fl.name] && (
                                    <span className="text-xs text-red-500">{errors[fl.name]}</span>
                                )}
                            </>
                        )}
                    </div>
                ))}
            </div>

            {/* Handles */}
            {handleConfig?.map((h, idx) => (
                <Handle
                    key={idx}
                    type={h?.type}
                    position={h?.position}
                    id={`${id}-${h?.idValue}`}
                    className="w-3 h-3 !bg-blue-500 border-2 border-white transition-transform duration-200 hover:scale-150"
                    style={{ top: `${h?.location}%` }}
                />
            ))}
        </div>
    )
}
