import { useState, useEffect } from "react"
import RecipeCarousel from './RecipeCarousel'
import ErrorBoundary from './ErrorBoundary';
import RubriqueFilter from './RubriqueFilter';
import { dataKcal } from "@/lib/tagsData";


const Rubrique = () => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://yahalawa.net/api/diet/topic');

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const result = await response.json();
                setData(result);
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);



    return (
        <div className='w-full overflow-hidden'>
            <ErrorBoundary>
                {data?.topic?.map((el, index) => {

                    return (
                        <section key={index} className="w-full mt-6">

                            <div className='text-end'>
                                <p className='text-[#7695FF] text-3xl mb-2'>{el.title}</p>
                                <p className='rubriqueTitle'></p>
                            </div>

                            {/* recipe card---------------------------------------------------- */}
                                <RecipeCarousel recipes={el.recipe} />


                            {/* kcal filter--------------------------------------------------------- */}
                            {
                                index === 1 &&
                                <RubriqueFilter
                                    title="وصفات حسب السعرات الحرارية لحصة واحدة"
                                    data={dataKcal}
                                    kcal={true}
                                />
                            }
                        </section>
                    )
                })}
            </ErrorBoundary>
        </div>
    )
}

export default Rubrique