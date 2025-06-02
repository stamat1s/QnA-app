import { Avatar } from "@material-ui/core";
import React, { useContext, useState } from "react";
import "./css/AllQuestions.css";
import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";
import { stringAvatar } from "../../utils/Avatar";
import { useEffect } from "react";
import AuthContext from "../../context/AuthContext";

function AllQuestions({ data }) {
   const { getLoggedIn, setUserData, userData, isLoggedIn } = useContext(AuthContext)
    const [tags, setTags] = useState([]);
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  } 
 
console.log("incoming data",data);
console.log("user data", userData)
//   let tags = JSON.parse(data?.tags[0]);
  // console.log();
  return (
    <div className="all-questions">
      <div className="all-questions-container">
        <div className="all-questions-left">
          <div className="all-options">
            <div className="all-option">
              <p>0</p>
              <span>votes</span>
            </div>
            <div className="all-option">
              <p>{data?.answerDetails?.length}</p>
              <span>answers</span>
            </div>
            <div className="all-option">
              <small>2 views</small>
            </div>
          </div>
        </div>
        <div className="question-answer">
          <Link to={`/question?q=${data?._id}`}>{data.title}</Link>

          {/* <a href=>{data.title}</a> */}

          <div
            style={{
              maxWidth: "90%",
            }}
          >
            <div>{ReactHtmlParser(truncate(data.body, 200))}</div>
          </div>
          <div
            style={{
              display: "flex",
            }}
          >
            {tags.map((_tag) => (
              <p
                style={{
                  margin: "10px 5px",
                  padding: "5px 10px",
                  backgroundColor: "#007cd446",
                  borderRadius: "3px",
                }}
              >
                {_tag}
              </p>
            ))}
          </div>
          <div className="author">
            <small>{data.created_at}</small>
            <div className="auth-details">
              <Avatar {...stringAvatar(data?.user?.username)} />
              <p>
                {data && data?.user?.username}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllQuestions;


//wow why this worked? lol because there is data in the middle
// it is context it just create and pass but it is api data have no conceren with it

//wait because there are some other pages also

