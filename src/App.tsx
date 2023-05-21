import React, { useEffect, useState } from 'react'
import useAppSelector from './hooks/useAppSelector';
import { createUser, 
  emptyUserReducer, 
  fetchAllUsers,sortByEmail, 
  updateOneUser, 
  updateUserReducer } from './redux/reducers/usersReducer';
import useAppDispatch from './hooks/useAppDispatch';
import { User } from './types/User';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { addOneFav, removeFromFav } from './redux/reducers/favReducer';

const getFilterList = (users:User[], search:string)=>{
  return users.filter(user=>user.name.toLowerCase().includes(search.toLocaleUpperCase()))
}
const App = () => {
  const [sort, setSort] = useState<"asc"|"dsc">("asc")
  const [search,setSearch] = useState("")
  const {users,loading, error} = useAppSelector(state => state.usersReducer)
  const filterUsers = getFilterList(users, search)
  const favIds = useAppSelector(state => state.favReducer)
  const favList = users.filter(users =>favIds.includes(users.id))

  const dispatch = useAppDispatch()
 
const addUser = ()=>{
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
const onSearchChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
  setSearch(e.target.value)
}
const toggleFav = (id: number) =>{
  if(favIds.includes(id)){
    dispatch(removeFromFav(id))
  } else{
    dispatch(addOneFav(id))
  }
}
 
  return (
    <div>
      <button onClick={addUser}>Create new User
      </button>
      <button onClick={updateUser}>Update one</button>
      <button onClick={deleteAllUsers}>EmptyUserList</button>
      {filterUsers.map(user=>(
        <div>
          <p key={user.id}>{user.name}{user.email}</p>
          <IconButton 
          onClick={()=>toggleFav(user.id)}
          color={favIds.includes(user.id)?"success":"info"}>
            <FavoriteIcon/>
          </IconButton>
        </div>
      ))}
      <button onClick={sortByEmailDynamic}>Sort by email Asc</button>
      <input
      type='text'
      name='search'
      value={search}
      onChange={onSearchChange}
      />
      {/* <div>
        <h3>Favourite list</h3>
        {favList.map(
          fav=>(
            <p>{fav.name}</p>
          )
        )}
      </div> */}
    </div>)
}

export default App