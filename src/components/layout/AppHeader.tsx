import { useState } from 'react';
import { Bell, Search, Menu, X } from 'lucide-react';
import { notifications as initialNotifications } from '@/data/dummyData';
import { useAuth } from '@/context/AuthContext';

interface HeaderProps {
  onMenuClick: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

const AppHeader = ({ onMenuClick, searchQuery, setSearchQuery }: HeaderProps) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifs, setNotifs] = useState(initialNotifications);
  const { adminName } = useAuth();
  const unreadCount = notifs.filter(n => !n.read).length;

  const markAllRead = () => setNotifs(notifs.map(n => ({ ...n, read: true })));

  return (
    <header className="h-16 glass border-b border-border flex items-center px-4 lg:px-6 sticky top-0 z-30">
      {/* Mobile menu */}
      <button onClick={onMenuClick} className="lg:hidden mr-3 p-2 rounded-lg hover:bg-muted transition-colors">
        <Menu className="h-5 w-5 text-foreground" />
      </button>

      {/* Search */}
      <div className="flex-1 max-w-md relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search anything..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-muted/50 border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
        />
      </div>

      <div className="flex items-center gap-3 ml-auto">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <Bell className="h-5 w-5 text-foreground" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 gradient-secondary rounded-full text-[10px] font-bold flex items-center justify-center text-secondary-foreground">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 glass rounded-xl border border-border shadow-2xl animate-scale-in overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <h3 className="font-semibold text-sm text-foreground">Notifications</h3>
                <button onClick={markAllRead} className="text-xs text-primary hover:underline">Mark all read</button>
              </div>
              <div className="max-h-64 overflow-y-auto scrollbar-thin">
                {notifs.map((n) => (
                  <div key={n.id} className={`px-4 py-3 border-b border-border/50 hover:bg-muted/30 transition-colors ${!n.read ? 'bg-primary/5' : ''}`}>
                    <p className="text-sm font-medium text-foreground">{n.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{n.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Admin */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
            A
          </div>
          <span className="hidden md:block text-sm font-medium text-foreground">{adminName}</span>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
