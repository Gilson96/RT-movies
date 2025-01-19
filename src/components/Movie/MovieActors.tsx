import { Spinner, SkeletonText, Box } from '@chakra-ui/react'
import { useGetMovieActorsQuery } from '../../features/Movies/movieDetailsEndpoints'
import { useLocation, useParams } from 'react-router'
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.css'
import useScreenSize from "../../features/useScreenSize";

type MovieActorsProps = {
    id: string,
    name: string;
    character: string;
    profile_path: string;
}

type LinkStateProps = {
    state: { media: string }
}

const MovieActors = () => {
    // Getting id from url
    const { id } = useParams<MovieActorsProps>();
    // Getting state from Link
    const location: LinkStateProps = useLocation();

    // parseInt(id!) < ! > => makes variable non-nullable
    // Fix string | undefined error
    const { data: actors, isLoading } = useGetMovieActorsQuery({ id: parseInt(id!), type: location.state.media })
    const screenSize = useScreenSize()

    // handle how many slides to show
    // based on the breakpoints
    const handleCarouselBreakpoints = () => {
        let numberOfslides: number = 0;

        if (screenSize.width < 375) return numberOfslides = 1.8
        if (screenSize.width < 425) return numberOfslides = 2.1
        if (screenSize.width < 768) return numberOfslides = 2.5
        if (screenSize.width < 1024) return numberOfslides = 4.6
        if (screenSize.width < 1440) return numberOfslides = 6.1
        if (screenSize.width < 2560) return numberOfslides = 6

        return numberOfslides
    }

    // handle background image
    const handleImageSize = () => {
        // image size
        let imageSize: string = 'w780';
        if (screenSize.width < 768) return imageSize = 'w500'

        return imageSize
    }

    return (
        <section className='h-full w-full p-[3%] flex flex-col mt-[4%] bg-white small-screen:mt-0'>
            <p className='my-[2%] font-bold text-lg tablet:text-2xl'>Top Billed Cast</p>

            {!actors ?
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
                :
                <>
                    {/* Carousel of actors  */}
                    < Swiper
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
                            actors.cast.length <= 0 ?
                                <p className='small-screen:text-xl'>Not Available</p>
                                :
                                actors.cast.map((actor: MovieActorsProps, index) => (
                                    <SwiperSlide key={index}>
                                        <div className='h-[17rem] w-[9rem] flex flex-col justify-between border rounded shadow-md tablet:h-[19rem] small-screen:min-h-[18rem] small-screen:h-full small-screen:w-[11rem]'>
                                            <img className='h-[65%] w-full ' src={`https://image.tmdb.org/t/p/${handleImageSize()}/${actor.profile_path}`} />
                                            <div className='h-full w-full flex flex-col px-[3%] border-t'>
                                                <p className='w-full flex flex-wrap font-bold'>{actor.name}</p>
                                                <p className='w-full flex flex-wrap italic text-sm'>'{actor.character}'</p>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))
                        }
                    </Swiper>
                </>
            }
        </section >
    );
}

export default MovieActors