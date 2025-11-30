// import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import Sidebar from './components/ui/sidebar';
import { Header } from './components/ui/Header';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className='flex flex-col h-screen bg-gray-50'>
      <Header />
      <div className='flex flex-1 overflow-hidden'>
        <div className='p-2'>
          <Sidebar />
        </div>
        <div className='flex-1 flex flex-col'>
          <div className='flex-1'>
            <PipelineUI />
          </div>
          <SubmitButton />
        </div>
      </div>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  );
}

export default App;
