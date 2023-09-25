import useAppDispatch from "../../hooks/useAppDispatch"

interface CreateNewProductProps {
    isVisible: boolean
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateNewProduct = ({isVisible, setVisible} : CreateNewProductProps) => {
    const handleModalClose = () => setVisible(false)
    const dispatch = useAppDispatch()
}