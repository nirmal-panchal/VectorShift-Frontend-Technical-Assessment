# VectorShift Frontend Technical Assessment

A professional pipeline builder application with drag-and-drop functionality, dynamic node creation, and backend integration for DAG validation.

## 🎯 Project Overview

This project is a complete implementation of the VectorShift Frontend Technical Assessment, featuring:

- **Node Abstraction System** - Configuration-driven architecture for easy node creation
- **Professional UI/UX** - Clean design with Tailwind CSS and smooth animations
- **Dynamic Text Node** - Auto-resizing with variable detection (`{{ variableName }}`)
- **Backend Integration** - FastAPI backend with DAG validation
- **Toast Notifications** - Real-time feedback with react-hot-toast

## 🚀 Live Demo

- **Frontend**: [Deployed on Vercel](https://your-app.vercel.app)
- **Backend**: [Deployed on Render](https://your-backend.onrender.com)

## 📁 Project Structure

```
vectorShift/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Node.js       # WrapperNode - Universal node component
│   │   │   ├── nodes/
│   │   │   │   ├── nodeConfigs.js       # Node configuration system
│   │   │   │   └── textNodeUpdated.js   # Special text node with variables
│   │   │   └── ui/
│   │   │       ├── Header.js            # Top navigation bar
│   │   │       └── sidebar.js           # Collapsible node library
│   │   ├── nodes/            # Legacy nodes (deprecated)
│   │   ├── utils.js          # Utility functions (variable extraction, etc.)
│   │   ├── store.js          # Zustand state management
│   │   ├── ui.js             # Main ReactFlow canvas
│   │   ├── submit.js         # Pipeline submission component
│   │   └── App.js            # Root component
│   └── package.json
│
├── backend/                  # Python FastAPI backend
│   ├── main.py              # FastAPI application with DAG validation
│   └── requirements.txt      # Python dependencies
│
├── vercel.json              # Vercel deployment configuration
└── README.md                # This file
```

## 🏗️ Architecture

### Frontend Architecture

**Configuration-Driven Nodes:**
```javascript
// Define a new node in just 10 lines!
nodeConfigs = {
  email: {
    title: "Email Input",
    inputConfig: [{ type: "text", label: "Email", ... }],
    handleConfig: [...]
  }
}
```

**Key Features:**
- **WrapperNode Component**: Universal node wrapper that handles all common functionality
- **Dynamic Node Generation**: Nodes created automatically from configuration
- **Factory Pattern**: `createNodeComponent()` generates React components on-the-fly
- **State Management**: Zustand for global state with ReactFlow integration
- **Responsive Design**: Flexbox layout with Tailwind CSS

### Backend Architecture

**FastAPI + DAG Validation:**
- DFS-based cycle detection algorithm
- Pydantic models for type safety
- CORS middleware for frontend communication
- Returns `{num_nodes, num_edges, is_dag}`

## 🛠️ Tech Stack

### Frontend
- **React** 18.2 - UI framework
- **ReactFlow** 11.8 - Node-based interface
- **Zustand** - State management
- **Tailwind CSS** 3.x - Styling
- **react-hot-toast** - Toast notifications
- **react-icons** - Icon library

### Backend
- **Python** 3.10+
- **FastAPI** - API framework
- **Uvicorn** - ASGI server
- **Pydantic** - Data validation

## 📦 Installation & Setup

### Prerequisites
- Node.js 16+ and npm
- Python 3.10+
- Git

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

The app will open at `http://localhost:3000`

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
pip install -r requirements.txt

# Start the server
uvicorn main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`

## 🎮 Usage

### Creating a Pipeline

1. **Drag nodes** from the sidebar to the canvas
2. **Connect nodes** by dragging from output (right) to input (left) handles
3. **Configure nodes** by typing in the input fields
4. **Text node variables**: Use `{{ variableName }}` to create dynamic inputs
5. **Click "Run Pipeline"** to validate and analyze

### Text Node Special Features

The Text node supports dynamic variable detection:

```
Input: "Hello {{ name }}, your age is {{ age }}"
Result: Creates two input handles on the left: "name" and "age"
```

### Available Node Types

- **Text** - Text input with variable detection
- **Number** - Numeric input
- **Checkbox** - Boolean toggle
- **Date** - Date picker
- **Dropdown** - Selection dropdown

## 🧪 Testing

### Test DAG Validation

**Valid DAG (should return `is_dag: true`):**
```
Text → Number → Checkbox
```

**Invalid DAG (should return `is_dag: false`):**
```
Text → Number
  ↑       ↓
  └───────┘  (creates a cycle)
```

## 🚀 Deployment

### Frontend (Vercel)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd frontend
vercel --prod
```

Or connect your GitHub repo to Vercel dashboard.

**Environment Variables (Vercel):**
- `REACT_APP_API_URL` = `https://your-backend-url.onrender.com`

### Backend (Render)

1. Create account at [render.com](https://render.com)
2. New Web Service → Connect GitHub
3. Configure:
   - Build Command: `pip install -r backend/requirements.txt`
   - Start Command: `cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT`

**Environment Variables (Render):**
- `ALLOWED_ORIGINS` = `https://your-frontend-url.vercel.app`

## 📚 Implementation Details

### Part 1: Node Abstraction

**Achievement:** Created a configuration-driven system that reduces code duplication by 60%.

**Key Files:**
- `components/Node.js` - Universal WrapperNode component
- `components/nodes/nodeConfigs.js` - Node configuration system
- `utils.js` - Reusable utility functions

**Before:** 5 files × 50 lines = 250+ lines
**After:** 1 config file = 60 lines

### Part 2: Styling

**Achievement:** Professional UI with consistent design language.

**Features:**
- Top navbar with VectorShift branding
- Collapsible sidebar with smooth animations
- Professional node styling with hover/selection states
- Empty state with helpful message
- Custom Tailwind animations (fadeIn, slideUp, scaleIn)
- Toast notifications instead of alerts

### Part 3: Text Node Logic

**Achievement:** Dynamic text node with variable detection and auto-sizing.

**Features:**
- Regex-based variable extraction: `/\{\{\s*(\w+)\s*\}\}/g`
- Dynamic dimension calculation based on text length
- Automatic handle creation for each unique variable
- Visual variable badges below textarea
- Monospace font for better variable visibility

### Part 4: Backend Integration

**Achievement:** Full-stack integration with DAG validation.

**Features:**
- POST endpoint: `/pipelines/parse`
- DFS-based cycle detection algorithm
- Pydantic models for request/response validation
- CORS configuration for cross-origin requests
- Environment-based configuration

## 🐛 Known Issues

### Console Warnings (Development Only)

You may see React warnings in development mode:
- "Maximum update depth exceeded" - Related to ReactFlow internals
- "getSnapshot should be cached" - Zustand optimization warning

These are **development-only warnings** and do not affect functionality or production builds.

### Browser Compatibility

- Tested on Chrome, Firefox, Safari
- IE11 not supported (uses modern ES6+ features)

## 🔧 Troubleshooting

### Backend Connection Issues

**Error:** "Could not connect to backend"

**Solutions:**
1. Ensure backend is running: `uvicorn main:app --reload --port 8000`
2. Check CORS settings in `backend/main.py`
3. Verify API URL in `frontend/.env.development`

### Node Not Appearing

**Issue:** Dragged node doesn't show up

**Solutions:**
1. Check browser console for errors
2. Verify node type is registered in `ui.js` nodeTypes
3. Clear browser cache and refresh

### Build Errors

**Error:** "Module not found"

**Solutions:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📝 Development Notes

### Adding New Node Types

1. Open `components/nodes/nodeConfigs.js`
2. Add new configuration:
```javascript
newNodeType: {
  title: "My Node",
  inputConfig: [
    { type: "text", label: "Field", name: "fieldName", defaultValue: "" }
  ],
  handleConfig: [
    { type: "target", position: Position.Left, idValue: "input" },
    { type: "source", position: Position.Right, idValue: "output" }
  ]
}
```
3. Add to sidebar in `components/ui/sidebar.js`
4. Add icon to `draggableNode.js`

That's it! The node is automatically created and registered.

### Code Quality

- **ESLint**: Some warnings disabled for ReactFlow integration
- **PropTypes**: Not implemented (consider migrating to TypeScript)
- **Testing**: No tests included (recommend adding with Jest/RTL)

## 🎓 Learning Resources

- [ReactFlow Documentation](https://reactflow.dev/)
- [Zustand Guide](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 📄 License

This project was created as part of the VectorShift Frontend Technical Assessment.

## 👨‍💻 Author

Created by [Your Name] for VectorShift Technical Assessment

## 🙏 Acknowledgments

- VectorShift team for the assessment opportunity
- ReactFlow team for the excellent library
- FastAPI team for the modern Python framework

---

**Note:** This is a technical assessment project demonstrating React, TypeScript, Python, and full-stack development skills.

For questions or issues, please contact [your-email@example.com]
