import Slider from "@/components/filterPage/Slider"
import TagsFilter from "@/components/filterPage/TagsFilter"
import { firstTagFilter, secondTagFilter, thirdTagFilter, fourthTagFilter } from "@/lib/tagsData"


const Filter = () => {



  return (
    <main className="flex min-h-screen flex-col items-center px-3 md:px-8 lg:px-32 lg:py-8 py-4">

        <TagsFilter title="اختار وجبتك"  data={firstTagFilter} />
        <Slider />
        <TagsFilter title="وصفات حسب المكونات"  data={secondTagFilter} />
        <TagsFilter title="وصفات حسب طريقة التحضير"  data={thirdTagFilter} />
        <TagsFilter title="وصفات حسب النظام الغذائي"  data={fourthTagFilter} />

    </main>
  )
}

export default Filter