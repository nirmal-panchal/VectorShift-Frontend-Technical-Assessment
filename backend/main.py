from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict
import os

app = FastAPI()

# Get allowed origins from environment variable or use defaults
allowed_origins = os.getenv("ALLOWED_ORIGINS", "https://vector-shift-frontend-technical-ass.vercel.app/", "http://localhost:3000").split(",")

# Add CORS middleware (so frontend can call backend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request model
class PipelineRequest(BaseModel):
    nodes: List[Dict]
    edges: List[Dict]

def check_if_dag(nodes, edges):
    # Build adjacency list
    graph = {node['id']: [] for node in nodes}

    for edge in edges:
        source = edge['source']
        target = edge['target']
        if source in graph:
            graph[source].append(target)

    visited = set()
    rec_stack = set()

    def has_cycle(node):
        visited.add(node)
        rec_stack.add(node)

        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                if has_cycle(neighbor):
                    return True
            elif neighbor in rec_stack:
                return True  # Cycle detected!

        rec_stack.remove(node)
        return False

    # Check all nodes
    for node_id in graph:
        if node_id not in visited:
            if has_cycle(node_id):
                return False  # Has cycle = not a DAG

    return True  # No cycles = is a DAG

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelineRequest):
    nodes = pipeline.nodes
    edges = pipeline.edges

    # Calculate counts
    num_nodes = len(nodes)
    num_edges = len(edges)

    # Check if DAG
    is_dag = check_if_dag(nodes, edges)

    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag
    }
