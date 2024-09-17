import { Link } from "react-router-dom";
import style from "./user-list.module.scss";

const UserList = () => {
  return (
    <div className={style.list__container}>
      <div className={style.list__wrapper}>
        <div className={style.list__header}>
          <h3>User Manager</h3>
          <Link>
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
            <tr>
              <td>1</td>
              <td>abc</td>
              <td>avc</td>
              <td>aa</td>
              <td>aa</td>
              <td>aa</td>
              <td className={style.list__action}>
                <Link className={style.list__btn__edit}></Link>
                <button className={style.list__btn__delete}></button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};
export default UserList;
