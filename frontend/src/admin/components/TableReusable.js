import React, { useState } from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import Popup from "./Popup";
import "./TableReusable.css";
import { useMutation } from "@apollo/react-hooks";
import { deleteflash } from "../graphql/gql";
function CtfTablelist({ flag, tablelabels, tablelist, history }) {
  const [userDelete, setUserDelete] = useState(-1);
  const [userEdit, setUserEdit] = useState(-1);
  const [deleteuseremail, setDeleteUserEmail] = useState("");
  const [deleteflashdb] = useMutation(deleteflash);
  const [trigger, settrigger] = useState(-1);
  const [flashid,setFlashid] = useState(null);
  const handleUserGistEdit = (id) => {};
  const handleUserGistDelete = (id, email) => {
    setDeleteUserEmail(email);
    setUserDelete(0);
  };
  const handledeleteflash = async(id) =>{
    settrigger(0);
    setFlashid(id);
    
  };
  const deleteflashdatabase = async (id)=>{
    const res = await deleteflashdb({
      variables:{
        id:id,
      }
    })
    if(res){
      history.go(0);
    }
  }
  return (
    <>
      {flag === "usergist" && (
        <div>
          <table
            id="ctftable"
            style={{
              width: "100%",
              color: "#ffffff",
            }}
          >
            <tbody>
              <tr className="table-header">
                {tablelabels.map((label) => (
                  <td>{label}</td>
                ))}
              </tr>
              {tablelist.map((item) => {
                return (
                  <>
                    <tr className="table-data">
                      <td>{item.name}</td>
                      <td>{item.profession} </td>
                      <td>{item.email}</td>
                      <td>{item.badges.length}</td>
                      <td>{item.certificate.length}</td>
                      <td>{item.flashes}</td>
                      <td>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginRight: "-15px",
                          }}
                        >
                          <div
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              handleUserGistEdit(item.id);
                            }}
                          >
                            <FaPencilAlt size={15} color="green" />
                          </div>
                          <div
                            style={{ marginLeft: "10px", cursor: "pointer" }}
                            onClick={() => {
                              console.log(item.email);
                              handleUserGistDelete(item.id, item.email);
                            }}
                          >
                            <FaTrashAlt size={15} color="tomato" />
                          </div>
                        </div>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {flag === "userpayments" && (
        <div>
          <table
            id="ctftable"
            style={{
              width: "100%",
              color: "#ffffff",
            }}
          >
            <tbody>
              <tr className="table-header">
                {tablelabels.map((label) => (
                  <td>{label}</td>
                ))}
              </tr>
              {tablelist.map((item) => {
                return (
                  <>
                    <tr className="table-data">
                      <td>{item.email}</td>
                      <td>{item.transaction_id}</td>
                      <td>{item.time_stamp}</td>
                      <td>{item.amount}</td>
                      <td>{item.flashes}</td>
                      {item.discount_coupon && (
                        <td>{item.discount_coupon.discount_percent}</td>
                      )}
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {flag === "usersecurity" && (
        <div>
          <table
            id="ctftable"
            style={{
              width: "100%",
              color: "#ffffff",
            }}
          >
            <tbody>
              <tr className="table-header">
                {tablelabels.map((label) => (
                  <td>{label}</td>
                ))}
              </tr>
              {tablelist.map((item) => {
                return (
                  <>
                    <tr className="table-data">
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.tokenVersion}</td>
                      <td>Button</td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {flag === "allcourses" && (
        <div>
          <table
            id="ctftable"
            style={{
              width: "100%",
              color: "#ffffff",
            }}
          >
            <tbody>
              <tr className="table-header">
                {tablelabels.map((label) => (
                  <td>{label}</td>
                ))}
              </tr>
              {tablelist.map((item) => {
                return (
                  <>
                    <tr className="table-data">
                      <td>{item.id}</td>
                      <td>
                        {item.course_name1}
                        {item.course_name2}
                      </td>
                      <td>{item.subtitle}</td>
                      <td>{item.difficulty}</td>
                      <td>{item.modules.length}</td>

                      <td>{item.flashes}</td>
                      <td>
                        <button onClick="">Edit</button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {flag === "allpaths" && (
        <div>
          <table
            id="ctftable"
            style={{
              width: "100%",
              color: "#ffffff",
            }}
          >
            <tbody>
              <tr className="table-header">
                {tablelabels.map((label) => (
                  <td>{label}</td>
                ))}
              </tr>
              {tablelist.map((item) => {
                return (
                  <>
                    <tr className="table-data">
                      <td>{item.id}</td>
                      <td>
                        {item.path_title1}
                        {item.path_title2}
                      </td>
                      <td>{item.difficulty}</td>
                      <td>{item.flashes}</td>

                      <td>{item.courses.length}</td>
                      <td>
                        <button>Edit</button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {flag === "allflashes" && (
        <div>
          <table
            id="ctftable"
            style={{
              width: "100%",
              color: "#ffffff",
            }}
          >
            <tbody>
              <tr className="table-header">
                {tablelabels.map((label) => (
                  <td>{label}</td>
                ))}
              </tr>
              {tablelist.map((item) => {
                return (
                  <>
                    <tr className="table-data">
                      <td>{item.id}</td>
                      <td>{item.flashes_no}</td>
                      <td> {item.amount}</td>
                      <td>{item.discount.length}</td>
                      <td><div
                            style={{ marginLeft: "10px", cursor: "pointer" }}
                            onClick={()=>handledeleteflash(item.id)}
                          >
                            <FaTrashAlt size={15} color="tomato" />
                          </div></td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {flag === "payments" && (
        <div>
          <table
            id="ctftable"
            style={{
              width: "100%",
              color: "#ffffff",
            }}
          >
            <tbody>
              <tr className="table-header">
                {tablelabels.map((label) => (
                  <td>{label}</td>
                ))}
              </tr>
              {tablelist.map((item) => {
                return (
                  <>
                    <tr className="table-data">
                      <td>{item.id}</td>
                      <td>{item.flashes_no}</td>
                      <td> {item.amount}</td>
                      <td>{item.discount.length}</td>
                      <td>Button</td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {userDelete === 0 && (
        <Popup trigger={true} setTrigger={setUserDelete}>
          <h1 className="popup-title">Deleting {deleteuseremail}!</h1>
          <p className="popup-message">Are you sure you want to delete user </p>
        </Popup>
      )}
      {userEdit === 0 && (
        <Popup trigger={true} setTrigger={setUserEdit}>
          <h1 className="popup-title"></h1>
          <p className="popup-message">Are you sure you want to delete user </p>
        </Popup>
      )}
      {trigger === 0 && (
        <Popup trigger={true} setTrigger={settrigger}>
        <h1 className="popup-title">Are You sure you want to delete?</h1>
        <p className="popup-message">{flashid} </p>
        <div style={{display:"flex", justifyContent:"flex-end"}}><button onClick={()=>{deleteflashdatabase(flashid)} }style={{color:"white", backgroundColor:"tomato", height:"30px", width:"70px", fontFamily:"sans-serif", fontSize:"12px", borderWidth:"0px", borderRadius:"7px", cursor:"pointer" }} >Delete</button></div>
        </Popup>
      )}
      
    </>
  );
}

export default CtfTablelist;

