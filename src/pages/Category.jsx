import { useParams } from 'react-router-dom'
import { useState, useEffect } from "react"
import RecipeCard from '@/components/RecipeCard'
import ErrorBoundary from '@/components/ErrorBoundary'
import RecipeCardSkeleton from '@/components/RecipeCardSkeleton'

const TAKE = 12

const Category = () => {

    const { category } = useParams()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(0)
    const [hasMore, setHasMore] = useState(true)

    const fetchData = async (currentPage = 0) => {
        try {
            setLoading(true)
            const response = await fetch(
                `https://yahalawa.net/api/diet/recipesByCategories/${category}?skip=${currentPage * TAKE}&take=${TAKE}`
            )
            if (!response.ok) throw new Error('Failed to fetch data')
            const result = await response.json()
            if (currentPage === 0) {
                setData(result)
            } else {
                setData(prev => [...prev, ...result])
            }
            setHasMore(result.length === TAKE)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    // Reset page and fetch data when category changes
    useEffect(() => {
        setPage(0)
        fetchData(0)
    }, [category])

    
    // Fetch data when page changes
    const handleLoadMore = () => {
        const nextPage = page + 1
        setPage(nextPage)
        fetchData(nextPage)
    }
    

    return (
        <main className="flex min-h-screen flex-col items-center px-3 md:px-8 lg:px-32 py-8 mt-24 lg:mt-0">
            
            <div className='text-end w-full'>
                <p className='text-[#7695FF] text-3xl mb-2'>{category}</p>
                <p className='rubriqueTitle'></p>
            </div>

            <section className="flex flex-wrap justify-center items-start w-full my-6">
                <ErrorBoundary>
                    {loading && page === 0 ? (
                        <>
                            {[...Array(6)].map((_, i) => (
                                <RecipeCardSkeleton key={i} />
                            ))}
                        </>
                    ) : Array.isArray(data) && data.length > 0 ? (
                        data.map((el) => (
                            <RecipeCard key={el.id} el={el} />
                        ))
                    ) : (
                        <div className="w-full text-center text-2xl my-16">
                            لم يتم العثور على وصفات
                        </div>
                    )}
                </ErrorBoundary>
            </section>

            {hasMore && !loading && data.length > 0 && (
                <button
                    onClick={handleLoadMore}
                    className="px-6 py-2 my-8 bg-blue text-white rounded-[8px] hover:bg-[#007AFFCC] duration-300 transition"
                >
                    تحميل المزيد

                </button>
            )}

            {loading && page > 0 && (
                <div className="mb-8">
                    {[...Array(3)].map((_, i) => (
                        <RecipeCardSkeleton key={i} />
                    ))}
                </div>
            )}

        </main>
    )
}

export default Category