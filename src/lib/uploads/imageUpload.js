"use server";
export const uploadImage = async (imageFormData) => {
  try {
    const IMGBB_API_KEY = process.env.IMGBB_API_KEY;
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
      {
        method: "POST",
        body: imageFormData,
      },
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
