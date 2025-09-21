
import { useEffect, useState } from 'react'
import RecipeCard from "@/components/RecipeCard"
import { useAuth } from './authContext';
import ErrorBoundary from './ErrorBoundary';


const MyRecipesData = ({ selected }) => {


  //get user id-------------------------------------------//
  const [userId, setUserId] = useState()

  useEffect(() => {
    const id = localStorage.getItem("id")
    setUserId(id)
  }, [])



  //get my saves-----------------------------------//
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true);

  const { needsUpdate } = useAuth();


  useEffect(() => {

    if (!userId) return;

    const getMySaves = async () => {

      try {
        const response = await fetch("https://yahalawa.net/api/diet/mySaves", {
          method: "POST",
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId }),
        });

        const data = await response.json();
        setData(data.recipes)

      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    };

    getMySaves()

  }, [userId, needsUpdate])


  //get filtred recipes based on selected tags-----------//
  const filteredData = selected
  ? data.filter(el =>
      Array.isArray(el.typeRepas) &&
      el.typeRepas.some(rep => selected.includes(rep.title))
    )
  : data;




  return (
    <>
      {/* recipes--------------------------------------------------------------------------------- */}
      <section className="flex flex-wrap justify-center md:justify-end items-center w-full mt-6">
        <ErrorBoundary>
            {
              filteredData.map((el) => {
                return (
                    <RecipeCard key={el.id} el={el} />
                )
              })
            }
        </ErrorBoundary>
      </section>


      {
        Array.isArray(filteredData) && (filteredData.length === 0 && !loading) &&
        <div className='flex justify-end  w-full'>
          <p className="text-end bg-[#5684EB] text-xl text-white rounded-[8px]  p-2 ">
            حاليا، الموندو متاعك، كيفاش أنقولوها، ومن غير نبزيات ... مافيهوش وصفات.
            متنساش، الوصفات إلي يعجبوك أعمل عليهم جام، هكة يتسجللك ديراكت. أوكي
          </p>
        </div>
      }
    </>
  )
}

export default MyRecipesData