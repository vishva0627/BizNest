// Storage Service for uploading logos, product images, and banner covers
import { storage, isFirebaseConfigured } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadImageFile = async (file, pathPrefix = "uploads") => {
  if (!file) return null;

  // If Firebase Storage is connected, upload to Cloud Storage
  if (isFirebaseConfigured && storage) {
    try {
      const storageRef = ref(storage, `${pathPrefix}/${Date.now()}_${file.name}`);
      const snap = await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(snap.ref);
      return downloadUrl;
    } catch (err) {
      console.warn("Firebase Storage upload failed, falling back to local base64:", err);
    }
  }

  // Fallback: Read as base64 Data URL so user sees instant image persistence
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (e) => reject(e);
    reader.readAsDataURL(file);
  });
};
