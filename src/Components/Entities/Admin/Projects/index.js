import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from './projects.module.css';
import Button from 'Components/Shared/Button';
import Table from 'Components/Shared/Table';
import Modal from 'Components/Shared/Modal';
import Loader from 'Components/Shared/Loader';
import Error from 'Components/Shared/Error';
import { getProjects, putProject } from 'redux/Projects/thunks';

const Projects = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { list: projectsArray, isPending, error } = useSelector((state) => state.projects);
  const [modal, setModal] = useState(false);
  const [modalEmployee, setModalEmployee] = useState(false);
  const [projectEmployees, setProjectEmployees] = useState([]);
  const [isModal, setFeedbackModal] = useState(false);
  const token = sessionStorage.getItem('token');
  const [feedback, setFeedback] = useState({ heading: '', message: '', theme: '' });
  const [itemToDeactivate, setItemToDeactivate] = useState({});
  const headers = {
    name: 'Name',
    clientName: 'Client name',
    description: 'Description',
    startDateFormat: 'Start date',
    endDateFormat: 'End date',
    projectManagerName: 'Project Manager',
    employeesCmp: 'Employees',
    status: 'Status'
  };

  useEffect(() => {
    dispatch(getProjects(token));
  }, []);

  const projectColumns = projectsArray?.map((row) => ({
    ...row,
    status: row.active ? 'Active' : 'Inactive',
    startDateFormat: row.startDate.slice(0, 10),
    endDateFormat: row.endDate.slice(0, 10),
    projectManagerName: row.projectManager?.name + ' ' + row.projectManager?.lastName,
    employeesCmp: (
      <Button
        label="See employees"
        theme="primary"
        onClick={() => showEmployees(row.employees.filter((employee) => employee.id !== null))}
      />
    )
  }));

  const handleEdit = (item) => {
    history.push('/admin/projects/form', {
      id: item._id,
      project: {
        name: item.name,
        clientName: item.clientName,
        description: item.description,
        active: item.active,
        startDate: item.startDate?.slice(0, 10),
        projectManager: item.projectManager,
        endDate: item.endDate?.slice(0, 10),
        employees: item.employees?.map((e) => ({
          employeeId: e.id?._id,
          role: e.role,
          rate: e.rate
        }))
      }
    });
  };

  const handleActive = (item) => {
    setItemToDeactivate(item);
    setModal(true);
  };

  const desactivateItem = () => {
    if (itemToDeactivate) {
      dispatch(putProject(itemToDeactivate._id, { active: !itemToDeactivate.active }, token));
      if (error) {
        setFeedback({ heading: 'There was an error', message: error, theme: 'error' });
        setFeedbackModal(true);
      } else {
        setFeedback({
          heading: 'Success!',
          message: `The project "${itemToDeactivate.name}" was successfully ${
            itemToDeactivate.active ? 'deactivated' : 'activated'
          }.`,
          theme: 'success'
        });
        setFeedbackModal(true);
      }
    }
  };

  const showEmployees = (employees) => {
    if (employees) {
      const projectEmployees = employees.map((employee) => ({
        name: `${employee.id.name} ${employee.id.lastName}`,
        role: employee.role,
        rate: employee.rate
      }));
      setProjectEmployees(projectEmployees);
      setModalEmployee(true);
    }
  };

  return (
    <section className={styles.container}>
      {isPending && <Loader />}
      {error && <Error text={`There has been an error: ${error}`} />}
      {!isPending && !error ? (
        <Table
          data={projectColumns}
          headers={headers}
          title="Projects"
          redirectLink="projects/form"
          editItem={handleEdit}
          editStatus={handleActive}
          itemsPerPage={5}
          isSearchEnabled
        />
      ) : null}
      {modalEmployee && (
        <Modal setModalDisplay={setModalEmployee} heading="Project employees">
          <div className={styles.employeesTableContainer}>
            <Table
              data={projectEmployees}
              headers={{ name: 'Employee', role: 'Role', rate: 'Rate' }}
            />
          </div>
        </Modal>
      )}
      {!isPending && modal && (
        <Modal
          setModalDisplay={setModal}
          heading="Confirmation required"
          theme="confirm"
          message={`Are you sure you want to ${
            itemToDeactivate.active ? 'deactivate' : 'activate'
          } the project "${itemToDeactivate.name}"?`}
          confirmFunction={desactivateItem}
        />
      )}
      {isModal && (
        <Modal
          setModalDisplay={setFeedbackModal}
          heading={feedback.heading}
          message={feedback.message}
          theme={feedback.theme}
        />
      )}
    </section>
  );
};

export default Projects;
