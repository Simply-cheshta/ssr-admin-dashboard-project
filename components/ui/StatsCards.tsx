export function StatsCards({ total, value, outOfStock }: any) {
  const stats = [
    { name: 'Total Products', value: total, color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'Inventory Value', value: `$${value?.toLocaleString() || 0}`, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { name: 'Out of Stock', value: outOfStock, color: 'text-red-600', bg: 'bg-red-50' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {stats.map((item) => (
        <div key={item.name} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{item.name}</p>
              <p className={`text-2xl md:text-3xl font-bold mt-2 ${item.color}`}>{item.value}</p>
            </div>
            <div className={`p-3 rounded-lg ${item.bg} hidden sm:block`}>
              {/* Optional: Add Heroicons here */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}