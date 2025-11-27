import { LucideIcon, X } from 'lucide-react';
import { useEffect } from 'react';

interface SidebarProps {
  items: {
    id: string;
    label: string;
    icon: LucideIcon;
  }[];
  activeItem: string;
  onItemClick: (id: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ items, activeItem, onItemClick, isOpen = false, onClose }: SidebarProps) {
  // Prevent body scroll when menu is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-0 left-0 z-50 lg:z-40
        w-full lg:w-64 bg-white lg:bg-white/95 backdrop-blur-md lg:backdrop-blur-md border-r border-gray-200/50 
        h-screen lg:h-auto lg:min-h-[calc(100vh-73px)]
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        shadow-2xl lg:shadow-none
      `}>
        <nav className="h-full flex flex-col p-4 lg:p-4">
          {/* Mobile Header */}
          <div className="lg:hidden flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#006C35] to-[#004d26] rounded-xl flex items-center justify-center">
                <span className="text-[#CFAE70] font-bold text-lg">DD</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900">Menu</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Menu Items - Scrollable */}
          <div className="flex-1 overflow-y-auto space-y-2 pr-2 lg:pr-0">
            {items.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onItemClick(item.id);
                    // Close menu after selection on mobile only
                    if (onClose && window.innerWidth < 1024) {
                      setTimeout(() => {
                        onClose();
                      }, 300);
                    }
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-300 relative group ${
                    isActive
                      ? 'bg-gradient-to-r from-[#006C35] to-[#004d26] text-white shadow-lg shadow-[#006C35]/30 scale-[1.02]'
                      : 'text-gray-700 hover:bg-gray-100/80 hover:scale-[1.01]'
                  }`}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"></div>
                  )}
                  <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-gray-600 group-hover:text-[#006C35]'} transition-colors`} />
                  <span className={`font-semibold text-base lg:text-sm ${isActive ? 'text-white' : 'text-gray-700'}`}>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile Footer */}
          <div className="lg:hidden mt-6 pt-4 border-t border-gray-200">
            <div className="text-center">
              <p className="text-xs text-gray-500">Dynamic Discounting Platform</p>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}
