import useScreenSize from "../../features/useScreenSize";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.css'
import { useGetMovieRecommendationsQuery } from "../../features/Movies/movieDetailsEndpoints";
import { useParams, Link, useLocation } from "react-router";
import { Spinner } from "@chakra-ui/react";

type MovieRecommendationsProps = {
    id: string,
    title: string;
    release_date: string;
    first_air_date: string;
    poster_path: string;
}

type LinkStateProps = {
    state: { media: string }
}

const MovieRecommendations = () => {
    // Getting id from url
    const { id } = useParams<MovieRecommendationsProps>();
    const { state }: LinkStateProps = useLocation();

    // parseInt(id!) < ! > => makes variable non-nullable
    // Fix string | undefined error
    const { data: recommendations, isLoading } = useGetMovieRecommendationsQuery({ id: parseInt(id!), type: state.media })
    const screenSize = useScreenSize()

    if (!recommendations) return <div>Missing post!</div>

    const handleCarouselBreakpoints = () => {
        let numberOfslides: number = 0;

        if (screenSize.width < 375) return numberOfslides = 1.5
        if (screenSize.width < 425) return numberOfslides = 1.7
        if (screenSize.width < 768) return numberOfslides = 2
        if (screenSize.width < 1024) return numberOfslides = 3.6
        if (screenSize.width < 1440) return numberOfslides = 5.8
        if (screenSize.width < 2560) return numberOfslides = 6

        return numberOfslides
    }

    return (
        <section className='h-full w-full p-[3%] flex flex-col bg-white'>
            <p className='mb-[2%] font-bold text-lg tablet:text-xl small-screen:text-2xl'>Recommendations</p>

            <Swiper
                direction="horizontal"
                grabCursor={true}
                className="h-auto w-full"
                slidesPerView={handleCarouselBreakpoints()}
            >
                {isLoading ?
                    <div className="h-full w-full flex justify-center items-center">
                        <Spinner />
                    </div>
                    :
                    recommendations.results.length <= 0 ?
                        <p className="small-screen:text-xl">Not Available</p>
                        :
                        recommendations.results.filter((movie: MovieRecommendationsProps) => movie.poster_path !== null).map((movie: MovieRecommendationsProps, index: number) => (
                            <SwiperSlide key={index}>
                                <Link
                                    to={`/movie/${movie.id}`}
                                    state={{ media: movie.title ? 'movie' : 'tv' }}
                                >
                                    <div className={`h-full w-full flex flex-col`}>
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                            alt="poster"
                                            className="h-[16rem] w-[11rem] rounded border shadow-lg small-screen:h-[20rem] small-screen:w-[13rem]"
                                        />
                                        <div className="flex gap-1 p-[2%] w-[70%]">
                                            <p className="font-bold truncate">{movie.title}</p>
                                            <span>&#183;</span>
                                            <p>{movie.title ? movie.release_date.slice(0, 4) : movie.first_air_date.slice(0, 4)}</p>
                                        </div>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))
                }
            </Swiper>
        </section>
    );
}

export default MovieRecommendations