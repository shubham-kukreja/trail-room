import { useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router'
import Signin from './Signin'
import Home from './Home'
import Scanner from './Scanner'
import routes from './routes'
import { useSetRecoilState } from 'recoil'
import { sessionState } from '../state'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Main from './Main'
import PointCloud from './PointCloud'

const App = () => {
  const setSession = useSetRecoilState(sessionState)

  // Subscribe to firebase auth
  useEffect(
    () =>
      onAuthStateChanged(getAuth(), resultUser => {
        setSession({
          isAuthenticating: false,
          user: resultUser && {
            uid: resultUser.uid,
            email: resultUser.email,
            displayName: resultUser.displayName
          }
        })
      }),
    [setSession]
  )

  return (
    <Routes>
      <Route path={routes.signin} element={<Signin />} />
      <Route path={routes.main} element={<Main />} />
      <Route path={routes.scanner} element={<Scanner />} />
      <Route path={routes.pc} element={<PointCloud />} />

      <Route path='*' element={<Navigate to={routes.main} />} />
    </Routes>
  )
}

export default App
