import RecipeCardSkeleton from "./RecipeCardSkeleton"
import { Skeleton } from "./ui/skeleton"

const HomeLoading = () => {
    return (
        <div dir="rtl" className="w-full mt-4">
            <section>
                <div>
                    <Skeleton className="h-4 w-96 mb-4 rounded" />
                    <Skeleton className="h-1 w-full" />
                </div>

                <div className='flex items-center justify-center mr-3 mt-6'>
                    <RecipeCardSkeleton />
                    <RecipeCardSkeleton />
                    <RecipeCardSkeleton />
                </div>
            </section>

            <section className="mt-10">
                <div>
                    <Skeleton className="h-4 w-96 mb-4 rounded" />
                    <Skeleton className="h-1 w-full" />
                </div>

                <div className='flex items-center justify-center mr-3 mt-6'>
                   <RecipeCardSkeleton />
                    <RecipeCardSkeleton />
                    <RecipeCardSkeleton />
                </div>
            </section>
        </div>
    )
}

export default HomeLoading