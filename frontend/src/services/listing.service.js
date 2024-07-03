import axios from "axios";
import authHeader from "./auth-header";
const validImageTypes = [
  "image/svg",
  "image/jpeg",
  "image/png",
  "image/bmp",
  "image/webp",
];
//needed to upload to cloudinary on backend
const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

// Client side validation as server side check of base64 img is not possible
// Cloudinary will still throw error if client side validation is bypassed
const checkFileType = (file) => {
  const fileType = file["type"];
  if (!validImageTypes.includes(fileType))
    throw new Error("Please upload a valid image file type");
};

export const addListing = async (id, listing) => {
  try {
    checkFileType(listing.image);
    listing.image = await convertBase64(listing.image);
    const res = await axios.post(
      `https://ecommerce-web-app-dlhg.onrender.com/listings/add/${id}`,
      listing,
      {
        headers: authHeader(),
      }
    );
    console.log(res.data);
    if (res.status === 201) {
      return res;
    }
  } catch (e) {
    return e;
  }
};
export const editListing = async (id, listing) => {
  try {
    if (listing.MainImage) {
      checkFileType(listing.MainImage);
      listing.MainImage = await convertBase64(listing.MainImage);
    } else delete listing.MainImage;
    delete listing.editListing;
    const res = await axios.put(
      `https://ecommerce-web-app-dlhg.onrender.com/listings/edit`,
      listing,
      {
        headers: authHeader(),
      }
    );
    console.log(res.data);
    if (res.status === 200) {
      return res;
    }
  } catch (e) {
    return e;
  }
};
export const deleteListing = async (id) => {
  try {
    const res = await axios.delete(
      `https://ecommerce-web-app-dlhg.onrender.com/listings/delete/${id}`,
      {
        headers: authHeader(),
      }
    );
    console.log(res.data);
    if (res.status === 200) {
      return res;
    }
  } catch (e) {
    return e;
  }
};
export const getAllListings = async () => {
  try {
    const res = await axios.get(
      "https://ecommerce-web-app-dlhg.onrender.com/listings"
    );
    console.log(res.data);
    if (res.status === 200) {
      return res;
    }
    throw new Error(`No listings found`);
  } catch (e) {
    return e;
  }
};
export const getSellerListings = async (id) => {
  try {
    const res = await axios.get(
      `https://ecommerce-web-app-dlhg.onrender.com/listings/${id}`,
      {
        headers: authHeader(),
      }
    );
    console.log(res.data);
    if (res.status === 200) {
      return res;
    }
    throw new Error(`No listings found`);
  } catch (e) {
    return e;
  }
};
export const getListingsbyQuery = async (query) => {
  try {
    console.log(query);
    const res = await axios.get(
      `https://ecommerce-web-app-dlhg.onrender.com/listings/search/${query}`
    );
    console.log(res.data);
    if (res.status === 200) {
      return res;
    }
    throw new Error(`Search failed`);
  } catch (e) {
    return e;
  }
};
