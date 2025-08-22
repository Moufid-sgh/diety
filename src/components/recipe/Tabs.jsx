
import { useEffect, useState, useRef } from 'react';

const Tabs = ({ modePrepRef, ingRef, setpsRef }) => {

    const [activeTab, setActiveTab] = useState('');
    const isClickingRef = useRef(false);

    const tabs = [
        { id: 'القيم الغذائية', label: 'القيم الغذائية', ref: modePrepRef },
        { id: 'المكونات', label: 'المكونات', ref: ingRef },
        { id: 'الطريقة', label: 'الطريقة', ref: setpsRef },
    ];

    const handleScrollTo = (ref) => {
        if (ref && ref.current) {
            isClickingRef.current = true; // Marquer qu'on est en train de cliquer
            window.scrollTo({
                top: ref.current.offsetTop - 48,
                behavior: 'smooth',
            });

            // Réactiver le scroll listener après l'animation (délai plus long pour être sûr)
            setTimeout(() => {
                isClickingRef.current = false;
            }, 800);
        }
    };

    // Fonction pour activer dynamiquement l'onglet en fonction de la position de défilement
    useEffect(() => {
        const handleScroll = () => {
            // Ne pas changer l'onglet actif si on est en train de cliquer
            if (isClickingRef.current) return;

            tabs.forEach((tab) => {
                if (tab.ref && tab.ref.current) {
                    const { offsetTop, offsetHeight } = tab.ref.current;
                    const scrollPosition = window.scrollY + 60;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveTab(tab.id);
                    }
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [tabs]);

    return (
        <div className="sticky top-0 z-50 lg:w-[80%] flex items-center justify-start bg-[#F5F5F5] rounded-[10px] p-1 text-[17.5px] md:text-[22px]">
            <div
                className={`absolute inset-y-1 transition-all duration-200 ease-out bg-blue rounded-[12px] shadow-sm 
          ${activeTab === 'الطريقة' ? 'left-1 w-[calc(33.33%-4px)]' : ''}
          ${activeTab === 'المكونات' ? 'left-[calc(33.33%+2px)] w-[calc(33.33%-4px)]' : ''}
          ${activeTab === 'القيم الغذائية' ? 'left-[calc(66.66%+2px)] w-[calc(33.33%-4px)]' : ''}`}
            />

            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => {
                        setActiveTab(tab.id);
                        handleScrollTo(tab.ref);
                    }}
                    className={`relative flex-1 py-2 rounded-[12px] transition-colors duration-300 whitespace-nowrap outline-none
            ${activeTab === tab.id ? 'text-white' : 'text-[#262F82BA] hover:text-white'}`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};

export default Tabs;


