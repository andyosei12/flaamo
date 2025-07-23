import { Skeleton } from "@/components/ui/skeleton";

export default function GroupSummarySkeleton() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
      {[1, 2, 3].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-md shadow p-4 flex flex-col gap-2"
        >
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-6 w-1/2" />
        </div>
      ))}
    </section>
  );
}
