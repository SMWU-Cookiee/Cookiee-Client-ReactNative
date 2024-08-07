export const deleteCate = async (deviceID, categoryId) => {
  try {
    const response = await fetch(
      `https://cookiee.site/api/v1/categories/${deviceID}/${categoryId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete category");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw error;
  }
};

export default deleteCate;
