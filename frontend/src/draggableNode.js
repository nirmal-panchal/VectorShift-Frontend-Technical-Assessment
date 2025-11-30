// draggableNode.js

import { MdTextFields, MdNumbers, MdCheckBox, MdDateRange, MdArrowDropDown } from "react-icons/md";

export const DraggableNode = ({ type, label, collapsed }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType }
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  // Icon mapping with react-icons
  const iconMap = {
    text: <MdTextFields size={24} />,
    number: <MdNumbers size={24} />,
    checkbox: <MdCheckBox size={24} />,
    date: <MdDateRange size={24} />,
    select: <MdArrowDropDown size={24} />
  };

  // Tooltip descriptions
  const tooltipMap = {
    text: 'Text Input - Add a text field to your pipeline',
    number: 'Number Input - Add a numeric input field',
    checkbox: 'Checkbox - Add a boolean toggle',
    date: 'Date Picker - Add a date selection field',
    select: 'Dropdown - Add a selection dropdown'
  };

  return (
    <div
      className={`cursor-grab active:cursor-grabbing w-full ${collapsed ? 'h-11 justify-center' : 'h-10 justify-start'} flex items-center rounded-md hover:bg-gray-100 transition-all duration-200 hover:scale-105 group px-3 relative`}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      draggable
      title={collapsed ? tooltipMap[type] : ''}
    >
      <div className={`flex items-center ${collapsed ? '' : 'gap-2.5 w-full'}`}>
        <span className="text-gray-600 group-hover:text-gray-900 transition-colors flex-shrink-0">
          {iconMap[type]}
        </span>
        {!collapsed && (
          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
            {label}
          </span>
        )}
      </div>
    </div>
  );
};
