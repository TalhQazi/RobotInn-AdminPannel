import { useState } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { products as initialProducts, Product } from '@/data/dummyData';

const emptyProduct: Omit<Product, 'id'> = { title: '', description: '', price: 0, image: '🍽️', category: '', active: true };

const ProductsPage = () => {
  const [productsList, setProductsList] = useState<Product[]>(initialProducts);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyProduct);

  const openNew = () => { setForm(emptyProduct); setEditId(null); setShowForm(true); };
  const openEdit = (p: Product) => { setForm(p); setEditId(p.id); setShowForm(true); };
  const deleteProduct = (id: string) => setProductsList(productsList.filter(p => p.id !== id));

  const handleSave = () => {
    if (!form.title) return;
    if (editId) {
      setProductsList(productsList.map(p => p.id === editId ? { ...p, ...form } : p));
    } else {
      setProductsList([...productsList, { ...form, id: `P${Date.now()}` }]);
    }
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Products & Offers</h1>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 rounded-lg gradient-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
          <Plus className="h-4 w-4" /> Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {productsList.map((product, i) => (
          <div key={product.id} className="glass rounded-xl p-5 card-hover animate-fade-up" style={{ animationDelay: `${i * 0.05}s` }}>
            <div className="text-4xl mb-3">{product.image}</div>
            <h3 className="text-foreground font-semibold">{product.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
            <div className="flex items-center justify-between mt-3">
              <span className="text-lg font-bold gradient-text-primary">Rs {product.price}</span>
              <span className={`text-xs px-2 py-1 rounded-full ${product.active ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
                {product.active ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="flex gap-2 mt-4">
              <button onClick={() => openEdit(product)} className="flex-1 py-1.5 rounded-lg bg-muted text-foreground text-sm hover:bg-muted/80 transition-colors flex items-center justify-center gap-1">
                <Edit2 className="h-3 w-3" /> Edit
              </button>
              <button onClick={() => deleteProduct(product.id)} className="py-1.5 px-3 rounded-lg bg-destructive/20 text-destructive text-sm hover:bg-destructive/30 transition-colors">
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-background/80 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="glass rounded-2xl p-6 max-w-md w-full animate-scale-in" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-foreground">{editId ? 'Edit' : 'Add'} Product</h3>
              <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-3">
              <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Title"
                className="w-full px-4 py-2 bg-muted/50 border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
              <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Description" rows={3}
                className="w-full px-4 py-2 bg-muted/50 border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
              <input type="number" value={form.price} onChange={e => setForm({ ...form, price: Number(e.target.value) })} placeholder="Price"
                className="w-full px-4 py-2 bg-muted/50 border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
              <input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} placeholder="Category"
                className="w-full px-4 py-2 bg-muted/50 border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
              <label className="flex items-center gap-2 text-sm text-foreground">
                <input type="checkbox" checked={form.active} onChange={e => setForm({ ...form, active: e.target.checked })} className="accent-primary" />
                Active
              </label>
            </div>
            <button onClick={handleSave} className="w-full mt-4 py-2.5 rounded-lg gradient-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
              {editId ? 'Update' : 'Add'} Product
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
