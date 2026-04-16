import { useState } from 'react';
import { Search, Plus, MapPin, Store, X, Edit2, Trash2, Eye } from 'lucide-react';

// Store/Food Place interface
interface FoodStore {
  id: string;
  name: string;
  type: string;
}

// Area interface
interface Area {
  id: string;
  name: string;
  city: string;
  stores: FoodStore[];
}

// Static Islamabad areas data
const initialAreas: Area[] = [
  {
    id: 'A001',
    name: 'F-7',
    city: 'Islamabad',
    stores: [
      { id: 'S001', name: 'KFC F-7', type: 'Fast Food' },
      { id: 'S002', name: 'McDonald\'s F-7', type: 'Fast Food' },
      { id: 'S003', name: 'Pizza Hut F-7', type: 'Pizza' },
    ]
  },
  {
    id: 'A002',
    name: 'F-8',
    city: 'Islamabad',
    stores: [
      { id: 'S004', name: 'Burger King F-8', type: 'Fast Food' },
      { id: 'S005', name: 'Subway F-8', type: 'Fast Food' },
    ]
  },
  {
    id: 'A003',
    name: 'E-11',
    city: 'Islamabad',
    stores: [
      { id: 'S006', name: 'Hardee\'s E-11', type: 'Fast Food' },
      { id: 'S007', name: 'Domino\'s Pizza E-11', type: 'Pizza' },
      { id: 'S008', name: 'Gourmet Bakers E-11', type: 'Bakery' },
    ]
  },
  {
    id: 'A004',
    name: 'G-10',
    city: 'Islamabad',
    stores: [
      { id: 'S009', name: 'KFC G-10', type: 'Fast Food' },
      { id: 'S010', name: 'Howdy G-10', type: 'Fast Food' },
    ]
  },
  {
    id: 'A005',
    name: 'I-8',
    city: 'Islamabad',
    stores: [
      { id: 'S011', name: 'Papa John\'s I-8', type: 'Pizza' },
      { id: 'S012', name: 'Cinnabon I-8', type: 'Bakery' },
      { id: 'S013', name: 'OPTP I-8', type: 'Fast Food' },
    ]
  },
  {
    id: 'A006',
    name: 'Bahria Town Phase 4',
    city: 'Islamabad',
    stores: [
      { id: 'S014', name: 'McDonald\'s Bahria', type: 'Fast Food' },
      { id: 'S015', name: 'Pizza Hut Bahria', type: 'Pizza' },
      { id: 'S016', name: 'The Burger Shack', type: 'Fast Food' },
    ]
  },
  {
    id: 'A007',
    name: 'DHA Phase 2',
    city: 'Islamabad',
    stores: [
      { id: 'S017', name: 'KFC DHA', type: 'Fast Food' },
      { id: 'S018', name: 'Gloria Jeans DHA', type: 'Cafe' },
    ]
  },
];

