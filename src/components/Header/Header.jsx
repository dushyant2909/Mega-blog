import React, { useState } from 'react'
import { Container, LogoutBtn, Logo } from '../index';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RxHamburgerMenu } from 'react-icons/rx'

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const [navbarOpen, setnavbarOpen] = useState(false);
  //In navbar a loop runs through items to show them so create an array
  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ]

  const closeNavbar = () => {
    setnavbarOpen(false);
  }
  return (
    <header className='relave w-full z-[100] fixed py-1 shadow bg-gradient-to-r from-blue-950 to-blue-800'>
      <Container>
        <nav className='flex'>
          <div className='flex justify-center items-center'>
            <Link to='/' onClick={closeNavbar}>
              <Logo width='160px' />
            </Link>
          </div>
          <div className="flex items-center text-white text-2xl ml-auto lg:hidden">
            <RxHamburgerMenu onClick={() => setnavbarOpen(!navbarOpen)} className='cursor-pointer' />
          </div>
          <ul className='hidden lg:flex ml-auto'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <NavLink
                    to={item.slug}
                    className={({ isActive }) => `inline-block px-5 py-2 duration-200 hover:text-yellow-200
                    ${isActive ? "text-yellow-200" : "text-white"}`
                    }
                  >{item.name}</NavLink>
                </li>
              ) : null
            )}
            {authStatus && (
              <li className='flex'>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
      <div className={`${navbarOpen ? "opacity-100" : "opacity-0 hidden "} lg:hidden absolute px-2 py-1 pb-4 overflow-auto transition-opacity duration-300 bg-gradient-to-r from-blue-950 to-blue-800 w-full`}>
        <ul className='to'>
          {navItems.map((item) =>
            item.active ? (
              <li key={item.name}>
                <NavLink
                  to={item.slug}
                  onClick={closeNavbar}
                  className={({ isActive }) => `inline-block px-5 py-2 duration-200 hover:text-yellow-200
                    ${isActive ? "text-yellow-200" : "text-white"}`
                  }
                >{item.name}</NavLink>
              </li>
            ) : null
          )}
          {authStatus && (
            <li>
              <LogoutBtn />
            </li>
          )}
        </ul>
      </div>

    </header>
  )
}

export default Header