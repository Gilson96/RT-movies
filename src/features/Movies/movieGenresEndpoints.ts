import { apiSlice } from '../apliSlice'

type Movies = {
    results: [];
    genres: [];
}

const movieGenresEndpoints = apiSlice.injectEndpoints({
    endpoints: (build) => ({

        getTrendingMovies: build.query<Movies, string>({
            query: (type) => ({ url: `https://api.themoviedb.org/3/trending/${type}/day?api_key=010fbfb2693209806775526572b1daaf` }),
        }),

        getMovieByList: build.query<Movies, { list: string, type: string }>({
            query: (data) => {
                const { list, type } = data;
                return {
                    url: `https://api.themoviedb.org/3/${type}/${list}?api_key=010fbfb2693209806775526572b1daaf`
                }
            },
        }),

        getMovieByListConfig: build.query<Movies, { type: string, page: string, sort_by: string, genres: string }>({
            query: (data) => {
                const { type, page, sort_by, genres } = data;
                return {
                    url: `https://api.themoviedb.org/3/discover/${type}?api_key=010fbfb2693209806775526572b1daaf&page=${page}&sort_by=${sort_by}&with_genres=${genres}`
                }
            },
        }),

        getMovieGenreList: build.query<Movies, string>({
            query: (type) => ({ url: `https://api.themoviedb.org/3/genre/${type}/list?api_key=010fbfb2693209806775526572b1daaf` }),
        }),

         getMovieByGenre: build.query({
            query: (data) => {
                const { genre, type } = data;
                return {
                    url: `https://api.themoviedb.org/3/discover/${type}?api_key=010fbfb2693209806775526572b1daaf&include_adult=false&page=1&sort_by=primary_release_date.desc&vote_average.gte=6&vote_average.lte=8&with_genres=${genre}&with_origin_country=US&year=2024`
                }
            },
        }),


    }),
    overrideExisting: false,
})

export const {
    useGetMovieGenreListQuery,
    useGetMovieByListQuery,
    useGetTrendingMoviesQuery,
    useGetMovieByGenreQuery,
    useGetMovieByListConfigQuery
} = movieGenresEndpoints