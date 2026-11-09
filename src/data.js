export const initialProducts = [
  { id: 'PRD-1001', name: 'Wireless Barcode Scanner', category: 'Electronics', sku: 'WBS-204', barcode: '8901001001', warehouse: 'Main Warehouse', quantity: 124, minStock: 25, price: 89.99, supplier: 'ScanPro Systems', status: 'In stock' },
  { id: 'PRD-1002', name: 'Thermal Label Roll', category: 'Packaging', sku: 'TLR-110', barcode: '8901001002', warehouse: 'Main Warehouse', quantity: 18, minStock: 30, price: 12.50, supplier: 'PackWell Supplies', status: 'Low stock' },
  { id: 'PRD-1003', name: 'Industrial Storage Bin', category: 'Warehouse', sku: 'ISB-501', barcode: '8901001003', warehouse: 'North Hub', quantity: 240, minStock: 40, price: 24.00, supplier: 'StoreMax Ltd', status: 'In stock' },
  { id: 'PRD-1004', name: 'Safety Gloves - Pack of 10', category: 'Safety', sku: 'SG-010', barcode: '8901001004', warehouse: 'South Warehouse', quantity: 7, minStock: 20, price: 18.75, supplier: 'SafeHands Co.', status: 'Low stock' },
  { id: 'PRD-1005', name: 'Handheld RFID Reader', category: 'Electronics', sku: 'HRR-440', barcode: '8901001005', warehouse: 'Main Warehouse', quantity: 0, minStock: 10, price: 249.00, supplier: 'ScanPro Systems', status: 'Out of stock' },
  { id: 'PRD-1006', name: 'Shipping Carton - Large', category: 'Packaging', sku: 'SCL-900', barcode: '8901001006', warehouse: 'North Hub', quantity: 86, minStock: 35, price: 3.20, supplier: 'PackWell Supplies', status: 'In stock' },
  { id: 'PRD-1007', name: 'Pallet Wrap Film', category: 'Packaging', sku: 'PWF-300', barcode: '8901001007', warehouse: 'South Warehouse', quantity: 42, minStock: 15, price: 16.40, supplier: 'PackWell Supplies', status: 'In stock' },
  { id: 'PRD-1008', name: 'Heavy Duty Shelving', category: 'Warehouse', sku: 'HDS-720', barcode: '8901001008', warehouse: 'North Hub', quantity: 12, minStock: 8, price: 189.00, supplier: 'StoreMax Ltd', status: 'In stock' }
];

export const suppliers = [
  { name: 'ScanPro Systems', email: 'orders@scanpro.example', phone: '+1 555 014 2210', products: 2, status: 'Active' },
  { name: 'PackWell Supplies', email: 'sales@packwell.example', phone: '+1 555 014 2281', products: 3, status: 'Active' },
  { name: 'StoreMax Ltd', email: 'support@storemax.example', phone: '+1 555 014 3320', products: 2, status: 'Active' },
  { name: 'SafeHands Co.', email: 'hello@safehands.example', phone: '+1 555 014 9012', products: 1, status: 'Active' }
];

export const movements = [
  { title: 'Wireless Barcode Scanner', type: 'Stock received', qty: '+24 units', date: 'Today, 10:42 AM', initials: 'WB' },
  { title: 'Thermal Label Roll', type: 'Stock adjustment', qty: '-8 units', date: 'Today, 09:18 AM', initials: 'TL' },
  { title: 'Shipping Carton - Large', type: 'Purchase order', qty: '+50 units', date: 'Yesterday, 04:36 PM', initials: 'SC' },
  { title: 'Safety Gloves - Pack of 10', type: 'Sales order', qty: '-12 units', date: 'Yesterday, 02:10 PM', initials: 'SG' }
];