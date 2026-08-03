import { useState, ReactNode } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-primary-500"
            >
              <Menu size={24} />
            </button>

            <div className="flex items-center gap-4 ml-auto">
              <span className="text-xs text-gray-400 hidden sm:block">
                Financial Year 2026-27
              </span>
              <div className="w-9 h-9 bg-primary-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                CA
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>

        <footer className="border-t border-gray-200 bg-white px-4 lg:px-8 py-6">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <p>CA Portal — Comprehensive Resource for Chartered Accountants</p>
            <p>Financial Year 2026-27 | All information is for reference purposes</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
