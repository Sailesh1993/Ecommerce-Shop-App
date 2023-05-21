import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { user1, user2, user3, user4 } from '../data/users'

const userServer = setupServer(
  // Describe the requests to mock.
  rest.get("https://api.escuelajs.co/api/v1/users", (req, res, ctx) => {
    /**
     * res: method to send data back
     * ctx: method to construct the content of returned data
     */
    return res(
      ctx.json([user1,user2, user3,user4]),
    )
  }),
)
export default userServer