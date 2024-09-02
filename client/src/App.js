import './App.css'
import { Route, Routes } from "react-router-dom";
import { useSelector } from 'react-redux';

import Login from "./pages/Login";
import About from './pages/About';
import Signup from './pages/Signup';
import Contact from './pages/Contact';
import Homepage from "./pages/Homepage";
import Dashboard from './pages/Dashboard';
import VerifyEmail from './pages/VerifyEmail';
import ResetPassword from './pages/ResetPassword';
import ForgotPassword from './pages/ForgotPassword';

import Navbar from "./components/Navbar";
import Cart from './components/Dashboard/Cart';
import OpenRoute from "./components/Auth/OpenRoute";
import Settings from './components/Dashboard/Settings';
import MyCourses from './components/Dashboard/MyCourses';
import AddCourse from "./components/Dashboard/AddCourse";
import MyProfile from './components/Dashboard/MyProfile';
import PrivateRoute from "./components/Auth/PrivateRoute";
import EnrolledCourses from './components/Dashboard/EnrolledCourses';
import EditCourse from "./components/Dashboard/EditCourse"
import Instructor from "./components/Dashboard/Instructor"

import { ACCOUNT_TYPE } from './utils/constants';
import Catalog from './pages/Catalog';
import Error from './pages/Error';
import CourseDetails from './pages/CourseDetails';
import ViewCourse from './pages/ViewCourse';
import VideoDetails from './components/ViewCourse/VideoDetails';

function App() {
  const { user } = useSelector((state) => state.profile)

  return (
    <div className="flex flex-col font-inter bg-black w-screen min-h-screen">
      <Navbar/>
      <Routes>

        <Route path="/" element={<Homepage/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/catalog" element={<Catalog/>}/>
        <Route path='/courses/:courseId' element={<CourseDetails/>}/>
        <Route path="*" element={<Error/>}/>
        
        <Route path="/login" element={<OpenRoute><Login/></OpenRoute>}/>
        <Route path="/signup" element={<OpenRoute><Signup/></OpenRoute>}/>
        <Route path="/verify-email" element={<OpenRoute><VerifyEmail/></OpenRoute>}/>
        <Route path="/forgot-password" element={<OpenRoute><ForgotPassword/></OpenRoute>}/>
        <Route path="/reset-password/:id" element={<OpenRoute><ResetPassword/></OpenRoute>}/>

        <Route element={<PrivateRoute><Dashboard/></PrivateRoute>}>

          <Route path='/dashboard/settings' element={<Settings/>}/>
          <Route path='/dashboard/my-profile' element={<MyProfile/>}/>
          {user?.accountType===ACCOUNT_TYPE.STUDENT && (
            <>
              <Route path='/dashboard/cart' element={<Cart/>}/>
              <Route path='/dashboard/enrolled-courses' element={<EnrolledCourses/>}/>
            </>
          )}
          {user?.accountType===ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path='dashboard/add-course' element={<AddCourse/>}/>
              <Route path='dashboard/my-courses' element={<MyCourses/>}/>
              <Route path='dashboard/edit-course/:courseId' element={<EditCourse/>}/>
              <Route path='dashboard/instructor' element={<Instructor/>}/>
            </>
          )}

        </Route>

        <Route element={<PrivateRoute><ViewCourse/></PrivateRoute>}>
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <Route path="view-course/:courseId" element={<VideoDetails />}
              />
          )}
        </Route>
        
      </Routes>
    </div>
  );
}

export default App;
