import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom"
import { useEffect, useState, useRef } from 'react';
import SecondPart from '@/components/recipe/SecondPart';
import Save from "@/components/Save"
import ErrorBoundary from '@/components/ErrorBoundary';
import { Separator } from '@radix-ui/react-separator';
import ProgressBar from '@/components/recipe/ProgressBar';


const Recipe = () => {

  const { id } = useParams();


  //get container height
  const containerRef = useRef()

  const [getHeight, setGetHeight] = useState(0);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        setGetHeight(entries[0].contentRect.height);
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalLoading, setTotalLoading] = useState(false);


  //fetch data 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://yahalawa.net/api/diet/recipe/${id}`);

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const result = await response.json();
        setData(result)
        setTotalLoading(true)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    };

    fetchData();
  }, [id]);


  const sortedSteps = data?.steps.sort((a, b) => a.step - b.step);


  return (
    <main className="flex min-h-screen flex-col px-6 md:px-8 lg:px-32 pb-12 pt-3 mt-20 lg:mt-0">
      <div dir="rtl" ref={containerRef} className="lg:flex items-start justify-between mt-8 pb-4 w-full">
        <section className="flex-1">

          {/* video fo mobile---------------------------------------------------------------------------*/}
          {totalLoading && <div className="lg:hidden mb-12 flex justify-center">
            <div className="relative flex items-center justify-center">
              <video className="w-[338px] h-[600px]"
                poster={data?.imgPath}
                controls
                preload="metadata">
                <source src={data?.videoPath} type="video/mp4" />
              </video>
              <Save recipeId={data?.id} position="top-1.5 left-1.5" />
            </div>
          </div>}

          <div className="mb-10 lg:mb-0 text-[#262F82]">
            <div className="lg:w-[60%]">
              <h1 className="text-[32px] text-darkblue">{data?.title}</h1>
              {/* <div className="text-[21px] w-fit categoryTitle">
                {data?.category.map(el => {
                  return (
                    <Link to={`/category/${el.title}`} key={el.id} className="hover:opacity-70 duration-300">
                      <p>{el.title}</p>
                    </Link>
                  )
                })}
              </div> */}


              {/* kcal------------------------------------------------------------------------- */}
              <div className="text-[#5E5DC0] my-8">
                <div className='flex items-center text-2xl'>
                  <svg width="18" height="18" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_4072_6766)">
                      <path d="M15.2442 2.65847C14.5228 2.04707 13.7666 1.40447 12.9966 0.704121C12.4059 0.166926 11.6081 -0.0820348 10.8167 0.0239691C10.0498 0.125289 9.36745 0.561809 8.95405 1.21562C7.86136 3.04162 7.08878 5.04091 6.6697 7.12722C6.50526 6.88977 6.35938 6.64004 6.23336 6.38012C5.7992 5.4654 4.70573 5.07581 3.79101 5.50996C3.56955 5.61506 3.37142 5.76352 3.20836 5.94652C1.67081 7.51772 0.818435 9.63414 0.837857 11.8324C0.794158 16.4529 3.90213 20.5097 8.3747 21.6701C9.20688 21.8795 10.0613 21.9878 10.9194 21.9928C10.9469 21.9928 11.2393 21.99 11.3575 21.9818C16.83 21.8045 21.1727 17.3133 21.1659 11.8379C21.1622 7.68547 18.4195 5.35712 15.2442 2.65847ZM10.8965 20.153C10.2142 20.1011 9.54006 19.8248 9.03105 19.4142C8.23398 18.8502 7.70654 18.0231 7.5809 17.0703C7.42505 15.5834 8.34175 13.6392 10.2145 11.4429C10.4109 11.2135 10.6982 11.0821 11.0001 11.0835C11.2981 11.0814 11.5815 11.2125 11.7728 11.441C13.4888 13.4779 14.4312 15.357 14.4312 16.7329C14.4259 18.5406 13.013 19.9706 11.2137 20.1448C11.1347 20.1524 11.0001 20.164 10.8965 20.153ZM16.1114 18.4095C16.0573 18.4517 15.9977 18.4856 15.9427 18.5259C16.1542 17.9511 16.2632 17.3436 16.2645 16.7311C16.2645 14.4147 14.5824 11.9323 13.1726 10.2576C12.6332 9.61876 11.8398 9.24992 11.0037 9.24923H11.0001C10.1623 9.24773 9.36604 9.61404 8.82205 10.2511C6.5808 12.8765 5.5514 15.235 5.7622 17.2618C5.81226 17.7323 5.93245 18.1927 6.1188 18.6276C3.94209 17.0504 2.65952 14.5204 2.67395 11.8324C2.65625 10.0862 3.34487 8.40687 4.58336 7.17573C4.79481 7.6153 5.04871 8.03313 5.34145 8.42333C5.74351 8.96688 6.43037 9.21911 7.08861 9.06498C7.75974 8.91652 8.28082 8.38719 8.4187 7.71383C8.78699 5.76717 9.49077 3.89932 10.4986 2.19368C10.6226 1.99868 10.8274 1.86952 11.0569 1.84168C11.3132 1.80717 11.5717 1.88808 11.7627 2.06258C12.5492 2.77758 13.3211 3.43758 14.0544 4.05818C17.1142 6.65693 19.3261 8.53427 19.3261 11.8379C19.334 14.4089 18.1472 16.8377 16.1141 18.4113L16.1114 18.4095Z" fill="#5E5DC0" />
                    </g>
                    <defs>
                      <clipPath id="clip0_4072_6766">
                        <rect width="22" height="22" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span className='mx-1.5'>kcal</span>
                  <span>{data?.kcal}</span>
                </div>
                <p className='text-lg'>قيمة السعرات الحرارية للحصة الواحدة</p>
              </div>

              {/* value progress bar ------------------------------------------*/}
              <div className='mb-8'>
                <ProgressBar
                  title="البروتين"
                  subtitle="Protein | Protéines"
                  value={data?.proteines}
                  className="[&>div]:bg-blue"
                />

                <ProgressBar
                  title="الدهون"
                  subtitle="Fat | Lipides"
                  value={data?.graisses}
                  className="[&>div]:bg-[#FFEB00]"
                />

                <ProgressBar
                  title="الكربوهيدرات"
                  subtitle="Carbohydrates | Glucides"
                  value={data?.glucides}
                  className="[&>div]:bg-[#4CC9FE]"
                />

                <ProgressBar
                  title="الألياف"
                  subtitle="Fiber | Fibres"
                  value={data?.fibres}
                  className="[&>div]:bg-[#06E775]"
                />
              </div>
            </div>
          </div>


          {/* ingredient & preparation & steps------------------------------------------------------------ */}
          <ErrorBoundary>
            {totalLoading && <SecondPart
              ingredients={data?.ingredients}
              ustensiles={data?.ustensiles}
              nbr_serves={data.nbr_serves}
              sortedSteps={sortedSteps}
              ingredient_title={data?.ingredient_title}
              macro={data?.macro}
              micro={data?.micro}
            />}
          </ErrorBoundary>


        </section>


        {/* video fo desktop---------------------------------------------------------------------------*/}
        {totalLoading && <div className="hidden lg:block w-[338px]" style={{ height: getHeight }}>
          <div className="relative flex items-center justify-center lg:sticky lg:top-7">
            <video className="w-[338px] h-[600px]"
              poster={data?.imgPath}
              controls
              preload="metadata">
              <source src={data?.videoPath} type="video/mp4" />
            </video>
            <Save recipeId={data?.id} position="top-1.5 left-1.5" />
          </div>
        </div>}
      </div>


    </main>
  )
}

export default Recipe