import { useState } from 'react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import { bills as initialBills, Bill } from '@/data/dummyData';

const BillsPage = () => {
  const [billsList, setBillsList] = useState<Bill[]>(initialBills);

  const updateStatus = (id: string, status: 'approved' | 'rejected') => {
    setBillsList(billsList.map(b => b.id === id ? { ...b, status } : b));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Bills Management</h1>

      <div className="glass rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Bill ID</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Rider</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase hidden sm:table-cell">Description</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Amount</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Status</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {billsList.map((bill, i) => (
                <tr key={bill.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors animate-fade-up" style={{ animationDelay: `${i * 0.05}s` }}>
                  <td className="px-4 py-3 text-sm font-medium text-foreground">{bill.id}</td>
                  <td className="px-4 py-3 text-sm text-foreground">{bill.riderName}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground hidden sm:table-cell">{bill.description}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-foreground">Rs {bill.amount}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 w-fit ${
                      bill.status === 'approved' ? 'bg-primary/20 text-primary' :
                      bill.status === 'rejected' ? 'bg-destructive/20 text-destructive' :
                      'bg-secondary/20 text-secondary'
                    }`}>
                      {bill.status === 'pending' && <Clock className="h-3 w-3" />}
                      {bill.status === 'approved' && <CheckCircle className="h-3 w-3" />}
                      {bill.status === 'rejected' && <XCircle className="h-3 w-3" />}
                      {bill.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {bill.status === 'pending' && (
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => updateStatus(bill.id, 'approved')} className="p-1.5 rounded-lg hover:bg-primary/20 transition-colors" title="Approve">
                          <CheckCircle className="h-4 w-4 text-primary" />
                        </button>
                        <button onClick={() => updateStatus(bill.id, 'rejected')} className="p-1.5 rounded-lg hover:bg-destructive/20 transition-colors" title="Reject">
                          <XCircle className="h-4 w-4 text-destructive" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BillsPage;
