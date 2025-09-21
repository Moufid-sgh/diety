import ImageComponent from "./ImageComponent"


const ChooseMealCard = ({ el }) => {
    return (
        <div dir="rtl" className="relative w-[320px] m-6 group cardShadow cursor-pointer">

            {/* <Link to={`/recipe/${el.id}`}> */}
            <div className="relative overflow-hidden cardBorder">
                <ImageComponent src={el.image} className="object-cover w-[320px] h-[350px] group-hover:scale-[1.02] transition-all duration-500" />
            </div>
            {/* </Link> */}

            {/* card info------------------------------------------------------- */}
            <div className="border-r-8 border-blue group-hover:border-[#FFEB00] group-active:border-[#262F82] rounded-b-[12px] p-2 w-64 h-20 flex items-center duration-300">
                <p className="text-[#262F82] text-[22px] overflow-hidden line-clamp-2 leading-7">{el.title}</p>
            </div>
        </div>
    )
}

export default ChooseMealCard