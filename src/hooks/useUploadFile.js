import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useState, useEffect } from 'react';
import { storage } from '../../firebase.config';
export default function useUploadFile(imageLink) {
  const [allowUploadImageURL, setAllowUploadImageURL] = useState(true);
  const [allowUploadImage, setAllowUploadImage] = useState(true);
  const [imageFile, setImageFile] = useState('');
  const [imageURL, setImageURL] = useState(imageLink);
  const [imageProgress, setImageProgress] = useState(null);

  const handleFileInputChange = (e) => {
    // Where the image is going to be stored
    const storageRef = ref(storage, `itemImages/${Date.now()}/menuItem`);
    // How much image is uploaded by %
    const uploadImage = uploadBytesResumable(storageRef, e.target.files[0]);
    // Snapshot will provide how much image is uploaded
    uploadImage.on(
      'state_changed',
      (snapshot) => {
        const progressOfImageUpload =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageProgress(progressOfImageUpload);
      },
      (error) => {
        alert('There was error with uploading image', error);
      },
      () => {
        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
          setImageFile(url);
        });
      },
    );
  };

  useEffect(() => {
    if (imageURL !== '' && imageFile === '') {
      setAllowUploadImage(false);
    } else if (imageFile !== '' && imageURL === '') {
      setAllowUploadImageURL(false);
    } else {
      setAllowUploadImage(true);
      setAllowUploadImageURL(true);
    }
  }, [imageFile, imageURL]);
  return {
    allowUploadImage,
    allowUploadImageURL,
    imageFile,
    imageURL,
    imageProgress,
    handleFileInputChange,
    setImageURL,
  };
}
