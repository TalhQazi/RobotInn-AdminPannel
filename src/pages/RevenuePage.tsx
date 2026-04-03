import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { chartData, orders } from '@/data/dummyData';
import { DollarSign, TrendingUp, ShoppingBag, ArrowUpRight } from 'lucide-react';

const COLORS = ['#2EC4B6', '#4ECDC4', '#FF8C42', '#FFB347', '#6366f1'];

const RevenuePage = () => {
  const totalRevenue = orders.reduce((a, o) => a + o.total, 0);
  const deliveredRevenue = orders.filter(o => o.status === 'delivered').reduce((a, o) => a + o.total, 0);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Revenue & Analytics</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Revenue', value: `Rs ${totalRevenue.toLocaleString()}`, icon: DollarSign, gradient: 'gradient-primary' },
          { label: 'Completed Revenue', value: `Rs ${deliveredRevenue.toLocaleString()}`, icon: TrendingUp, gradient: 'gradient-secondary' },
          { label: 'Total Orders', value: orders.length.toString(), icon: ShoppingBag, gradient: 'gradient-primary' },
        ].map((s, i) => (
          <div key={i} className="glass rounded-xl p-5 card-hover animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className={`h-10 w-10 rounded-lg ${s.gradient} flex items-center justify-center mb-3`}>
              <s.icon className="h-5 w-5 text-primary-foreground" />
            </div>
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass rounded-xl p-5 animate-fade-up">
          <h3 className="text-lg font-semibold text-foreground mb-4">Revenue Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData.revenueData}>
              <defs>
                <linearGradient id="revArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2EC4B6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#2EC4B6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(217 33% 25%)" />
              <XAxis dataKey="name" stroke="hsl(215 20% 65%)" fontSize={12} />
              <YAxis stroke="hsl(215 20% 65%)" fontSize={12} />
              <Tooltip contentStyle={{ background: 'hsl(217 33% 17%)', border: '1px solid hsl(217 33% 25%)', borderRadius: '8px', color: '#fff' }} />
              <Area type="monotone" dataKey="revenue" stroke="#2EC4B6" fill="url(#revArea)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass rounded-xl p-5 animate-fade-up">
          <h3 className="text-lg font-semibold text-foreground mb-4">Revenue by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={chartData.revenueByCategory} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                {chartData.revenueByCategory.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: 'hsl(217 33% 17%)', border: '1px solid hsl(217 33% 25%)', borderRadius: '8px', color: '#fff' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 mt-2 justify-center">
            {chartData.revenueByCategory.map((item, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <div className="h-2.5 w-2.5 rounded-full" style={{ background: COLORS[i] }} />
                {item.name} ({item.value}%)
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="glass rounded-xl p-5 animate-fade-up">
        <h3 className="text-lg font-semibold text-foreground mb-4">Orders Per Day</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData.ordersOverTime}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(217 33% 25%)" />
            <XAxis dataKey="name" stroke="hsl(215 20% 65%)" fontSize={12} />
            <YAxis stroke="hsl(215 20% 65%)" fontSize={12} />
            <Tooltip contentStyle={{ background: 'hsl(217 33% 17%)', border: '1px solid hsl(217 33% 25%)', borderRadius: '8px', color: '#fff' }} />
            <Bar dataKey="orders" fill="#4ECDC4" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenuePage;
