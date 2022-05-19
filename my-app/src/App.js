
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';

// imports for all components
import Navbar from "./components/navbar.component";
import Home from "./components/home.component";
import StudentList from "./components/student.component";
import StudentGetOne from "./components/studentGetOne.component";
import StudentRegister from './components/studentRegister.component';
import CourseList from './components/course.component';
import UpdateCourse from './components/updateCourse.component';
import UpdateStudent from './components/updateStudent.component';
import StudentDashboard from './components/studentDashboard.component';
import TvProductList from './components/Categories/TV/tvProductList.component';
import ProductDetailedView from './components/Categories/ProductDetailedView/productView.component';
import StaffDashboard from './components/staffDashboard.component';
import StaffLogin from './components/staffLogin.component';
import StaffRegister from './components/staffRegister.component';
import SearchList from './components/search.component';
import Page404 from './components/page404.component'
import Footer from './components/footer.component';
import LoginDashboard from './components/loginDashboard.component';
import StudentLogin from './components/studentLogin.component';
import Page401 from './components/page401.component';
import AddCourse from './components/addCourse.component';
import DeleteCourse from './components/deleteCourse.component';
import DeleteStudent from './components/deleteStudent.component';
global.__basePath   = process.cwd() + '/';

function App() {
  
  return (
    <Router>
      <div className="app-flex">
        <Navbar />

        <Routes>

          {/* Customer Routes */}
          <Route path="/" element={ <Home/> }/>
          <Route path='/student/dashboard' element = {< StudentDashboard />} />
          <Route path="/student" element={<StudentList />}/>
          <Route path='/student/getOneById' element={<StudentGetOne />} />
          <Route path='/register/studentRegister' element = {< StudentRegister />} />
          <Route path='/staff/deleteStudent' element = {<DeleteStudent />} />
          <Route path='/staff/updateStudent' element = {<UpdateStudent />} />

          {/* Staff Routes */}
          <Route path='/staff/dashboard' element = {< StaffDashboard />} />
          

          {/* Course Routes */}
          <Route path='/staff/viewCourse' element = {<CourseList />} />
          <Route path='staff/addCourse' element = {<AddCourse />} />
          <Route path='/staff/updateCourse' element = {<UpdateCourse />} />
          <Route path='/staff/deleteCourse' element = {<DeleteCourse />} />
        
          {/* Login Routes */}
          <Route path='/login' element={<LoginDashboard />} />
          <Route path='/login/staffLogin' element = {<StaffLogin />} />
          <Route path='/login/studentLogin' element = {<StudentLogin />} />
          <Route path='/register/staffRegister' element = {<StaffRegister />} />

          {/* Product Routes */}
          <Route path='/product/categories/:sub_category' element = {<TvProductList />} />

          {/* Product-View Routes */}
          <Route path='/product/view/:productId' element = {<ProductDetailedView />} />

          {/* Score Routes */}
          <Route path='/staff/search' element = {<SearchList />} />
          
          {/* Handling Path Not Found */}
          <Route path='*' exact={true} element = {<Page404/>} />

          {/* Handling Unauthorised Access */}
          <Route path='/unauthorized' element = {<Page401/>} />

        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
