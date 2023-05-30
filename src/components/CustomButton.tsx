
import { Button, styled } from "@mui/material"

const CustomButton = styled(Button)({
    backgroundColor:"blue",
    padding: "10px",
    marginTop: "21px",
    marginLeft: "10px",
    alignItems:'center',
    color: 'white',
    width:'12em',
    "&:hover": {
        boxShadow: 8,
        backgroundColor:"green"
      },
})

export default CustomButton