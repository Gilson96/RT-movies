import { Avatar, Divider, Spinner, Tooltip, Alert, AlertIcon } from '@chakra-ui/react'
import heroImage from '../assets/hero-banner.jpg'
import useScreenSize from '../features/useScreenSize'
import { useGetAccountDetailsQuery, useRemoveFavouriteMoviesMutation } from '../features/Account/accountEndpoints'
import { useState } from 'react'
import { Link } from 'react-router'
import Toggle from './UI/Toggle'
import { PlusCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'

type AccountProps = {
    id: number;
    movieDetails: {
        id: number;
        title: string;
        release_date: string;
        poster_path: string;
        name: string;
        runtime: number;
        first_air_date: string;
        overview: string;
    }
}

const Account = () => {
    const [isActive, setIsActive] = useState('favourite')
    const screenSize = useScreenSize()
    const { data: account, isLoading } = useGetAccountDetailsQuery([])
    const [removeMovieFromFavourites] = useRemoveFavouriteMoviesMutation()
    const [feedback, setFeedback] = useState(false)
    const handleAvatarSize = () => {
        let sizeOfAvatar: string = 'lg';
        if (screenSize.width > 700) return sizeOfAvatar = '2xl'
        return sizeOfAvatar
    }

    if (!account) return <div className='w-full h-screen flex justify-center items-center'><Spinner /></div>
    if (isLoading) return <p></p>

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

            {feedback && <Alert status='success'><AlertIcon />Data was removed. Refresh!</Alert>}

            <Divider />
            <div>
                {isActive === 'watchlist' &&
                    <div className='flex flex-col gap-2 p-[2%]'>
                        {account[0].watchlistMovies.map((movie: AccountProps, index) => (
                            <div key={index} className='h-[8rem] w-full flex justify-between border rounded shadow tablet:h-[10rem] small-screen:h-[15rem]'>
                                {/* image poster */}
                                <img
                                    className={`h-full ${movie.movieDetails.poster_path === null && 'bg-neutral-600'}`}
                                    src={movie.movieDetails.poster_path !== null ? `https://image.tmdb.org/t/p/w780/${movie.movieDetails.poster_path}` : ''}
                                />

                                <div className='h-full w-full flex flex-col justify-between p-[2%]'>

                                    {/* movie title & year */}
                                    <div>
                                        <p className='text-xs font-bold small-screen:text-base'>{movie.movieDetails.title || movie.movieDetails.name}</p>
                                        <p className='text-xs text-neutral-500 font-semibold italic small-screen:text-base'>Year {movie.movieDetails.title ?
                                            movie.movieDetails.release_date === "" ? 'N/A' : movie.movieDetails.release_date.slice(0, 4)
                                            :
                                            movie.movieDetails.first_air_date === "" ? 'N/A' : movie.movieDetails.first_air_date.slice(0, 4)
                                        }
                                        </p>
                                    </div>

                                    <p className='text-xs line-clamp-2 tablet:line-clamp-4 small-screen:text-base'>{movie.movieDetails.overview}</p>

                                    <Divider />
                                    <div className='h-[1rem] flex items-end gap-2'>

                                        <Tooltip label='More details'>
                                            <Link
                                                to={`/movie/${movie.movieDetails.id}`}
                                                state={{ media: movie.movieDetails.title ? 'movie' : 'tv' }}
                                                className='flex items-center'
                                            >
                                                <PlusCircleIcon className='h-4 w-4 text-neutral-400 small-screen:h-7 small-screen:w-7' />
                                                <p className='text-xs font-semibold small-screen:text-base'>More details</p>
                                            </Link>
                                        </Tooltip>

                                        <Tooltip label='Remove'>
                                            <button
                                                className='flex items-center'
                                                onClick={() => (
                                                    void removeMovieFromFavourites({ id: 1, movieId: movie.id }),
                                                    setFeedback(true)
                                                )}
                                            >
                                                <XCircleIcon className='h-4 w-4 text-red-500 small-screen:h-7 small-screen:w-7' />
                                                <p className='text-xs font-semibold small-screen:text-base'>Remove</p>
                                            </button>
                                        </Tooltip>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                }
            </div>


            <div>
                {isActive === 'favourite' &&
                    <div className='flex flex-col gap-2 p-[2%]'>
                        {account[0].favouriteMovies.map((movie: AccountProps, index) => (
                            <div key={index} className='h-[8rem] w-full flex justify-between border rounded shadow tablet:h-[10rem] small-screen:h-[15rem]'>
                                {/* image poster */}
                                <img
                                    className={`h-full ${movie.movieDetails.poster_path === null && 'bg-neutral-600'}`}
                                    src={movie.movieDetails.poster_path !== null ? `https://image.tmdb.org/t/p/w780/${movie.movieDetails.poster_path}` : ''}
                                />

                                <div className='h-full w-full flex flex-col justify-between p-[2%]'>

                                    {/* movie title & year */}
                                    <div>
                                        <p className='text-xs font-bold small-screen:text-base'>{movie.movieDetails.title || movie.movieDetails.name}</p>
                                        <p className='text-xs text-neutral-500 font-semibold italic small-screen:text-base'>Year {movie.movieDetails.title ?
                                            movie.movieDetails.release_date === "" ? 'N/A' : movie.movieDetails.release_date.slice(0, 4)
                                            :
                                            movie.movieDetails.first_air_date === "" ? 'N/A' : movie.movieDetails.first_air_date.slice(0, 4)
                                        }
                                        </p>
                                    </div>

                                    <p className='text-xs line-clamp-2 tablet:line-clamp-4 small-screen:text-base'>{movie.movieDetails.overview}</p>

                                    <Divider />
                                    <div className='h-[1rem] flex items-end gap-2'>

                                        <Tooltip label='More details'>
                                            <Link
                                                to={`/movie/${movie.movieDetails.id}`}
                                                state={{ media: movie.movieDetails.title ? 'movie' : 'tv' }}
                                                className='flex items-center'
                                            >
                                                <PlusCircleIcon className='h-4 w-4 text-neutral-400 small-screen:h-7 small-screen:w-7' />
                                                <p className='text-xs font-semibold small-screen:text-base'>More details</p>
                                            </Link>
                                        </Tooltip>

                                        <Tooltip label='Remove'>
                                            <button
                                                className='flex items-center'
                                                onClick={() => (
                                                    void removeMovieFromFavourites({ id: 1, movieId: movie.id }),
                                                    setFeedback(true)
                                                )}
                                            >
                                                <XCircleIcon className='h-4 w-4 text-red-500 small-screen:h-7 small-screen:w-7' />
                                                <p className='text-xs font-semibold small-screen:text-base'>Remove</p>
                                            </button>
                                        </Tooltip>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                }
            </div>
        </section>
    )
}

export default Account
