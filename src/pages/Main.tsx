import { getDownloadURL, getStorage, listAll, ref } from 'firebase/storage'
import { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material'
import Wrapper from '../components/Wrapper'
import Scanner from './Scanner'
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import RefreshIcon from '@mui/icons-material/Refresh'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'
import CloseIcon from '@mui/icons-material/Close'
import { useParams } from 'react-router'

const QrReader = require('react-qr-scanner')

interface Data {
  url: String
  name: String
}

const Main = () => {
  const [imageURLs, setImageURLs] = useState<Data[]>([])
  const [comp, setComp] = useState([])
  const [number, setNumber] = useState(1)
  const [delay, setDelay] = useState(100)
  const [result, setResult] = useState('No Result')
  const [showScanner, setShowScanner] = useState(false)
  const [alignment, setAlignment] = useState('left')

  let { qr } = useParams()

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment)
  }

  const children = [
    <ToggleButton value='right' key='right'>
      <RemoveRedEyeIcon />
    </ToggleButton>,
    <ToggleButton value='left' key='left'>
      <VisibilityOffIcon />
    </ToggleButton>
  ]

  const control = {
    value: alignment,
    onChange: handleChange,
    exclusive: true
  }

  const fetchImages = async (id: any) => {
    setImageURLs(state => [])
    const storage = getStorage()
    let listRef
    if (alignment === 'right')
      listRef = ref(storage, `user_images/${id}/output/small_images/`)
    else listRef = ref(storage, `model_images/`)
    let list: any = await listAll(listRef)
    let array: String[] = []

    list.items.sort()

    list.items.map(async (item: any) => {
      const getImageUrl = await getDownloadURL(
        ref(storage, item._location.path_)
      )
      const httpsReference = ref(storage, getImageUrl)
      const name = httpsReference.name
      setImageURLs(state => [
        ...state,
        { url: getImageUrl, name: name.slice(0, -4).toUpperCase() }
      ])
    })
  }

  useEffect(() => {
    if (qr) localStorage.setItem('qr', qr)
    fetchImages(localStorage.getItem('qr'))
  }, [alignment])

  const previewStyle = {
    height: '100%',
    width: '100%'
  }

  return (
    <div>
      {!showScanner && (
        <div
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 9999,
            backgroundColor: 'white',
            padding: 20,
            paddingBottom: 20,
            borderTop: '2px #2196f3 solid',
            borderBottom: '2px #2196f3 solid'
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <Button
                color='primary'
                onClick={() => fetchImages(localStorage.getItem('qr'))}
              >
                <RefreshIcon />
              </Button>
              <Button color='primary'>
                <QrCodeScannerIcon
                  style={{ color: localStorage.getItem('qr') ? 'green' : '' }}
                  onClick={() => setShowScanner(true)}
                />
              </Button>
            </div>
            <div>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'right',
                  // TODO Replace with Stack
                  '& > :not(style) + :not(style)': { mt: 2 }
                }}
              >
                <ToggleButtonGroup size='small' {...control}>
                  {children}
                </ToggleButtonGroup>
              </Box>
            </div>
          </div>
        </div>
      )}
      <Wrapper>
        {showScanner && (
          <div>
            <Button
              color='primary'
              sx={{
                borderRadius: 28
              }}
              onClick={() => setShowScanner(false)}
            >
              <CloseIcon />
            </Button>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div
              style={{
                padding: 10,
                border: '3px #2196f3 dotted',
                paddingBottom: 7
              }}
            >
              <QrReader
                delay={delay}
                style={previewStyle}
                onError={(err: any) => console.log(err)}
                onScan={(data: any) => {
                  if (data != null) {
                    console.log(data)
                    setResult(data.text)
                    localStorage.setItem('qr', data.text)
                    fetchImages(data.text)
                    setShowScanner(false)
                  }
                }}
                facingMode={'rear'}
              />
            </div>
          </div>
        )}

        {!showScanner &&
          imageURLs.map((item, index) => (
            <Card
              sx={{ marginBottom: 5 }}
              key={index}
              style={{
                height: '900',
                boxShadow:
                  '0 10px 20px rgba(0,0,0,0.06), 0 6px 6px rgba(0,0,0,0.08)'
              }}
            >
              <CardActionArea>
                {alignment && (
                  <CardMedia
                    component='img'
                    height='140'
                    image={`${item.url}`}
                    alt='green iguana'
                  />
                )}
                <CardContent
                  style={{ margin: 0, borderTop: '1px solid #2196f3' }}
                >
                  <Typography gutterBottom variant='h5' component='div'>
                    {item?.name}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    A T-shirt, or tee shirt, is a style of fabric shirt named
                    after the T shape of its body and sleeves.
                  </Typography>
                </CardContent>
                <CardActions
                  style={{
                    padding: 10,
                    paddingBottom: 15,
                    textAlign: 'center'
                  }}
                >
                  <Button variant='contained' size='large'>
                    BUY NOW
                  </Button>
                  <Button variant='outlined' size='large'>
                    ADD TO CART
                  </Button>
                </CardActions>
              </CardActionArea>
            </Card>
          ))}
      </Wrapper>
    </div>
  )
}

export default Main
