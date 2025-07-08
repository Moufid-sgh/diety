import ImageComponent from "./ImageComponent"


const ChooseMealCard = ({ el }) => {
    return (
        <div dir="rtl" className="relative w-[280px] mx-10 my-6 group cardShadow cursor-pointer">

            {/* <Link to={`/recipe/${el.id}`}> */}
            <div className="relative overflow-hidden cardBorder">
                <ImageComponent src={el.imgPath} className="object-cover w-[280px] h-[350px] group-hover:scale-[1.02] transition-all duration-500" />
            </div>
            {/* </Link> */}

            {/* card info------------------------------------------------------- */}
            <div className="border-r-8 border-blue rounded-b-[12px] p-2 w-64 h-20 flex items-center">
                <p className="text-[#262F82] text-[22px] overflow-hidden line-clamp-2 leading-7">{el.title}</p>
            </div>
        </div>
    )
}

export default ChooseMealCard