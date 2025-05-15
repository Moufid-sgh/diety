import { useState, useEffect } from 'react';
import logo from "/logo.png"
import HamburgerMenu from "./HamburgerMenu"
import Menu from "./Menu"
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar';



const Navbar = () => {

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://yahalawa.net/api/orange/menu');

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const result = await response.json();
        setData(result)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    };

    fetchData();
  }, []);



  return (
    <nav dir="rtl">

      <div className="flex items-start justify-between px-3 md:px-8 lg:px-32 lg:py-8 pt-8 z-50">
        {/* for desktop--------------------------------------- */}
        <div className="hidden lg:flex flex-col">
          <Menu />
          <div>
            <SearchBar />

            <div className='bg-blue rounded-[4px] w-full md:w-96 p-1 hover:bg-[#007AFFCC] duration-300'>
              <Link to="/filter" className='flex items-center'>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.00233 6.75073H5.73805C6.278 8.73737 8.32619 9.91016 10.3128 9.37022C11.5888 9.02342 12.5855 8.02668 12.9323 6.75073H25.0001C25.5523 6.75073 26 6.30307 26 5.75084C26 5.19862 25.5523 4.75096 25.0001 4.75096H12.9323C12.3924 2.76427 10.3442 1.59148 8.35754 2.13142C7.08159 2.47822 6.08485 3.47496 5.73805 4.75091H3.00233C2.4501 4.75091 2.00244 5.19857 2.00244 5.7508C2.00244 6.30302 2.4501 6.75073 3.00233 6.75073Z" fill="#FFFA39" />
                <path d="M25.0001 13.0001H22.2644C21.7255 11.0137 19.6785 9.84026 17.6921 10.3791C16.4151 10.7255 15.4175 11.723 15.0711 13.0001H3.00233C2.4501 13.0001 2.00244 13.4477 2.00244 14C2.00244 14.5522 2.4501 14.9998 3.00233 14.9998H15.0711C15.61 16.9862 17.657 18.1596 19.6434 17.6208C20.9204 17.2744 21.918 16.2769 22.2644 14.9998H25.0001C25.5523 14.9998 26 14.5522 26 14C26 13.4477 25.5523 13.0001 25.0001 13.0001Z" fill="#FFFA39" />
                <path d="M25.0001 21.2493H12.9323C12.3924 19.2627 10.3442 18.0899 8.35754 18.6298C7.08159 18.9766 6.08485 19.9734 5.73805 21.2493H3.00233C2.4501 21.2493 2.00244 21.697 2.00244 22.2492C2.00244 22.8014 2.4501 23.2491 3.00233 23.2491H5.73805C6.278 25.2357 8.32619 26.4085 10.3128 25.8686C11.5888 25.5218 12.5855 24.525 12.9323 23.2491H25.0001C25.5523 23.2491 26 22.8014 26 22.2492C26 21.697 25.5523 21.2493 25.0001 21.2493Z" fill="#FFFA39" />
              </svg>
              <span className='text-white text-[24px] mr-2'>فلتري وأختار على كيفك</span>
              </Link>
            </div>
          </div>
        </div>
        {/* -------------------------------------------------- */}

        {/* for mobile-------------------------------------- */}
        <HamburgerMenu data={data} />
        {/* ------------------------------------------------ */}



        <div className="w-1/3 flex justify-end">
          <Link to="/">
            <img
              src={logo}
              alt="logo"
              className="w-20  lg:w-36"
            />
          </Link>
        </div>
      </div>

    </nav>
  )
}

export default Navbar