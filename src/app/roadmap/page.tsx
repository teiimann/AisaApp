'use client';
import { useState, useMemo } from 'react';
import ReactFlow, { Node, Edge, Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';
import NavBar from '../components/ui/navbar';

export default function RoadmapPage() {
  const [topic, setTopic] = useState('');
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [loading, setLoading] = useState(false);

  // Memoize nodeTypes and edgeTypes to avoid unnecessary re-renders
  const nodeTypes = useMemo(() => ({}), []);
  const edgeTypes = useMemo(() => ({}), []);

  const handleGenerateRoadmap = async () => {
    if (!topic.trim()) return;

    setLoading(true);
    setNodes([]);
    setEdges([]);

    try {
      const response = await fetch('/api/roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch roadmap');
      }

      const data = await response.json();
      const roadmapSteps = data.roadmap.split('\n').filter((step: string) => step.trim() !== '');

      const { generatedNodes, generatedEdges } = generateFlowData(roadmapSteps);

      setNodes(generatedNodes);
      setEdges(generatedEdges);
    } catch (error) {
      console.error(error);
      alert('Error generating roadmap');
    } finally {
      setLoading(false);
    }
  };

  // Helper function to convert roadmap text into nodes and edges
  const generateFlowData = (steps: string[]) => {
    const generatedNodes: Node[] = [];
    const generatedEdges: Edge[] = [];

    steps.forEach((step, index) => {
      generatedNodes.push({
        id: `${index + 1}`,
        data: { label: step },
        position: { x: 250, y: index * 200 },
        style: {
          padding: 10,
          borderRadius: '8px',
          border: '2px solid #007BFF',
          backgroundColor: '#ffffff',
          textAlign: 'center',
          width: 300, // Set a fixed width for nodes
        },
      });

      // Connect nodes with edges
      if (index > 0) {
        generatedEdges.push({
          id: `e${index}-${index + 1}`,
          source: `${index}`,
          target: `${index + 1}`,
          type: 'smoothstep',
        });
      }
    });

    return { generatedNodes, generatedEdges };
  };

  return (
    
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header with Input and Button */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-lg mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-black dark:text-white">
          Generate a Learning Roadmap
        </h1>

        {/* Input for topic */}
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a topic (e.g., Web Development, AI, etc.)"
          className="w-full p-3 mb-4 text-black dark:text-white bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Button to generate roadmap */}
        <button
          onClick={handleGenerateRoadmap}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-lg font-bold hover:from-blue-600 hover:to-blue-700 transition duration-300 ease-in-out shadow-lg"
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Roadmap'}
        </button>
      </div>

      {/* React Flow Area */}
      {nodes.length > 0 && (
        <div className="flex-grow w-full mt-8" style={{ height: 'calc(100vh - 250px)', width: '100%' }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            fitView
          >
            <Background color="#aaa" gap={16} />
            <Controls />
          </ReactFlow>
        </div>
      )}
    </div>
  );
}
