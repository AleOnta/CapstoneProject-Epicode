import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import { IMovie } from "../interfaces/iMovies"

interface MoviesState {
    allMovies: IMovie[],
    inRoom: IMovie[],
    incoming: IMovie[],
    status: string
}

const initialState: MoviesState = {
    allMovies: [],
    inRoom: [],
    incoming: [],
    status: "idle"
};

const fetchMovies = createAsyncThunk("movies/fetch", async (thunkAPI) => {
    try {
        const response = await fetch("http://localhost:8080/api/movies", {
            method: "GET"
        })
        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.log(error);
    }
})

export const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            state.allMovies = action.payload;
            state.status = "fulfilled";
        });

        builder.addCase(fetchMovies.pending, (state) => {
            state.status = "loading";
        })

        builder.addCase(fetchMovies.rejected, (state) => {
            state.status = "failed"
        })
    },
});

export default movieSlice.reducer;