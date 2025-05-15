import Rubrique from "@/components/Rubrique"
import GetRandomRecipes from "@/components/GetRandomRecipes"
import ErrorBoundary from "@/components/ErrorBoundary"
import RubriqueFilter from "@/components/RubriqueFilter"

import { secondTagFilter, thirdTagFilter, fourthTagFilter } from "@/lib/tagsData"

const Home = () => {



  return (
    <main className="flex min-h-screen flex-col items-center px-3 md:px-8 lg:px-32 lg:py-8 py-4">

      <Rubrique />

      <RubriqueFilter 
        title="وصفات حسب المكونات"
        data={secondTagFilter}
        kcal={false}
       />

      <RubriqueFilter 
        title="وصفات حسب طريقة التحضير"
        data={thirdTagFilter}
        kcal={false}
       />

      <RubriqueFilter 
        title="وصفات حسب النظام الغذائي"
        data={fourthTagFilter}
        kcal={false}
       />

      {/* أكيد باش يعجبوك --------------------------------------------------------- */}
      <section className="w-full mb-16 mt-6">
        <div className='text-end'>
          <p className='text-[#7695FF] text-3xl mb-2'>ما نحيروش في التصنيف</p>
          <p className='rubriqueTitle'></p>
        </div>
        <ErrorBoundary>
          <GetRandomRecipes />
        </ErrorBoundary>
      </section>

    </main>
  )
}

export default Home