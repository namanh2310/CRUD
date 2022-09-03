import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, delUser, updateUser } from "./features/UserSlice";
import "./App.css";
import moment from "moment";
import FileBase64 from "react-file-base64";

function App() {
  const [name, setName] = useState("");
  // const [nickname, setNickname] = useState("");
  const [newName, setNewName] = useState("");
  const [img, setImg] = useState("");

  const dispatch = useDispatch();
  const userList = useSelector((state) => state.users.value);

  useEffect(() => {
    console.log(userList);
  }, [userList]);

  return (
    <div className="container">
      <div className="header">USER MANAGEMENT</div>
      <div className="input-area">
        <input
          type="text"
          className="input-field"
          value={name}
          placeholder="Name..."
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <FileBase64
          accept="image/*"
          multiple={false}
          type="file"
          onDone={({ base64 }) => setImg(base64)}
          value={img}
        />

        {/* <input
          type="text"
          className="input-field"
          value={nickname}
          placeholder="Nickname..."
          onChange={(e) => {
            setNickname(e.target.value);
          }}
        /> */}

        <button
          className="add-btn"
          onClick={() => {
            if (name.trim() !== "") {
              dispatch(
                addUser({
                  id:
                    userList.length === 0
                      ? 1
                      : userList[userList.length - 1].id + 1,
                  name: name,
                  date: moment().format("LLL"),
                  attachment: img,
                })
              );
              setName("");
              setImg("");
              // setNickname("");
              // console.log(img);
            }
          }}
        >
          Add User
        </button>
      </div>

      <div className="displayData">
        {userList.map((user, index) => (
          <div key={index} className="box-container">
            <img className="user-img" src={user.attachment} alt="???" />
            {/* <div className="left-data">{user.id}</div> */}
            <div className="right-data">
              <div className="user-name">{user.name}</div>
              <div className="user-date">{user.date}</div>
              <div className="update-area">
                <input
                  className="update-input"
                  type="text"
                  placeholder="Update..."
                  onChange={(e) => setNewName(e.target.value)}
                />
                <button
                  className="update-btn"
                  onClick={() => {
                    if (newName.trim() !== "") {
                      dispatch(
                        updateUser({
                          id: user.id,
                          name: newName,
                          date: moment().format("LLL"),
                        })
                      );
                    }
                  }}
                >
                  Update
                </button>
              </div>
            </div>
            <button
              className="del-btn"
              onClick={() => dispatch(delUser(index))}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
