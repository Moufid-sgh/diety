import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/components/authContext"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Spinner from "@/components/Spinner"


const Page = () => {

    const { setIsAuthenticated, currentName, setCurrentName } = useAuth();

    const navigate = useNavigate()

     const [loading, setLoading] = useState(false);

    //get user name
    const nameRef = useRef()

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')

    useEffect(() => {
        const userName = localStorage.getItem('name')
        const userPhone = localStorage.getItem('phone')
        setCurrentName(userName)
        setPhone(userPhone)
    }, [name])


    const editUser = async (e) => {
        setLoading(true);
        e.preventDefault()

            try {
                const response = await fetch("https://yahalawa.net/api/diet/editUser", {
                    method: "POST",
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ phone, name }),
                });

                const data = await response.json();

                if (response.ok) {
                    localStorage.setItem("name", name)
                } else {
                    console.error("edit failed:", data.error);
                }
            } catch (error) {
                console.log(error)
            }
            finally {
                setLoading(false);
            }
    };


    //clear input name
    const clearInput = () => {
        setName('')
        nameRef.current.value = ''
    };


    //logout
    const logout = async (e) => {
        e.preventDefault();

        // try {
        //     const response = await fetch('http://localhost:3000/api/diet/logout', {
        //         method: 'GET',
        //         credentials: 'include',
        //     });

        //     if (response.ok) {
        //         navigate('/login');
        //         localStorage.clear()
        //         setIsAuthenticated(false);
        //     } else {
        //         console.error('Logout failed');
        //     }
        // } catch (error) {
        //     console.error('Logout error:', error);
        // }

        try {
            navigate('/login');
            localStorage.clear()
            setIsAuthenticated(false);
        } catch (error) {
            console.error('Logout error:', error);
        }
    };


    return (
        <main className="flex min-h-screen flex-col items-center px-3 md:px-8 lg:px-32 py-8">

            <div className='text-end w-full'>
                <p className='text-[#7695FF] text-3xl mb-2'>مرحبا بيك في حسابك الخاص</p>
                <p className='rubriqueTitle'></p>
            </div>

            <div dir="rtl" className="mt-8 w-full flex flex-col justfiy-start">
                <Avatar className="size-20">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></g></svg>
                    </AvatarFallback>
                </Avatar>

                <p className="text-sm text-[#262F826E] mt-2">إتنجم تحمل وإلا تغير صورتك حسابك<br/> بصيغة jpeg أو png. </p>
            </div>

            <form dir="rtl" className="mt-8 w-full flex justfiy-start">
                <section>
                    <div className="relative">
                        <label className="text-sm text-[#262F826E]" htmlFor="nom">الإسم</label>
                        <input
                            id="nom"
                            type="text"
                            ref={nameRef}
                            defaultValue={currentName}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="الإسم"
                            className="bg-[#007AFF0D] border border-[#1831536E] rounded-[8px] py-3 px-4 mt-1 w-full outline-none focus:ring-[0.8px] focus:ring-ringblue"
                        />
                        <p onClick={clearInput} className="absolute top-[41px] left-2 text-black cursor-pointer">&#10005;</p>
                    </div>

                    <div className="relative mt-5">
                        <label className="text-sm text-[#262F826E]" htmlFor="number">رقم الجوال إتصالات تونس</label>
                        <input
                            disabled
                            id="number"
                            type="number"
                            name="phone_number"
                            placeholder={phone}
                            className="bg-[#007AFF0D] border border-[#1831536E] rounded-[8px] py-3 px-4 mt-1 w-full outline-none focus:ring-[0.8px] focus:ring-ringblue"
                        />
                        <svg className="absolute left-4 top-[45px] text-[#1831536E] size-4" width="12" height="19" viewBox="0 0 12 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.25 18.2852H3.75C1.68225 18.2852 0 16.6029 0 14.5352V4.03516C0 1.96741 1.68225 0.285156 3.75 0.285156H8.25C10.3177 0.285156 12 1.96741 12 4.03516V14.5352C12 16.6029 10.3177 18.2852 8.25 18.2852ZM3.75 1.78516C2.5095 1.78516 1.5 2.79466 1.5 4.03516V14.5352C1.5 15.7757 2.5095 16.7852 3.75 16.7852H8.25C9.4905 16.7852 10.5 15.7757 10.5 14.5352V4.03516C10.5 2.79466 9.4905 1.78516 8.25 1.78516H3.75ZM7.5 14.5352C7.5 14.1212 7.164 13.7852 6.75 13.7852H5.25C4.836 13.7852 4.5 14.1212 4.5 14.5352C4.5 14.9492 4.836 15.2852 5.25 15.2852H6.75C7.164 15.2852 7.5 14.9492 7.5 14.5352Z" fill="#262F82" fillOpacity="0.43" />
                        </svg>
                    </div>


                    <button onClick={editUser} 
                            disabled={loading} 
                            className="flex items-center justify-center px-5 py-2.5  mt-8 bg-blue hover:bg-[#31363F3B] active:bg-black duration-500 text-white rounded-[8px] w-full group overflow-hidden font-medium">
                        <span className="ml-1.5">تغير الاسم</span>
                        {loading && <Spinner />}
                    </button>

                    <button onClick={logout}
                             className="flex items-center justify-center px-5 py-2.5 mt-8 bg-[#BAC1CB] hover:bg-[#183153] active:bg-blue duration-500 text-white rounded-[8px] w-full group overflow-hidden font-medium">
                        <span>تسجيل الخروج</span>
                    </button>
                </section>
            </form>

        </main>
    )
}

export default Page