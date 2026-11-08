  const handleLogin=async(event) => {
    console.log('Sending credentials:', { username, password })
    event.preventDefault()
    try{
      const user =await loginService.login({ username,password })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    }
    catch(exception){
      setErrorMessage('failed to log in : wrong username or password ')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      console.log('wrong credentials')
    }
  }

  const loginForm=() => (
    <form onSubmit={handleLogin}>
      {errorMessage && <Failed message={errorMessage}/>}
      <h1>login</h1>
      <label>username
        <input
          type='text'
          value={username}
          onChange={({ target }) => setUsername(target.value)} />
      </label>
      <label>password
        <input
          type='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)} />
      </label>
      <button type='submit'>
      login
      </button>
    </form>
  )
  const logOut=() => {
    localStorage.clear()
    setUser(null)

    console.log('logged out successfully')
  }