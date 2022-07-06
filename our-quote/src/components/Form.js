import React, { useEffect, useState } from "react";
import axios from "axios";
import eventbus from "./eventBus";

function Form() {
  const [details, setDetails] = useState([]);
  const [user, setUser] = useState("");
  const [quote, setQuote] = useState("");

  const renderSwitch = (param) => {
    switch (param + 1) {
      case 1:
        return "primary";
      case 2:
        return "secondary";
      case 3:
        return "success";
      case 4:
        return "danger";
      case 5:
        return "warning";
      case 6:
        return "info";
      default:
        return "yellow";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:8000/wel/",{
          name: user,
          detail: quote,
        })
      .then((res) => {
        setQuote("");
        setUser("")
      eventbus.dispatch("submit", {detail: res.data})});
      // console.log("dispach : ", details.detail.concat(res.data))
    };

  return (
    <div className="container jumbotron ">
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              {" "}
              Author{" "}
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="Name of the Poet/Author"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={details.user}
            name="user"
            onChange={(e)=>setUser(e.target.value)}
          />
        </div>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Your Quote</span>
          </div>
          <textarea
            className="form-control "
            aria-label="With textarea"
            placeholder="Tell us what you think of ....."
            value={details.quote}
            name="quote"
            onChange={(e)=>setQuote(e.target.value)}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary mb-5">
          Submit
        </button>
      </form>

      <hr
        style={{
          color: "#000000",
          backgroundColor: "#000000",
          height: 0.5,
          borderColor: "#000000",
        }}
      />
    </div>
  );
}

export default Form;
