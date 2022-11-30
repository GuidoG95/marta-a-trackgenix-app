import React, { lazy, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { tokenListener } from 'helpers/firebase';
const Home = lazy(() => import('Components/Home'));
const Admins = lazy(() => import('Components/Admins'));
const AdminsForm = lazy(() => import('Components/Admins/Form'));
const Employees = lazy(() => import('Components/Employees'));
const EmployeesForm = lazy(() => import('Components/Employees/Form'));
const Projects = lazy(() => import('Components/Projects'));
const ProjectsForm = lazy(() => import('Components/Projects/Form'));
const SuperAdmins = lazy(() => import('Components/SuperAdmins'));
const FormSuperAdmins = lazy(() => import('Components/SuperAdmins/Form'));
const Tasks = lazy(() => import('Components/Tasks'));
const TasksForm = lazy(() => import('Components/Tasks/TasksForm'));
const TimeSheets = lazy(() => import('Components/TimeSheets'));
const TimeSheetsForm = lazy(() => import('Components/TimeSheets/TimeSheetsForm'));
const EmployeeHome = lazy(() => import('Components/Employee/Home'));
const EmployeeProjects = lazy(() => import('Components/Employee/Projects'));
const EmployeeTimesheets = lazy(() => import('Components/Employee/Timesheets'));
const EmployeeTimesheetsForm = lazy(() => import('Components/Employee/Timesheets/Form'));
const EmployeeProfile = lazy(() => import('Components/Employee/Profile'));
const Login = lazy(() => import('Components/Auth/Login'));
const Register = lazy(() => import('Components/Auth/Register'));

const Routes = () => {
  useEffect(() => {
    tokenListener();
  }, []);

  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
      <Route exact path="/home">
        <Home />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route exact path="/employee">
        <Redirect to="/employee/home" />
      </Route>
      <Route exact path="/employee/home">
        <EmployeeHome />
      </Route>
      <Route path="/employee/projects">
        <EmployeeProjects />
      </Route>
      <Route exact path="/employee/time-sheets">
        <EmployeeTimesheets />
      </Route>
      <Route path="/employee/time-sheets/form">
        <EmployeeTimesheetsForm />
      </Route>
      <Route path="/employee/profile">
        <EmployeeProfile />
      </Route>
      <Route exact path="/admins">
        <Admins />
      </Route>
      <Route path="/admins/form">
        <AdminsForm />
      </Route>
      <Route exact path="/super-admins">
        <SuperAdmins />
      </Route>
      <Route path="/super-admins/form">
        <FormSuperAdmins />
      </Route>
      <Route exact path="/employees">
        <Employees />
      </Route>
      <Route path="/employees/form">
        <EmployeesForm />
      </Route>
      <Route exact path="/projects">
        <Projects />
      </Route>
      <Route path="/projects/form">
        <ProjectsForm />
      </Route>
      <Route exact path="/time-sheets">
        <TimeSheets />
      </Route>
      <Route path="/time-sheets/form">
        <TimeSheetsForm />
      </Route>
      <Route exact path="/tasks">
        <Tasks />
      </Route>
      <Route path="/tasks/form">
        <TasksForm />
      </Route>
    </Switch>
  );
};

export default Routes;
