import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";

/* const useAppDispatch:()=> AppDispatch = useDispatch */
const useAppDispatch = () => useDispatch<AppDispatch>()
export default useAppDispatch