import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Moon, Sun, Bell, Shield, User } from 'lucide-react';
import { useTheme } from 'next-themes';

const SettingsPage = () => {
  const { adminName } = useAuth();
  const { theme, setTheme } = useTheme();
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);

  const isDark = theme === 'dark';

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold text-foreground">Settings</h1>

      {/* Profile */}
      <div className="glass rounded-xl p-5 animate-fade-up">
        <div className="flex items-center gap-3 mb-4">
          <User className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Profile</h3>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Name</label>
            <input defaultValue={adminName} className="w-full px-4 py-2 bg-muted/50 border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Email</label>
            <input defaultValue="admin@robotinn.com" className="w-full px-4 py-2 bg-muted/50 border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
        </div>
      </div>

      {/* Appearance */}
      <div className="glass rounded-xl p-5 animate-fade-up">
        <div className="flex items-center gap-3 mb-4">
          {isDark ? <Moon className="h-5 w-5 text-primary" /> : <Sun className="h-5 w-5 text-secondary" />}
          <h3 className="text-lg font-semibold text-foreground">Appearance</h3>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">Dark Mode</p>
            <p className="text-xs text-muted-foreground">Use dark theme across the dashboard</p>
          </div>
          <button onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className={`relative w-12 h-6 rounded-full transition-colors ${isDark ? 'bg-primary' : 'bg-muted'}`}>
            <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-foreground transition-transform ${isDark ? 'left-6' : 'left-0.5'}`} />
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div className="glass rounded-xl p-5 animate-fade-up">
        <div className="flex items-center gap-3 mb-4">
          <Bell className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
        </div>
        <div className="space-y-4">
          {[
            { label: 'Email Notifications', desc: 'Receive email alerts', value: emailNotifs, set: setEmailNotifs },
            { label: 'Push Notifications', desc: 'Browser push alerts', value: pushNotifs, set: setPushNotifs },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <button onClick={() => item.set(!item.value)}
                className={`relative w-12 h-6 rounded-full transition-colors ${item.value ? 'bg-primary' : 'bg-muted'}`}>
                <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-foreground transition-transform ${item.value ? 'left-6' : 'left-0.5'}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Security */}
      <div className="glass rounded-xl p-5 animate-fade-up">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Security</h3>
        </div>
        <button className="px-4 py-2 rounded-lg gradient-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
          Change Password
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
