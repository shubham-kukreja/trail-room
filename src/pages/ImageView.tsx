import { getDownloadURL, getStorage, listAll, ref } from 'firebase/storage'
import { useEffect, useState } from 'react'

const ImageView = (props: any) => {
  const [imageURL, setImageURL] = useState<String>()

  const fetchImages = async (id: any) => {
    const storage = getStorage()

    const listRef = ref(
      storage,
      `user_images/${props.id}/output/small_images/${props.imageURL}`
    )

    const getImageUrl = await getDownloadURL(listRef)

    setImageURL(getImageUrl)
  }

  return <p>{imageURL}</p>
}

export default ImageView
