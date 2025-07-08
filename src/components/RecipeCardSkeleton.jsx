import { Skeleton } from "@/components/ui/skeleton"

const RecipeCardSkeleton = () => (
  <div dir="rtl" className="relative w-[280px] mx-10 my-6 group cardShadow">
    <div className="relative overflow-hidden cardBorder">
      <Skeleton className="w-[280px] h-[350px] rounded-[12px]" />
    </div>
    <div className="relative p-2">
      <Skeleton className="h-7 w-64 mt-2 rounded" />
      <Skeleton className="h-7 w-40 mt-3 rounded" />
      <div className="flex items-center mt-4 gap-4">
        <Skeleton className="h-5 w-16 rounded" />
        <Skeleton className="h-5 w-16 rounded" />
      </div>
    </div>
  </div>
)

export default RecipeCardSkeleton