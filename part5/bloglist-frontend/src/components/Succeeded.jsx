import { Alert } from '@mui/material'

const Succeeded =(props) => {
  const { message }=props
  if(!message)return null
  const styling={
    'fontSize':30,
    'color':'green',
    'backgroundColor':'lightGrey',
    'padding':10
  }
  return(
      <Alert
      severity="success"
      variant="filled"
      sx={{ mb: 2, borderRadius: 2 }}
    >
      {message}
    </Alert>
  )
}

export default Succeeded