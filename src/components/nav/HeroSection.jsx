import { useState, useEffect } from 'react'
import ErrorBoundary from '../ErrorBoundary';
import { Skeleton } from '../ui/skeleton';

const HeroSection = () => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        setLoading(true)

        const fetchData = async () => {
            try {
                const response = await fetch('https://yahalawa.net/api/diet/heroSection');

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const result = await response.json();

                setData(result[0]);
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='mt-4 pb-2'>
            <ErrorBoundary>
                {loading ?
                    <>
                        <Skeleton className="h-7 w-96 rounded" />
                        <div className='my-5 space-y-2.5'>
                            <Skeleton className="h-4 w-[500px] rounded" />
                            <Skeleton className="h-4 w-96 rounded" />
                        </div>
                    </>
                    :
                    <>
                        <p className='text-blue text-3xl'>{data?.title}</p>
                        <p className='text-[#183153] my-4 text-lg lg:w-[600px]'>{data?.text}</p>
                    </>
                }
            </ErrorBoundary>
        </div>
    )
}

export default HeroSection