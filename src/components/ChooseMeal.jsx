import React from 'react'
import ChooseMealCard from './ChooseMealCard'
import petitDej from '/chooseMeal/petitDej.webp'
import dejeuner from '/chooseMeal/dejeuner.webp'
import diner from '/chooseMeal/diner.webp'
import { Link } from 'react-router-dom'


const ChooseMeal = () => {

    const data = [
        {
            id: 1,
            title: "عشاء",
            imgPath: diner
        },
        {
            id: 2,
            title: "غداء",
            imgPath: dejeuner
        },
        {
            id: 3,
            title: "فطور الصباح",
            imgPath: petitDej
        },
    ]


    return (
        <div className="w-full my-10">
            {/* title---------- */}
            <div className='text-end mb-6'>
                <p className='text-[#7695FF] text-3xl mb-2'>اختار وجبتك</p>
                <p className='rubriqueTitle'></p>
            </div>

            {/* card container---------- */}
            <div className="flex flex-wrap items-center justify-center">
                {data.map((el) => (
                    <Link to={`/category/${el.title}`} key={el.id}>
                        <ChooseMealCard el={el} />
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default ChooseMeal