import { configureStore } from "@reduxjs/toolkit"

import usersReducer, { createUser, emptyUserReducer, fetchAllUsers, sortByEmail, updateOneUser } from "../../redux/reducers/usersReducer"
import { User } from "../../types/User"
import productsReducer from "../../redux/reducers/productsReducer"
import favReducer from "../../redux/reducers/favReducer"
import { user1, user2, user3 } from "./data/users"
import { stat } from "fs"
import exp from "constants"
import userServer from "./servers/userServer"

export const store = configureStore({
    reducer:{
        productsReducer,
        usersReducer,
        favReducer
    }
})
beforeAll(()=>{
    userServer.listen()
})
afterAll(()=>{
    userServer.close()
})

beforeEach(()=>{
    store.dispatch(emptyUserReducer())
    store.dispatch(createUser(user1))
    store.dispatch(createUser(user2))
    store.dispatch(createUser(user3))
})
describe("Testing userReducer",()=>{
    test("check initialState", ()=>{
        const state = usersReducer(undefined,{type:"unknown"})
        expect(state).toEqual({
            users:[],
            loading:false,
            error:""
        })
    })
    test("Check should create new user", ()=>{
        const user:User = {
            id: 1,
            email: "test@gmail.com",
            role:"customer",
            password: "tester",
            name: "Tester",
            avatar: ""
        }
        const state = usersReducer(undefined, createUser(user))
        expect(state).toEqual({
            users: [user],
            loading: false,
            error: ""
        }
        )
    })
    test("Check should empty user list",()=>{
        const user: User ={
            id: 1,
            email: "test@gmail.com",
            role:"customer",
            password: "tester",
            name: "tester",
            avatar: ""
        }
        const state = usersReducer({
            users: [user],
            loading: false,
            error: ""
        }, emptyUserReducer())
        expect(state.users.length).toBe(0)
    })
    test("Should update one existing user", ()=>{
        store.dispatch(updateOneUser({
            id:2,
            update:{
                email:"alia@gmail.com",
                password:"alia",
                name: "alia",
                role: "customer",
                avatar: ""
            }
        }))
        expect(store.getState().usersReducer.users[1]).toEqual(
            {
                id:2,
                email:"alia@gmail.com",
                password:"alia",
                name: "alia",
                role: "customer",
                avatar: ""
            }
        )
    })
    test("Check should sort user list by email asc",()=>{
        store.dispatch(sortByEmail("asc"))
        expect(store.getState().usersReducer.users).toEqual(
            [user3,user1, user2]
        )
        store.dispatch(sortByEmail("dsc"))
        expect(store.getState().usersReducer.users).toEqual(
            [user2,user1, user3]
        )
        
    })
    test("Check should fetch all users",async () =>{
        //Only can check the final result
       await store.dispatch(fetchAllUsers())
       expect (store.getState().usersReducer.users.length).toBe(4)
       expect(store.getState().usersReducer.loading).toBeFalsy()
       expect(store.getState().usersReducer.error).toBeFalsy
    })
    test("Check should fetch users with reducers",()=>{
        const state = usersReducer(undefined,fetchAllUsers.pending)
        expect(state).toEqual({users:[],loading: true, error:''})
    })
}) 