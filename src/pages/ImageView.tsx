import { getDownloadURL, getStorage, listAll, ref } from 'firebase/storage'
import { useEffect, useState } from 'react'

const ImageView = (props: any) => {
  const [imageURL, setImageURL] = useState<String>()

  const fetchImages = async (id: any) => {
    const storage = getStorage()

    const listRef = ref(storage, `user_images/${props.id}/output/small_images/`)

    const list: any = await listAll(listRef)
    let array: String[] = []

    list.items.map(async (item: any) => {
      const getImageUrl = await getDownloadURL(
        ref(storage, item._location.path_)
      )
      setImageURL(getImageUrl)
    })
  }

  return <p>{props.id}</p>
}

export default ImageView
