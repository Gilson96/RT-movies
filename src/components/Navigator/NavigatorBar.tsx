import { Avatar } from '@chakra-ui/react'
import { Link } from 'react-router'
import NavigatorMenu from './NavigatorMenu'
import useScreenSize from "../../features/useScreenSize";
import NavigatorSearch from './NavigatorSearch'
import { FilmIcon } from '@heroicons/react/24/outline';

//   Main function export
const NavigatorBar = () => {
    const screenSize = useScreenSize()
    const handleCarouselBreakpoints = () => {
        let sizeOfAvatar: string = 'xs';
        if (screenSize.width > 700) return sizeOfAvatar = 'sm'
        return sizeOfAvatar
    }

    return (
        // Navbar wrapper
        <nav className='h-[4rem] w-full flex justify-between items-center p-[2%] border-b shadow gap-2 tablet:h-[5rem] '>

            {/* Logo &&  Menu in desktop view  */}
            <div className='small-screen:flex small-screen:gap-5'>
                <Link to={'/'} className='h-full flex items-center border-r-2 pr-2 border-neutral-400'>
                    <h2
                        className='hidden small-screen:block small-screen:font-bold small-screen:text-xl small-screen:text-2xl'>RT-Movies</h2>
                    <FilmIcon className='h-9 w-9' />
                </Link>


                {screenSize.width > 1000 &&
                    <div className='flex gap-3 items-center'>
                        <Link
                            to={'movie/movieList'}
                            state={{ media: 'movie' }}
                        >
                            <p className='text-xl text-neutral-800 font-semibold hover-underline-animation left'>Movies</p>
                            
                        </Link>
                        <Link
                            to={'movie/movieList'}
                            state={{ media: 'tv' }}
                        >
                            <p className='text-xl font-semibold hover-underline-animation left'>Tv Shows</p>
                        </Link>
                    </div>
                }
            </div>

            {/* If mobile view, place search bar here */}
            {screenSize.width < 1000 && <NavigatorSearch />}

            <div className='small-screen:flex small-screen:gap-12 small-screen:items-center'>
                {/* If desktop view, place search bar here */}
                {screenSize.width > 1000 && <NavigatorSearch />}

                <div className='flex items-center'>
                    <Link to={'/account'}>
                        <Avatar size={handleCarouselBreakpoints()} />
                    </Link>

                    {/* Menu in mobile view */}
                    {screenSize.width < 1000 && <NavigatorMenu />}

                </div>
            </div>
        </nav>
    )
}
export default NavigatorBar

