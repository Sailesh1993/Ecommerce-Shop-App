import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { products } from '../data/product'


const productServer = setupServer(
    rest.get("https://api.escuelajs.co/api/v1/products",(req,res,ctx)=>{
        return res(
            ctx.json(products)
        )
    })
)
