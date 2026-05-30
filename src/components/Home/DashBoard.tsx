import React, { useContext, useEffect, useState } from "react";
import Table from "../Common/Table";
import remove from "../../assets/remove.png";
import { NavLink, Outlet } from "react-router-dom";
import type { FamilyDetail } from "../../types/family";
import userApi from "../../services/userServices";
import familyApi from "../../services/familyServices";
import UserContext from "../../contexts/UserContext";

const DashBoard = () => {
  const { reload, setReload } = useContext(UserContext);
  const [screenTimeUsers, setScreenTimeUsers] = useState<FamilyDetail[]>([]);
  const [parentflag, setFlag] = useState(0);

  useEffect(() => {
    fetchUsers();
  }, [reload]);

  const fetchUsers = async () => {
    const res = await familyApi.getFamilyMembers();
    console.log("rocky ", res);
    setScreenTimeUsers(res);
  };
  const removeUser = (id: string) => {
    userApi.delete(id);
    const filtereduser = screenTimeUsers.filter((item) => item.id != id);
    setScreenTimeUsers(filtereduser);
    setFlag(1);
  };
  return (
    <>
      <section className="align_center container">
        <Table
          headings={["UserName", "TotalScrrenTime", "ADDSCREENTIME", "Remove"]}
        >
          <tbody>
            {screenTimeUsers.map((user: FamilyDetail) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>
                  {user.screentimetotal > 0
                    ? user.screentimetotal / 60
                    : user.screentimetotal}
                </td>
                <td>
                  <NavLink
                    to={`profile/${user.id}`}
                    onClick={() => setFlag(0)}
                    className="nav-button"
                  >
                    AddScreenTime
                  </NavLink>
                </td>
                <td>
                  {/* <img
                  src={remove}
                  alt="remove icon"
                  className="cart_remove_icon"
                  onClick={() => removeUser(user.id)}
                /> */}
                  <button className="" onClick={() => removeUser(user.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* <button className="search_button checkout_button" onClick={checkout}>
        // Checkout //{" "}
      </button> */}
      </section>
      <section className="align_center cart_page">
        <Outlet context={{ parentflag, screenTimeUsers }} />
      </section>
    </>
  );
};

export default DashBoard;
