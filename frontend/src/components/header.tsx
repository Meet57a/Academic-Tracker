import { Link, useLocation } from 'react-router-dom'
import { Button } from './ui/button'
import Auth from './form/auth';

const Header = () => {
  const location = useLocation();
  let locationActive = location.pathname
  return (
    <div className='relative bg-accent border-2 h-14 tracking-wider rounded-xl my-4 min-md:mx-40 max-md:mx-2 max-md:px-4 flex items-center justify-center '>
      <div className='absolute left-4 tracking-widest max-sm:hidden'>Academic Tracker</div>

      <div className='flex gap-4 '>
        <Link
          to="/"
          className={`relative w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-white after:w-full  hover:after:scale-x-100 after:transition after:duration-300 after:origin-center ${locationActive === "/"
            ? "after:scale-x-100"
            : "after:scale-x-0"
            }`}
        >Home</Link>
        <Link to={"/subjects"} className={`relative w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-white after:w-full  hover:after:scale-x-100 after:transition after:duration-300 after:origin-center ${locationActive === "/subjects"
          ? "after:scale-x-100"
          : "after:scale-x-0"
          }`}>Subjects</Link>
        <Link to={"/timetable"} className={`relative w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-white after:w-full  hover:after:scale-x-100 after:transition after:duration-300 after:origin-center ${locationActive === "/timetable"
          ? "after:scale-x-100"
          : "after:scale-x-0"
          }`}>Time Table</Link>
      </div>
      <div className='absolute right-4 flex items-center gap-2 max-sm:hidden'>
        <Auth />

      </div>
    </div>
  )
}

export default Header