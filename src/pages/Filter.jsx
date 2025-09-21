import FilterResult from "@/components/filterPage/FilterResult"
import NoResultPopup from "@/components/filterPage/NoResultPopup"
import Slider from "@/components/filterPage/Slider"
import TagsFilter from "@/components/filterPage/TagsFilter"
import Spinner from "@/components/Spinner"
import { firstTagFilter, secondTagFilter, thirdTagFilter, fourthTagFilter } from "@/lib/tagsData"
import { useState, useEffect, useRef } from "react"

const TAKE = 12

const Filter = () => {

  const [noResult, setNoResult] = useState(false)

  // State for filter options sotred in localStorage
  const [meal, setMeal] = useState(() => {
    const saved = localStorage.getItem("meal");
    return saved ? JSON.parse(saved) : [];
  });

  const [ingredient, setIngredient] = useState(() => {
    const saved = localStorage.getItem("ingredient");
    return saved ? JSON.parse(saved) : [];
  });

  const [method, setMethod] = useState(() => {
    const saved = localStorage.getItem("method");
    return saved ? JSON.parse(saved) : [];
  });

  const [diet, setDiet] = useState(() => {
    const saved = localStorage.getItem("diet");
    return saved ? JSON.parse(saved) : [];
  });

  const [sliderValues, setSliderValues] = useState(() => {
    const saved = localStorage.getItem("sliderValues");
    return saved ? JSON.parse(saved) : [200, 500];
  });

  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("recipes");
    return saved ? JSON.parse(saved) : { recipes: [], total: 0 };
  });

  // Save filter options to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("meal", JSON.stringify(meal));
  }, [meal]);
  useEffect(() => {
    localStorage.setItem("ingredient", JSON.stringify(ingredient));
  }, [ingredient]);
  useEffect(() => {
    localStorage.setItem("method", JSON.stringify(method));
  }, [method]);
  useEffect(() => {
    localStorage.setItem("diet", JSON.stringify(diet));
  }, [diet]);

  useEffect(() => {
    localStorage.setItem("sliderValues", JSON.stringify(sliderValues));
  }, [sliderValues]);

  // State to track if the form has been submitted
  const [submitted, setSubmitted] = useState(() => {
    return !!localStorage.getItem("recipes");
  });

  //for pagination
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  const [loading, setLoading] = useState(false);
  const filterRef = useRef()


  // submit--------------------------//
