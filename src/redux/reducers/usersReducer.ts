import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/User";
import axios, { AxiosError } from "axios";
import { UserUpdate } from "../../types/UserUpdate";

const initialState:{
    users: User[],
    loggedUser: string | null,
    error:string
} = {
    users:[],
    loggedUser:null,
    error:""
}
export const fetchAllUsers = createAsyncThunk(
    "fetchAllUsers",
    async()=>{
        try{
            const result = await axios.get<User[]>("https://api.escuelajs.co/api/v1/users")
            return result.data
        }
        catch(e){
            const error = e as AxiosError
            return error
        }
    }      
)
const userSlice = createSlice({
    name: "users",
    initialState,
    reducers:{
        registerUser: (state, action: PayloadAction<User>)=>{
            state.users.push(action.payload)
        },
        loginUser: (state, action:PayloadAction<string>)=>{
            window.localStorage.setItem("userId", action.payload)
            state.loggedUser = action.payload
        }
    }
})
const usersReducer = userSlice.reducer
export const {registerUser,loginUser} = userSlice.actions
export default usersReducer