import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/User";
import axios, { AxiosError } from "axios";
import { UserUpdate } from "../../types/UserUpdate";

const initialState: User[] =[
    {
        id: 1,
        name: "Sailesh",
        email:"Karki@gmail.com",
        avatar:"",
        password:"sailesh",
        role: "admin"
    }
]
export const fetchAllUsers = createAsyncThunk(
    "fetchAllUsers",
    async()=>{
        try{
            const result = await axios.get<User[]>("https://api.escuelajs.co/api/v1/users")
            return result.data
        }
        catch(e){
            const error = e as AxiosError
            if(error.request){
                console.log("error in request", error.message)
            }
            else{
                console.log(error.response?.data)
            }
        }
    }      
)
const userSlice = createSlice({
    name: "users",
    initialState,
    reducers:{
        createUser: (state, action: PayloadAction<User>)=>{
            state.push(action.payload)
        },
        updateUserReducer: (state, action: PayloadAction<User[]>)=>{
            return action.payload
        },
        emptyUserReducer:(state)=>{
           return[]
        },
        updateOneUser: (state, action: PayloadAction<UserUpdate>)=>{
            /* const foundIndex = state.findIndex(user => user.id === action.payload.id )
            state[foundIndex] = {...state[foundIndex], ...action.payload.update} */
            //OR
            return state.map(user=>{
                if(user.id === action.payload.id){
                    return{...user, ...action.payload.update}
                }
                return user
            })
        },
        sortByEmail:(state,action: PayloadAction<"asc"|"dsc">)=>{
            if(action.payload === "asc"){
                state.sort((a,b)=>a.email.localeCompare(b.email))
            } else{
                state.sort((a,b)=>b.email.localeCompare(a.email))
            }
            
        }
    },
    extraReducers: (build) =>{
        build.addCase(fetchAllUsers.fulfilled,(state, action) =>{
            if (action.payload){
                return action.payload
            }
        })
    }
})
const usersReducer = userSlice.reducer
export const 
    {
        createUser,
        updateUserReducer,
        emptyUserReducer,
        updateOneUser,
        sortByEmail 
    } = userSlice.actions
export default usersReducer