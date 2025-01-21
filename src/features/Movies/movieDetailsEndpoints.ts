import { apiSlice } from '../apliSlice'

export type Movie = {
    id: number;
    backdrop_path: string;
    poster_path: string;
    title: string;
    release_date: string;
    runtime: number;
    vote_average: number;
    genres: [],
    tagline: string;
    overview: string;
    cast: [];
    crew: []
    status: string;
    spoken_languages: [];
    revenue: number;
    budget: number;
    results: []
    movie: Movie;
    name: string;
    first_air_date: string;
    number_of_seasons: number;
    networks: [];
    created_by: []
}

const allMoviesApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({

        // Query to fetch Movies Details
        getMovieDetails: build.query<Movie, { id: number, type: string }>({
            query: (data) => {
                const { id, type } = data;
                return {
                    url: `https://api.themoviedb.org/3/${type}/${id}?api_key=010fbfb2693209806775526572b1daaf`
                }
            },
        }),

        // Query to fetch Movies Actors
        getMovieActors: build.query<Movie, { id: number, type: string }>({
            query: (data) => {
                const { id, type } = data;
                return {
                    url: `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=010fbfb2693209806775526572b1daaf`
                }
            },
        }),

        // Query to fetch recommended movies
        getMovieRecommendations: build.query<Movie, { id: number, type: string }>({
            query: (data) => {
                const { id, type } = data;
                return {
                    url: `https://api.themoviedb.org/3/${type}/${id}/recommendations?api_key=010fbfb2693209806775526572b1daaf`
                }
            },
        }),

        // Query to fetch searched movies
        searchMovies: build.query<Movie, { title: string, type: string }>({
            query: (data) => {
                const { title, type } = data;
                return {
                    url: `https://api.themoviedb.org/3/search/${type}?query=${title}&api_key=010fbfb2693209806775526572b1daaf&include_adult=false&language=en-US&page=1`
                }
            },
        }),

    }),
    overrideExisting: false,
})

export const {
    useGetMovieActorsQuery,
    useGetMovieDetailsQuery,
    useGetMovieRecommendationsQuery,
    useSearchMoviesQuery
} = allMoviesApi