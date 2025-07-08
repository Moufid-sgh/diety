import { useParams } from 'react-router-dom'
import { useState, useEffect } from "react"
import RecipeCard from '@/components/RecipeCard'
import ErrorBoundary from '@/components/ErrorBoundary'
import RecipeCardSkeleton from '@/components/RecipeCardSkeleton'


const Category = () => {

    const { category } = useParams()

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 3000));
                // const response = await fetch(`https://yahalawa.net/api/diet/recipesByCategories/${category}`);
                const response = await fetch(`http://localhost:3000/api/diet/recipesByCategories/${category}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [category]);




    return (
        <main className="flex min-h-screen flex-col items-center px-3 md:px-8 lg:px-32 py-8">


            <div className='text-end w-full'>
                <p className='text-[#7695FF] text-3xl mb-2'>{category}</p>
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
                    ) : (
                        Array.isArray(data) && data.map((el) => (
                            <RecipeCard key={el.id} el={el} />
                        ))
                    )}
                </ErrorBoundary>
            </section>

        </main>
    )
}

export default Category