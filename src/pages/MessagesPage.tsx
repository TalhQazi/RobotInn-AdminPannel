import { useState } from 'react';
import { Send } from 'lucide-react';
import { conversations as initialConversations, Conversation, Message } from '@/data/dummyData';

const MessagesPage = () => {
  const [convos, setConvos] = useState<Conversation[]>(initialConversations);
  const [activeId, setActiveId] = useState<string>(convos[0]?.id || '');
  const [newMsg, setNewMsg] = useState('');
  const [showList, setShowList] = useState(true);

  const active = convos.find(c => c.id === activeId);

  const sendMessage = () => {
    if (!newMsg.trim() || !activeId) return;
    const msg: Message = {
      id: `M${Date.now()}`,
      sender: 'Admin',
      senderType: 'admin',
      message: newMsg,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: true,
    };
    setConvos(convos.map(c => c.id === activeId ? { ...c, messages: [...c.messages, msg], lastMessage: newMsg, time: 'Just now' } : c));
    setNewMsg('');
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-foreground">Messages</h1>

      <div className="glass rounded-xl overflow-hidden flex" style={{ height: 'calc(100vh - 180px)' }}>
        {/* Conversation List */}
        <div className={`w-full md:w-80 border-r border-border flex-shrink-0 flex flex-col ${!showList && 'hidden md:flex'}`}>
          <div className="p-3 border-b border-border">
            <p className="text-sm font-semibold text-foreground">Conversations</p>
          </div>
          <div className="flex-1 overflow-y-auto scrollbar-thin">
            {convos.map(c => (
              <button key={c.id} onClick={() => { setActiveId(c.id); setShowList(false); }}
                className={`w-full flex items-center gap-3 p-3 hover:bg-muted/30 transition-colors text-left ${activeId === c.id ? 'bg-muted/40' : ''}`}>
                <div className={`h-10 w-10 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${c.type === 'rider' ? 'gradient-secondary text-secondary-foreground' : 'gradient-primary text-primary-foreground'}`}>
                  {c.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium text-foreground truncate">{c.name}</p>
                    <span className="text-xs text-muted-foreground flex-shrink-0">{c.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{c.lastMessage}</p>
                </div>
                {c.unread > 0 && (
                  <span className="h-5 w-5 gradient-secondary rounded-full text-[10px] font-bold flex items-center justify-center text-secondary-foreground flex-shrink-0">{c.unread}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className={`flex-1 flex flex-col ${showList && 'hidden md:flex'}`}>
          {active ? (
            <>
              <div className="p-3 border-b border-border flex items-center gap-3">
                <button onClick={() => setShowList(true)} className="md:hidden text-muted-foreground text-sm">← Back</button>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${active.type === 'rider' ? 'gradient-secondary text-secondary-foreground' : 'gradient-primary text-primary-foreground'}`}>
                  {active.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{active.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{active.type}</p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
                {active.messages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.senderType === 'admin' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] px-3 py-2 rounded-xl text-sm ${msg.senderType === 'admin' ? 'gradient-primary text-primary-foreground' : 'bg-muted text-foreground'}`}>
                      <p>{msg.message}</p>
                      <p className={`text-[10px] mt-1 ${msg.senderType === 'admin' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>{msg.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 border-t border-border flex gap-2">
                <input value={newMsg} onChange={e => setNewMsg(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 bg-muted/50 border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                <button onClick={sendMessage} className="p-2.5 rounded-lg gradient-primary text-primary-foreground hover:opacity-90 transition-opacity">
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">Select a conversation</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
