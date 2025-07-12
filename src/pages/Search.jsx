import { useParams } from 'react-router-dom'
import { useState, useEffect } from "react"
import RecipeCard from '@/components/RecipeCard'
import ErrorBoundary from '@/components/ErrorBoundary'
import RecipeCardSkeleton from '@/components/RecipeCardSkeleton'


const Search = () => {

    const { search } = useParams()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)



    const fetchData = async () => {
        try {
            setLoading(true)
            const response = await fetch(`https://yahalawa.net/api/diet/search?searchQuery=${search}`)

            if (!response.ok) throw new Error('Failed to fetch data')

            const data = await response.json();
            setData(data.recipes || []);

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [search])

    return (
        <main className="flex min-h-screen flex-col items-center px-3 md:px-8 lg:px-32 py-8 mt-24 lg:mt-0">

            <div className='text-end w-full'>
                <p className='text-[#7695FF] text-3xl mb-2'>{search}</p>
                <p className='rubriqueTitle'></p>
            </div>

            <section className="flex flex-wrap justify-center items-start w-full my-6">
                <ErrorBoundary>
                    {loading ? (
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
        </main>
    )
}

export default Search