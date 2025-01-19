import { Avatar, Divider, Spinner } from '@chakra-ui/react'
import heroImage from '../assets/hero-banner.jpg'
import useScreenSize from '../features/useScreenSize'
import { useGetAccountDetailsQuery } from '../features/Account/accountEndpoints'
import { useState } from 'react'
import { Link } from 'react-router'
import Toggle from './UI/Toggle'

type AccountProps = {
    movieDetails: {
        id: number;
        title: string;
        release_date: string;
        poster_path: string;
        name: string;
        runtime: number
    }
}

const Account = () => {
    const [isActive, setIsActive] = useState('favourite')
    const screenSize = useScreenSize()
    const { data: account, isLoading } = useGetAccountDetailsQuery([])

    const handleAvatarSize = () => {
        let sizeOfAvatar: string = 'lg';
        if (screenSize.width > 700) return sizeOfAvatar = '2xl'
        return sizeOfAvatar
    }

    if (!account) return <div className='w-full h-screen flex justify-center items-center'><Spinner /></div>
    if (isLoading) return <p></p>

    console.log(account)
    return (
        <section>
            <div
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${heroImage})`
                }}
                className='h-[18rem] bg-center bg-no-repeat bg-cover w-full p-[3%] flex justify-start items-center border-b gap-5'
            >
                <Avatar size={handleAvatarSize()} />
                <p className='text-white text-4xl font-bold'>Hi, Account!</p>
            </div>

            <div className='w-full my-[2%]'>
                <Toggle isActive={isActive} setIsActive={setIsActive} />
            </div>

            <Divider />
            <div>
                {isActive === 'watchlist' &&
                    <div className='flex flex-wrap gap-4 p-[2%] large-phone:gap-3 small-screen:flex'>
                        {account[0].watchlistMovies.map((movie: AccountProps) => (
                            <Link
                                to={`/movie/${movie.movieDetails.id}`}
                                state={{ media: movie.movieDetails.title ? 'movie' : 'tv' }}
                            >
                                <div className={`h-full w-full flex flex-col`}>
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.movieDetails.poster_path}`}
                                        alt="poster"
                                        className="h-[12rem] w-[8rem] rounded border shadow-lg small-screen:h-[20rem] small-screen:w-[13rem]"
                                    />
                                    <div className="flex gap-1 p-[2%] w-full">
                                        <p className="font-semibold text-xs small-screen:text-sm">{movie.movieDetails.title || movie.movieDetails.name}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                }
            </div>
            <div>
                {isActive === 'favourite' &&
                    <div className='flex flex-wrap gap-4 p-[2%] large-phone:gap-3 small-screen:flex'>
                        {account[0].favouriteMovies.map((movie: AccountProps) => (
                            <Link
                                to={`/movie/${movie.movieDetails.id}`}
                                state={{ media: movie.movieDetails.title ? 'movie' : 'tv' }}
                            >
                                <div className={`h-full w-full flex flex-col`}>
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.movieDetails.poster_path}`}
                                        alt="poster"
                                        className="h-[12rem] w-[8rem] rounded border shadow-lg small-screen:h-[20rem] small-screen:w-[13rem]"
                                    />
                                    <div className="flex gap-1 p-[2%] w-full">
                                        <p className="font-semibold text-xs w-[80%] small-screen:text-sm">{movie.movieDetails.title || movie.movieDetails.name}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                }
            </div>
        </section>
    )
}

export default Account