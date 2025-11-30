import { Position } from "reactflow";

// Central configuration for all node types
export const nodeConfigs = {
    // text: {
    //     title: "Text",
    //     inputConfig: [
    //         { type: "text", label: "Value", name: "textValue", defaultValue: "" }
    //     ],
    //     handleConfig: [
    //         { type: "target", position: Position.Left, idValue: "input" },
    //         { type: "source", position: Position.Right, idValue: "output" }
    //     ]
    // },    
    number: {
        title: "Number",
        inputConfig: [
            { type: "number", label: "Value", name: "numberValue", defaultValue: 0 }
        ],
        handleConfig: [
            { type: "target", position: Position.Left, idValue: "input" },
            { type: "source", position: Position.Right, idValue: "output" }
        ]
    },
    checkbox: {
        title: "Checkbox",
        inputConfig: [
            { type: "checkbox", label: "Value", name: "boolValue", defaultValue: false }
        ],
        handleConfig: [
            { type: "target", position: Position.Left, idValue: "input" },
            { type: "source", position: Position.Right, idValue: "output" }
        ]
    },
    date: {
        title: "Date",
        inputConfig: [
            { type: "date", label: "Value", name: "dateValue", defaultValue: '' }
        ],
        handleConfig: [
            { type: "target", position: Position.Left, idValue: "input" },
            { type: "source", position: Position.Right, idValue: "output" }
        ]
    },
    select: {
        title: "Dropdown",
        inputConfig: [
            { type: "select", label: "Value", name: "selectValue", defaultValue: "Option 1", options: ["Option 1", "Option 2", "Option 3"] }
        ],
        handleConfig: [
            { type: "target", position: Position.Left, idValue: "input" },
            { type: "source", position: Position.Right, idValue: "output" }
        ]
    }
};

// Factory function to create node components from config
export const createNodeComponent = (nodeType) => {
    const config = nodeConfigs[nodeType];
    if (!config) {
        console.error(`No configuration found for node type: ${nodeType}`);
        return null;
    }

    return ({ id, data }) => {
        // Import WrapperNode dynamically to avoid circular dependencies
        const { WrapperNode } = require('../Node');

        return (
            <WrapperNode
                id={id}
                data={{
                    ...config,
                    ...data
                }}
            />
        );
    };
};

// Generate all node components dynamically
export const generateNodeTypes = () => {
    const nodeTypes = {};

    Object.keys(nodeConfigs).forEach(nodeType => {
        nodeTypes[nodeType] = createNodeComponent(nodeType);
    });

    return nodeTypes;
};
