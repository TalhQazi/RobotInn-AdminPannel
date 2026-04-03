import { Users, Bike, ShoppingBag, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { users, orders, chartData, activityLogs } from '@/data/dummyData';

const statCards = [
  { title: 'Total Users', value: users.filter(u => u.type === 'customer').length.toString(), icon: Users, change: '+12%', up: true, gradient: 'gradient-primary' },
  { title: 'Total Riders', value: users.filter(u => u.type === 'rider').length.toString(), icon: Bike, change: '+5%', up: true, gradient: 'gradient-secondary' },
  { title: 'Total Orders', value: orders.length.toString(), icon: ShoppingBag, change: '+18%', up: true, gradient: 'gradient-primary' },
  { title: 'Revenue', value: `Rs ${(orders.reduce((a, o) => a + o.total, 0) / 1000).toFixed(1)}K`, icon: DollarSign, change: '+24%', up: true, gradient: 'gradient-secondary' },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground text-sm">Welcome back, Admin! Here's what's happening.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <div key={i} className="glass rounded-xl p-5 card-hover animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="flex items-center justify-between mb-3">
              <div className={`h-10 w-10 rounded-lg ${card.gradient} flex items-center justify-center shadow-lg`}>
                <card.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className={`flex items-center text-xs font-medium ${card.up ? 'text-primary' : 'text-destructive'}`}>
                {card.up ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                {card.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-foreground">{card.value}</p>
            <p className="text-sm text-muted-foreground">{card.title}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass rounded-xl p-5 animate-fade-up">
          <h3 className="text-lg font-semibold text-foreground mb-4">Orders This Week</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={chartData.ordersOverTime}>
              <defs>
                <linearGradient id="orderGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2EC4B6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#2EC4B6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(217 33% 25%)" />
              <XAxis dataKey="name" stroke="hsl(215 20% 65%)" fontSize={12} />
              <YAxis stroke="hsl(215 20% 65%)" fontSize={12} />
              <Tooltip contentStyle={{ background: 'hsl(217 33% 17%)', border: '1px solid hsl(217 33% 25%)', borderRadius: '8px', color: '#fff' }} />
              <Area type="monotone" dataKey="orders" stroke="#2EC4B6" fillOpacity={1} fill="url(#orderGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass rounded-xl p-5 animate-fade-up">
          <h3 className="text-lg font-semibold text-foreground mb-4">Revenue Growth</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData.revenueData}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF8C42" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="#FFB347" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(217 33% 25%)" />
              <XAxis dataKey="name" stroke="hsl(215 20% 65%)" fontSize={12} />
              <YAxis stroke="hsl(215 20% 65%)" fontSize={12} />
              <Tooltip contentStyle={{ background: 'hsl(217 33% 17%)', border: '1px solid hsl(217 33% 25%)', borderRadius: '8px', color: '#fff' }} />
              <Bar dataKey="revenue" fill="url(#revGrad)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass rounded-xl p-5 animate-fade-up">
          <h3 className="text-lg font-semibold text-foreground mb-4">Recent Orders</h3>
          <div className="space-y-3">
            {orders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                <div>
                  <p className="text-sm font-medium text-foreground">{order.id}</p>
                  <p className="text-xs text-muted-foreground">{order.customerName}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">Rs {order.total}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    order.status === 'delivered' ? 'bg-primary/20 text-primary' :
                    order.status === 'pending' ? 'bg-secondary/20 text-secondary' :
                    order.status === 'cancelled' ? 'bg-destructive/20 text-destructive' :
                    'bg-muted text-muted-foreground'
                  }`}>{order.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-xl p-5 animate-fade-up">
          <h3 className="text-lg font-semibold text-foreground mb-4">Activity Log</h3>
          <div className="space-y-3">
            {activityLogs.map((log) => (
              <div key={log.id} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                <div className={`h-2 w-2 rounded-full mt-1.5 flex-shrink-0 ${
                  log.type === 'success' ? 'bg-primary' :
                  log.type === 'warning' ? 'bg-secondary' :
                  log.type === 'error' ? 'bg-destructive' : 'bg-muted-foreground'
                }`} />
                <div>
                  <p className="text-sm text-foreground">{log.action}</p>
                  <p className="text-xs text-muted-foreground">{log.user} · {log.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
