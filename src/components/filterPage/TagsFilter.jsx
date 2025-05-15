

const TagsFilter = ({ title, data }) => {


    return (
        <div className="w-full">
            {/* title------------------------------ */}
            <div className='text-end mb-6'>
                <p className='text-[#7695FF] text-3xl mb-2'>{title}</p>
                <p className='rubriqueTitle'></p>
            </div>

            {/* tags part------------------------- */}
            <div dir="rtl" className="flex items-center flex-wrap mb-10">
                {data.map((el, index) => {
                    return (
                        <div key={index} className="flex items-center justify-center my-4 md:my-6 ml-8 px-3 py-2 text-lg text-[#262F82] rounded-[12px] bg-[#7695FF1A] hover:bg-blue hover:text-white duration-300 cursor-pointer">
                                <p>{el.info}</p>
                                <img src={el.icon} alt="img" className="size-6 mr-3" />
                        </div>
                    )
                })}

            </div>
        </div>
    )
}

export default TagsFilter