const handleSearch = async (currentPage = 0, isLoadMore = false) => {
  setLoading(true);

  // Empêcher le scroll seulement pour le "Load More"
  if (!isLoadMore) {
    setTimeout(() => {
       filterRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
    }, 150);
  }

  const payload = {
    meal,
    ingredient,
    method,
    diet,
    kcalMin: sliderValues[0],
    kcalMax: sliderValues[1],
    take: TAKE,
    skip: currentPage * TAKE
  };

  try {
    const res = await fetch("https://yahalawa.net/api/diet/filter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    
    if (result.recipes.length === 0) {
      setNoResult(true);
    }

    if (currentPage === 0) {
      setData(result);
      localStorage.setItem("recipes", JSON.stringify(result));
    } else {
      setData(prev => {
        const updated = {
          ...result,
          recipes: [...(prev.recipes || []), ...result.recipes]
        };
        localStorage.setItem("recipes", JSON.stringify(updated));
        return updated;
      });
    }
    
    setHasMore(result.recipes.length === TAKE);
    setSubmitted(true);

  } catch (error) {
    console.error("Error fetching recipes:", error);
  } finally {
    setLoading(false);
  }
};

  // reset all filters
  const resetFilters = () => {
    setMeal([]);
    setIngredient([]);
    setMethod([]);
    setDiet([]);
    setSliderValues([200, 500]);
    setData([]);
    setSubmitted(false);
    localStorage.removeItem("recipes");
    localStorage.removeItem("meal");
    localStorage.removeItem("ingredient");
    localStorage.removeItem("method");
    localStorage.removeItem("diet");
    localStorage.removeItem("sliderValues");
  }


  // Fetch data when page changes
  const handleLoadMore = () => {
    const nextPage = page + 1
    setPage(nextPage)
    handleSearch(nextPage, true);
  }


  return (
    <main className="flex min-h-screen flex-col px-3 md:px-8 lg:px-32 lg:py-8 py-4 mt-24 lg:mt-0">

      {/* dispaly result & reset -------------*/}
      {submitted &&
        <div className="flex flex-col lg:flex-row items-end lg:items-center justify-end w-full space-y-2 lg:space-y-0 lg:space-x-8 mb-6">
          <button onClick={resetFilters} className='flex items-center bg-blue rounded-[4px] w-[220px] py-2 px-6 hover:bg-[#007AFFCC] duration-300'>
            <span className='text-white text-lg mr-3'>إعادة كل الاختيارات</span>
            <svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.5001 2.41698C14.0677 2.42543 16.5253 3.46062 18.3251 5.29189H15.3333C14.804 5.29189 14.375 5.72093 14.375 6.25018C14.375 6.77943 14.804 7.20847 15.3333 7.20847H19.3035C20.2861 7.20793 21.0826 6.41149 21.0831 5.4289V1.45865C21.0831 0.929394 20.6541 0.500359 20.1248 0.500359C19.5956 0.500359 19.1665 0.929394 19.1665 1.45865V3.45002C14.4547 -0.793486 7.19496 -0.413818 2.95145 4.29803C1.29079 6.14201 0.272218 8.47442 0.0483794 10.9459C-0.000853408 11.4765 0.389461 11.9466 0.920151 11.9959C0.9489 11.9985 0.977784 11.9999 1.00671 12C1.49244 12.0062 1.90306 11.6417 1.95449 11.1586C2.3966 6.21447 6.53624 2.42349 11.5001 2.41698Z" fill="#FFFA39" />
              <path d="M21.9944 12.0001C21.5087 11.9939 21.098 12.3584 21.0466 12.8415C20.5893 18.1068 15.9502 22.0045 10.6848 21.5471C8.4067 21.3492 6.27473 20.3421 4.67497 18.7082H7.66681C8.19607 18.7082 8.6251 18.2792 8.6251 17.7499C8.6251 17.2206 8.19607 16.7916 7.66681 16.7916H3.69656C2.71424 16.7911 1.91753 17.587 1.91699 18.5692C1.91699 18.5699 1.91699 18.5705 1.91699 18.5712V22.5414C1.91699 23.0707 2.34603 23.4997 2.87528 23.4997C3.40453 23.4997 3.83357 23.0707 3.83357 22.5414V20.5501C8.54541 24.7936 15.8051 24.4139 20.0486 19.7021C21.7093 17.8581 22.7279 15.5257 22.9517 13.0542C23.001 12.5235 22.6106 12.0534 22.08 12.0042C22.0515 12.0016 22.0229 12.0002 21.9944 12.0001Z" fill="#FFFA39" />
            </svg>
          </button>

          <button className='flex items-center bg-blue rounded-[4px] py-2 px-6 hover:bg-[#007AFFCC] duration-300'>
            <div dir="rtl" className='text-white text-lg mr-3'>
              <span className="ml-2">{data.total}</span>
              <span>وصفة متوفرة وفقًا للخيارات</span>
            </div>
            <svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_4480_731)">
                <path d="M22.7403 21.8842C22.9145 22.0695 23.008 22.3164 23.0002 22.5706C22.9924 22.8248 22.8839 23.0655 22.6986 23.2398C22.5133 23.414 22.2664 23.5075 22.0122 23.4997C21.758 23.4918 21.5173 23.3834 21.343 23.1981L16.0885 17.6024C15.0957 17.634 10.5235 17.7701 11.9562 15.609C12.0761 15.4871 12.2269 15.4 12.3925 15.3572C12.5581 15.3143 12.7322 15.3172 12.8963 15.3656C13.9676 15.6979 15.0985 15.7928 16.2102 15.6435C16.4023 15.6189 16.5975 15.6409 16.7793 15.7076C16.9611 15.7743 17.1242 15.8838 17.2548 16.0269L22.7403 21.8842ZM14.375 13.9166C15.0042 13.9175 15.6275 13.7942 16.209 13.5538C16.7905 13.3133 17.3188 12.9605 17.7637 12.5155L22.7192 7.55903C22.8083 7.47005 22.879 7.3644 22.9273 7.24809C22.9756 7.13179 23.0004 7.00712 23.0005 6.8812C23.0006 6.75528 22.9759 6.63058 22.9278 6.51421C22.8797 6.39784 22.8091 6.29209 22.7202 6.20298C22.6312 6.11388 22.5255 6.04318 22.4092 5.99491C22.2929 5.94664 22.1683 5.92175 22.0423 5.92166C21.9164 5.92157 21.7917 5.94628 21.6754 5.99439C21.559 6.0425 21.4532 6.11305 21.3641 6.20203L16.4086 11.1585C15.9877 11.5757 15.4483 11.8527 14.864 11.9515C14.2797 12.0503 13.6791 11.9661 13.1445 11.7105L19.8442 5.01082C19.9357 4.92241 20.0087 4.81667 20.059 4.69975C20.1092 4.58283 20.1356 4.45707 20.1367 4.32983C20.1378 4.20258 20.1136 4.07639 20.0654 3.95861C20.0172 3.84084 19.9461 3.73384 19.8561 3.64386C19.7661 3.55388 19.6591 3.48272 19.5413 3.43453C19.4236 3.38634 19.2974 3.3621 19.1701 3.3632C19.0429 3.36431 18.9171 3.39075 18.8002 3.44097C18.6833 3.4912 18.5775 3.5642 18.4891 3.65573L11.7875 10.3554C11.5319 9.82082 11.4477 9.22027 11.5466 8.63598C11.6454 8.05169 11.9223 7.51221 12.3395 7.09136L17.2979 2.13582C17.4725 1.95507 17.5691 1.713 17.5669 1.46172C17.5647 1.21045 17.4639 0.970091 17.2862 0.792408C17.1086 0.614725 16.8682 0.513938 16.6169 0.511755C16.3657 0.509571 16.1236 0.606166 15.9428 0.780734L10.9863 5.73628C10.207 6.51829 9.72092 7.54501 9.61007 8.6435C9.49923 9.74199 9.77036 10.8451 10.3778 11.7671L0.280792 21.8641C0.106224 22.0448 0.00962889 22.2869 0.0118124 22.5382C0.0139959 22.7894 0.114783 23.0298 0.292466 23.2075C0.470148 23.3852 0.71051 23.4859 0.961782 23.4881C1.21305 23.4903 1.45513 23.3937 1.63587 23.2192L11.7329 13.1222C12.5166 13.6403 13.4354 13.9166 14.375 13.9166ZM5.22483 12.9247C6.01929 13.6732 6.75242 12.6794 7.28621 12.1475C7.50701 11.9243 7.6696 11.6502 7.75967 11.3495C7.84973 11.0487 7.86453 10.7304 7.80275 10.4225C7.21146 8.77228 8.65662 6.84603 7.46062 5.51873L3.19029 1.04907C2.92688 0.793139 2.59428 0.619959 2.23355 0.55091C1.87283 0.48186 1.49979 0.519966 1.16048 0.660521C0.821168 0.801077 0.530451 1.03793 0.324221 1.34183C0.11799 1.64573 0.00527808 2.00338 0 2.37061C0.227125 6.79236 1.85438 9.04828 5.22483 12.9247Z" fill="#FFFA39" />
              </g>
              <defs>
                <clipPath id="clip0_4480_731">
                  <rect width="23" height="23" fill="white" transform="translate(0 0.5)" />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
      }

      {/* filter--------------------------- */}
      <div>
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

        {/* submit */}
        {!submitted && <div className="sticky bottom-0 flex justify-end">
          <button
            onClick={handleSearch}
            disabled={loading}
            className="flex items-center justify-center w-full md:w-2/5 lg:w-1/3 bg-[#183153] hover:bg-[#BAC1CB] active:bg-blue text-white text-lg px-16 py-2.5 my-6 space-x-1.5 rounded-[8px]  transition"
          >
            {loading ?
              <Spinner />
              :
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m17 17l4 4M3 11a8 8 0 1 0 16 0a8 8 0 0 0-16 0" /></svg>
            }
            <span>بحث</span>
          </button>
        </div>}
      </div>

      <div ref={filterRef} className="filter-element"></div>

      {/* dispaly submit btn &  result & reset ------------------*/}
      {submitted &&
        <div className="flex flex-col lg:flex-row items-end lg:items-center justify-end w-full space-y-2 lg:space-y-0 lg:space-x-8">
          <button onClick={resetFilters} className='flex items-center bg-blue rounded-[4px] w-[220px] py-2 px-6 hover:bg-[#007AFFCC] duration-300'>
            <span className='text-white text-lg mr-3'>إعادة كل الاختيارات</span>
            <svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.5001 2.41698C14.0677 2.42543 16.5253 3.46062 18.3251 5.29189H15.3333C14.804 5.29189 14.375 5.72093 14.375 6.25018C14.375 6.77943 14.804 7.20847 15.3333 7.20847H19.3035C20.2861 7.20793 21.0826 6.41149 21.0831 5.4289V1.45865C21.0831 0.929394 20.6541 0.500359 20.1248 0.500359C19.5956 0.500359 19.1665 0.929394 19.1665 1.45865V3.45002C14.4547 -0.793486 7.19496 -0.413818 2.95145 4.29803C1.29079 6.14201 0.272218 8.47442 0.0483794 10.9459C-0.000853408 11.4765 0.389461 11.9466 0.920151 11.9959C0.9489 11.9985 0.977784 11.9999 1.00671 12C1.49244 12.0062 1.90306 11.6417 1.95449 11.1586C2.3966 6.21447 6.53624 2.42349 11.5001 2.41698Z" fill="#FFFA39" />
              <path d="M21.9944 12.0001C21.5087 11.9939 21.098 12.3584 21.0466 12.8415C20.5893 18.1068 15.9502 22.0045 10.6848 21.5471C8.4067 21.3492 6.27473 20.3421 4.67497 18.7082H7.66681C8.19607 18.7082 8.6251 18.2792 8.6251 17.7499C8.6251 17.2206 8.19607 16.7916 7.66681 16.7916H3.69656C2.71424 16.7911 1.91753 17.587 1.91699 18.5692C1.91699 18.5699 1.91699 18.5705 1.91699 18.5712V22.5414C1.91699 23.0707 2.34603 23.4997 2.87528 23.4997C3.40453 23.4997 3.83357 23.0707 3.83357 22.5414V20.5501C8.54541 24.7936 15.8051 24.4139 20.0486 19.7021C21.7093 17.8581 22.7279 15.5257 22.9517 13.0542C23.001 12.5235 22.6106 12.0534 22.08 12.0042C22.0515 12.0016 22.0229 12.0002 21.9944 12.0001Z" fill="#FFFA39" />
            </svg>
          </button>

          <button className='flex items-center bg-blue rounded-[4px] w-fit py-2 px-6 hover:bg-[#007AFFCC] duration-300'>
            <div dir="rtl" className='text-white text-lg mr-3'>
              <span className="ml-2">{data.total}</span>
              <span>وصفة متوفرة وفقًا للخيارات</span>
            </div>
            <svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_4480_731)">
                <path d="M22.7403 21.8842C22.9145 22.0695 23.008 22.3164 23.0002 22.5706C22.9924 22.8248 22.8839 23.0655 22.6986 23.2398C22.5133 23.414 22.2664 23.5075 22.0122 23.4997C21.758 23.4918 21.5173 23.3834 21.343 23.1981L16.0885 17.6024C15.0957 17.634 10.5235 17.7701 11.9562 15.609C12.0761 15.4871 12.2269 15.4 12.3925 15.3572C12.5581 15.3143 12.7322 15.3172 12.8963 15.3656C13.9676 15.6979 15.0985 15.7928 16.2102 15.6435C16.4023 15.6189 16.5975 15.6409 16.7793 15.7076C16.9611 15.7743 17.1242 15.8838 17.2548 16.0269L22.7403 21.8842ZM14.375 13.9166C15.0042 13.9175 15.6275 13.7942 16.209 13.5538C16.7905 13.3133 17.3188 12.9605 17.7637 12.5155L22.7192 7.55903C22.8083 7.47005 22.879 7.3644 22.9273 7.24809C22.9756 7.13179 23.0004 7.00712 23.0005 6.8812C23.0006 6.75528 22.9759 6.63058 22.9278 6.51421C22.8797 6.39784 22.8091 6.29209 22.7202 6.20298C22.6312 6.11388 22.5255 6.04318 22.4092 5.99491C22.2929 5.94664 22.1683 5.92175 22.0423 5.92166C21.9164 5.92157 21.7917 5.94628 21.6754 5.99439C21.559 6.0425 21.4532 6.11305 21.3641 6.20203L16.4086 11.1585C15.9877 11.5757 15.4483 11.8527 14.864 11.9515C14.2797 12.0503 13.6791 11.9661 13.1445 11.7105L19.8442 5.01082C19.9357 4.92241 20.0087 4.81667 20.059 4.69975C20.1092 4.58283 20.1356 4.45707 20.1367 4.32983C20.1378 4.20258 20.1136 4.07639 20.0654 3.95861C20.0172 3.84084 19.9461 3.73384 19.8561 3.64386C19.7661 3.55388 19.6591 3.48272 19.5413 3.43453C19.4236 3.38634 19.2974 3.3621 19.1701 3.3632C19.0429 3.36431 18.9171 3.39075 18.8002 3.44097C18.6833 3.4912 18.5775 3.5642 18.4891 3.65573L11.7875 10.3554C11.5319 9.82082 11.4477 9.22027 11.5466 8.63598C11.6454 8.05169 11.9223 7.51221 12.3395 7.09136L17.2979 2.13582C17.4725 1.95507 17.5691 1.713 17.5669 1.46172C17.5647 1.21045 17.4639 0.970091 17.2862 0.792408C17.1086 0.614725 16.8682 0.513938 16.6169 0.511755C16.3657 0.509571 16.1236 0.606166 15.9428 0.780734L10.9863 5.73628C10.207 6.51829 9.72092 7.54501 9.61007 8.6435C9.49923 9.74199 9.77036 10.8451 10.3778 11.7671L0.280792 21.8641C0.106224 22.0448 0.00962889 22.2869 0.0118124 22.5382C0.0139959 22.7894 0.114783 23.0298 0.292466 23.2075C0.470148 23.3852 0.71051 23.4859 0.961782 23.4881C1.21305 23.4903 1.45513 23.3937 1.63587 23.2192L11.7329 13.1222C12.5166 13.6403 13.4354 13.9166 14.375 13.9166ZM5.22483 12.9247C6.01929 13.6732 6.75242 12.6794 7.28621 12.1475C7.50701 11.9243 7.6696 11.6502 7.75967 11.3495C7.84973 11.0487 7.86453 10.7304 7.80275 10.4225C7.21146 8.77228 8.65662 6.84603 7.46062 5.51873L3.19029 1.04907C2.92688 0.793139 2.59428 0.619959 2.23355 0.55091C1.87283 0.48186 1.49979 0.519966 1.16048 0.660521C0.821168 0.801077 0.530451 1.03793 0.324221 1.34183C0.11799 1.64573 0.00527808 2.00338 0 2.37061C0.227125 6.79236 1.85438 9.04828 5.22483 12.9247Z" fill="#FFFA39" />
              </g>
              <defs>
                <clipPath id="clip0_4480_731">
                  <rect width="23" height="23" fill="white" transform="translate(0 0.5)" />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
      }

      {/* results------------- */}
      {submitted && <FilterResult recipes={data.recipes} />}

      {/* no result -----------------*/}
      <NoResultPopup resetFilters={resetFilters} setNoResult={setNoResult} noResult={noResult} />


      {hasMore && !loading && Array.isArray(data.recipes) && data.recipes.length > 0 && (
        <div className="text-center">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 my-8 w-fit bg-blue text-white rounded-[8px] hover:bg-[#007AFFCC] duration-300 transition"
          >
            تحميل المزيد
          </button>
        </div>
      )}

    </main>
  )
}

export default Filter