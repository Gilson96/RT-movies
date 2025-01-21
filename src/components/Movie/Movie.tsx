import { Divider } from '@chakra-ui/react'
import MovieActors from './MovieActors'
import MovieRecommendations from './MovieRecommendations'
import MovieHeroSection from './MovieHeroSection'
import useScreenSize from '../../features/useScreenSize'
import MovieInfo from './Movieinfo'

const Movie = () => {
    const screenSize = useScreenSize()
    return (
        <section className='h-full w-full'>
            <MovieHeroSection />
            {screenSize.width < 1000 &&
                <>
                    <Divider />
                    <MovieInfo />
                </>
            }
            {screenSize.width < 1000 && <Divider />}
            <MovieActors />
            <Divider />
            <MovieRecommendations />
        </section>
    )
}

export default Movie




