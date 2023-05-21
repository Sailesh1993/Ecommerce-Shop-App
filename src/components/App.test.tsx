import { fireEvent, render, screen } from "@testing-library/react"
import App from "../App"
import { Provider } from "react-redux"
import { store } from "../tests/reducers/usersReducer.test"
import userServer from "../tests/reducers/servers/userServer"
import { emptyUserReducer } from "../redux/reducers/usersReducer"

/* beforeAll(()=>userServer.listen())
afterAll(()=>userServer.close())

beforeEach(()=>{
    store.dispatch(emptyUserReducer())
}) */

describe("Test App Component", ()=>{
    /* test("check snapshot", ()=>{
        const appComponent = render(
            <Provider store={store}>
                <App/>
            </Provider>
        )
        expect(appComponent).toMatchSnapshot()// when run first time, it creates a snapshot from component App
    })// unnecessary in not UI-critical application */
    test("Should button create new user work",()=>{
        render(
            <Provider store={store}>
                <App/>
            </Provider>
        )
        const createBtn = screen.getByText("Create new User")
        expect(createBtn).toBeInTheDocument()
        fireEvent.click(createBtn)
        expect(screen.getByText(/john@gmail.com/i)).toBeInTheDocument()
    })
   /*  test("Should render all users on screen",async()=>{
        render(
            <Provider store={store}>
                <App/>
            </Provider>
        )
        const users = await screen.findAllByRole("Listitem")
        expect(users.length).tobe(4)
    }) */
})