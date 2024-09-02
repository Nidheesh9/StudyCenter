import { toast } from "react-hot-toast"

import { apiConnector } from "../apiConnector"
import { catalogData, categories } from "../apis"

export const getCatalogPageData = async (categoryId) => {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    const response = await apiConnector(
      "POST",
      catalogData.CATALOGPAGEDATA_API,
      {
        categoryId: categoryId,
      }
    )
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Catagory page data.")
    }
    result = response?.data
  } catch (error) {
    console.log("CATALOGPAGEDATA_API API ERROR............", error)
    toast.error(error.message,{icon:'❌'})
    result = error.response?.data
  }
  toast.dismiss(toastId)
  return result
}

export const getAllTags = async () => {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    const response = await apiConnector(
      "GET",
      categories.CATEGORIES_API
    )
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Catagory page data.")
    }
    result = response?.data
  } catch (error) {
    console.log("CATALOGPAGEDATA_API API ERROR............", error)
    // result = error.response?.data
    toast.error(error.message,{icon:'❌'})
  }
  toast.dismiss(toastId)
  return result
}
