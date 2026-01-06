import { connectDB } from "@/lib/mongodb";
import { Product } from "@/models/Product";
import { StatsCards } from "@/components/ui/StatsCards";
import InventoryChart from "@/components/ui/InventoryChart"; 
import SalesChart from "@/components/ui/SalesChart"; 

export default async function DashboardPage() {
  await connectDB();

  const products = await Product.find().lean();
  const totalProducts = products.length;
  const totalValue = products.reduce((acc, item: any) => acc + (item.price * item.stock), 0);
  const outOfStock = products.filter((p: any) => p.stock === 0).length;

  const chartData = products.slice(0, 8).map((p: any) => ({
    name: p.name.length > 10 ? p.name.substring(0, 10) + "..." : p.name,
    stock: p.stock,
  }));

  return (
    <div className="min-h-screen w-full bg-slate-50/50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Dashboard Overview</h1>
          <p className="text-slate-500 mt-1">Manage your inventory and track performance.</p>
        </header>
        
        <StatsCards 
          total={totalProducts} 
          value={totalValue} 
          outOfStock={outOfStock} 
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <SalesChart />
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Inventory Health</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <p className="text-sm text-slate-500">Low Stock Items</p>
                <p className="text-2xl font-bold text-orange-600">
                  {products.filter((p: any) => p.stock > 0 && p.stock < 10).length}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <p className="text-sm text-slate-500">Recently Added</p>
                <p className="text-md font-medium text-slate-800">
                  {products.length > 0 ? products[products.length - 1].name : "No products"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-2">Stock Levels</h3>
          <p className="text-sm text-slate-500 mb-6">Current inventory count per product.</p>
          <InventoryChart data={chartData} />
        </div>
      </div>
    </div>
  );
}