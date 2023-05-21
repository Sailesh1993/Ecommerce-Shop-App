import React, { useState } from 'react'

const SignUp = () => {
    const[username, setUsername] = useState("")
    const[email, setEmail] = useState("")
    const[error, setError] = useState("")
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if(!username || !email){
            setError("username and amil cannot be empty")
        }
    }
  return (
    <div data-testid="signup">
        <form onSubmit={e =>handleSubmit(e)}>
            <input type="text" name='username' value={username} onChange={(e)=>setUsername(e.target.value)} />
            <input type="email" name='email' value={email} onChange={(e)=> setEmail(e.target.value)} />
            <button>Send</button>
        </form>
        {error && <p>{error}</p>}
    </div>
  )
}

export default SignUp