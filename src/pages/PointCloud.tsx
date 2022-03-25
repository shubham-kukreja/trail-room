import { getDownloadURL } from 'firebase/storage'
import { useEffect, useState } from 'react'
import useLoadPCD from 'useloadpcd'

const PointCloud = () => {
  const [pcdRef, status] = useLoadPCD('./sample.pcd', {})

  return <div ref={pcdRef} style={{ width: 800, height: 800 }} />
}

export default PointCloud
