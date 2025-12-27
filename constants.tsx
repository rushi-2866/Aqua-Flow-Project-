
import React from 'react';
import { ShoppingCart, DollarSign, CreditCard, Activity } from 'lucide-react';
import { KPIData, InventoryItem, Alert, OrderTrend, Order, Payment, Partner } from './types';

export const INITIAL_KPIS: Record<string, KPIData[]> = {
  Manufacturer: [
    { label: 'Total Production', value: '1.2M L', trend: 12.5, icon: <Activity className="w-6 h-6" />, color: 'teal' },
    { label: 'Factory Revenue', value: '$450K', trend: 8.2, icon: <DollarSign className="w-6 h-6" />, color: 'emerald' },
    { label: 'Wholesale Orders', value: '4,280', trend: -2.4, icon: <ShoppingCart className="w-6 h-6" />, color: 'cyan' },
    { label: 'Unpaid Invoices', value: '$82K', trend: 5.1, icon: <CreditCard className="w-6 h-6" />, color: 'rose' },
  ],
  Wholesaler: [
    { label: 'Current Inventory', value: '450K L', trend: -4.2, icon: <Activity className="w-6 h-6" />, color: 'teal' },
    { label: 'Weekly Revenue', value: '$125K', trend: 15.2, icon: <DollarSign className="w-6 h-6" />, color: 'emerald' },
    { label: 'Retailer Requests', value: '842', trend: 10.5, icon: <ShoppingCart className="w-6 h-6" />, color: 'cyan' },
    { label: 'Accounts Payable', value: '$45K', trend: -1.2, icon: <CreditCard className="w-6 h-6" />, color: 'rose' },
  ],
  Retailer: [
    { label: 'Store Sales', value: '12K L', trend: 22.1, icon: <Activity className="w-6 h-6" />, color: 'teal' },
    { label: 'Daily Revenue', value: '$4.2K', trend: 18.2, icon: <DollarSign className="w-6 h-6" />, color: 'emerald' },
    { label: 'Customer Orders', value: '1,120', trend: 34.5, icon: <ShoppingCart className="w-6 h-6" />, color: 'cyan' },
    { label: 'Inventory Value', value: '$8.5K', trend: 2.1, icon: <CreditCard className="w-6 h-6" />, color: 'rose' },
  ]
};

export const MOCK_INVENTORY: InventoryItem[] = [
  { id: '1', sku: 'AQ-500-CL', name: 'AquaFlow 500ml Classic', stock: 12000, reorderPoint: 5000, status: 'High', location: 'Main Plant A' },
  { id: '2', sku: 'AQ-1000-CL', name: 'AquaFlow 1L Classic', stock: 2400, reorderPoint: 3000, status: 'Low', location: 'Mumbai Hub' },
  { id: '3', sku: 'AQ-2000-PR', name: 'AquaFlow 2L Premium', stock: 5500, reorderPoint: 4000, status: 'Medium', location: 'Pune Wholesaler 1' },
  { id: '4', sku: 'AQ-5000-SP', name: 'AquaFlow 5L Sparkling', stock: 800, reorderPoint: 1000, status: 'Low', location: 'Nagpur Warehouse' },
  { id: '5', sku: 'AQ-20-JAR', name: 'AquaFlow 20L Jar', stock: 15000, reorderPoint: 8000, status: 'High', location: 'Thane Central' },
];

export const MOCK_ORDERS: Order[] = [
  { id: 'ORD-1001', partner: 'Mumbai Logistics Co.', items: '1200 x 20L Jars', amount: 4800, status: 'Delivered', type: 'B2B', date: '2024-03-01', region: 'Mumbai' },
  { id: 'ORD-1002', partner: 'Pune Retail Hub', items: '500 x 1L Classic', amount: 1250, status: 'Dispatched', type: 'B2B', date: '2024-03-02', region: 'Pune' },
  { id: 'ORD-1003', partner: 'Nagpur Fresh Mart', items: '3000 x 500ml Classic', amount: 3000, status: 'Approved', type: 'B2B', date: '2024-03-02', region: 'Nagpur' },
  { id: 'ORD-1004', partner: 'Nashik Wholesale', items: '100 x 5L Sparkling', amount: 800, status: 'Pending', type: 'B2B', date: '2024-03-03', region: 'Nashik' },
  { id: 'ORD-1005', partner: 'City Mart Thane', items: '200 x 2L Premium', amount: 1100, status: 'Packed', type: 'B2B', date: '2024-03-03', region: 'Thane' },
];

