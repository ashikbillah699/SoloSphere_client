import { useContext } from 'react'
import logo from '../assets/images/logo.png'
import { AuthContext } from '../providers/AuthProvider'
import { Link } from 'react-router-dom'
const Navbar = () => {
  const { user, logOut } = useContext(AuthContext)
  return (
    <div className='navbar bg-base-100 shadow-sm container px-4 mx-auto'>
      <div className='flex-1'>
        <Link to='/' className='flex gap-2 items-center'>
          <img className='w-auto h-7' src={logo} alt='' />
          <span className='font-bold'>SoloSphere</span>
        </Link>
      </div>
      <div className='flex-none'>
        <ul className='menu menu-horizontal px-1'>
          <li className='mr-1'>
            <Link to='/'>Home</Link>
          </li>
          <li className='mr-1'>
            <Link to='/allJobs'>All Jobs</Link>
          </li>

          {!user && (
            <li>
              <Link to='/login'>Login</Link>
            </li>
          )}
        </ul>

        {user && (
          <div className='dropdown dropdown-end z-50'>
            <div
              tabIndex={0}
              role='button'
              className='btn btn-ghost btn-circle avatar'
            >
              <div title={user?.displayName} className='w-10 rounded-full'>
                <img
                  referrerPolicy='no-referrer'
                  alt='User Profile Photo'
                  src={user?.photoURL}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
            >
              <li className='mb-1'>
                <Link to='/add-job' className='justify-between'>
                  Add Job
                </Link>
              </li>
              <li className='mb-1'>
                <Link to='/myPostedJobs'>My Posted Jobs</Link>
              </li>
              <li className='mb-1'>
                <Link to='/my-bids'>My Bids</Link>
              </li>
              <li className='mb-1'>
                <Link to='/bid-requests'>Bid Requests</Link>
              </li>
              <li className='mt-2'>
                <button
                  onClick={logOut}
                  className='bg-gray-200 block text-center'
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
