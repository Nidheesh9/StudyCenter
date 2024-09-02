import React, { useEffect, useState } from "react"
import Footer from "../components/Footer"
import Course_Slider from "../components/Catalog/Course_Slider"
import { getAllTags } from "../services/operations/pageAndComponntDatas"
import Error from "./Error"
import toast from "react-hot-toast"

function Catalog() {
  const [catalogPageData, setCatalogPageData] = useState(null)

  const getAllCategories = async()=>{
    try{
        const res = await getAllTags();
        console.log("Category:",res);
        if(res?.data) setCatalogPageData(res?.data);
    }catch(e){
        toast.error(e.message,{icon:'❌'});
    }
  }

  useEffect(()=>{
    getAllCategories()
  },[]);

  if (catalogPageData==null) {
    return <Error />
  }

  return (
    <>
        {
            catalogPageData?.length > 0 && (
                <div>
                    {catalogPageData.map((category,i)=>(
                        <div className="flex flex-col justify-center items-center border-white border-y-2" key={i}>
                            {/* Hero Section */}
                            <div className=" bg-zinc-800 px-4 w-11/12 place-content-center">
                                <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
                                <p className="text-sm text-gray-300">
                                    {`Catalog / `}
                                    <span className="text-yellow-100">
                                    {category.name}
                                    </span>
                                </p>
                                <p className="text-3xl text-gray-200">
                                    {category.name}
                                </p>
                                <p className="max-w-[870px] text-gray-200">
                                    {category.description}
                                </p>
                                </div>
                            </div>

                            {/* Section 1 */}
                            {/* <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                                <div className="section_heading">Courses to get you started</div>
                                <div className="my-4 flex border-b border-b-gray-600 text-sm">
                                <p
                                    className={`px-4 py-2 ${
                                    active === 1
                                        ? "border-b border-b-yellow-200 text-yellow-100"
                                        : "text-gray-200"
                                    } cursor-pointer`}
                                    onClick={() => setActive(1)}
                                >
                                    Most Populer
                                </p>
                                <p
                                    className={`px-4 py-2 ${
                                    active === 2
                                        ? "border-b border-b-yellow-25 text-yellow-100"
                                        : "text-gray-200"
                                    } cursor-pointer`}
                                    onClick={() => setActive(2)}
                                >
                                    New
                                </p>
                                </div>
                                <div>
                                {/* <Course_Slider
                                    Courses={catalogPageData?.data?.selectedCategory?.courses}
                                /> 
                                </div>
                            </div> */}
                            {/* Section 2 */}
                            <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                                <div className="section_heading text-zinc-50">
                                Top courses in {category.name}
                                </div>
                                <div className="py-8">
                                <Course_Slider
                                    Courses={category?.courses}
                                />
                                </div>
                            </div>
                        </div>
                    ))}
                    {/* Section 3 */}
                    <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                            <div className="section_heading text-zinc-50">Frequently Bought</div>
                            <div className="py-8">
                            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                {/* {catalogPageData?.data?.mostSellingCourses
                                ?.slice(0, 4)
                                .map((course, i) => (
                                    <Course_Card course={course} key={i} Height={"h-[400px]"} />
                                ))} */}
                            </div>
                            </div>
                        </div>
                </div>
            )
        }

      <Footer />
    </>
  )
}

export default Catalog
