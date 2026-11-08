import { Box, TextField, Button, Typography, Paper } from '@mui/material'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
    
  return (
       <Paper
      elevation={3}
      sx={{
        padding: 4,
        maxWidth: 400,
        margin: '40px auto',
        borderRadius: 2
      }}
    >
    <Typography variant="h5" component="h2" sx={{ mb: 3 }}>
      Login
 </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="username"
          type="text"
          value={username}
          onChange={handleUsernameChange}
          fullWidth
          margin="normal"
        />
       <TextField
          label="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          fullWidth
          margin="normal"
        />

          <Button
          id="login-button"
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
        >   login
        </Button>
      </Box>
      
    
    </Paper>
  )
}

export default LoginForm