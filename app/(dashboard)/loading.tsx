export default function DashboardLoading() {
  return (
    <div className="space-y-8 animate-pulse p-4">
      <div className="flex justify-between items-center">
        <div className="w-32 h-8 bg-muted rounded-md"></div>
        <div className="w-10 h-10 bg-muted rounded-full"></div>
      </div>

      {/* Insight Card Skeleton */}
      <div className="w-full h-40 bg-muted rounded-3xl"></div>

      {/* Rings Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-4">
        <div className="flex flex-col items-center">
          <div className="w-64 h-64 bg-muted rounded-full"></div>
        </div>
        <div className="space-y-4">
          <div className="w-full h-24 bg-muted rounded-3xl"></div>
          <div className="w-full h-24 bg-muted rounded-3xl"></div>
        </div>
      </div>

      {/* Feed Skeleton */}
      <div className="space-y-4">
        <div className="w-40 h-6 bg-muted rounded-md mb-6"></div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="w-full h-20 bg-muted rounded-2xl"></div>
        ))}
      </div>
    </div>
  );
}
