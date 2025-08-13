
import { useRef, useState } from "react"
import { Separator } from "@/components/ui/separator"




const SecondPart = ({ macro, micro, ingredients, ustensiles, nbr_serves, sortedSteps }) => {


    const setpsRef = useRef(null);
    const ingRef = useRef(null);

    const [persons, setPersons] = useState(nbr_serves);

    //handle portion
    const handlePersonsChange = (change) => {
        setPersons((prev) => Math.max(1, prev + change));
    };


    // Recalculer les quantités en fonction du nombre de personnes
    const getUpdatedQuantity = (ingredientQuantity) => {
        return (ingredientQuantity / nbr_serves) * persons;
    };


    //format number decimal /entier
    function formatNumber(quantity) {
        if (quantity % 1 !== 0) {
            return quantity.toFixed(1);
        } else {
            return quantity;
        }
    };

    // function formatNumber(quantity) {
    //     return quantity % 1 === 0 ? quantity : quantity.toFixed(2);
    // }


    //display steps by catgeory
    const groupSteps = (data) => {
        return data.reduce((acc, item) => {

            const title = String(item.title).trim();

            if (!acc[title]) {
                acc[title] = []
            }
            acc[title].push(item.description)
            return acc
        }, {})
    };

    const groupedSteps = sortedSteps && groupSteps(sortedSteps);



    //dispaly  && group ingredeint by title
    const groupIngredient = (data) => {
        const grouped = data.reduce((acc, item) => {
            const title = String(item.title).trim();

            if (!acc[title]) {
                acc[title] = [];
            }

            acc[title].push({
                qte_gramme: item.qte_gramme,
                unite: item.unite,

                ingredient: item.ingredient,
            });

            return acc;
        }, {});

        return Object.keys(grouped).map(title => ({
            title,
            items: grouped[title],
        }));
    };

    const groupedIng = ingredients && groupIngredient(ingredients);




    return (
        <div className="mb-20 lg:w-[80%]">
            <section className="w-full mt-10 lg:mt-0">
                <div className="flex items-center justfiy-start bg-[#F5F5F5] rounded-[10px] w-fit p-1 text-[17.5px] md:text-[22px]">
                    <div className="rounded-[12px] bg-blue text-white px-4 lg:px-6 py-1.5 cursor-pointer whitespace-nowrap">
                        القيم الغذائية
                    </div>
                    <div
                        onClick={() => {
                            window.scrollTo({
                                top: ingRef.current.offsetTop - 30,
                                behavior: "smooth"
                            });
                        }}
                        className="rounded-[12px] text-[#262F82BA] hover:text-white hover:bg-blue mx-1 lg:mx-4 px-4 lg:px-6 py-1.5 cursor-pointer transition-all duration-300">
                        المكونات
                    </div>
                    <div
                        onClick={() => {
                            window.scrollTo({
                                top: setpsRef.current.offsetTop - 30,
                                behavior: "smooth"
                            });
                        }}
                        className="rounded-[12px] text-[#262F82BA] px-4 lg:px-6 py-1.5 hover:bg-blue hover:text-white transition-all duration-300 cursor-pointer">
                        الطريقة
                    </div>
                </div>
                <p className="h-[0.3px] w-full bg-gray"></p>

                <div className="my-8">
                    <div className="flex items-start">
                        <svg className="mt-2 md:mt-3.5 shrink-0" width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.41138 14.9398L0.0354176 3.20831C-0.0897236 2.46089 0.120274 1.70148 0.609695 1.12377C1.09912 0.546065 1.81482 0.214355 2.57252 0.214355H14.1429C16.2695 0.214355 18 1.9449 18 4.07144V9.21422C18 11.3408 16.2695 13.0713 14.1429 13.0713H13.7144V14.8944C15.1912 15.2758 16.2857 16.6198 16.2857 18.2141C16.2857 19.6318 15.132 20.7855 13.7144 20.7855H2.57166C1.15397 20.7855 0.000274658 19.6318 0.000274658 18.2141C0.000274658 16.6772 1.01597 15.3736 2.41138 14.9398ZM14.1429 11.357C15.324 11.357 16.2857 10.3953 16.2857 9.21422V4.07144C16.2857 2.89031 15.324 1.92862 14.1429 1.92862H13.7144V11.357H14.1429ZM10.2858 11.357H12.0001V9.64278H10.2858C9.8127 9.64278 9.4287 9.25879 9.4287 8.78565C9.4287 8.31252 9.8127 7.92852 10.2858 7.92852H12.0001V6.21426H10.2858C9.8127 6.21426 9.4287 5.83027 9.4287 5.35713C9.4287 4.884 9.8127 4.5 10.2858 4.5H12.0001V1.92862H2.57252C2.31624 1.92862 2.08396 2.03576 1.91767 2.23204C1.75225 2.42746 1.68453 2.67432 1.72139 2.89717L4.12993 14.7856H12.0001V13.0713H10.2858C9.8127 13.0713 9.4287 12.6873 9.4287 12.2142C9.4287 11.741 9.8127 11.357 10.2858 11.357ZM2.57166 19.0712H13.7144C14.1866 19.0712 14.5715 18.6864 14.5715 18.2141C14.5715 17.2687 13.8026 16.4998 12.8572 16.4998H3.42879C2.48338 16.4998 1.71453 17.2687 1.71453 18.2141C1.71453 18.6864 2.09853 19.0712 2.57166 19.0712Z" fill="#7695FF" />
                        </svg>
                        <p className="text-[32px] text-[#7695FF] mr-2">القيم الغذائية للحصة الواحدة</p>
                    </div>
                    <p className='rubriqueTitle'></p>
                </div>

                {/* input range----------------------------- */}
                <div className="flex items-center my-7">
                    <div className="flex flex-col lg:flex-row lg:items-center w-full text-[#5E5DC0]">
                        <label className="flex items-center text-[20px] lg:w-[20%] mb-4 lg:mb-0 ml-4">
                            <p className="whitespace-nowrap">عدد الحصص</p>
                            <p className="mr-2">{persons}</p>
                        </label>

                        <input
                            id="slider"
                            type="range"
                            min="1"
                            max="30"
                            value={persons}
                            data-value={persons}
                            onChange={(e) => handlePersonsChange(parseInt(e.target.value) - persons)}
                            className="lg:w-[80%] appearance-none inputRange outline-none"
                        />
                    </div>
                </div>

                {/* valeur nutritionnel---------------------------------------------- */}
                {/* Macronutrients */}
                <div className="text-[#5E5DC0] border-b-[3px] border-[#A594F9] pb-4">
                    <p className="text-[26px]">قيم المغذيات الكبيرة</p>
                    <p>Macronutrients | Macronutriments</p>
                </div>


                <ul className="list-decimal marker:text-orange text-[#00235B] text-[16px] md:text-[18px] mt-2">
                    {Array.isArray(macro) && macro.map((el) => (
                        <li key={el.id} className="flex items-center text-darkblue text-[18px] py-2 border-b border-gray space-x-2 lg:space-x-6 white">
                            <p className="w-72">{el.title}</p>
                            <Separator className="w-[0.128rem] h-3.5 bg-[#00235B40]" />
                            <p className="w-24 lg:w-20">{formatNumber(getUpdatedQuantity(el.value))}</p>
                            <Separator className="w-0.5 h-3.5 bg-[#00235B40]" />
                            <p className="w-36">{el.unit}</p>
                        </li>
                    ))}
                </ul>


                {/* Micronutrients */}
                <div className="text-[#5E5DC0] border-b-[3px] border-[#A594F9] pb-4 mt-8">
                    <p className="text-[26px]">قيم المغذيات الدقيقة</p>
                    <p>Micronutrients | Micronutriments</p>
                </div>

                <ul className="list-decimal marker:text-orange text-[#00235B] text-[16px] md:text-[18px] mt-2">
                    {Array.isArray(micro) && micro.map((el) => (
                        <li key={el.id} className="flex items-center text-darkblue text-[18px] py-2 border-b border-gray space-x-2 lg:space-x-6">
                            <p className="w-72">{el.title}</p>
                            <Separator className="w-[0.128rem] h-3.5 bg-[#00235B40]" />
                            <p className="w-24 lg:w-20">{formatNumber(getUpdatedQuantity(el.value))}</p>
                            <Separator className="w-0.5 h-3.5 bg-[#00235B40]" />
                            <p className="w-36">{el.unit}</p>
                        </li>
                    ))}
                </ul>
            </section>


            {/* usetnsiles----------------------------------------------------------- */}
            {(ustensiles && ustensiles.length > 0) &&
                <section className="w-full mt-16">
                    <div className="my-8">
                        <div className="flex items-start">
                            <svg className="mt-2 md:mt-3.5 shrink-0" width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.41138 14.9398L0.0354176 3.20831C-0.0897236 2.46089 0.120274 1.70148 0.609695 1.12377C1.09912 0.546065 1.81482 0.214355 2.57252 0.214355H14.1429C16.2695 0.214355 18 1.9449 18 4.07144V9.21422C18 11.3408 16.2695 13.0713 14.1429 13.0713H13.7144V14.8944C15.1912 15.2758 16.2857 16.6198 16.2857 18.2141C16.2857 19.6318 15.132 20.7855 13.7144 20.7855H2.57166C1.15397 20.7855 0.000274658 19.6318 0.000274658 18.2141C0.000274658 16.6772 1.01597 15.3736 2.41138 14.9398ZM14.1429 11.357C15.324 11.357 16.2857 10.3953 16.2857 9.21422V4.07144C16.2857 2.89031 15.324 1.92862 14.1429 1.92862H13.7144V11.357H14.1429ZM10.2858 11.357H12.0001V9.64278H10.2858C9.8127 9.64278 9.4287 9.25879 9.4287 8.78565C9.4287 8.31252 9.8127 7.92852 10.2858 7.92852H12.0001V6.21426H10.2858C9.8127 6.21426 9.4287 5.83027 9.4287 5.35713C9.4287 4.884 9.8127 4.5 10.2858 4.5H12.0001V1.92862H2.57252C2.31624 1.92862 2.08396 2.03576 1.91767 2.23204C1.75225 2.42746 1.68453 2.67432 1.72139 2.89717L4.12993 14.7856H12.0001V13.0713H10.2858C9.8127 13.0713 9.4287 12.6873 9.4287 12.2142C9.4287 11.741 9.8127 11.357 10.2858 11.357ZM2.57166 19.0712H13.7144C14.1866 19.0712 14.5715 18.6864 14.5715 18.2141C14.5715 17.2687 13.8026 16.4998 12.8572 16.4998H3.42879C2.48338 16.4998 1.71453 17.2687 1.71453 18.2141C1.71453 18.6864 2.09853 19.0712 2.57166 19.0712Z" fill="#7695FF" />
                            </svg>
                            <p className="text-[32px] text-[#7695FF] mr-2">الأواني</p>
                        </div>
                        <p className='rubriqueTitle'></p>
                    </div>

                    <ol className="mt-4 mr-4 list-disc text-[#262F82] text-[18px]">
                        {
                            Array.isArray(ustensiles) && ustensiles.map((el) => {
                                return <li key={el.id} className="my-3">{el.title}</li>
                            })
                        }
                    </ol>
                </section>}


            {/* ingredients ------------------------------------------------------------- */}
            <section ref={ingRef}>
                <div className="my-8">
                    <div className="flex items-start">
                        <svg className="mt-2 md:mt-3.5 shrink-0" width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.41138 14.9398L0.0354176 3.20831C-0.0897236 2.46089 0.120274 1.70148 0.609695 1.12377C1.09912 0.546065 1.81482 0.214355 2.57252 0.214355H14.1429C16.2695 0.214355 18 1.9449 18 4.07144V9.21422C18 11.3408 16.2695 13.0713 14.1429 13.0713H13.7144V14.8944C15.1912 15.2758 16.2857 16.6198 16.2857 18.2141C16.2857 19.6318 15.132 20.7855 13.7144 20.7855H2.57166C1.15397 20.7855 0.000274658 19.6318 0.000274658 18.2141C0.000274658 16.6772 1.01597 15.3736 2.41138 14.9398ZM14.1429 11.357C15.324 11.357 16.2857 10.3953 16.2857 9.21422V4.07144C16.2857 2.89031 15.324 1.92862 14.1429 1.92862H13.7144V11.357H14.1429ZM10.2858 11.357H12.0001V9.64278H10.2858C9.8127 9.64278 9.4287 9.25879 9.4287 8.78565C9.4287 8.31252 9.8127 7.92852 10.2858 7.92852H12.0001V6.21426H10.2858C9.8127 6.21426 9.4287 5.83027 9.4287 5.35713C9.4287 4.884 9.8127 4.5 10.2858 4.5H12.0001V1.92862H2.57252C2.31624 1.92862 2.08396 2.03576 1.91767 2.23204C1.75225 2.42746 1.68453 2.67432 1.72139 2.89717L4.12993 14.7856H12.0001V13.0713H10.2858C9.8127 13.0713 9.4287 12.6873 9.4287 12.2142C9.4287 11.741 9.8127 11.357 10.2858 11.357ZM2.57166 19.0712H13.7144C14.1866 19.0712 14.5715 18.6864 14.5715 18.2141C14.5715 17.2687 13.8026 16.4998 12.8572 16.4998H3.42879C2.48338 16.4998 1.71453 17.2687 1.71453 18.2141C1.71453 18.6864 2.09853 19.0712 2.57166 19.0712Z" fill="#7695FF" />
                        </svg>
                        <p className="text-[32px] text-[#7695FF] mr-2">المكونات</p>
                    </div>
                    <p className='rubriqueTitle'></p>
                </div>

                <div className="flex items-center my-7">
                    <div className="flex flex-col lg:flex-row lg:items-center w-full text-[#5E5DC0]">
                        <label className="flex items-center text-[20px] lg:w-[20%] mb-4 lg:mb-0 ml-4">
                            <p className="whitespace-nowrap">عدد الحصص</p>
                            <p className="mr-2">{persons}</p>
                        </label>

                        <input
                            id="slider"
                            type="range"
                            min="1"
                            max="30"
                            value={persons}
                            data-value={persons}
                            onChange={(e) => handlePersonsChange(parseInt(e.target.value) - persons)}
                            className="lg:w-[80%] appearance-none inputRange outline-none"
                        />
                    </div>
                </div>

                <div className="mt-2">
                    {ingredients && groupedIng.map(({ title, items }) => (
                        <div key={title} className="mb-4">
                            {
                                (title && title !== 'null') &&
                                <div className="my-7 text-[16px] md:text-[18px]">
                                    <p className="text-[#183153CC]">{title}</p>
                                    <p className="h-0.5 w-full bg-orange"></p>
                                </div>
                            }
                            <ul className="list-decimal marker:text-orange text-[#00235B] text-[16px] md:text-[18px]">
                                {items.map((item, index) => (
                                    <li key={index} className="flex items-center text-darkblue text-[18px] py-2 border-b border-gray space-x-2 lg:space-x-6">
                                        <p className="w-24 lg:w-20">{formatNumber(getUpdatedQuantity(item.qte_gramme))}</p>
                                        <Separator className="w-0.5 h-3.5 bg-[#00235B40]" />
                                        <p className="w-36">{item.unite}</p>
                                        <Separator className="w-[0.128rem] h-3.5 bg-[#00235B40]" />
                                        <p className="w-72">{item.ingredient}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>


            {/* steps--------------------------------------------------------------------- */}
            <section ref={setpsRef} className="w-full mt-16">
                <div className="my-8">
                    <div className="flex items-start">
                        <svg className="mt-2 md:mt-3.5 shrink-0" width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.41138 14.9398L0.0354176 3.20831C-0.0897236 2.46089 0.120274 1.70148 0.609695 1.12377C1.09912 0.546065 1.81482 0.214355 2.57252 0.214355H14.1429C16.2695 0.214355 18 1.9449 18 4.07144V9.21422C18 11.3408 16.2695 13.0713 14.1429 13.0713H13.7144V14.8944C15.1912 15.2758 16.2857 16.6198 16.2857 18.2141C16.2857 19.6318 15.132 20.7855 13.7144 20.7855H2.57166C1.15397 20.7855 0.000274658 19.6318 0.000274658 18.2141C0.000274658 16.6772 1.01597 15.3736 2.41138 14.9398ZM14.1429 11.357C15.324 11.357 16.2857 10.3953 16.2857 9.21422V4.07144C16.2857 2.89031 15.324 1.92862 14.1429 1.92862H13.7144V11.357H14.1429ZM10.2858 11.357H12.0001V9.64278H10.2858C9.8127 9.64278 9.4287 9.25879 9.4287 8.78565C9.4287 8.31252 9.8127 7.92852 10.2858 7.92852H12.0001V6.21426H10.2858C9.8127 6.21426 9.4287 5.83027 9.4287 5.35713C9.4287 4.884 9.8127 4.5 10.2858 4.5H12.0001V1.92862H2.57252C2.31624 1.92862 2.08396 2.03576 1.91767 2.23204C1.75225 2.42746 1.68453 2.67432 1.72139 2.89717L4.12993 14.7856H12.0001V13.0713H10.2858C9.8127 13.0713 9.4287 12.6873 9.4287 12.2142C9.4287 11.741 9.8127 11.357 10.2858 11.357ZM2.57166 19.0712H13.7144C14.1866 19.0712 14.5715 18.6864 14.5715 18.2141C14.5715 17.2687 13.8026 16.4998 12.8572 16.4998H3.42879C2.48338 16.4998 1.71453 17.2687 1.71453 18.2141C1.71453 18.6864 2.09853 19.0712 2.57166 19.0712Z" fill="#7695FF" />
                        </svg>
                        <p className="text-[32px] text-[#7695FF] mr-2">الطريقة</p>
                    </div>
                    <p className='rubriqueTitle'></p>
                </div>

                <div className="mt-4 mr-4">
                    {Object.entries(groupedSteps).map(([title, descriptions]) => (
                        <div key={title} className="mb-4 text-[#262F82]">
                            {title && <p className="text-lg font-semibold mb-2">{title}</p>}
                            <ol className="list-decimal marker:text-orange text-[18px]">
                                {descriptions.map((desc, index) => (
                                    <li key={index} className="mt-3">{desc}</li>
                                ))}
                            </ol>
                        </div>
                    ))}
                </div>


            </section>
        </div>
    )
}


export default SecondPart