import { useParams, useLocation } from "react-router";
import { useGetMovieDetailsQuery } from "../../features/Movies/movieDetailsEndpoints";
import { Spinner } from "@chakra-ui/react";
import { CurrencyPoundIcon } from "@heroicons/react/24/outline";

type MovieInfosProps = {
    id: string,
    english_name: string;
}

type LinkStateProps = {
    state: { media: string }
}

const Movieinfo = () => {
    // Getting id from url
    const { id } = useParams<MovieInfosProps>();
    // Getting state from Link
    const location: LinkStateProps = useLocation();

    // parseInt(id!) < ! > => makes variable non-nullable
    // Fix string | undefined error
    const { data: movie, isLoading } = useGetMovieDetailsQuery({ id: parseInt(id!), type: location.state.media })

    if (!movie) return <div className='w-full h-screen flex justify-center items-center'><Spinner /></div>

    const movieBudgetOrTvStreamer = () => {
        if(movie.budget === 0) return <p>N/A</p>
        if(movie.budget > 0) return String(movie.budget).slice(0, 2) + 'M'

        if(movie.budget === undefined) return movie.networks.map((stream: { name: string }) => <p>{stream.name}</p>)
            if(movie.networks.length <= 0) return <p>N/A</p> 
    }

    const movieRevenueOrTvCreator = () => {
        if(movie.revenue === 0) return <p>N/A</p>
        if(movie.revenue > 0) return String(movie.revenue).slice(0, 2) + 'M'

        if(movie.budget === undefined) return  movie.created_by.map((creator: {name: string}) => <p>{creator.name}</p>)
        if(movie.created_by.length <= 0) return <p>N/A</p> 
    }

    return (
        <section className='h-full w-full p-[3%] flex flex-col gap-3 small-screen:p-0'>
            {isLoading ?
                <div className="h-full w-full flex justify-center items-center">
                    <Spinner />
                </div>
                :
                <>
                    <div className='flex flex-col gap-3'>
                        <p className='font-bold text-lg tablet:text-xl small-screen:text-2xl small-screen:text-white'>Information</p>
                        <div className='flex gap-[4rem] small-screen:gap-[5rem]'>
                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-col'>
                                    <p className='font-semibold small-screen:text-xl small-screen:text-white'>Status</p>
                                    <p className="small-screen:text-lg small-screen:text-white font-light">{movie.status}</p>
                                </div>
                                <div className='flex flex-col'>
                                    <p className='font-semibold small-screen:text-xl small-screen:text-white'> Available Languages</p>
                                    <p className="w-[100%] small-screen:text-lg small-screen:text-white font-light small-screen:w-[70%]">{
                                        movie.spoken_languages.length <= 0 ?
                                            'N/A'
                                            :
                                            movie.spoken_languages.map((language: MovieInfosProps) => (language.english_name)).join(', ')
                                    }
                                    </p>
                                </div>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-col'>
                                    <p className='font-semibold small-screen:text-xl small-screen:text-white'>{movie.title  ? 'Budget' : 'Streamer'}</p>
                                    <div className="flex items-center gap-1 w-full">
                                        {movie.title && <CurrencyPoundIcon className="h-6 w-6 small-screen:text-white" />}
                                        <p className="small-screen:text-lg small-screen:text-white font-light">{movieBudgetOrTvStreamer()}</p>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <p className='font-semibold small-screen:text-xl small-screen:text-white'>{movie.title ? 'Revenue' : 'Creator'}</p>
                                    <div className="flex items-center gap-1 w-full">
                                        {movie.title && <CurrencyPoundIcon className="h-6 w-6 small-screen:text-white" />}
                                        <p className="small-screen:text-lg small-screen:text-white font-light">{movieRevenueOrTvCreator()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>}
        </section>
    )
}

export default Movieinfo