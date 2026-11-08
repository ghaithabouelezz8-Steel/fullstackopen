import { Alert } from '@mui/material'
const Failed=(props) => {
  const { message }=props
  const styling={
    'color':'red',
    'backgroundColor':'lightGrey',
    'fontSize':30,
    'padding':10
  }
  if(!message)return null
  return(
     <Alert
      severity="error"
      variant="filled"
      sx={{ mb: 2, borderRadius: 2 }}
    >
      {message}
    </Alert>
  )
}
export default Failed