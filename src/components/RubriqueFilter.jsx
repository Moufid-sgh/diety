import { Link } from "react-router-dom"

const RubriqueFilter = ({ title, data, kcal }) => {


    return (
        <div className="w-full">
            <div className='text-end mb-6'>
                <p className='text-[#8b9ac8] text-3xl mb-2'>{title}</p>
                <p className='rubriqueTitle'></p>
            </div>

            <div className="flex justify-center ">
                <div dir="rtl" className="flex items-center justify-center md:justify-normal gap-[50px] flex-wrap mb-10 w-[1005px]">
                    {data.map((el, index) => {
                        return (
                            <Link key={index} to={`/category/${el.info}`}>
                                <div className="flex flex-col items-start  size-28 text-[#262F82] p-3 rounded-[12px] shadow-lg border border-slate-200 hover:bg-[#7695FF1A] active:bg-[#262F82] active:text-white transition duration-300">
                                    <img src={el.icon} alt="" className="size-10" />
                                    <div className="leading-5 text-lg mt-3">
                                        <p>{el.info}</p>
                                        {kcal && <p>kcal</p>}
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
            {/* <div className="flex items-center justify-center">
                <div dir="rtl" className="flex items-center justify-center gap-9 flex-wrap mb-10 w-[1015px]">
                    {data.map((el, index) => {
                        return (
                            <Link key={index} to={`/category/${el.info}`}>
                                <div className="flex flex-col items-start justify-center size-[135px]  text-[#262F82] p-3 rounded-[12px] shadow-lg border border-slate-200 hover:bg-[#7695FF1A] active:bg-[#262F82] active:text-white transition duration-300">
                                    <img src={el.icon} alt="" className="size-10" />
                                    <div className="leading-5 text-lg mt-3">
                                        <p>{el.info}</p>
                                        {kcal && <p>kcal</p>}
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div> */}

        </div>
    )
}

export default RubriqueFilter