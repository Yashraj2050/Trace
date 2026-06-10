export default function DashboardLoading() {
  return (
    <div className="w-full flex flex-col pointer-events-none">
      
      {/* Header Area Skeleton */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-8 gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-4 h-4 bg-white/10 animate-pulse" />
            <div className="h-7 w-48 bg-white/5 animate-pulse" />
          </div>
          <div className="h-3 w-32 bg-white/5 animate-pulse mt-1" />
        </div>
        <div className="flex items-center gap-4">
          <div className="h-6 w-32 bg-white/5 animate-pulse" />
          <div className="h-6 w-24 bg-white/5 animate-pulse" />
        </div>
      </div>

      {/* Structured Grid Layout Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-px bg-white/10 border border-white/10 rounded-sm overflow-hidden animate-pulse">
        
        {/* Primary Impact Metric */}
        <div className="col-span-1 md:col-span-4 lg:col-span-8 p-8 bg-[#0a0a0a] flex flex-col justify-between min-h-[280px]">
          <div className="flex justify-between items-start mb-12">
            <div className="h-3 w-32 bg-white/5" />
            <div className="h-4 w-16 bg-white/10" />
          </div>
          <div className="flex items-baseline gap-4">
            <div className="h-24 md:h-32 w-48 bg-white/5" />
            <div className="flex flex-col gap-2 pb-2">
              <div className="h-4 w-16 bg-white/5" />
              <div className="h-3 w-20 bg-white/10" />
            </div>
          </div>
        </div>

        {/* Sync Rate / Quick Stats */}
        <div className="col-span-1 md:col-span-4 lg:col-span-4 bg-[#0a0a0a] flex flex-col">
          <div className="p-6 border-b border-white/10 flex-1 flex flex-col justify-between">
            <div className="h-3 w-24 bg-white/5 mb-6" />
            <div className="flex items-baseline gap-2">
              <div className="h-10 w-16 bg-white/5" />
              <div className="h-3 w-8 bg-white/5" />
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div className="h-3 w-24 bg-white/5 mb-6" />
            <div className="flex items-baseline gap-2">
              <div className="h-10 w-16 bg-white/10" />
              <div className="h-3 w-8 bg-white/5" />
            </div>
          </div>
        </div>

        {/* Dense Telemetry Row */}
        <div className="col-span-1 md:col-span-4 lg:col-span-3 p-6 bg-[#0a0a0a]">
          <div className="h-3 w-24 bg-white/5 mb-6" />
          <div className="h-6 w-32 bg-white/5 mb-2" />
          <div className="h-3 w-20 bg-white/5" />
        </div>

        <div className="col-span-1 md:col-span-4 lg:col-span-3 p-6 bg-[#0a0a0a]">
          <div className="h-3 w-24 bg-white/5 mb-6" />
          <div className="h-6 w-24 bg-white/5 mb-2" />
          <div className="h-3 w-20 bg-white/5" />
        </div>

        <div className="col-span-1 md:col-span-4 lg:col-span-6 p-6 bg-[#0a0a0a] flex flex-col justify-between">
          <div className="h-3 w-24 bg-white/10" />
          <div className="mt-8 flex items-center justify-between">
            <div>
              <div className="h-5 w-40 bg-white/5 mb-2" />
              <div className="h-3 w-48 bg-white/5" />
            </div>
            <div className="w-5 h-5 bg-white/5" />
          </div>
        </div>

        {/* Minimalist Data Sparkline Mockup */}
        <div className="col-span-1 md:col-span-4 lg:col-span-12 p-6 bg-[#0a0a0a] h-48 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div className="h-3 w-32 bg-white/5" />
            <div className="h-3 w-24 bg-white/5" />
          </div>
          <div className="flex-1 flex items-end gap-[1px]">
            {[1,2,3,4,5,6,7,8,9,10,11,12].map((_, i) => (
              <div key={i} className="flex-1 h-full flex items-end">
                <div className="w-full bg-white/5" style={{ height: `${Math.max(20, Math.random() * 100)}%` }} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
