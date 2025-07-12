
import { useEffect, useState } from 'react'
import RecipeCard from "@/components/RecipeCard"
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from './authContext';
import ErrorBoundary from './ErrorBoundary';


const MyRecipesData = () => {


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
        const response = await fetch("https://yahalawa.net/api/orange/mySaves", {
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




  return (
    <>
      {/* recipes--------------------------------------------------------------------------------- */}
      <section className="flex flex-wrap justify-center items-start w-full my-6">
        <ErrorBoundary>
            {
              data.map((el) => {
                return (
                    <RecipeCard key={el.id} el={el} />
                )
              })
            }
        </ErrorBoundary>
      </section>


      {
        Array.isArray(data) && (data.length === 0 && !loading) &&
        <div className='flex justify-end  w-full mt-10'>
          <p className="text-end bg-[#5684EB] text-white rounded-[8px]  p-2 lg:w-2/3">
            حاليا، الموندو متاعك، كيفاش أنقولوها، ومن غير نبزيات ... مافيهوش وصفات.
            متنساش، الوصفات إلي يعجبوك أعمل عليهم جام، هكة يتسجللك ديراكت. أوكي
          </p>
        </div>
      }
    </>
  )
}

export default MyRecipesData