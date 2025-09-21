import { useEffect, useState } from "react";
import { toast } from "sonner"
import { useAuth } from "./authContext";
import { useNavigate } from "react-router-dom";


const Save = ({ recipeId, position }) => {

    const { setNeedsUpdate, isAuthenticated } = useAuth();

    const [isSaved, setIsSaved] = useState(false);


    //get user id-------------------------------------------//
    const [userId, setUserId] = useState()

    useEffect(() => {
        const id = localStorage.getItem("id")
        setUserId(id)
    }, [])


    useEffect(() => {

        if (!userId) return;

        const getUserRecipe = async () => {
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
                const saves = data.recipes.some(el => el.id === recipeId)

                if (saves) {
                    setIsSaved(true)
                }
            } catch (error) {
                console.log(error)
            }
        };

        getUserRecipe()

    }, [userId, recipeId])


    //handle save---------------------------------------------//
    const navigate = useNavigate();

    const handleSave = async () => {

        if (!isAuthenticated) {
            navigate('/login')
            return
        };

        try {
            const response = await fetch("https://yahalawa.net/api/diet/saveRecipe", {
                method: "POST",
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, recipeId }),
            });

            const data = await response.json();

            if (response.ok) {
                setIsSaved((prev) => !prev)
                setNeedsUpdate((prev) => !prev);
                if (data.saved) {
                    return toast.info('تم حفظ الوصفة')
                } else {
                    return toast.info('تم حذف الوصفة')
                }
            } else {
                console.error("save failed:", data.error);
            }
        } catch (error) {
            console.log(error)
        }
    };



    return (
        <div className={`absolute ${position} ${isSaved ? 'bg-[#5E5DC0] text-white' : 'bg-white'} group py-[9px] flex items-center justify-center size-10 z-30 rounded-full shadow-save-btn   text-[#5E5DC0] hover:bg-[#FFEB00] hover:text-white duration-300`}>
            <svg 
            onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleSave();
            }}
            className="pt-0.5"
             width="29" height="26" viewBox="0 0 29 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor"
                 d="M20.4453 2C19.3192 2.01751 18.2177 2.33185 17.252 2.91127C16.2863 3.49069 15.4906 4.31467 14.9453 5.3C14.3999 4.31467 13.6042 3.49069 12.6385 2.91127C11.6728 2.33185 10.5713 2.01751 9.44527 2C7.65021 2.07799 5.95898 2.86325 4.74105 4.18423C3.52313 5.50521 2.87752 7.25453 2.94527 9.05C2.94527 13.597 7.73127 18.563 11.7453 21.93C12.6415 22.6831 13.7746 23.096 14.9453 23.096C16.1159 23.096 17.2491 22.6831 18.1453 21.93C22.1593 18.563 26.9453 13.597 26.9453 9.05C27.013 7.25453 26.3674 5.50521 25.1495 4.18423C23.9316 2.86325 22.2403 2.07799 20.4453 2ZM16.8603 20.4C16.3243 20.8514 15.646 21.0989 14.9453 21.0989C14.2445 21.0989 13.5663 20.8514 13.0303 20.4C7.89227 16.089 4.94527 11.953 4.94527 9.05C4.87691 7.78472 5.31164 6.54373 6.15463 5.5977C6.99763 4.65167 8.1805 4.07735 9.44527 4C10.71 4.07735 11.8929 4.65167 12.7359 5.5977C13.5789 6.54373 14.0136 7.78472 13.9453 9.05C13.9453 9.31522 14.0506 9.56957 14.2382 9.75711C14.4257 9.94464 14.6801 10.05 14.9453 10.05C15.2105 10.05 15.4648 9.94464 15.6524 9.75711C15.8399 9.56957 15.9453 9.31522 15.9453 9.05C15.8769 7.78472 16.3116 6.54373 17.1546 5.5977C17.9976 4.65167 19.1805 4.07735 20.4453 4C21.71 4.07735 22.8929 4.65167 23.7359 5.5977C24.5789 6.54373 25.0136 7.78472 24.9453 9.05C24.9453 11.953 21.9983 16.089 16.8603 20.396V20.4Z"  />
            </svg>
        </div>
    )
}

export default Save