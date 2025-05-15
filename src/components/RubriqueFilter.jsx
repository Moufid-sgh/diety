

const RubriqueFilter = ({ title, data, kcal }) => {


    return (
        <div className="w-full">
            <div className='text-end mb-6'>
                <p className='text-[#7695FF] text-3xl mb-2'>{title}</p>
                <p className='rubriqueTitle'></p>
            </div>

            <div dir="rtl" className="flex items-center flex-wrap mb-10">
                {data.map((el, index) => {
                    return (
                        <div key={index} className="flex flex-col items-start justify-center my-6 ml-8 size-28 text-[#262F82] p-3 rounded-[12px] shadow-lg border border-slate-200">
                            <img src={el.icon} alt="" className="size-10" />
                            <div className="leading-5 text-lg mt-3">
                                <p>{el.info}</p>
                                {kcal && <p>kcal</p>}
                            </div>
                        </div>
                    )
                })}

            </div>

        </div>
    )
}

export default RubriqueFilter