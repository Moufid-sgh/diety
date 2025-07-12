'use client'

import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Suspense, useState, useRef, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton"
import ThumbComponent from "../ThumbComponent";
import { useNavigate } from "react-router-dom";


const HamburgerMenu = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState({
        recipes: [],
        tips: []
    });

    const [noResults, setNoResults] = useState(true);
    const [loading, setLoading] = useState(false);


    const handleSearch = async () => {
        setLoading(true)
        try {
            const response = await fetch(`https://yahalawa.net/api/diet/search?searchQuery=${encodeURIComponent(searchQuery.trim())}`);

            if (!response.ok) {
                throw new Error('Erreur de recherche');
            }

            const data = await response.json();
            setResults(data);

            // dispaly message for no results
            if (
                Array.isArray(data.recipes) && data.recipes.length === 0 
            ) {
                setNoResults(false);
            } else {
                setNoResults(true);
            }

        } catch (error) {
            console.error('Erreur lors de la recherche :', error);
        }
        finally {
            setLoading(false);
        }
    };


    const handleKeyDown = (event) => {
        if (event && event.key === 'Enter') {
            handleSearch();
        }
    };

    const searchRef = useRef()

    const resetSearch = () => {
        searchRef.current.value = ''
        setSearchQuery('')
        setResults('')
        setNoResults(true)
    }

    // handle no result message
    useEffect(() => {
        if (searchQuery === "") {
            setNoResults(true)
        }
    }, [searchQuery])


    //handle sheet close
    const [isOpen, setIsOpen] = useState(false);

    const handleSheetClose = () => {
        setIsOpen(false)
        setResults('')
        setSearchQuery('')
        searchRef.current.value = ''
        setNoResults(true)
    };


    const handleSheetStateChange = (open) => {
        setIsOpen(open);

        if (!open) {
            setResults('');
            setNoResults(true)
            searchRef.current.value = ''
            setSearchQuery('')
        }
    };


    const navigate = useNavigate();

    //redirect user to recipe page 
    const gotToRecipe = (id) => {
        navigate(`/recipe/${id}`)
        handleSheetClose()
    };


    //redirect user to category page 
    const gotToCategory = (id) => {
        navigate(`/category/${id}`)
        setIsOpen(false)
    };

    //redirect user to selected page 
    const gotToSelectedPage = (route) => {
        navigate(`${route}`)
        setIsOpen(false)
    };


    const menu = [
        {
            title: 'وصفاتي',
            route: '/MyRecipes',
            icon: <svg width="18" height="16" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor" d="M13.8524 0C12.9613 0.0141142 12.0897 0.26742 11.3255 0.734338C10.5612 1.20126 9.93157 1.86525 9.5 2.65927C9.06843 1.86525 8.43875 1.20126 7.67455 0.734338C6.91035 0.26742 6.03869 0.0141142 5.14759 0C3.72707 0.062848 2.38872 0.695644 1.42492 1.76014C0.461119 2.82464 -0.0497832 4.2343 0.00383099 5.68117C0.00383099 9.34531 3.79122 13.3471 6.96769 16.0604C7.67691 16.6673 8.57361 17 9.5 17C10.4264 17 11.3231 16.6673 12.0323 16.0604C15.2088 13.3471 18.9962 9.34531 18.9962 5.68117C19.0498 4.2343 18.5389 2.82464 17.5751 1.76014C16.6113 0.695644 15.2729 0.062848 13.8524 0ZM11.0154 14.8274C10.5913 15.1912 10.0545 15.3906 9.5 15.3906C8.94546 15.3906 8.40875 15.1912 7.98457 14.8274C3.91863 11.3535 1.58653 8.02052 1.58653 5.68117C1.53243 4.66155 1.87645 3.66151 2.54355 2.89917C3.21066 2.13682 4.14672 1.67401 5.14759 1.61168C6.14846 1.67401 7.08452 2.13682 7.75163 2.89917C8.41873 3.66151 8.76275 4.66155 8.70865 5.68117C8.70865 5.89489 8.79203 6.09985 8.94043 6.25098C9.08884 6.4021 9.29012 6.487 9.5 6.487C9.70988 6.487 9.91116 6.4021 10.0596 6.25098C10.208 6.09985 10.2913 5.89489 10.2913 5.68117C10.2373 4.66155 10.5813 3.66151 11.2484 2.89917C11.9155 2.13682 12.8515 1.67401 13.8524 1.61168C14.8533 1.67401 15.7893 2.13682 16.4564 2.89917C17.1236 3.66151 17.4676 4.66155 17.4135 5.68117C17.4135 8.02052 15.0814 11.3535 11.0154 14.8242V14.8274Z" />
                </svg>
        },
        {
            title: 'إشعاراتي',
            route: '/notifications',
            icon:  <svg  width="15" height="16" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor" d="M15.2764 9.67454L13.9307 4.83293C13.5363 3.41453 12.679 2.16869 11.4953 1.29342C10.3115 0.418145 8.86912 -0.0363165 7.39741 0.00226912C5.92571 0.0408548 4.50912 0.570273 3.37284 1.50637C2.23656 2.44247 1.44579 3.73153 1.12622 5.16864L0.0843826 9.85373C-0.0306975 10.3714 -0.0280368 10.9083 0.0921682 11.4249C0.212373 11.9414 0.447053 12.4243 0.778882 12.838C1.11071 13.2517 1.53121 13.5855 2.00935 13.8149C2.48748 14.0444 3.01104 14.1635 3.54136 14.1634H4.33035C4.49291 14.964 4.92722 15.6837 5.5597 16.2006C6.19217 16.7176 6.98392 17 7.80079 17C8.61766 17 9.4094 16.7176 10.0419 16.2006C10.6744 15.6837 11.1087 14.964 11.2712 14.1634H11.8647C12.4107 14.1635 12.9492 14.0373 13.4383 13.7948C13.9274 13.5522 14.3538 13.1999 14.6842 12.7653C15.0145 12.3306 15.24 11.8255 15.3428 11.2894C15.4457 10.7532 15.4225 10.2006 15.2764 9.67454ZM7.80079 15.5799C7.36291 15.5781 6.93628 15.4411 6.57927 15.1875C6.22226 14.934 5.95231 14.5763 5.80635 14.1634H9.79523C9.64927 14.5763 9.37932 14.934 9.02231 15.1875C8.6653 15.4411 8.23867 15.5781 7.80079 15.5799ZM13.556 11.9077C13.3587 12.1695 13.103 12.3817 12.8093 12.5274C12.5155 12.673 12.1919 12.7482 11.864 12.7469H3.54136C3.2232 12.7469 2.90912 12.6754 2.62229 12.5377C2.33546 12.4 2.08322 12.1997 1.88417 11.9515C1.68512 11.7033 1.54435 11.4136 1.47225 11.1037C1.40015 10.7938 1.39856 10.4717 1.4676 10.1611L2.50873 5.47531C2.7597 4.3465 3.38081 3.33398 4.27331 2.59871C5.16581 1.86343 6.27849 1.4476 7.43446 1.41732C8.59044 1.38704 9.72336 1.74404 10.6531 2.43158C11.5829 3.11911 12.2562 4.09772 12.5659 5.21184L13.9116 10.0535C14.0005 10.3689 14.0147 10.7007 13.9529 11.0226C13.8912 11.3444 13.7553 11.6475 13.556 11.9077Z" />
                </svg>
        },
        {
            title: 'حسابي',
            route: '/compte',
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></g></svg>
        }
    ]


    return (
        <div className="lg:hidden w-1/3">
            <Sheet open={isOpen} onOpenChange={handleSheetStateChange}>
                <SheetTrigger className="space-y-1 outline-none">
                    <p className="bg-blue w-8 h-1.5 rounded-xl"></p>
                    <p className="bg-blue w-8 h-1.5 rounded-xl"></p>
                </SheetTrigger>

                <SheetContent className="w-[85%] h-screen overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle className="mb-6"></SheetTitle>

                        <ul dir="rtl" className="flex flex-col items-start pb-6 space-y-5">
                            {menu.map((el, index) => (
                                <li key={index} 
                                    onClick={() => gotToSelectedPage(el.route)} 
                                    className="flex items-center text-[20px] font-medium hover:text-blue duration-300 cursor-pointer">
                                    <span className="ml-2">{el.icon}</span>
                                    <span>{el.title}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="relative">
                            <input
                                dir="rtl"
                                ref={searchRef}
                                className="border-b border-black w-full outline-none py-2 px-8"
                                placeholder="البحث بالاسم، أو المكونات، أو الفئة"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />

                            <svg className="mr-6 absolute top-2 right-[-20px]" width="16" height="16" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill="black" d="M18.778 17.6595L14.0564 12.9379C15.3431 11.3642 15.9757 9.35623 15.8234 7.32922C15.6711 5.30222 14.7455 3.41129 13.2381 2.04757C11.7308 0.683849 9.75687 -0.0483305 7.72479 0.00247793C5.69271 0.0532864 3.75789 0.883195 2.32054 2.32054C0.883195 3.75789 0.0532864 5.69271 0.00247793 7.72479C-0.0483305 9.75687 0.683849 11.7308 2.04757 13.2381C3.41129 14.7455 5.30222 15.6711 7.32922 15.8234C9.35623 15.9757 11.3642 15.3431 12.9379 14.0564L17.6595 18.778C17.8086 18.922 18.0085 19.0018 18.2159 19C18.4233 18.9982 18.6217 18.915 18.7683 18.7683C18.915 18.6217 18.9982 18.4233 19 18.2159C19.0018 18.0085 18.922 17.8086 18.778 17.6595ZM7.93549 14.2636C6.6839 14.2636 5.46042 13.8925 4.41976 13.1971C3.37911 12.5018 2.56801 11.5135 2.08905 10.3572C1.61009 9.20084 1.48477 7.92847 1.72895 6.70093C1.97312 5.47339 2.57581 4.34583 3.46082 3.46082C4.34583 2.57581 5.47339 1.97312 6.70093 1.72895C7.92847 1.48477 9.20084 1.61009 10.3572 2.08905C11.5135 2.56801 12.5018 3.37911 13.1971 4.41976C13.8925 5.46042 14.2636 6.6839 14.2636 7.93549C14.2617 9.61323 13.5944 11.2217 12.4081 12.4081C11.2217 13.5944 9.61323 14.2617 7.93549 14.2636Z" />
                            </svg>

                            <p onClick={resetSearch} className="absolute top-2 text-black cursor-pointer">&#10005;</p>
                        </div>


                        <section className="mt-10">
                            {loading ?
                                <div className="flex items-center justify-center h-[400px]">
                                    <div className="loader"></div>
                                </div>
                                :
                                <ScrollArea dir="rtl" className="h-[500px]">
                                    {
                                        Array.isArray(results.recipes) && results.recipes.map(el => {
                                            return (
                                                <div onClick={() => gotToRecipe(el.id)} key={el.id} className="relative group flex items-center my-2.5 cursor-pointer">

                                                    <div className="w-[105px] h-[110px] overflow-hidden rounded-[5px] cardBorder">
                                                        <ThumbComponent src={el.imgPath} className="object-cover w-full h-full" />
                                                    </div>

                                                    <div className="space-y-2 w-full  text-start mr-6">
                                                        <Suspense fallback={<Skeleton className="h-2.5 w-[250px] rounded-[10px]" />}>
                                                            <p className="line-clamp-1">{el.title}</p>
                                                        </Suspense>
                                                        <Suspense fallback={<Skeleton className="h-2.5 w-[250px] rounded-[10px]" />}>
                                                            <p className="categoryTitle space-x-1">
                                                                <span>{el.kcal}</span>
                                                                <span>Kcal</span>
                                                            </p>
                                                        </Suspense>
                                                        <p className="opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500 absolute left-6 bottom-6">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 64 64"><path fill="currentColor" d="M32 2C15.432 2 2 15.432 2 32s13.432 30 30 30s30-13.432 30-30S48.568 2 32 2m17 35.428H30.307V48L15 32l15.307-16v11.143H49z" /></svg>
                                                        </p>
                                                    </div>

                                                </div>
                                            )
                                        })
                                    }

                                    {
                                        !noResults &&
                                        (<p dir="rtl" className="bg-[#5684EB] text-white rounded-[4px] mt-6 p-2 ">
                                            سامحنا ! ما لقيناش نتائج تطابق مع البحث متاعك.
                                            يمكن الاسم ولا الكتيبة فيهم حاجة ناقصة ولا زايدة.
                                            زيد ثبت، ساعات تصليحة صغيرة تحل المشكلة الكل!
                                        </p>)
                                    }
                                </ScrollArea>}
                        </section>




                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default HamburgerMenu