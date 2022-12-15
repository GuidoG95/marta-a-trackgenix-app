import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTimeSheets } from 'redux/TimeSheets/thunks';
import styles from './timesheets.module.css';
import Table from 'Components/Shared/Table';
import Loader from 'Components/Shared/Loader';
import Error from 'Components/Shared/Error';

const EmployeeTimesheets = () => {
  const { list: timesheetList, isPending, error } = useSelector((state) => state.timesheets);
  const token = sessionStorage.getItem('token');
  const email = useSelector((state) => state.auth.authenticated.email);
  const dispatch = useDispatch();
  const history = useHistory();
  const headers = {
    projectName: 'Project Name',
    taskDescription: 'Task Description',
    description: 'Description',
    hours: 'Hours'
  };

  const timesheetListFiltered = timesheetList.filter((t) => t.employee?.email === email);

  const timeSheetData = timesheetListFiltered.map((row) => ({
    ...row,
    date: row.date.slice(0, 10),
    project: row.project?._id,
    task: row.task?._id,
    employee: row.employee?._id,
    projectName: row.project?.name ?? 'N/A',
    taskDescription: row.task?.description ?? 'N/A',
    employeeFormat: row.employee ? `${row.employee?.name} ${row.employee?.lastName}` : 'N/A'
  }));

  useEffect(() => {
    dispatch(getTimeSheets(token));
  }, []);

  const handleEdit = (item) => {
    history.push(`/employee/time-sheets/form`, item);
  };

  return (
    <section className={styles.container}>
      {isPending && <Loader />}
      {error && <Error text={error} />}
      {!isPending && !error && (
        <Table
          headers={headers}
          data={timeSheetData}
          editItem={handleEdit}
          title="My timesheets"
          itemsPerPage={5}
        />
      )}
      {error && <p>{error}</p>}
    </section>
  );
};

export default EmployeeTimesheets;
