import { useState } from 'react';
import { Search, Eye, Filter } from 'lucide-react';
import { orders as initialOrders, Order } from '@/data/dummyData';

const statusColors: Record<string, string> = {
  pending: 'bg-secondary/20 text-secondary',
  preparing: 'bg-primary/20 text-primary',
  picked: 'bg-accent text-accent-foreground',
  delivered: 'bg-primary/20 text-primary',
  cancelled: 'bg-destructive/20 text-destructive',
};

const OrdersPage = () => {
  const [ordersList] = useState<Order[]>(initialOrders);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selected, setSelected] = useState<Order | null>(null);

  const filtered = ordersList.filter(o =>
    (statusFilter === 'all' || o.status === statusFilter) &&
    (o.id.toLowerCase().includes(search.toLowerCase()) || o.customerName.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Orders Management</h1>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search orders..."
            className="w-full pl-10 pr-4 py-2 bg-muted/50 border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          className="px-4 py-2 bg-muted/50 border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="preparing">Preparing</option>
          <option value="picked">Picked</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="glass rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Order ID</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase hidden sm:table-cell">Customer</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase hidden md:table-cell">Area</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Total</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Status</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order, i) => (
                <tr key={order.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors animate-fade-up" style={{ animationDelay: `${i * 0.05}s` }}>
                  <td className="px-4 py-3 text-sm font-medium text-foreground">{order.id}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground hidden sm:table-cell">{order.customerName}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">{order.area}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-foreground">Rs {order.total}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${statusColors[order.status]}`}>{order.status}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => setSelected(order)} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 bg-background/80 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="glass rounded-2xl p-6 max-w-md w-full animate-scale-in" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-foreground mb-4">Order {selected.id}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-2 border-b border-border/50"><span className="text-muted-foreground">Customer</span><span className="text-foreground">{selected.customerName}</span></div>
              <div className="flex justify-between py-2 border-b border-border/50"><span className="text-muted-foreground">Rider</span><span className="text-foreground">{selected.riderName}</span></div>
              <div className="flex justify-between py-2 border-b border-border/50"><span className="text-muted-foreground">Items</span><span className="text-foreground">{selected.items.join(', ')}</span></div>
              <div className="flex justify-between py-2 border-b border-border/50"><span className="text-muted-foreground">Total</span><span className="text-foreground font-semibold">Rs {selected.total}</span></div>
              <div className="flex justify-between py-2 border-b border-border/50"><span className="text-muted-foreground">Area</span><span className="text-foreground">{selected.area}</span></div>
              <div className="flex justify-between py-2 border-b border-border/50"><span className="text-muted-foreground">Address</span><span className="text-foreground text-right">{selected.address}</span></div>
              <div className="flex justify-between py-2"><span className="text-muted-foreground">Status</span><span className={`text-xs px-2 py-1 rounded-full ${statusColors[selected.status]}`}>{selected.status}</span></div>
            </div>
            <button onClick={() => setSelected(null)} className="w-full mt-4 py-2 rounded-lg bg-muted text-foreground text-sm hover:bg-muted/80 transition-colors">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
