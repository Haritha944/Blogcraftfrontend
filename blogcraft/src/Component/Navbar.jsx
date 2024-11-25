import React, { useState }  from 'react'
import { useNavigate } from 'react-router-dom';
import loginImage from '../Images/Eventpro hub (1).png'


const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown =()=>{
        setDropdownOpen(!dropdownOpen);
    }
    const navigate=useNavigate();

    const handleLogout = () => {
       
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');

        navigate('/login'); // Redirect to login page
    }
  return (
    <>
      <nav className="bg-gradient-to-bt from-blue-700 to-violet-600  dark:bg-gray-900">
        <div className="max-w-screen-xl w-screen flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="https://blogcraft.com/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="/api/placeholder/64/64"
              className="h-16"
              alt="Blogcraft Logo"
            />
            <span className="self-center text-2xl font-sans font-semibold whitespace-nowrap text-white">
              Blogcraft
            </span>
          </a>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-user"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 bg-gradient-to-br from-blue-900 to-violet-600  border border-red-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-blue-100 bg-transparent md:p-0"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-white rounded hover:text-blue-400 md:p-0"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-white rounded hover:text-blue-400 md:p-0"
                >
                  Categories
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-white rounded hover:text-blue-400 md:p-0"
                >
                  Popular
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-white rounded hover:text-blue-400 md:p-0"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              onClick={toggleDropdown}
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src="/api/placeholder/32/32"
                alt="user photo"
              />
            </button>
            {dropdownOpen && (
              <div
                className="z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 absolute"
                style={{ top: "60px", right: "10px" }}
              >
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 dark:text-white">
                    Bonnie Green
                  </span>
                  <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                    name@flowbite.com
                  </span>
                </div>
                <ul className="py-2">
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Create blogs
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Settings
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Earnings
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
  </>
  )
}

export default Navbar