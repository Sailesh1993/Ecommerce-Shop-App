import React, { useEffect, useState } from 'react'
import HomePage from './components/HomePage'
import { Product } from './types/product';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Details from './components/Details';


const App = () => {
  const [data, getData] = useState<Product[]>([]);
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
  }, [searchText])
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage data={data} selectedRowId={selectedRowId} setSelectedRowId={setSelectedRowId} searchText={searchText} setSearchText={setSearchText}/>}/>
        <Route path={`/${selectedRowId}`} element={<Details selectedRowId={selectedRowId} />} />
      </Routes>
    </Router>
  )
}

export default App