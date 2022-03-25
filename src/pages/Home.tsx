import {
  Box,
  Typography,
  TextField,
  Button,
  ImageList,
  ImageListItem
} from '@mui/material'
import { Link } from 'react-router-dom'
import routes from './routes'
import Wrapper from '../components/Wrapper'
import AppBar from '../components/AppBar'
import { useForm } from 'react-hook-form'
import formErrorMessages from '../utils/formErrorMessages'
import { useState } from 'react'
import Database from '../types/Database'
import { getDownloadURL, getStorage, ref } from 'firebase/storage'

const Home = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<{ name: string }>()

  const [todos, setTodos] = useState<Database.Todo[]>([])

  const [imageURL, setImageURL] = useState<String>()

  const test = async () => {
    const storage = getStorage()

    const getImageUrl = await getDownloadURL(
      ref(storage, 'model_images/render22.png')
    )

    setImageURL(getImageUrl)
  }

  return (
    <>
      <AppBar
        title='fullstrapp'
        actions={
          <Button
            color='primary'
            size='small'
            component={Link}
            to={routes.signin}
            variant='contained'
          >
            Sign In
          </Button>
        }
      />
      <Wrapper>
        <Typography paragraph variant='h5'>
          Welcome to your new app!
        </Typography>

        <Typography paragraph variant='h5'>
          Don't forget to configure your firebase settings in{' '}
          <code>/src/initFirebase.ts</code>
        </Typography>

        <Box mt={6}>
          <Typography paragraph>TODO List</Typography>
          <ul>
            {todos.map(todo => (
              <li>{todo.description}</li>
            ))}
          </ul>
        </Box>
        <form
          onSubmit={handleSubmit(vals => {
            setTodos([
              ...todos,
              {
                id: vals.name,
                description: vals.name,
                order: todos.length,
                completed: false
              }
            ])
            reset()
          })}
        >
          <TextField
            label='Enter your name'
            variant='outlined'
            fullWidth
            {...register('name', {
              required: formErrorMessages.required
            })}
            error={!!errors.name}
            helperText={errors.name?.message || ' '}
          />
          <Button type='submit' color='primary'>
            Submit
          </Button>

          <Button color='primary' onClick={() => test()}>
            Fuck U
          </Button>
        </form>
      </Wrapper>
    </>
  )
}

export default Home
