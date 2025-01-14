import { apiSlice } from '../../features/apliSlice'

type Account = {
    0: {
        watchlistMovies: [];
        favouriteMovies: [];
    },
}

const accountApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({

        getAccountDetails: build.query<Account, []>({
            query: () => ({ url: 'https://react-movies-api-98105904ac05.herokuapp.com/user' }),
        }),

        // Add movie to watchlist
        postToWatchlistMovies: build.mutation<Account, { id: number, body: object }>({
            query(data) {
                const { id, body } = data
                return {
                    url: `https://react-movies-api-98105904ac05.herokuapp.com/user/${id}/movies/watchlist`,
                    method: 'POST',
                    body
                }
            }
        }),


        // Add movie to favourites
        postToFavouriteMovies: build.mutation<Account, { id: number, body: object }>({
            query(data) {
                const { id, body } = data
                return {
                    url: `https://react-movies-api-98105904ac05.herokuapp.com/user/${id}/movies/favourite`,
                    method: 'POST',
                    body
                }
            }
        }),

        // Remove movie from favourite
        removeFavouriteMovies: build.mutation<Account, {id: number, movieId: number}>({
            query(data) {
                const { id, movieId } = data
                return {
                    url: `https://react-movies-api-98105904ac05.herokuapp.com/user/${id}/movies/favourite/${movieId}`,
                    method: 'POST',
                }
            }
        }),

        // Remove movie from watchlist
        removeWatchlistMovies: build.mutation<Account, {id: number, movieId: number}>({
            query(data) {
                const { id, movieId } = data
                return {
                    url: `https://react-movies-api-98105904ac05.herokuapp.com/user/${id}/movies/watchlist/${movieId}`,
                    method: 'POST',
                }
            }
        }),

    }),
    overrideExisting: false,
})

export const {
    useGetAccountDetailsQuery,
    usePostToFavouriteMoviesMutation,
    usePostToWatchlistMoviesMutation,
    useRemoveFavouriteMoviesMutation,
    useRemoveWatchlistMoviesMutation,
} = accountApi