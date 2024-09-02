import React from 'react'
import { FaArrowRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import HighlightText from '../components/Homepage/HighlightText';
import Button from '../components/Homepage/Button';
import MainVideo from '../assets/Images/banner1.mp4'
import CodeBlock from '../components/Homepage/CodeBlock';
import LearningLanguageSection from '../components/Homepage/LearningLanguageSection';
import InstructorSection from '../components/Homepage/InstructorSection';
import Footer from '../components/Footer';
import ExploreMore from '../components/Homepage/ExploreMore';
import ReviewSlider from '../components/ReviewSlider';

const Homepage = ()=>{
    return (
        <div>
            {/* Section 1 */}
            <div className='relative mx-auto flex flex-col w-11/12 items-center text-white justify-between gap-8'>
            
                <Link to={"/signup"}>
                    <div className="group mx-auto mt-16 w-fit rounded-full font-semibold bg-red-600 p-1 text-gray-200 transition-all duration-200 hover:scale-95">
                        <div className="flex flex-row items-center gap-2 rounded-full px-7 py-[5px] transition-all duration-200 group-hover:bg-red-700">
                            <p>Become an Instructor</p>
                            <FaArrowRight />
                        </div>
                    </div>
                </Link>

                <div className="text-center text-4xl font-semibold">
                    Empower Your Future with
                    <HighlightText text={"Coding Skills"} />
                </div>

                <div className="-mt-3 w-[70%] text-center text-lg font-bold text-gray-400">
                    With our online coding courses, you can learn at your own pace, from
                    anywhere in the world, and get access to a wealth of resources,
                    including hands-on projects, quizzes, and personalized feedback from
                    instructors.
                </div>

                <div className="mt-8 flex flex-row gap-7">
                    <Button link={"/login"} bool={true}>
                        Learn More
                    </Button>
                    <Button link={"/login"} bool={false}>
                        Book a Demo
                    </Button>
                </div> 

                <div className="mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200 w-[80vw]">
                    <video className="shadow-[10px_10px_rgba(255,255,255)] sm:shadow-[15px_15px_rgba(255,255,255)]" muted loop autoPlay>
                        <source src={MainVideo} type="video/mp4" />
                    </video>
                </div>

                <div>
                    <CodeBlock
                        position={"lg:flex-row"}
                        heading={
                        <div className="text-4xl font-semibold">
                            Unlock your
                            <HighlightText text={"coding potential"} /> with our online
                            courses.
                        </div>
                        }
                        subheading={
                        "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                        }
                        btn1={{
                        btnText: "Try it Yourself",
                        link: "/signup",
                        bool: true,
                        }}
                        btn2={{
                        btnText: "Learn More",
                        link: "/signup",
                        bool: false,
                        }}
                        codeColor={"text-yellow-100"}
                        codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
                        backgroundGradient={<div className="bg-gradient-to-r from-red-400 to-pink-600 absolute w-56
                                 h-[30vh] rounded-full z-1 backdrop-blur-sm opacity-40 blur-xl "></div>}
                    />
                </div>

                <div>
                    <CodeBlock
                        position={"lg:flex-row-reverse"}
                        heading={
                        <div className="w-[100%] text-4xl font-semibold lg:w-[50%]">
                            Start
                            <HighlightText text={"coding in seconds"} />
                        </div>
                        }
                        subheading={
                        "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                        }
                        btn1={{
                        btnText: "Continue Lesson",
                        link: "/signup",
                        bool: true,
                        }}
                        btn2={{
                        btnText: "Learn More",
                        link: "/signup",
                        bool: false,
                        }}
                        codeColor={"text-green-200"}
                        codeblock={`import React from "react";\n import Button from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
                        backgroundGradient={<div className="bg-gradient-to-r from-teal-400 to-blue-500 absolute
                                 h-[30vh] rounded-full z-1 backdrop-blur-sm opacity-40 blur-xl w-56"></div>}
                    />
                </div>

                <ExploreMore/>

            </div>

            {/* Section 2 */}
            <div className=" bg-white text-gray-700 -z-10">
                <div className="homepage_bg h-[320px]">
                    <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 ">
                        <div className="h-[80px] bg-transparent"></div>
                        <div className="flex flex-row gap-7 text-white mt-8">
                            <Button bool={true} link={"/signup"}>
                                <div className="flex items-center gap-2">
                                Explore Full Catalog
                                <FaArrowRight />
                                </div>
                            </Button>
                            <Button bool={false} link={"/login"}>
                                Learn More
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 ">
                    {/* Job that is in Demand - Section 1 */}
                    <div className="mb-10 flex flex-col justify-between gap-7 mt-20 lg:flex-row lg:gap-0">
                        <div className="text-4xl font-semibold lg:w-[45%] ">
                            Get the skills you need for a{" "}
                            <HighlightText text={"job that is in demand."} />
                        </div>
                        <div className="flex flex-col items-start gap-10 lg:w-[40%]">
                            <div className="text-[16px]">
                                The modern StudyNotion is the dictates its own terms. Today, to
                                be a competitive specialist requires more than professional
                                skills.
                            </div>
                            <Button bool={true} link={"/signup"}>
                                <div className="text-white">Learn More</div>
                            </Button>
                        </div>
                    </div>
                </div>

                <LearningLanguageSection/>

            </div>

            {/* Section 3 */}
            <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-black text-white">
                {/* Become a instructor section */}
                    <InstructorSection />
            </div>

            <Footer/>


        </div>
    )
}

export default Homepage;

