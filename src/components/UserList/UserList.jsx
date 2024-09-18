import { Link } from "react-router-dom";
import style from "./user-list.module.scss";
import { useEffect, useState } from "react";
import moment from "moment";
import { Modal, Button, Pagination } from "react-bootstrap";

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

  const deleteUser = async (id) => {
    await fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
    });
    await fetchUsers();
    setShow(false);
  };
  // show - hide modal
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true);
  };
  // retrieve user for delete
  const [selectedUser, setSelectedUser] = useState(null);

  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1); // lưu trang hiện tại, default là 1
  const [pageSize, setPageSize] = useState(5); // số phần tử 1 trang
  const [totalUsers, setTotalUsers] = useState(0); // tổng số lượng người dùng
  const fetchUsers = async () => {
    const userList = await fetch(
      // `http://localhost:3000/users?_page=${page}&_limit=${pageSize}`
      "http://localhost:3000/users"
    );
    const data = await userList.json();
    // const totalCount = data.headers.get("X-Total-Count"); // Lấy tổng số lượng từ headers nếu server hỗ trợ
    userList.headers.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    setUserList(data);
    // setTotalUsers(totalCount);
  };
  const pageCounts = Array.from({ length: pageCount }, (_, i) => i + 1);
  console.log("hello ", pageCounts);

  useEffect(() => {
    setPageCount(Math.ceil(userList.length / 5));
  }, []);
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
                        onClick={() => {
                          handleShow();
                          setSelectedUser(item);
                        }}
                      ></button>
                    </td>
                  </tr>
                );
              })}
            </table>
          </div>
        </div>
        <div className={style.pagination}>
          <div className={style.page__size}>
            {/* <p className="m-0">Show on page: </p>
            <select name="pageSize" id="pageSize"> */}
            {/* <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option> */}
            {/* </select> */}
          </div>
          <div className="user-pagination">
            <Pagination className="m-0">
              {pageCounts.map((item) => {
                return (
                  <Pagination.Item key={item} active={item + 1 === 2}>
                    {item}
                  </Pagination.Item>
                );
              })}
            </Pagination>
          </div>
        </div>
      </div>
      <Modal show={show} centered>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to delete </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShow(false);
              // selectedUser(null);
            }}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              deleteUser(selectedUser?.id);
              setSelectedUser(null);
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserList;
