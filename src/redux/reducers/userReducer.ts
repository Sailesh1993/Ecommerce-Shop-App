import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { NewUser, User, UserCredentials, UserState } from "../../types/User"
import axios, { AxiosError } from "axios"

const BASE_URL = 'https://api.escuelajs.co/api/v1'

const initialState: UserState = {
    users: [],
    loading: false,
    error: "",
    isLoggedIn: false
}

export const fetchAllUsers = createAsyncThunk(
    "fetchAllUsers",
    async () => {
        try {
            const response = await axios.get<User[]>("https://api.escuelajs.co/api/v1}/users")
            return response.data
        }
        catch (e) {
            const error = e as AxiosError
            if (error.response) {
                return JSON.stringify(error.response.data)
            }
            return error.message
        }
    }
)

export const getUserById = async (id: number) => {
    try {
        const response = await axios.get<User>(`https://api.escuelajs.co/api/v1/users/${id}`)
        return response.data
    }
    catch (e) {
        const error = e as AxiosError
        if (error.response) {
            return JSON.stringify(error.response.data)
        }
        return error.message
    }
}

export const createUser = createAsyncThunk(
    "register", 
    async (userData: NewUser) => {
    try {
        const response = await axios.post("https://api.escuelajs.co/api/v1/users", userData)
        return response.data
    }
    catch (e) {
        const error = e as AxiosError
        if (error.response) {
            return JSON.stringify(error.response.data)
        }
        return error.message
    }
})

export const login = createAsyncThunk(
    "login",
    async (credentials: UserCredentials) => {
        try {
            const response = await axios.post(`${BASE_URL}/auth/login`, credentials)
            localStorage.setItem("token", response.data.access_token)

            const userResponse = await axios.get(`${BASE_URL}/auth/profile`, {
                headers: {
                    Authorization: `Bearer ${response.data.access_token}`,
                }
            })
            return userResponse.data
        }
        catch(e) {
            const error = e as AxiosError
            if (error.response) {
                return JSON.stringify(error.response.data)
            }
            return error.message
        }
    }
)
const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        cleanUpUsersReducer: (state) => {
            return initialState
        },
        logout: (state) => {
            localStorage.removeItem("token")
            state.currentUser = undefined
            state.error = ""
        }
    },
    extraReducers: (build) => {
        build
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                if (typeof action.payload === "string") {
                    state.error = action.payload
                }
                else {
                    state.users = action.payload
                }
                state.loading = false
            })
            .addCase(fetchAllUsers.pending, (state) => {
                state.loading = true
                state.error = ""
            })
            .addCase(fetchAllUsers.rejected, (state) => {
                state.error = "Error fetching users. Please try again."
                state.loading = false
            })
            .addCase(createUser.pending, (state) => {
                state.loading = true
                state.error = ""
            }) 
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false
                if (typeof action.payload === "string") {
                    state.error = action.payload
                }
                else {
                    state.users.push(action.payload)
                }
            })
            .addCase(createUser.rejected, (state, action) => {
                state.error = action.payload as string
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = ""
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.error = ""
                state.isLoggedIn = true
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    }
})

const usersReducer = usersSlice.reducer
export const { cleanUpUsersReducer, logout } = usersSlice.actions
export default usersReducer