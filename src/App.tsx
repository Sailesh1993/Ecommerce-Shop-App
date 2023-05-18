import React, { useEffect, useState } from 'react'
import HomePage from './components/HomePage'
import { Product } from './types/Product';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Details from './components/Details';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalState } from './redux/store';
import useAppSelector from './hooks/useAppSelector';
import { createUser, emptyUserReducer, fetchAllUsers, sortByEmail, updateOneUser, updateUserReducer } from './redux/reducers/usersReducer';
import useAppDispatch from './hooks/useAppDispatch';
import { User } from './types/User';


const App = () => {
  const [sort, setSort] = useState<"asc"|"dsc">("asc")
  const users = useAppSelector(state => state.usersReducer)
  console.log(users)
  const dispatch = useAppDispatch()
 
const addUser = ()=>{
    /* const result = createUser({})//create an action object
    console.log(result) */
    dispatch(createUser(
      {
        id: 2,
        name: "Kamal",
        avatar: "",
        password:"kamal",
        email: "kamal@gmail.com",
        role:"customer"
      }
    ))
  }
useEffect(()=>{
  dispatch(fetchAllUsers())
  },[])
const deleteAllUsers = ()=>{
  dispatch(emptyUserReducer())
}
const updateUser = ()=>{
  dispatch(updateOneUser({
    id:1,
    update:{
      email:"krishna@gmail.com",
      password: "kriss",
      role: "customer",
      name: "Krishna",
      avatar: ""
    }
  }))
} 
const sortByEmailDynamic = ()=>{
  dispatch(sortByEmail(sort))
  setSort(sort === "asc" ? "dsc":"asc")
}
 /*  const [data, getData] = useState<Product[]>([]);
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null)
  const [searchText, setSearchText] = useState<string | null>(null)
  useEffect(()=>{
    if(!searchText){
      const fetchData = async ()=>{
        try{
          const response = await axios.get<Product[]>(`https://api.escuelajs.co/api/v1/products?by_title=${searchText}`)
          getData(response.data)
        }
        catch(error){
          console.log(error)
        }
      }
      fetchData() 
    } else{
      const fetchData = async ()=>{
        try{
          const response = await axios.get<Product[]>(' https://api.escuelajs.co/api/v1/products')
          getData(response.data)
        } catch(error){
          console.log(error)
        }
      }
      fetchData()
    }
  }, [searchText]) */
  return (
    <div>
      <button onClick={addUser}>Create new User
      </button>
      <button onClick={updateUser}>Update one</button>
      <button onClick={deleteAllUsers}>EmptyUserList</button>
      {users.map(user=>(
        <p key={user.id}>{user.email}</p>
      ))}
      <button onClick={sortByEmailDynamic}>Sort by email Asc</button>
    </div>)
    {/* <Router>
      <Routes>
        <Route path='/' element={<HomePage data={data} selectedRowId={selectedRowId} setSelectedRowId={setSelectedRowId} searchText={searchText} setSearchText={setSearchText}/>}/>
        <Route path={`/${selectedRowId}`} element={<Details selectedRowId={selectedRowId} />} />
      </Routes>
    </Router> */}
}

export default App