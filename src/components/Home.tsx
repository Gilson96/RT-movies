import { Link } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.css'
import { Spinner, Tooltip, SkeletonText, Box } from '@chakra-ui/react'
import { useGetMovieByListQuery } from "../features/Movies/movieGenresEndpoints";
import heroImage from "../assets/hero-banner.jpg"
import useScreenSize from "../features/useScreenSize";

// Main funtion export
const Home = () => {
    const screenSize = useScreenSize()

    const handleCarouselBreakpoints = () => {
        let numberOfslides: number = 0;

        if (screenSize.width < 375) return numberOfslides = 1.5
        if (screenSize.width < 425) return numberOfslides = 1.7
        if (screenSize.width < 768) return numberOfslides = 2
        if (screenSize.width < 1024) return numberOfslides = 3.6
        if (screenSize.width < 1440) return numberOfslides = 6
        if (screenSize.width < 2560) return numberOfslides = 6

        return numberOfslides
    }

    return (
        <section className="h-full w-full">
            <HeroSection />
            <MoviesShowCaseSection
                list="popular"
                slidesPerView={handleCarouselBreakpoints()}
            />
            <div className="bg-gradient-to-r from-neutral-400 to-neutral-600 shadow-md">
                <MoviesShowCaseSection
                    list="upcoming"
                    slidesPerView={handleCarouselBreakpoints()}
                />
            </div>
            <div className="mb-[3rem]">
                <MoviesShowCaseSection
                    list="top_rated"
                    slidesPerView={handleCarouselBreakpoints()}
                />
            </div>
        </section>
    )
}

export default Home

// Home Hero Section
const HeroSection = () => {
    return (
        <section className="h-full w-full">
            {/* Background image */}
            <div
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
                url(${heroImage})`
                }}
                className={`h-[18rem] bg-center bg-no-repeat bg-cover w-full p-[3%] flex flex-col justify-center items-start border-b`}>
                <p className="text-4xl text-white font-bold tablet:text-[3rem]">Welcome.</p>
                <p className="text-2xl mb-[2%] text-white tablet:text-[2rem] tablet:py-[1%]">Millions of movies and Tv shows. </p>
            </div>
        </section>
    );
}

type MoviesShowCaseSectionProps = {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
}

// Movies carousel
export const MoviesShowCaseSection = ({ list, slidesPerView }: { list: string, slidesPerView: number }) => {
    const { data: movies, isLoading } = useGetMovieByListQuery({ list: list, type: 'movie' })

    return (

        <section className="h-full w-full p-[3%] mt-[8%] tablet:mt-0 small-screen:px-[3%] small-screen:py-[1%]">
            {!movies ?
                <div>
                    <Box
                        padding='2'
                        boxShadow='lg'
                        bg='white'
                        height={'16rem'}
                        width={'11rem'}
                        border={'1px solid #d4d4d4'}
                        rounded={'base'}
                    >
                        <SkeletonText mt='20' noOfLines={4} spacing='4' skeletonHeight='2' />
                    </Box>
                </div>
                :
                <>
                    <div className="mt-[2%] mb-[5%] flex justify-between items-center tablet:my-[2%]">
                        <h3 className="text-xl font-bold capitalize tablet:text-2xl">{list.replace('_', ' ')}</h3>
                    </div>

                    {/* Carousel of movies  */}
                    <Swiper
                        direction="horizontal"
                        grabCursor={true}
                        className="h-auto w-full"
                        slidesPerView={slidesPerView}
                    >
                        {isLoading ?
                            <div className="h-full w-full flex justify-center items-center">
                                <Spinner />
                            </div>
                            :
                            movies.results.map((movie: MoviesShowCaseSectionProps, index) => (
                                <SwiperSlide key={index}>
                                    <Link
                                        to={`/movie/${movie.id}`}
                                        state={{ media: 'movie' }}
                                    >
                                        <div className={`h-full w-full flex flex-col`}>
                                            <Tooltip className="relative " label={movie.title}>
                                                <img
                                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                                    alt="poster"
                                                    className="h-[16rem] w-[11rem] rounded border shadow-lg"
                                                />
                                            </Tooltip>
                                            <div className="flex w-[11rem] gap-1 p-[2%]">
                                                <p className="w-full text-sm font-bold truncate">{movie.title}</p>
                                                <p className="text-sm">{movie.release_date.slice(0, 4)}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </>
            }
        </section>
    );
}

