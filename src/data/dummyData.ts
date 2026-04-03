// Dummy data for the admin panel

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'customer' | 'rider';
  status: 'active' | 'banned';
  joinDate: string;
  totalOrders: number;
  avatar: string;
}

export interface Order {
  id: string;
  customerName: string;
  riderName: string;
  items: string[];
  total: number;
  status: 'pending' | 'preparing' | 'picked' | 'delivered' | 'cancelled';
  date: string;
  area: string;
  address: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  costPrice?: number;
  image: string;
  category: string;
  active: boolean;
  offer?: {
    type: 'percentage' | 'fixed';
    value: number;
    validUntil?: string;
  };
}

export interface Bill {
  id: string;
  riderName: string;
  amount: number;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  description: string;
}

export interface Message {
  id: string;
  sender: string;
  senderType: 'customer' | 'rider' | 'admin';
  message: string;
  time: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  name: string;
  type: 'customer' | 'rider';
  lastMessage: string;
  time: string;
  unread: number;
  avatar: string;
  messages: Message[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'order' | 'rider' | 'system';
}

export interface ActivityLog {
  id: string;
  action: string;
  user: string;
  time: string;
  type: 'info' | 'warning' | 'success' | 'error';
}

export const users: User[] = [
  { id: 'U001', name: 'Ahmed Khan', email: 'ahmed@email.com', phone: '+92 300 1234567', type: 'customer', status: 'active', joinDate: '2024-01-15', totalOrders: 45, avatar: 'AK' },
  { id: 'U002', name: 'Sara Ali', email: 'sara@email.com', phone: '+92 301 2345678', type: 'customer', status: 'active', joinDate: '2024-02-20', totalOrders: 32, avatar: 'SA' },
  { id: 'U003', name: 'Bilal Hussain', email: 'bilal@email.com', phone: '+92 302 3456789', type: 'rider', status: 'active', joinDate: '2024-01-10', totalOrders: 120, avatar: 'BH' },
  { id: 'U004', name: 'Fatima Noor', email: 'fatima@email.com', phone: '+92 303 4567890', type: 'customer', status: 'banned', joinDate: '2024-03-05', totalOrders: 8, avatar: 'FN' },
  { id: 'U005', name: 'Usman Tariq', email: 'usman@email.com', phone: '+92 304 5678901', type: 'rider', status: 'active', joinDate: '2024-02-01', totalOrders: 98, avatar: 'UT' },
  { id: 'U006', name: 'Ayesha Malik', email: 'ayesha@email.com', phone: '+92 305 6789012', type: 'customer', status: 'active', joinDate: '2024-04-10', totalOrders: 15, avatar: 'AM' },
  { id: 'U007', name: 'Hassan Raza', email: 'hassan@email.com', phone: '+92 306 7890123', type: 'rider', status: 'banned', joinDate: '2024-03-15', totalOrders: 67, avatar: 'HR' },
  { id: 'U008', name: 'Zainab Shah', email: 'zainab@email.com', phone: '+92 307 8901234', type: 'customer', status: 'active', joinDate: '2024-05-01', totalOrders: 22, avatar: 'ZS' },
];

export const orders: Order[] = [
  { id: 'ORD-001', customerName: 'Ahmed Khan', riderName: 'Bilal Hussain', items: ['Burger', 'Fries', 'Coke'], total: 850, status: 'delivered', date: '2024-06-15', area: 'Gulberg', address: '123 Main St, Gulberg III' },
  { id: 'ORD-002', customerName: 'Sara Ali', riderName: 'Usman Tariq', items: ['Pizza Large', 'Garlic Bread'], total: 1500, status: 'preparing', date: '2024-06-15', area: 'DHA', address: '45 Phase 5, DHA' },
  { id: 'ORD-003', customerName: 'Ayesha Malik', riderName: 'Bilal Hussain', items: ['Biryani', 'Raita'], total: 650, status: 'pending', date: '2024-06-15', area: 'Model Town', address: '78 Block C, Model Town' },
  { id: 'ORD-004', customerName: 'Zainab Shah', riderName: 'Usman Tariq', items: ['Shawarma', 'Drink'], total: 450, status: 'picked', date: '2024-06-14', area: 'Johar Town', address: '12 Block E, Johar Town' },
  { id: 'ORD-005', customerName: 'Ahmed Khan', riderName: 'Bilal Hussain', items: ['Nihari', 'Naan x3'], total: 900, status: 'delivered', date: '2024-06-14', area: 'Gulberg', address: '123 Main St, Gulberg III' },
  { id: 'ORD-006', customerName: 'Sara Ali', riderName: 'Usman Tariq', items: ['Chicken Karahi', 'Rice'], total: 1200, status: 'cancelled', date: '2024-06-13', area: 'DHA', address: '45 Phase 5, DHA' },
  { id: 'ORD-007', customerName: 'Fatima Noor', riderName: 'Bilal Hussain', items: ['Rolls x2', 'Chutney'], total: 350, status: 'delivered', date: '2024-06-13', area: 'Cantt', address: '99 Mall Road' },
  { id: 'ORD-008', customerName: 'Ayesha Malik', riderName: 'Usman Tariq', items: ['BBQ Platter'], total: 2200, status: 'delivered', date: '2024-06-12', area: 'Model Town', address: '78 Block C, Model Town' },
];

export const products: Product[] = [
  { id: 'P001', title: 'Classic Burger Deal', description: 'Juicy beef burger with fries and drink', price: 850, image: '🍔', category: 'Fast Food', active: true },
  { id: 'P002', title: 'Family Pizza', description: 'Large pizza with 4 toppings of your choice', price: 1500, image: '🍕', category: 'Pizza', active: true },
  { id: 'P003', title: 'Biryani Special', description: 'Authentic chicken biryani with raita', price: 650, image: '🍛', category: 'Desi', active: true },
  { id: 'P004', title: 'BBQ Platter', description: 'Mixed grill platter for 4 people', price: 2200, image: '🥩', category: 'BBQ', active: false },
  { id: 'P005', title: 'Shawarma Wrap', description: 'Fresh chicken shawarma with garlic sauce', price: 450, image: '🌯', category: 'Fast Food', active: true },
  { id: 'P006', title: 'Nihari Bowl', description: 'Slow-cooked nihari with naan', price: 900, image: '🥘', category: 'Desi', active: true },
];

export const bills: Bill[] = [
  { id: 'B001', riderName: 'Bilal Hussain', amount: 5000, date: '2024-06-15', status: 'pending', description: 'Fuel expenses - Week 24' },
  { id: 'B002', riderName: 'Usman Tariq', amount: 3500, date: '2024-06-14', status: 'approved', description: 'Fuel expenses - Week 24' },
  { id: 'B003', riderName: 'Hassan Raza', amount: 2000, date: '2024-06-13', status: 'rejected', description: 'Phone repair claim' },
  { id: 'B004', riderName: 'Bilal Hussain', amount: 4500, date: '2024-06-10', status: 'approved', description: 'Fuel expenses - Week 23' },
  { id: 'B005', riderName: 'Usman Tariq', amount: 1500, date: '2024-06-09', status: 'pending', description: 'Delivery bag replacement' },
];

export const conversations: Conversation[] = [
  {
    id: 'C001', name: 'Ahmed Khan', type: 'customer', lastMessage: 'Where is my order?', time: '2 min ago', unread: 2, avatar: 'AK',
    messages: [
      { id: 'M1', sender: 'Ahmed Khan', senderType: 'customer', message: 'Hello, I placed an order 30 minutes ago', time: '10:30 AM', read: true },
      { id: 'M2', sender: 'Admin', senderType: 'admin', message: 'Hi Ahmed! Let me check your order status', time: '10:32 AM', read: true },
      { id: 'M3', sender: 'Ahmed Khan', senderType: 'customer', message: 'Where is my order?', time: '10:45 AM', read: false },
    ]
  },
  {
    id: 'C002', name: 'Bilal Hussain', type: 'rider', lastMessage: 'Order picked up!', time: '5 min ago', unread: 0, avatar: 'BH',
    messages: [
      { id: 'M4', sender: 'Bilal Hussain', senderType: 'rider', message: 'I am at the restaurant', time: '11:00 AM', read: true },
      { id: 'M5', sender: 'Admin', senderType: 'admin', message: 'Great, please update when picked up', time: '11:01 AM', read: true },
      { id: 'M6', sender: 'Bilal Hussain', senderType: 'rider', message: 'Order picked up!', time: '11:15 AM', read: true },
    ]
  },
  {
    id: 'C003', name: 'Sara Ali', type: 'customer', lastMessage: 'Thank you for resolving!', time: '1 hour ago', unread: 0, avatar: 'SA',
    messages: [
      { id: 'M7', sender: 'Sara Ali', senderType: 'customer', message: 'My order was wrong', time: '9:00 AM', read: true },
      { id: 'M8', sender: 'Admin', senderType: 'admin', message: 'Sorry about that! We will send a replacement', time: '9:05 AM', read: true },
      { id: 'M9', sender: 'Sara Ali', senderType: 'customer', message: 'Thank you for resolving!', time: '9:30 AM', read: true },
    ]
  },
];

export const notifications: Notification[] = [
  { id: 'N1', title: 'New Order', message: 'Order ORD-003 received from Ayesha Malik', time: '2 min ago', read: false, type: 'order' },
  { id: 'N2', title: 'Rider Update', message: 'Bilal Hussain is now online', time: '10 min ago', read: false, type: 'rider' },
  { id: 'N3', title: 'Order Delivered', message: 'Order ORD-001 delivered successfully', time: '30 min ago', read: true, type: 'order' },
  { id: 'N4', title: 'New Bill', message: 'Bilal Hussain submitted a fuel bill', time: '1 hour ago', read: true, type: 'system' },
  { id: 'N5', title: 'User Banned', message: 'Hassan Raza has been banned', time: '2 hours ago', read: true, type: 'system' },
];

export const activityLogs: ActivityLog[] = [
  { id: 'L1', action: 'Order ORD-003 created', user: 'System', time: '2 min ago', type: 'info' },
  { id: 'L2', action: 'User Hassan Raza banned', user: 'Admin', time: '1 hour ago', type: 'warning' },
  { id: 'L3', action: 'Order ORD-001 delivered', user: 'Bilal Hussain', time: '2 hours ago', type: 'success' },
  { id: 'L4', action: 'Bill B003 rejected', user: 'Admin', time: '3 hours ago', type: 'error' },
  { id: 'L5', action: 'New product added: Shawarma Wrap', user: 'Admin', time: '5 hours ago', type: 'info' },
  { id: 'L6', action: 'Order ORD-006 cancelled', user: 'Sara Ali', time: '1 day ago', type: 'warning' },
];

export const chartData = {
  ordersOverTime: [
    { name: 'Mon', orders: 45 },
    { name: 'Tue', orders: 52 },
    { name: 'Wed', orders: 49 },
    { name: 'Thu', orders: 63 },
    { name: 'Fri', orders: 78 },
    { name: 'Sat', orders: 92 },
    { name: 'Sun', orders: 85 },
  ],
  revenueData: [
    { name: 'Jan', revenue: 125000 },
    { name: 'Feb', revenue: 148000 },
    { name: 'Mar', revenue: 162000 },
    { name: 'Apr', revenue: 195000 },
    { name: 'May', revenue: 210000 },
    { name: 'Jun', revenue: 245000 },
  ],
  revenueByCategory: [
    { name: 'Fast Food', value: 35 },
    { name: 'Pizza', value: 25 },
    { name: 'Desi', value: 20 },
    { name: 'BBQ', value: 12 },
    { name: 'Other', value: 8 },
  ],
};

export const riderLocations = [
  { id: 'R1', name: 'Bilal Hussain', lat: 31.5204, lng: 74.3587, status: 'delivering' as const },
  { id: 'R2', name: 'Usman Tariq', lat: 31.5150, lng: 74.3460, status: 'idle' as const },
  { id: 'R3', name: 'Hassan Raza', lat: 31.5280, lng: 74.3520, status: 'offline' as const },
];
