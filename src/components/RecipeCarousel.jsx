import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Suspense, useCallback, useRef } from 'react';
import RecipeCard from './RecipeCard';

const RecipeCarousel = ({ recipes }) => {
    // Créer une référence pour le plugin Autoplay
    const autoplayRef = useRef(Autoplay({ delay: 3000 }));

    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: false,
            align: 'start',
            slidesToScroll: 1,
            breakpoints: {
                '(max-width: 639px)': { align: 'center' },
                '(min-width: 640px)': { slidesToScroll: 2, align: 'start' },
                '(min-width: 1024px)': { slidesToScroll: 3, align: 'start' }
            }
        },
        [autoplayRef.current]
    );

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
        <div className="embla pb-10" ref={emblaRef}>
            <div className="embla__container  mt-3">
                {recipes.map((card) => (
                    <div
                        key={card.id}
                        className="embla__slide cursor-pointer w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-2"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Suspense fallback={<p>loading...</p>}>
                            <RecipeCard el={card} />
                        </Suspense>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecipeCarousel;