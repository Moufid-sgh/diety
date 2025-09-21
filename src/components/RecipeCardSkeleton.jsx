import { Skeleton } from "@/components/ui/skeleton"

const RecipeCardSkeleton = () => (
  <div dir="rtl" className="relative w-[320px] m-6 pb-6 group cardShadow">
    <div className="relative overflow-hidden cardBorder">
      <Skeleton className="w-[320px] h-[350px] rounded-[12px]" />
    </div>
      <div className="flex items-center mt-4 gap-4 pr-4">
        <Skeleton className="h-5 w-24 rounded" />
        <Skeleton className="h-5 w-16 rounded" />
      </div>
      <Skeleton className="h-5 w-72 rounded mt-4 mr-4" />
  </div>
)

export default RecipeCardSkeleton