import { MenuItem } from '@chakra-ui/react'
import { useState, Dispatch, SetStateAction } from 'react';
import { useGetMovieGenreListQuery } from '../../features/Movies/movieGenresEndpoints';
import { AccordionBox, DropdownMenu } from './UI/MovieListConfigUI';
import useScreenSize from '../../features/useScreenSize';

type MovieListConfigProps = {
    type: string;
    setFilters: Dispatch<SetStateAction<NewFilterValuesProps>>;
}

export type NewFilterValuesProps = {
    sort_by: string;
    genres: string;
}

const MovieListConfig = ({ setFilters, type }: MovieListConfigProps) => {
    const [configSort_by, setConfigSort_By] = useState<string>('Popularity Desc')
    const [configGenre, setConfigGenre] = useState<string>('')
    const screenSize = useScreenSize()

    const newFilterVaules: NewFilterValuesProps = {
        sort_by: configSort_by,
        genres: String(configGenre),
    }

    return (
        <section className='h-full w-full flex flex-col justify-center items-center gap-4 small-screen:w-[15%] small-screen:h-auto small-screen:absolute small-screen:right-[4%] '>
            <AccordionBox
                title='Filters'
            >
                <div className='h-full w-full flex flex-col gap-2'>
                    <SortByConfig
                        type={type}
                        setSort_by={setConfigSort_By}
                        sort_by={configSort_by}
                    />
                    <GenresConfig
                        setGenre={setConfigGenre}
                        type={type}
                    />
                    {screenSize.width > 1000 && <button
                        className='h-full w-full p-[3%] border rounded-xl mb-[2%] shadow-md font-bold text-lg'
                        onClick={() => { setFilters(newFilterVaules) }}
                    >
                        Search
                    </button>}
                </div>
            </AccordionBox>

            {screenSize.width < 1000 && <button
                className='h-full w-full p-[3%] border rounded-xl mb-[2%] shadow-md font-bold text-lg'
                onClick={() => { setFilters(newFilterVaules) }}
            >
                Search
            </button>}
        </section>
    )
}

export default MovieListConfig


type SortByConfigProps = {
    type: string;
    sort_by: string;
    setSort_by: Dispatch<SetStateAction<string>>;
}

const SortByConfig = ({ type, sort_by, setSort_by }: SortByConfigProps) => {
    return (
        <>
            <DropdownMenu title={sort_by}>
                <MenuItem onClick={() => { setSort_by('popularity.desc') }}>Popularity Desc</MenuItem>
                <MenuItem onClick={() => { setSort_by('popularity.asc') }}>Popularity Asc</MenuItem>
                <MenuItem onClick={() => { setSort_by('vote_average.desc') }}>Vote Average Desc</MenuItem>
                <MenuItem onClick={() => { setSort_by('vote_average.asc') }}>Vote Average Asc</MenuItem>
                <MenuItem onClick={() => { setSort_by(type === 'movie' ? 'release_date.desc' : 'first_air_date.desc') }}>Release Date Desc</MenuItem>
                <MenuItem onClick={() => { setSort_by(type === 'movie' ? 'release_date.asc' : 'first_air_date.asc') }}>Release Date Asc</MenuItem>
            </DropdownMenu>
        </>
    )
}

type GenresConfigProps = {
    setGenre: Dispatch<SetStateAction<string>>;
    type: string
}

const GenresConfig = ({ setGenre, type }: GenresConfigProps) => {
    const [genreName, setGenreName] = useState<string>('Action')
    const { data: genresList, isLoading } = useGetMovieGenreListQuery(type)

    if (!genresList) return <p>no</p>
    if (isLoading) return <p>isLoading</p>
    return (
        <>
            <DropdownMenu title={genreName}>
                {genresList.genres.slice(0,6).map((genre: { id: string, name: string; }, index) => (
                    <MenuItem
                        key={index}
                        onClick={() => {
                            setGenre(genre.id);
                            setGenreName(genre.name)
                        }}
                    >
                        {genre.name}
                    </MenuItem>
                ))}
            </DropdownMenu>
        </>
    )
}


