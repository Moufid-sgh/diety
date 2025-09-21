import { useState, useEffect, useCallback, useRef } from 'react'
import ChooseMealCard from './ChooseMealCard'
import { Link } from 'react-router-dom'
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';


const ChooseMeal = () => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://yahalawa.net/api/diet/typeRepas');

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


    const autoplayRef = useRef(Autoplay({ delay: 3000 }));

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [autoplayRef.current]);

    // Fonction pour arrêter l'autoplay
    const handleMouseEnter = useCallback(() => {
        if (autoplayRef.current) {
            autoplayRef.current.stop();
        }
    }, []);

    // Fonction pour reprendre l'autoplay
    const handleMouseLeave = useCallback(() => {
        if (autoplayRef.current) {
            autoplayRef.current.play();
        }
    }, []);

    return (
        <div className="w-full mb-10">
            {/* title---------- */}
            <div className='text-end mb-6'>
                <p className='text-[#7695FF] text-3xl mb-2'>اختار وجبتك</p>
                <p className='rubriqueTitle'></p>
            </div>

            {/* card container---------- */}
            {!loading &&
                <div ref={emblaRef} className='embla'>
                    <div className="embla__container">
                        {data.map((el) => (
                            <Link
                                to={`/category/${el.title}`}
                                key={el.id}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                className='embla__slide'>
                                <ChooseMealCard el={el} />
                            </Link>
                        ))}
                    </div>
                </div>
            }
        </div>
    )
}

export default ChooseMeal