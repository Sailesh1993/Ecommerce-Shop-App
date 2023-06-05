import React, { useEffect, useState } from "react"
import useAppDispatch from "../hooks/useAppDispatch"
import {fetchAllProducts,sortProductsByPrice} from "../redux/reducers/productsReducer"
import useDebounce from "../hooks/useDebounce"
import { Product } from "../types/Product"
import useAppSelector from "../hooks/useAppSelector"
import GridProducts from "../components/GridProducts"

import { Box, Button, Container, Grid, Input, Pagination } from "@mui/material"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp"
import Header from "../components/Header"
import LoadingPage from "../components/LoadingPage"
import { getAllCategories } from "../redux/reducers/categoryReducer"
import { WidthFull } from "@mui/icons-material"

const ProductsPage = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchAllProducts())
    dispatch(getAllCategories())
  }, [dispatch])
  const [page, setPage] = useState(1)
  const [itemOffset, setItemOffset] = useState(0)
  const [priceSort, setPriceSort] = useState<boolean>(true)
  const [category, setCategory] = useState<string>("Show all")
  const [itemsPerPage, setItemsPerPage] = useState(24)
  const {products, loading} = useAppSelector((state) => state.productsReducer)
  useEffect(() => {
    if (products.length > 0) {
      setItemOffset(
        ((page - 1) * itemsPerPage) % products.length
      )
    }
  }, [page])
  const {categories} = useAppSelector((state)=> state.categoryReducer)
  const categoryList = categories.map((item) => item.name)
  categoryList.push("Show all")
  const handleCategoryClick = (item: string) => setCategory(item)
  const productsOfCategory = products.filter((item) =>
    category === "Show all"
      ? item
      : item.category.name === category
      ? item
      : null
  )
  const filterFunc = (filter: string, products: Product[]): Product[] => {
    return products.filter((item) =>
      item.title.toLowerCase().includes(filter.toLowerCase())
    )
  }
  const searchDebounce = useDebounce<Product>(filterFunc, productsOfCategory)
  useEffect(() => {
    setPage(1)
  }, [searchDebounce.search, category])
  const pageCount = Math.ceil(
    searchDebounce.filteredItems.length / itemsPerPage
  )
  const endOffset = itemOffset + itemsPerPage
  const displayItem = searchDebounce.filteredItems.slice(itemOffset, endOffset)
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }
  if(loading) return <LoadingPage />
  const sortByPriceHandler = () => {
    priceSort
      ? dispatch(sortProductsByPrice("asc"))
      : dispatch(sortProductsByPrice("dsc"))
    setPriceSort((state) => !state)
  };
  return (
    <Container
      maxWidth="lg"
      sx={{
        padding: "6em 0",
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <Box sx={{ display: "flex", gap: 2, marginBottom: 3, fontSize: 1, overflow: "auto" }}>
        {categoryList.map((item) => (
          <Button
            onClick={() => handleCategoryClick(item)}
            
            color="primary"
            key={item}
            sx={{ fontSize: 12}}
          >
            {item}
          </Button>
        ))}
      </Box>
      <Box sx={{ display: "flex", gap: 2, marginBottom: 3 }}>
        <Input
        fullWidth
          onChange={searchDebounce.handleChange}
          value={searchDebounce.search}
          placeholder="Search Product"
          sx={{ maxWidth: 950 }}
        />
        <Button
          onClick={sortByPriceHandler}
          variant="outlined"
          color="primary"
        >
          {" "}
          Sort by price{" "}
          {priceSort ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </Button>
      </Box>
      <Grid
        container
        spacing={2}
        sx={{
          marginTop: 8,
          marginBottom: 4,
        }}
      >
        {displayItem.map((item) => (
          <GridProducts key={item.id} product={item} />
        ))}
      </Grid>
      <Pagination
        page={page}
        count={pageCount}
        onChange={(e, value) => handleChange(e, value)}
        sx={{
          alignSelf: "center",
        }}
      />
    </Container>
  );
};
export default ProductsPage;
