import Slider from "@/components/filterPage/Slider"
import TagsFilter from "@/components/filterPage/TagsFilter"
import { firstTagFilter, secondTagFilter, thirdTagFilter, fourthTagFilter } from "@/lib/tagsData"
import { useState } from "react"


const Filter = () => {

  const [meal, setMeal] = useState([]);
  const [ingredient, setIngredient] = useState([]);
  const [method, setMethod] = useState([]);
  const [diet, setDiet] = useState([]);

  const [sliderValues, setSliderValues] = useState([200, 500]);

  // Fonction pour envoyer la recherche
  const handleSearch = async () => {
    const payload = {
      meal,
      ingredient,
      method,
      diet,
      kcalMin: sliderValues[0],
      kcalMax: sliderValues[1],
    };

    const res = await fetch("http://localhost:3000/api/diet/filter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    // // Traite la réponse ici (affichage, navigation, etc.)
    console.log(data);
  };


  return (
    <main className="flex min-h-screen flex-col items-center px-3 md:px-8 lg:px-32 lg:py-8 py-4">

      <TagsFilter
        title="اختار وجبتك"
        data={firstTagFilter}
        name="meal"
        selected={meal}
        onChange={setMeal}
      />

      <Slider
        values={sliderValues}
        setValues={setSliderValues}
      />

      <TagsFilter
        title="وصفات حسب المكونات"
        data={secondTagFilter}
        name="ingredient"
        selected={ingredient}
        onChange={setIngredient}
      />

      <TagsFilter
        title="وصفات حسب طريقة التحضير"
        data={thirdTagFilter}
        name="method"
        selected={method}
        onChange={setMethod}
      />

      <TagsFilter
        title="وصفات حسب النظام الغذائي"
        data={fourthTagFilter}
        name="diet"
        selected={diet}
        onChange={setDiet}
      />


      <button
        onClick={handleSearch}
        className="bg-blue text-white text-lg px-10 py-2.5 rounded-[8px] mt-6 hover:bg-[#262F82] transition"
      >
        بحث
      </button>

    </main>
  )
}

export default Filter