import { MapPin, Circle } from 'lucide-react';
import { riderLocations } from '@/data/dummyData';

const statusColors = {
  delivering: 'text-primary',
  idle: 'text-secondary',
  offline: 'text-muted-foreground',
};

const LocationsPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Location Tracking</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map placeholder */}
        <div className="lg:col-span-2 glass rounded-xl overflow-hidden" style={{ height: '500px' }}>
          <div className="h-full flex flex-col items-center justify-center text-center p-8 relative" style={{ background: 'linear-gradient(135deg, hsl(222 47% 14%), hsl(217 33% 20%))' }}>
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: 'linear-gradient(hsl(215 20% 65%) 1px, transparent 1px), linear-gradient(90deg, hsl(215 20% 65%) 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }} />

            {/* Rider dots */}
            {riderLocations.map((r, i) => (
              <div key={r.id} className="absolute animate-pulse" style={{ top: `${30 + i * 20}%`, left: `${25 + i * 22}%` }}>
                <div className={`h-4 w-4 rounded-full ${r.status === 'delivering' ? 'gradient-primary' : r.status === 'idle' ? 'gradient-secondary' : 'bg-muted'} shadow-lg`} />
                <span className="text-[10px] text-foreground mt-1 block whitespace-nowrap">{r.name}</span>
              </div>
            ))}

            <MapPin className="h-16 w-16 text-primary mb-4 relative z-10" />
            <p className="text-lg font-semibold text-foreground relative z-10">Map View</p>
            <p className="text-sm text-muted-foreground relative z-10 mt-1">Google Maps integration coming soon</p>
          </div>
        </div>

        {/* Rider list */}
        <div className="glass rounded-xl p-5">
          <h3 className="text-lg font-semibold text-foreground mb-4">Active Riders</h3>
          <div className="space-y-3">
            {riderLocations.map((rider, i) => (
              <div key={rider.id} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <Circle className={`h-3 w-3 fill-current ${statusColors[rider.status]}`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{rider.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{rider.status}</p>
                </div>
                <div className="text-right text-xs text-muted-foreground">
                  <p>{rider.lat.toFixed(4)}</p>
                  <p>{rider.lng.toFixed(4)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationsPage;
