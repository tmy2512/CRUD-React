import { Link } from "react-router-dom";
import style from "./user-list.module.scss";
import { useEffect, useState } from "react";
import moment from "moment";

const UserList = () => {
  const department = [
    {
      value: "vti",
      label: "VTI Group",
    },
    {
      value: "fsoft",
      label: "FPT Software",
    },
    {
      value: "cmc",
      label: "CMC Corporation",
    },
    {
      value: "rikkesoft",
      label: "RikkeSoft",
    },
  ];
  const position = [
    {
      value: "dev",
      label: "Developer",
    },
    {
      value: "ba",
      label: "Business Analyst",
    },
    {
      value: "comtor",
      label: "Comtor",
    },
    {
      value: "sale",
      label: "Saler",
    },
  ];
  const renderDepartment = (value) => {
    const selectedDepartment = department.find((item) => item.value === value);
    return selectedDepartment.label;
  };
  const renderPostioin = (value) => {
    const selectedPosition = position.find((item) => item.value === value);
    return selectedPosition.label;
  };
  const [userList, setUserList] = useState([]);
  const fetchUsers = async () => {
    const userList = await fetch("http://localhost:3000/users");
    const data = await userList.json();
    setUserList(data);
  };
  const deleteUser = async (id) => {
    await fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
    });
    await fetchUsers();
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <>
    <div className={style.list__container}>
      <div className={style.list__wrapper}>
        <div className={style.list__header}>
          <h3>User Manager</h3>
          <Link to="/user/create">
            <span></span>
            <span>Add new user</span>
          </Link>
        </div>
        <div>
          <table className={style.list__table}>
            <tr>
              <th>#</th>
              <th>Fullname</th>
              <th>Email</th>
              <th>Department</th>
              <th>Position</th>
              <th>Date created</th>
              <th>Action</th>
            </tr>
            {userList?.map((item, index) => {
              return (
                <tr key={item?.id}>
                  <td>{index + 1}</td>
                  <td>{item?.fullName}</td>
                  <td>{item?.email}</td>
                  <td>{renderDepartment(item?.department)}</td>
                  <td>{renderPostioin(item?.position)}</td>
                  <td>{moment(item?.dateCreated).format("ll")}</td>
                  <td className={style.list__action}>
                    <Link
                      to={`/user/${item?.id}`}
                      className={style.list__btn__edit}
                    ></Link>
                    <button
                      className={style.list__btn__delete}
                      onClick={() => deleteUser(item?.id)}
                    ></button>
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    </div>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;
    </>
  );
};
export default UserList;
