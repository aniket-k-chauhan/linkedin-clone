import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import { storage } from "../firebaseConfig";
import { editProfile } from "./FirestoreAPI";

export const uploadImage = (file, id, setProgress, handlePopupClose) => {
  const storagePathRef = ref(storage, `profileImages/${file.name}`);
  const uploadTask = uploadBytesResumable(storagePathRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setProgress(progress);
    },
    (error) => {
      console.error(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((imageURL) => {
        editProfile(id, { imageURL });
        handlePopupClose(false);
        setProgress(0);
      });
    }
  );
};

export const uploadPostImage = (file, setCurrentNewPostImage, setProgress) => {
  const storagePathRef = ref(storage, `postImages/${file.name}`);
  const uploadTask = uploadBytesResumable(storagePathRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setProgress(progress);
    },
    (error) => {
      console.error(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((imageURL) => {
        setCurrentNewPostImage(imageURL);
        setProgress(0);
      });
    }
  );
};
