import { Dispatch, FC, SetStateAction, useEffect, useMemo, useState } from 'react';
import { Product } from '../types/product';
import Navbar from './Navbar';
import { Avatar, Box } from '@mui/material';
import { GridCellParams } from '@mui/x-data-grid'
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from './SearchBar';

export interface HomeProps {
  data: Product[],
  selectedRowId: number | null,
  setSelectedRowId: Dispatch<SetStateAction<number | null>>,
  searchText: string | null,
  setSearchText: Dispatch<SetStateAction<string | null>>
}
 
const HomePage= ({data, selectedRowId, setSelectedRowId, searchText, setSearchText}: HomeProps) => {

  const navigate = useNavigate();

  const updatedData = useMemo(() => {
    function getRandomColor() {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
    return data.map(row => {
      return {
        ...row,
        avatarColor: getRandomColor(),
      }
    })
  }, [data]);
  const filteredData = useMemo(() => {
    if (searchText === null || searchText.trim() === '') {
      return updatedData;
    } else {
      return updatedData.filter(row => row.title.toLowerCase().includes(searchText.toLowerCase()));
    }
  }, [updatedData, searchText])
  const columns: GridColDef[] = [
    {
      field: 'avatar',
      headerName: '',
      width: 100,
      renderCell: (params: GridCellParams) => (
        <Avatar style={{ backgroundColor: params.row.avatarColor }}>{params.row.title.charAt(0)}</Avatar>
      ),
      headerClassName: 'super-app-theme--header'
    },
      { field: 'id', headerName: 'ID', width: 350, headerClassName: 'super-app-theme--header' },
      { field: 'title', headerName: 'Title', width: 200, headerClassName: 'super-app-theme--header' },
      { field: 'description', headerName: 'Description', width: 150, headerClassName: 'super-app-theme--header' },
      { field: 'price', headerName: 'Price', width: 150, headerClassName: 'super-app-theme--header' },
    ]
    const handleRowClick = (params: GridRowParams) => {
      const id = params.row.title;
      navigate(`/${id}`);
      setSelectedRowId(id)
    }
  return (
    <>
      <Navbar/>
      <div style={{ display: 'flex', justifyContent: 'center' , height: '100vh', marginTop: '10vh' }}>
        <Box sx={{ height: 600, width: '75%' }}>
        <SearchBar searchText={searchText} setSearchText={setSearchText}/>
          <DataGrid
            rows={filteredData}
            columns={columns}
            onRowClick={handleRowClick}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10]}
          />
        </Box>
      </div>
    </>
    
  );
};
export default HomePage





