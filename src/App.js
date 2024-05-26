import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/customer/home';
import Claim from './pages/customer/claim';
import MyClaim from './pages/customer/myclaim';
import MyOneClaim from './pages/customer/myoneclaim';
import DownloadClaim from './pages/customer/download';
import SettingC from './pages/customer/settings';

import AdminHome from './pages/admin/home';
import AdminOneclaim from './pages/admin/myoneclaim';
import AdminClaim from './pages/admin/myclaim';
import AdminEmployee from './pages/admin/register';
import AdminEmployeeList from './pages/admin/employees';
import SettingA from './pages/admin/settings';

import EmployeeHome from './pages/employee/home';
import EmployeeOneclaim from './pages/employee/myoneclaim';
import EmployeeClaim from './pages/employee/myclaim';
import EmployeeEmployee from './pages/employee/register';
import EmployeeEmployeeList from './pages/employee/employees';
import Setting from './pages/employee/settings';


import HomeLanding from './pages/landing/home';
import Login from './pages/landing/login';
import Reset from './pages/landing/reset';
import Code from './pages/landing/code';
import ResetPassword from './pages/landing/resetPassword';
import Register from './pages/landing/register';

import Logout from './pages/landing/logout';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* landing page */}
     
        <Route path="/Register" element={<Register />} exact={true} />
        <Route path="/Login" element={<Login />} exact={true} />
        <Route path="/" element={<HomeLanding />} />
        <Route path="/reset" element={<Reset />}/>
        <Route path="/code/:email" element={<Code />}/>
        <Route path="/resetPassword/:email" element={<ResetPassword />}/>
        {/*  */}

        <Route path="/logout" element={<Logout />} exact={true} />

        {/* customer pages */}
   
        <Route path="/customer" element={<Home/>} />
        <Route path="/claim" element={<Claim />} exact={true} />
        <Route path="/myclaim" element={<MyClaim />} exact={true} />
        <Route path="/one/:id" element={<MyOneClaim />} exact={true} />
        <Route path="/download/:id" element={<DownloadClaim />} exact={true} />
        <Route path="/settings" element={<SettingC/>} />

           {/* Admin pages */}
   
         <Route path="/admin_Home" element={<AdminHome/>} />
         <Route path="/admin_Employee" element={<AdminEmployee/>} />
        <Route path="/admin_claim" element={<AdminClaim />} exact={true} />
        <Route path="/admin_one/:id" element={<AdminOneclaim />} exact={true} />
        <Route path="/admin_Employee_List" element={<AdminEmployeeList/>} />
        <Route path="/settings" element={<SettingA/>} />

            {/* Admin pages */}
   
        <Route path="/employee_Home" element={<EmployeeHome/>} />
         <Route path="/employee_Employee" element={<EmployeeEmployee/>} />
        <Route path="/employee_claim" element={<EmployeeClaim />} exact={true} />
        <Route path="/employee_one/:id" element={<EmployeeOneclaim />} exact={true} />
        <Route path="/employee_Employee_List" element={<EmployeeEmployeeList/>} />
        <Route path="/settings" element={<Setting/>} />



      </Routes>
    </BrowserRouter>
  );
}

export default App;