const AreasPage = () => {
  const [areas, setAreas] = useState<Area[]>(initialAreas);
  const [search, setSearch] = useState('');
  const [viewingArea, setViewingArea] = useState<Area | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingArea, setEditingArea] = useState<Area | null>(null);

  // New area form state
  const [newAreaName, setNewAreaName] = useState('');
  const [newAreaCity, setNewAreaCity] = useState('Islamabad');
  const [newStores, setNewStores] = useState<{ name: string }[]>([{ name: '' }]);

  const filtered = areas.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.city.toLowerCase().includes(search.toLowerCase()) ||
    a.stores.some(s => s.name.toLowerCase().includes(search.toLowerCase()))
  );

  const handleAddStoreField = () => {
    setNewStores([...newStores, { name: '' }]);
  };

  const handleRemoveStoreField = (index: number) => {
    setNewStores(newStores.filter((_, i) => i !== index));
  };

  const handleStoreChange = (index: number, value: string) => {
    const updated = [...newStores];
    updated[index] = { name: value };
    setNewStores(updated);
  };

  const handleSaveArea = () => {
    if (!newAreaName.trim()) return;

    const validStores = newStores.filter(s => s.name.trim());
    
    if (editingArea) {
      // Update existing area
      setAreas(areas.map(a => a.id === editingArea.id ? {
        ...a,
        name: newAreaName,
        city: newAreaCity,
        stores: validStores.map((s, i) => ({
          id: `S${Date.now()}_${i}`,
          name: s.name,
          type: 'Food Store'
        }))
      } : a));
    } else {
      // Add new area
      const newArea: Area = {
        id: `A${Date.now()}`,
        name: newAreaName,
        city: newAreaCity,
        stores: validStores.map((s, i) => ({
          id: `S${Date.now()}_${i}`,
          name: s.name,
          type: 'Food Store'
        }))
      };
      setAreas([...areas, newArea]);
    }

    resetForm();
  };

  const handleDeleteArea = (id: string) => {
    if (confirm('Are you sure you want to delete this area?')) {
      setAreas(areas.filter(a => a.id !== id));
    }
  };

  const handleEditArea = (area: Area) => {
    setEditingArea(area);
    setNewAreaName(area.name);
    setNewAreaCity(area.city);
    setNewStores(area.stores.length > 0 ? area.stores.map(s => ({ name: s.name })) : [{ name: '' }]);
    setIsAddModalOpen(true);
  };

  const resetForm = () => {
    setNewAreaName('');
    setNewAreaCity('Islamabad');
    setNewStores([{ name: '' }]);
    setIsAddModalOpen(false);
    setEditingArea(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Areas Management</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg gradient-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          <Plus className="h-4 w-4" />
          <span className="text-sm font-medium">Add Area</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search areas or stores..."
          className="w-full pl-10 pr-4 py-2 bg-muted/50 border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {/* Areas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((area, i) => (
          <div
            key={area.id}
            className="glass rounded-xl overflow-hidden animate-fade-up"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            {/* Header */}
            <div className="p-4 border-b border-border/50">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg gradient-primary flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground">{area.name}</h3>
                    <p className="text-xs text-muted-foreground">{area.city}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleEditArea(area)}
                    className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                    title="Edit"
                  >
                    <Edit2 className="h-4 w-4 text-muted-foreground" />
                  </button>
                  <button
                    onClick={() => handleDeleteArea(area.id)}
                    className="p-1.5 rounded-lg hover:bg-destructive/20 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </button>
                </div>
              </div>
            </div>

            {/* Stores Count */}
            <div className="px-4 py-2 bg-muted/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Store className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{area.stores.length} Stores</span>
              </div>
              <button
                onClick={() => setViewingArea(area)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors"
              >
                <Eye className="h-3.5 w-3.5" />
                View Stores
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg font-medium text-foreground">No areas found</p>
          <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or add a new area</p>
        </div>
      )}

      {/* View Stores Modal */}
      {viewingArea && (
        <div
          className="fixed inset-0 bg-background/80 z-50 flex items-center justify-center p-4"
          onClick={() => setViewingArea(null)}
        >
          <div
            className="glass rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto animate-scale-in"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg gradient-primary flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">{viewingArea.name}</h2>
                  <p className="text-sm text-muted-foreground">{viewingArea.stores.length} Stores</p>
                </div>
              </div>
              <button
                onClick={() => setViewingArea(null)}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>

            <div className="space-y-2">
              {viewingArea.stores.length > 0 ? (
                viewingArea.stores.map((store, index) => (
                  <div
                    key={store.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 animate-fade-up"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="h-10 w-10 rounded-md gradient-secondary flex items-center justify-center flex-shrink-0">
                      <Store className="h-5 w-5 text-secondary-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{store.name}</p>
                      <p className="text-xs text-muted-foreground">{store.type}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Store className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">No stores added yet</p>
                </div>
              )}
            </div>

            <button
              onClick={() => setViewingArea(null)}
              className="w-full mt-6 py-2.5 rounded-lg bg-muted text-foreground text-sm font-medium hover:bg-muted/80 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {isAddModalOpen && (
        <div
          className="fixed inset-0 bg-background/80 z-50 flex items-center justify-center p-4"
          onClick={() => resetForm()}
        >
          <div
            className="glass rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto animate-scale-in"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">
                {editingArea ? 'Edit Area' : 'Add New Area'}
              </h2>
              <button
                onClick={resetForm}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Area Name */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                  Area Name <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  value={newAreaName}
                  onChange={e => setNewAreaName(e.target.value)}
                  placeholder="e.g., F-10, G-11, Bahria Town..."
                  className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                  City
                </label>
                <input
                  type="text"
                  value={newAreaCity}
                  onChange={e => setNewAreaCity(e.target.value)}
                  placeholder="e.g., Islamabad"
                  className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              {/* Stores Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-muted-foreground">
                    Food Stores <span className="text-xs text-muted-foreground/60">(Optional)</span>
                  </label>
                  <button
                    onClick={handleAddStoreField}
                    className="flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors"
                  >
                    <Plus className="h-3 w-3" />
                    Add Store
                  </button>
                </div>

                <div className="space-y-2">
                  {newStores.map((store, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={store.name}
                        onChange={e => handleStoreChange(index, e.target.value)}
                        placeholder="Store name"
                        className="flex-1 px-3 py-2 bg-muted/50 border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                      {newStores.length > 1 && (
                        <button
                          onClick={() => handleRemoveStoreField(index)}
                          className="p-2 rounded-lg hover:bg-destructive/20 transition-colors"
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-border/50">
                <button
                  onClick={resetForm}
                  className="flex-1 py-2.5 rounded-lg bg-muted text-foreground text-sm font-medium hover:bg-muted/80 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveArea}
                  disabled={!newAreaName.trim()}
                  className="flex-1 py-2.5 rounded-lg gradient-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {editingArea ? 'Update Area' : 'Add Area'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AreasPage;
