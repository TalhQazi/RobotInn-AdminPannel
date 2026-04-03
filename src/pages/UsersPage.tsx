import { useState } from 'react';
import { Search, Ban, CheckCircle, Eye } from 'lucide-react';
import { users as initialUsers, User } from '@/data/dummyData';

const UsersPage = () => {
  const [usersList, setUsersList] = useState<User[]>(initialUsers);
  const [activeTab, setActiveTab] = useState<'customer' | 'rider'>('customer');
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const filtered = usersList.filter(u =>
    u.type === activeTab &&
    (u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()))
  );

  const toggleBan = (id: string) => {
    setUsersList(usersList.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'banned' : 'active' } : u));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Users Management</h1>

      {/* Tabs */}
      <div className="flex gap-2">
        {(['customer', 'rider'] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab ? 'gradient-primary text-primary-foreground' : 'glass text-muted-foreground hover:text-foreground'}`}>
            {tab === 'customer' ? 'Customers' : 'Riders'}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..."
          className="w-full pl-10 pr-4 py-2 bg-muted/50 border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
      </div>

      {/* Table */}
      <div className="glass rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">User</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase hidden sm:table-cell">Email</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase hidden md:table-cell">Orders</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Status</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user, i) => (
                <tr key={user.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors animate-fade-up" style={{ animationDelay: `${i * 0.05}s` }}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground">{user.avatar}</div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{user.name}</p>
                        <p className="text-xs text-muted-foreground sm:hidden">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground hidden sm:table-cell">{user.email}</td>
                  <td className="px-4 py-3 text-sm text-foreground hidden md:table-cell">{user.totalOrders}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${user.status === 'active' ? 'bg-primary/20 text-primary' : 'bg-destructive/20 text-destructive'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => setSelectedUser(user)} className="p-1.5 rounded-lg hover:bg-muted transition-colors" title="View">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      </button>
                      <button onClick={() => toggleBan(user.id)} className="p-1.5 rounded-lg hover:bg-muted transition-colors" title={user.status === 'active' ? 'Ban' : 'Unban'}>
                        {user.status === 'active' ? <Ban className="h-4 w-4 text-destructive" /> : <CheckCircle className="h-4 w-4 text-primary" />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-background/80 z-50 flex items-center justify-center p-4" onClick={() => setSelectedUser(null)}>
          <div className="glass rounded-2xl p-6 max-w-md w-full animate-scale-in" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-14 w-14 rounded-full gradient-primary flex items-center justify-center text-lg font-bold text-primary-foreground">{selectedUser.avatar}</div>
              <div>
                <h3 className="text-lg font-bold text-foreground">{selectedUser.name}</h3>
                <p className="text-sm text-muted-foreground capitalize">{selectedUser.type}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-2 border-b border-border/50"><span className="text-muted-foreground">Email</span><span className="text-foreground">{selectedUser.email}</span></div>
              <div className="flex justify-between py-2 border-b border-border/50"><span className="text-muted-foreground">Phone</span><span className="text-foreground">{selectedUser.phone}</span></div>
              <div className="flex justify-between py-2 border-b border-border/50"><span className="text-muted-foreground">Joined</span><span className="text-foreground">{selectedUser.joinDate}</span></div>
              <div className="flex justify-between py-2 border-b border-border/50"><span className="text-muted-foreground">Total Orders</span><span className="text-foreground">{selectedUser.totalOrders}</span></div>
              <div className="flex justify-between py-2"><span className="text-muted-foreground">Status</span><span className={selectedUser.status === 'active' ? 'text-primary' : 'text-destructive'}>{selectedUser.status}</span></div>
            </div>
            <button onClick={() => setSelectedUser(null)} className="w-full mt-4 py-2 rounded-lg bg-muted text-foreground text-sm hover:bg-muted/80 transition-colors">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
