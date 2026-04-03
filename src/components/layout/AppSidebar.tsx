import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Users, ShoppingBag, Package, DollarSign,
  FileText, MessageSquare, MapPin, Settings, ChevronLeft, ChevronRight, LogOut
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const menuItems = [
  { title: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { title: 'Users', icon: Users, path: '/users' },
  { title: 'Orders', icon: ShoppingBag, path: '/orders' },
  { title: 'Products', icon: Package, path: '/products' },
  { title: 'Revenue', icon: DollarSign, path: '/revenue' },
  { title: 'Bills', icon: FileText, path: '/bills' },
  { title: 'Messages', icon: MessageSquare, path: '/messages' },
  { title: 'Locations', icon: MapPin, path: '/locations' },
  { title: 'Settings', icon: Settings, path: '/settings' },
];

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}

const AppSidebar = ({ collapsed, setCollapsed, mobileOpen, setMobileOpen }: SidebarProps) => {
  const location = useLocation();
  const { logout } = useAuth();

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-background/80 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      <aside
        className={`fixed top-0 left-0 h-full z-50 transition-all duration-300 flex flex-col
          bg-sidebar border-r border-sidebar-border
          ${collapsed ? 'w-16' : 'w-64'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="h-20 flex items-center px-4 border-b border-sidebar-border">
          <img src="/logo.png" alt="RobotInn" className="h-16 w-auto object-contain flex-shrink-0" />
          {!collapsed && (
            <span className="ml-3 text-lg font-bold gradient-text-primary">RobotInn</span>
          )}
        </div>

        {/* Menu */}
        <nav className="flex-1 py-4 overflow-y-auto scrollbar-thin">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center px-4 py-3 mx-2 rounded-lg mb-1 transition-all duration-200 group
                  ${isActive
                    ? 'gradient-primary text-primary-foreground shadow-lg'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent'
                  }`}
              >
                <item.icon className={`h-5 w-5 flex-shrink-0 ${isActive ? '' : 'group-hover:text-primary'}`} />
                {!collapsed && <span className="ml-3 text-sm font-medium">{item.title}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Collapse toggle + Logout */}
        <div className="p-3 border-t border-sidebar-border space-y-1">
          <button
            onClick={logout}
            className="flex items-center w-full px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-destructive/20 hover:text-destructive transition-colors"
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span className="ml-3 text-sm">Logout</span>}
          </button>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex items-center w-full px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
          >
            {collapsed ? <ChevronRight className="h-5 w-5" /> : <><ChevronLeft className="h-5 w-5" /><span className="ml-3 text-sm">Collapse</span></>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default AppSidebar;
