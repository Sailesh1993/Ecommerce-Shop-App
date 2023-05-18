export interface User {
  id: number
  name:string
  email: string
  password: string
  role: "customer" | "admin"
  avatar: string
}