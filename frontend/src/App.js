import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./Component/Home";
import Register from "./Component/Register";
import Login from "./Component/Login";
import Loading from "./Component/Loading";

import AdminDashboard from "./Component/AdminDashboard/AdminDashboard";
import AddEmployee from "./Component/AdminDashboard/Employee/Addemployee";
import PrivateRoute from "./Component/ProtectedRoute";
import UpdateEmployee from "./Component/AdminDashboard/Employee/Updateemployee";
import NotAuthorized from "./Component/NotAuthorized";
import DeleteEmployee from "./Component/AdminDashboard/Employee/Deleteemployee";
import AddTask from "./Component/AdminDashboard/Task/Addtask";
import Updatetask from "./Component/AdminDashboard/Task/Updatetask";
import Deletetask from "./Component/AdminDashboard/Task/Deletetask";
import AddMeeting from "./Component/AdminDashboard/Meeting/Addmeeting";
import DeleteMeeting from "./Component/AdminDashboard/Meeting/DeleteMeeting";
import EmployeeDashboard from "./Component/EmployeeDashboard/EmployeeDashboard";
import Employeeupdatetask from "./Component/EmployeeDashboard/EmployeeTasks/Employeeupdatetask";
import AccountSettings from "./Component/AccountSettings";
import UserHome from "./Component/UserHome";
const App = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Routes location={location} key={location.key}>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/not-authorized" element={<NotAuthorized />} />
          <Route
            path="/admindashboard"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </PrivateRoute>
            }
          />{" "}



          <Route
            path="/employee/update/:id"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <UpdateEmployee />
              </PrivateRoute>
            }
          />{" "}
          <Route
            path="/employee/add"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <AddEmployee />
              </PrivateRoute>
            }
          />{" "}


          
          <Route
            path="/employee/delete/:id"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <DeleteEmployee />
              </PrivateRoute>
            }
          />{" "}



          <Route
            path="/add/task"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <AddTask />
              </PrivateRoute>
            }
          />{" "}


          <Route
            path="/task/update/:id"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <Updatetask />
              </PrivateRoute>
            }
          />{" "}



          <Route
            path="/task/delete/:id"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <Deletetask />
              </PrivateRoute>
            }
          />{" "}

          
          <Route
            path="/add/meeting"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <AddMeeting />
              </PrivateRoute>
            }
          />{" "}




          <Route
            path="/meeting/delete/:id"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <DeleteMeeting />
              </PrivateRoute>
            }
          />{" "}



          <Route
            path="/employeedashboard"
            element={
              <PrivateRoute allowedRoles={["employee"]}>
                <EmployeeDashboard />
              </PrivateRoute>
            }
          />{" "}


          <Route
            path="/employeeupdatetaskstatus/:id"
            element={
              <PrivateRoute allowedRoles={["employee"]}>
                <Employeeupdatetask />
              </PrivateRoute>
            }
          />{" "}


          <Route
            path="/userhome"
            element={
              <PrivateRoute allowedRoles={["user"]}>
                <UserHome />
              </PrivateRoute>
            }
          />{" "}

            <Route path="/accountsettings" element={<AccountSettings/>}/>

          
        </Routes>
      )}
    </>
  );
};

export default App;
