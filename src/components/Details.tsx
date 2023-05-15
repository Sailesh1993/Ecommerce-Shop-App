import { useEffect, useState } from "react"
import { Product } from "../types/product"
import axios from "axios";
import { Box, List, ListItem, ListItemText } from "@mui/material";


interface DetailPageProps {
    selectedRowId: Number | null
}

export default function Details(selectedRowId: DetailPageProps): JSX.Element{
     
    const [detail, setDetail] = useState<Product>({
        id: 0,
        title:'',
        description: '',
        price: 0
    })

    useEffect(() => {

        const fetchData = async() => {
            try{
                const response = await axios.get<Product>(`https://api.escuelajs.co/api/v1/products/${selectedRowId.selectedRowId}`)
                setDetail(response.data)
            }
            catch(error){
                console.log(error)
            }
        }
        fetchData() 
    },[selectedRowId])
    return(
        <div>
            {detail && (
                <Box sx={{width:"100%"}}>
                    <List>
                        <ListItem>
                            <ListItemText sx={{ width: '25%' }} primary="Name" secondary={detail.title}/>
                        </ListItem>
                    </List>
                </Box>
            )}
        </div>
    )
}
        

