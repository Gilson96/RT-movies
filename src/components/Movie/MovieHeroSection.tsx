import { Spinner } from '@chakra-ui/react'
import { useGetMovieDetailsQuery } from '../../features/Movies/movieDetailsEndpoints'
import { useLocation, useParams } from 'react-router'
import useScreenSize from '../../features/useScreenSize'
import MovieHeroSectionDesktop from './UI/MovieHeroSectionDesktop'
import MovieHeroSectionMobile from './UI/MovieHeroSectionMobile'

type MovieHeroSectionProps = {
    id: string,
    name: string,
}

type LinkStateProps = {
    state: { media: string, poster_path: string }
}

const MovieHeroSection = () => {
    // Getting id from url
    const { id } = useParams<MovieHeroSectionProps>();
    // Getting state from Link
    // Decides if is a movie or a tv show
    const { state }: LinkStateProps = useLocation();
    // parseInt(id!) < ! > => makes variable non-nullable
    // Fix string | undefined error
    const { data: movie, isLoading } = useGetMovieDetailsQuery({ id: parseInt(id!), type: state.media })
    // Screen Size hook
    const screenSize = useScreenSize()

    console.log(id)

    if (!movie) return <p></p>

    return (
        <>
            {isLoading ?
                <div className='h-[20rem] w-full flex flex-col justify-center items-center bg-neutral-800 text-sm'>
                    <Spinner size={'xl'} color='white' />
                </div>
                :
                screenSize.width > 800 ?
                    <MovieHeroSectionDesktop
                        movieDetails={movie}
                        movieId={id!}
                        poster_path={state.poster_path}
                    />
                    :
                    <MovieHeroSectionMobile
                        movieDetails={movie}
                        movieId={id!}
                        poster_path={state.poster_path}
                    />
            }
        </>
    );
}

export default MovieHeroSection



