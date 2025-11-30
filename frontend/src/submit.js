// submit.js

import { MdPlayArrow } from "react-icons/md";
import { useStore } from './store';
import toast from 'react-hot-toast';
import { useState } from 'react';

// Selector functions (memoized outside component)
const selectNodes = (state) => state.nodes;
const selectEdges = (state) => state.edges;

export const SubmitButton = () => {

    const nodes = useStore(selectNodes);
    const edges = useStore(selectEdges);
    const [isSubmitting, setIsSubmitting] = useState(false);


    const handleSubmit = async () => {
        setIsSubmitting(true);

        // Show loading toast
        const loadingToast = toast.loading('Analyzing pipeline...');

        try {
            const res = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nodes, edges })
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();

            // Dismiss loading toast
            toast.dismiss(loadingToast);

            // Show success toast with results
            if (data.is_dag) {
                toast.success(
                    `Pipeline Valid! ✓\n${data.num_nodes} nodes, ${data.num_edges} edges`,
                    {
                        duration: 4000,
                        style: {
                            minWidth: '250px',
                        },
                    }
                );
            } else {
                toast.error(
                    `Pipeline has cycles! ✗\n${data.num_nodes} nodes, ${data.num_edges} edges\nNot a valid DAG`,
                    {
                        duration: 5000,
                        style: {
                            minWidth: '250px',
                        },
                    }
                );
            }
        } catch (error) {
            // Dismiss loading toast
            toast.dismiss(loadingToast);

            // Show error toast
            toast.error(
                'Could not connect to backend.\nMake sure the server is running on port 8000.',
                {
                    duration: 5000,
                }
            );
            console.error('Error:', error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="border border-gray-300 bg-white mx-2 mb-2 rounded-xl shadow-sm animate-slideUp">
            <div className="flex items-center justify-between px-6 py-4">
                <div className="text-sm text-gray-600">
                    <span className="font-medium">Ready to submit?</span>
                    <span className="ml-2 text-gray-500">Review your pipeline before running</span>
                </div>.
                <button
                    type="submit"
                    disabled={nodes.length === 0 || isSubmitting}
                    onClick={handleSubmit}
                    className="flex items-center gap-2 disabled:bg-blue-300 disabled:cursor-not-allowed px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    title="Execute pipeline (Ctrl+Enter)"
                >
                    {isSubmitting ? (
                        <>
                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Analyzing...</span>
                        </>
                    ) : (
                        <>
                            <MdPlayArrow size={20} />
                            <span>Run Pipeline</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
