import { doc, getDoc } from 'firebase/firestore'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import FirestoreCollectionPaths from '../types/FirestoreCollectionPaths'

const storage = getStorage()

export const getImage = async <T extends keyof FirestoreCollectionPaths>(
  collectionPath: T,
  recordId: string
) => {}
