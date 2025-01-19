import { BookmarkIcon, HeartIcon } from '@heroicons/react/24/solid'
import { BookmarkIcon as BookmarkIconOutline, HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline'
import Movieinfo from '../Movieinfo'
import { usePostToFavouriteMoviesMutation } from '../../../features/Account/accountEndpoints'
import { usePostToWatchlistMoviesMutation } from '../../../features/Account/accountEndpoints'
import { Movie } from '../../../features/Movies/movieDetailsEndpoints'
import { useGetAccountDetailsQuery } from '../../../features/Account/accountEndpoints'
import { Spinner, Tooltip, Alert, AlertIcon } from '@chakra-ui/react'
import { useState } from 'react'

type HeroSectionDProps = {
    movieDetails: Movie;
    movieId: string;
    poster_path: string;
}

const MovieHeroSectionDesktop = ({ movieDetails, movieId, poster_path }: HeroSectionDProps) => {
    const { data: account, isLoading } = useGetAccountDetailsQuery([])
    const [postMovieToWatchlist] = usePostToWatchlistMoviesMutation()
    const [postMovieToFavourite] = usePostToFavouriteMoviesMutation()
    const [feedback, setFeedback] = useState('')
    // object to add the movie into my API
    const newMovieDetails = { id: Math.floor(Math.random() * 101), movieDetails }

    if (!account) return <div className='w-full h-screen flex justify-center items-center'><Spinner /></div>
    if (isLoading) return <div className='w-full h-screen flex justify-center items-center'><Spinner /></div>
    
    // checks if movie exist in account
    const checkIfMovieExistInFavourites = () => {
        return account[0].favouriteMovies.some((movie: HeroSectionDProps) => (movie.movieDetails.id === parseInt(movieId)))
    }

    // checks if movie exist in account
    const checkIfMovieExistInWatchlist = () => {
        return account[0].watchlistMovies.some((movie: HeroSectionDProps) => (movie.movieDetails.id === parseInt(movieId)))
    }

    return (
        <section className='h-full w-full'>

            {/* Feedback */}
            {feedback === 'favourite' && <Alert status='success'><AlertIcon />Data uploaded to the server. Fire on!</Alert>}
            {feedback === 'watchlist' && <Alert status='success'><AlertIcon />Data uploaded to the server. Fire on!</Alert>}

            {/* hero image */}
            <div
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
                url('https://image.tmdb.org/t/p/w1280/${movieDetails.backdrop_path}')`
                }}
                className={`h-full bg-center bg-no-repeat bg-cover w-full p-[3%] flex justify-start items-start gap-5`}>
                {movieDetails.poster_path === null ?
                    <img
                        src={`https://image.tmdb.org/t/p/w1280/${poster_path}`} alt='poster'
                        className='h-[30em] w-[20rem] '
                    />
                    :
                    <img
                        src={`https://image.tmdb.org/t/p/w1280/${movieDetails.poster_path}`} alt='poster'
                        className='h-[30em] w-[20rem] '
                    />
                }
                {/* Details */}
                <div className='flex flex-col'>
                    <div className='flex gap-2'>
                        {/* movie title */}
                        <p className='text-white text-3xl font-bold'>{movieDetails.title || movieDetails.name}</p>
                        {/* movie date */}
                        <p className='text-white text-3xl font-light'>
                            {movieDetails.title ?
                                <p>({movieDetails.release_date.length <= 0 ? 'N/A' : movieDetails.release_date.slice(0, 4)})</p>
                                :
                                <p>({movieDetails.first_air_date.length <= 0 ? 'N/A' : movieDetails.first_air_date.slice(0, 4)})</p>
                            }
                        </p>
                    </div>

                    <div className='flex items-center gap-2'>
                        {/* movie date */}
                        <p className='text-white text-base'>
                            {movieDetails.title ?
                                <p>{movieDetails.release_date.length <= 0 ? 'N/A' : movieDetails.release_date + ' (GB)'}</p>
                                :
                                <p>{movieDetails.first_air_date.length <= 0 ? 'N/A' : movieDetails.first_air_date + ' (GB)'}</p>
                            }

                        </p>
                        <span className='text-white text-2xl font-bold'>&#183;</span>
                        {/* movie genres */}
                        <div className='flex text-white text-base'>
                            {movieDetails.genres.length <= 0 ? 'N/A' :
                                movieDetails.genres.map((genre: { name: string }) => genre.name).join(',')}
                        </div>
                        {/* movie runtime or tv seasons */}
                        <span className='text-white text-2xl font-bold'>&#183;</span>
                        <p className='text-white text-base'>
                            {movieDetails.runtime <= 0 ?
                                'N/A'
                                :
                                movieDetails.runtime ?
                                    movieDetails.runtime + 'min'
                                    :
                                    movieDetails.number_of_seasons + ' seasons'
                            }
                        </p>
                    </div>

                    <div className='flex gap-2 mt-[2%]'>
                        {/* add movie to favourite */}
                        <span
                            className={`h-8 w-8 flex justify-center items-center p-[1%] bg-white rounded-full ${!checkIfMovieExistInFavourites() ? 'cursor-pointer' : ''}`}
                            onClick={() => !checkIfMovieExistInFavourites() &&
                                (
                                    void postMovieToFavourite({ id: 1, body: newMovieDetails }),
                                    setFeedback('favourite')
                                )
                            }
                        >
                            {!checkIfMovieExistInFavourites() ?
                                <Tooltip label='add to favourite'>
                                    <HeartIconOutline className='h-5 w-5 text-black' />
                                </Tooltip>
                                :
                                <Tooltip label='favourited'>
                                    <HeartIcon className='h-5 w-5 text-black' />
                                </Tooltip>
                            }
                        </span>
                        {/* add movie to watchlist */}
                        <span
                            className={`h-8 w-8 flex justify-center items-center p-[1%] bg-white rounded-full ${!checkIfMovieExistInWatchlist() ? 'cursor-pointer' : ''}`}
                            onClick={() => !checkIfMovieExistInWatchlist() &&
                                (
                                    void postMovieToWatchlist({ id: 1, body: newMovieDetails }),
                                    setFeedback('watchlist')
                                )
                            }
                        >
                            {!checkIfMovieExistInWatchlist() ?
                                <Tooltip label='add to watchlist'>
                                    <BookmarkIconOutline className='h-4 w-4 text-black' />
                                </Tooltip>
                                :
                                <Tooltip label='watchlisted'>
                                    <BookmarkIcon className='h-4 w-4 text-black' />
                                </Tooltip>
                            }
                        </span>
                    </div>

                    <div className='flex flex-col gap-2 mt-[2%]'>
                        {/* movie tagline */}
                        <p className='text-neutral-400 font-semibold text-xl italic'>{movieDetails.tagline}</p>
                        {/* movie overview */}
                        <p className='text-white text-2xl font-bold'>Overview</p>
                        <p className='text-white text-lg'>{movieDetails.overview.length <= 0 ? 'Not Available' : movieDetails.overview}</p>
                    </div>
                    {/* movie information */}
                    <div className='w-full flex flex-col justify-end gap-2 mt-[2%]'>
                        <Movieinfo />
                    </div>
                </div>
            </div>
        </section >
    );
}

export default MovieHeroSectionDesktop