export const MOCK_PAYMENTS: Payment[] = [
  { id: 'INV-5001', partner: 'Mumbai Logistics Co.', amount: 4800, due: '2024-03-15', status: 'Paid', creditLimit: 25000 },
  { id: 'INV-5002', partner: 'Pune Retail Hub', amount: 1250, due: '2024-03-10', status: 'Partially Paid', creditLimit: 10000 },
  { id: 'INV-5003', partner: 'Nagpur Fresh Mart', amount: 3000, due: '2024-02-20', status: 'Overdue', creditLimit: 5000 },
  { id: 'INV-5004', partner: 'Nashik Wholesale', amount: 800, due: '2024-03-20', status: 'Pending', creditLimit: 15000 },
];

export const MOCK_PARTNERS: Partner[] = [
  { id: 'P-001', name: 'Mumbai Logistics Co.', type: 'Wholesaler', rating: 4.8, region: 'Mumbai', badge: 'Fast Delivery Partner', reliability: 98 },
  { id: 'P-002', name: 'Pune Retail Hub', type: 'Retailer', rating: 4.2, region: 'Pune', reliability: 85 },
  { id: 'P-003', name: 'Nagpur Fresh Mart', type: 'Retailer', rating: 3.9, region: 'Nagpur', badge: 'High Volume', reliability: 72 },
  { id: 'P-004', name: 'Nashik Wholesale', type: 'Wholesaler', rating: 4.9, region: 'Nashik', badge: 'Zero Complaint Zone', reliability: 99 },
];

export const MOCK_ALERTS: Alert[] = [
  { id: 'a1', type: 'error', title: 'Low Stock Alert', message: '1L Classic SKU is below reorder point in Mumbai Warehouse.', timestamp: '10m ago', priority: 'High' },
  { id: 'a2', type: 'warning', title: 'Delayed Shipment', message: 'Route B-42 from Factory to Pune is delayed by 4 hours.', timestamp: '45m ago', priority: 'Medium' },
  { id: 'a3', type: 'info', title: 'Payment Pending', message: 'Invoice #INV-5003 for Nagpur Mart is overdue by 12 days.', timestamp: '2h ago', priority: 'High' },
];

export const ORDER_TRENDS: OrderTrend[] = [
  { date: 'Mon', orders: 400, revenue: 2400 },
  { date: 'Tue', orders: 300, revenue: 1398 },
  { date: 'Wed', orders: 200, revenue: 9800 },
  { date: 'Thu', orders: 278, revenue: 3908 },
  { date: 'Fri', orders: 189, revenue: 4800 },
  { date: 'Sat', orders: 239, revenue: 3800 },
  { date: 'Sun', orders: 349, revenue: 4300 },
];

export const MAHARASHTRA_DISTRICTS = [
  { name: 'Mumbai', value: 85, revenue: '1.2M', orders: 12500, color: '#0d9488' },
  { name: 'Pune', value: 72, revenue: '980K', orders: 8400, color: '#0f766e' },
  { name: 'Nagpur', value: 45, revenue: '450K', orders: 3200, color: '#14b8a6' },
  { name: 'Nashik', value: 60, revenue: '620K', orders: 4800, color: '#0d9488' },
  { name: 'Aurangabad', value: 38, revenue: '310K', orders: 2100, color: '#5eead4' },
  { name: 'Thane', value: 78, revenue: '890K', orders: 7600, color: '#0f766e' },
];
