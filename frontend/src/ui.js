// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

// Dynamic node generation
import { WrapperNode } from './components/Node'
import { generateNodeTypes } from './components/nodes/nodeConfigs';

import 'reactflow/dist/style.css';
import { MdDragIndicator } from 'react-icons/md';
import { TextNode } from './components/nodes/textNodeUpdated';

const gridSize = 20;
const proOptions = { hideAttribution: true };

// Dynamically generated node types from configuration
const dynamicNodeTypes = generateNodeTypes();

const nodeTypes = {
  wrapper: WrapperNode,
  ...dynamicNodeTypes, // All configured nodes (text, number, checkbox, date, select)
  text: TextNode  // 
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => {
    let nodeData = {
      id: nodeID, nodeType: `${type}`
    };
    return nodeData;
  }

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData('application/reactflow')) {
        const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
        const type = appData?.nodeType;

        // check if the dropped element is valid
        if (typeof type === 'undefined' || !type) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type)
        }

        addNode(newNode);
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [reactFlowInstance]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div ref={reactFlowWrapper} style={{ width: '100%', height: '100%', backgroundColor: '#f9fafb', position: 'relative' }}>
      {nodes.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 animate-fadeIn">
          <div className="text-center animate-scaleIn">
            <MdDragIndicator size={64} className="mx-auto text-gray-300 mb-4 animate-pulse" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Start Building Your Pipeline</h3>
            <p className="text-sm text-gray-500">Drag and drop components from the sidebar to get started</p>
          </div>
        </div>
      )}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType='smoothstep'
      >
        <Background
          color="#d1d5db"
          gap={gridSize}
          variant="dots"
        />
        <Controls
          className="bg-white border border-gray-300 shadow-sm"
          style={{
            button: {
              backgroundColor: 'white',
              borderBottom: '1px solid #d1d5db',
              padding: '8px'
            }
          }}
          showZoom={true}
          showFitView={true}
          showInteractive={true}
        />
        <MiniMap
          className="bg-white border border-gray-300 rounded-sm shadow-sm"
          nodeColor="#6b7280"
          maskColor="rgba(0, 0, 0, 0.1)"
        />
      </ReactFlow>
    </div>
  )
}

