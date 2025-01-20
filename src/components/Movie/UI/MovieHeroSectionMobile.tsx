import { BookmarkIcon, HeartIcon } from '@heroicons/react/24/solid'
import { BookmarkIcon as BookmarkIconOutline, HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline'
// import Movieinfo from '../Movieinfo'
import { usePostToFavouriteMoviesMutation } from '../../../features/Account/accountEndpoints'
import { usePostToWatchlistMoviesMutation } from '../../../features/Account/accountEndpoints'
import { Movie } from '../../../features/Movies/movieDetailsEndpoints'
import { useGetAccountDetailsQuery } from '../../../features/Account/accountEndpoints'
import { Spinner, Tooltip, Alert, AlertIcon } from '@chakra-ui/react'
import { useState } from 'react'

type HeroSectionMProps = {
    movieDetails: Movie;
    movieId: string;
    poster_path: string;
}

const MovieHeroSectionMobile = ({ movieDetails, movieId, poster_path }: HeroSectionMProps) => {
    const { data: account, isLoading } = useGetAccountDetailsQuery([])
    const [postMovieToWatchlist] = usePostToWatchlistMoviesMutation()
    const [postMovieToFavourite] = usePostToFavouriteMoviesMutation()
    const [feedback, setFeedback] = useState('')

    // object to add the movie into my API
    const newMovieDetails = { id: Math.floor(Math.random() * 101), movieDetails }

    if (isLoading) return <div className='w-full h-screen flex justify-center items-center'><Spinner /></div>
    if (!account) return <div className='w-full h-screen flex justify-center items-center'><Spinner /></div>

    // checks if movie exist in account
    const checkIfMovieExistInFavourites = () => {
        return account[0].favouriteMovies.some((movie: HeroSectionMProps) => (movie.movieDetails.id === parseInt(movieId)))
    }
    // checks if movie exist in account
    const checkIfMovieExistInWatchlist = () => {
        return account[0].watchlistMovies.some((movie: HeroSectionMProps) => (movie.movieDetails.id === parseInt(movieId)))
    }

    const convertMinsToHrsMins = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60

        return `${hours}h ${mins}m `
    }

    return (
        <section className='h-full w-full flex flex-col justify-center items-center bg-neutral-800 text-sm'>
            {/* Feedback */}
            {feedback === 'favourite' && <Alert status='success'><AlertIcon />Data uploaded to your account. Refresh!</Alert>}
            {feedback === 'watchlist' && <Alert status='success'><AlertIcon />Data uploaded to your account. Refresh!</Alert>}

            {/* hero image */}
            <div
                style={{
                    backgroundImage: ` url('https://image.tmdb.org/t/p/w500/${movieDetails.backdrop_path}')`,
                }}
                className={`h-[20rem] w-full flex justify-center items-center bg-center bg-no-repeat bg-cover medium-phone:h-[22rem] large-phone:h-[25rem] tablet:h-[35rem]`}>
                {movieDetails.poster_path === null ?
                    <div
                        style={{
                            backgroundImage: `url('https://image.tmdb.org/t/p/w500/${poster_path}')`,
                        }}
                        className={`h-[80%] w-[50%] rounded-xl bg-white bg-center bg-no-repeat bg-cover relative top-[3rem] large-phone:top-[4rem] tablet:h-[35rem] tablet:top-[3rem]`}>
                    </div>
                    :
                    <div
                        style={{
                            backgroundImage: `url('https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}')`,
                        }}
                        className={`h-[80%] w-[50%] rounded-xl bg-white bg-center bg-no-repeat bg-cover relative top-[3rem] large-phone:top-[4rem] tablet:h-[35rem] tablet:top-[3rem]`}>
                    </div>
                }

            </div>

            {/* movieDetails title */}
            <p className='flex gap-2 text-white text-2xl font-semibold my-[10%] large-phone:text-3xl tablet:text-5xl tablet:mb-[6%]'>
                <span>{movieDetails.title || movieDetails.name}</span>
                {movieDetails.title ?
                    <span>({movieDetails.release_date.length <= 0 ? 'N/A' : movieDetails.release_date.slice(0, 4)})</span>
                    :
                    <span>({movieDetails.first_air_date.length <= 0 ? 'N/A' : movieDetails.first_air_date.slice(0, 4)})</span>
                }
            </p>

            {/* movieDetails details  */}
            <div className='h-auto w-full p-[3%] flex flex-wrap justify-center items-center bg-neutral-900 text-white gap-2'>
                <p className='tablet:text-lg'>
                    {movieDetails.runtime <= 0 ?
                        'N/A'
                        :
                        movieDetails.runtime ?
                            convertMinsToHrsMins(movieDetails.runtime)
                            :
                            movieDetails.number_of_seasons + ' seasons'
                    }
                </p>

                <span className='tablet:text-lg'>&#183;</span>
                {movieDetails.genres.length <= 0 ? 'N/A' :
                    movieDetails.genres.map((genre: { name: string }) => genre.name).join(',')}
            </div>

            <div className='h-full w-full flex justify-start items-start gap-2 mt-[2%] p-[2%]'>
                {/* add movie to favourite */}
                <span
                    className={`h-10 w-10 flex justify-center items-center p-[1%] bg-white rounded-full small-screen:h-8 small-screen:w-8  ${!checkIfMovieExistInFavourites() ? 'cursor-pointer' : ''}`}
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
                    className={`h-10 w-10 flex justify-center items-center p-[1%] bg-white rounded-full small-screen:h-8 small-screen:w-8 ${!checkIfMovieExistInWatchlist() ? 'cursor-pointer' : ''}`}
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

            {/* movie overview */}
            <div className='h-auto w-full p-[3%] flex flex-col justify-start items-start text-white gap-2 mb-[5%]'>
                <p className={`${!movieDetails.tagline ? 'hidden' : 'my-[2%] text-neutral-400 text-lg italic tablet:text-2xl'}`}>{movieDetails?.tagline}</p>
                <p className='my-[2%] text-white text-lg font-semibold tablet:text-2xl'>Overview</p>
                <p className='text-justify tablet:text-lg'>
                    {movieDetails.overview.length <= 0 ? 'Not Available' : movieDetails.overview}
                </p>
            </div>
        </section >
    );
}

export default MovieHeroSectionMobile