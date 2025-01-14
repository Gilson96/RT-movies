import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { useGetMovieByListConfigQuery } from '../../features/Movies/movieGenresEndpoints';
import MovieListConfig, { NewFilterValuesProps } from './MovieListConfig';
import { Spinner } from '@chakra-ui/react';
import useScreenSize from '../../features/useScreenSize';

type LinkStateProps = {
    state: { media: string }
}

type MovieListProps = {
    id: number
    title: string;
    name: string;
    poster_path: string;
    release_date: string;
    first_air_date: string;
    overview: string;
}

const MovieList = () => {
    const { state }: LinkStateProps = useLocation();
    const screenSize = useScreenSize()
    const [page, setPage] = useState<number>(1)
    const [filters, setFilters] = useState<NewFilterValuesProps>({
        sort_by: 'popularity.desc',
        genres: '18',
    })
    const { data: movieList, isLoading, isFetching } = useGetMovieByListConfigQuery({
        type: state.media,
        page: String(page),
        sort_by: filters.sort_by,
        genres: filters.genres,
    })

    console.log(movieList)

    if (!movieList) return <p>missing</p>
    if (isLoading) return <p>missing</p>

    return (
        <section className='h-full w-full p-[3%] flex flex-col mt-[4%] bg-white'>

            <div className='small-screen:w-full small-screen:flex'>
                <h1 className='text-2xl font-semibold mb-[5%] capitalize small-screen:ml-[2%]'>{state.media + 's'}</h1>

                {screenSize.width > 1000 &&
                    <div className='w-full justify-items-center mr-[10%]'>
                        <button
                            className='h-[2.6rem] w-[15%] flex justify-center items-center p-[1%] border rounded-xl shadow-md font-bold'
                            onClick={() => { setPage(prev => prev + 1) }}
                        >
                            Load More
                        </button>
                    </div>
                }
                {screenSize.width > 1000 && <MovieListConfig
                    type={state.media}
                    setFilters={setFilters}
                />}
            </div>


            {screenSize.width < 1000 &&
                <MovieListConfig
                    type={state.media}
                    setFilters={setFilters}
                />
            }

            {isLoading ?
                <Spinner />
                :
                <div className='small-screen:w-full small-screen:flex small-screen:flex-wrap small-screen:gap-6 small-screen:justify-center'>
                    {isFetching ?
                        <div className='h-full w-full flex justify-center items-center'>
                            <Spinner />
                        </div>
                        :
                        movieList.results.filter((movie: MovieListProps) => movie.poster_path !== null).map((movie: MovieListProps, index) => (
                            <Link
                                to={`/movie/${movie.id}`}
                                state={{ 
                                    media: movie.title ? 'movie' : 'tv', 
                                    poster_path: movie.poster_path
                                }}
                            >
                                <div key={index} className='h-[8rem] w-full flex my-[5%] justify-between border rounded shadow tablet:h-[19rem] small-screen:border-none small-screen:h-[20rem] small-screen:w-[14rem] small-screen:flex small-screen:flex-col small-screen:rounded-xl small-screen:my-[8%]'>
                                    <img className='h-full small-screen:w-full small-screen:rounded-xl' src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`} />

                                    {screenSize.width > 1000 ?
                                        <div className='flex justify-between items-center px-[2%]'>
                                            <p className='font-bold text-sm'>{movie.title || movie.name}</p>
                                            <p className=' text-neutral-400 italic font-semibold'> {movie.title ? movie.release_date.slice(0, 4) : movie.first_air_date.slice(0, 4)}</p>
                                        </div>
                                        :
                                        <div className='h-full w-full flex flex-col justify-center items-start p-[4%]'>
                                            <p className='font-bold text-sm tablet:text-xl'>{movie.title || movie.name}</p>
                                            <p className='text-xs text-neutral-400 italic font-semibold mb-[7%] tablet:text-lg'>Year {movie.title ? movie.release_date.slice(0, 4) : movie.first_air_date.slice(0, 4)}</p>
                                            <p className='line-clamp-2 text-sm tablet:text-lg tablet:line-clamp-4'>{movie.overview}</p>
                                        </div>
                                    }
                                </div>
                            </Link>
                        ))
                    }
                </div>
            }

            {screenSize.width < 1000 &&
                <button
                    className='h-full w-full p-[3%] border rounded-xl mb-[2%] shadow-md font-bold text-lg small-screen:w-[30%] small-screen:mb-0 small-screen:mt-[3%] small-screen:p-[2%] '
                    onClick={() => { setPage(prev => prev + 1) }}
                >
                    Load More
                </button>
            }
        </section>
    )
}

export default MovieList

