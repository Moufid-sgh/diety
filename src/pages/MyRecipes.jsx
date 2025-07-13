import MyRecipesData from "@/components/MyRecipesData"
import MyRecipesFilter from "@/components/MyRecipesFilter";
import { useState } from "react"

const MyRecipes = () => {

  const [meal, setMeal] = useState("")


  return (
    <main className="flex min-h-screen flex-col items-center px-3 md:px-8 lg:px-32 py-8">


      <div className='w-full'>
        <div className='text-end'>
          <p className='text-[#7695FF] text-3xl mb-2'>وصفاتي المفضلة</p>
          <p className='rubriqueTitle'></p>
        </div>
        <p className="bg-blueTitle w-full h-[1px]"></p>
      </div>

      <MyRecipesFilter
        selected={meal}
        onChange={setMeal}
      />

      <MyRecipesData selected={meal} />

    </main>
  )
}

export default MyRecipes