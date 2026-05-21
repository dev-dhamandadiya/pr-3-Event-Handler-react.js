import React from 'react'
import { FaStar } from "react-icons/fa";
import "./App.css"
import { useState } from 'react';

const App = () => {

  const [feedback, setFeedback] = useState({});
  const [list, setList] = useState([]);
  const [star, setStar] = useState(0);
  const [temp, setTemp] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target
    setFeedback({ ...feedback, [name]: value });
  };


  const handleMouseEnter = (star) => {
    setTemp(star);
  };


  const handleStar = (star) => {
    setStar(star);
    setFeedback({ ...feedback, star })
  };

  const handleMouseLeave = () => {
    setTemp(0)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setList([...list, feedback]);
    console.log(feedback);
    setStar(0);
    setFeedback({});
  }

  return (
    <>
      <h2>Feedback Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>UserName : </label>
          <input
            name='username'
            type="text"
            id='username'
            onChange={handleChange}
            value={feedback.username || ""}
            placeholder='Enter your username'
          />
        </div>
        <br />

        <div>
          <label>Rating : </label>
          {
            [...Array(5)].map((_, index) => {
              return (
                <FaStar
                  color={(temp > index || star > index ? 'gold' : 'gray')}
                  onClick={() => handleStar(index + 1)}
                  onMouseEnter={() => handleMouseEnter(index + 1)}
                  onMouseLeave={handleMouseLeave}
                  key={index}
                />
              )
            })
          }
        </div>
        <br />

        <div>
          <label>Feedback :</label>
          <br />
          <textarea
            name="text"
            id="text"
            cols="20"
            rows="6"
            onChange={handleChange}
            value={feedback.text || ""}
            placeholder='Write your feedback...'
          ></textarea>
        </div>
        <br />

        <button type='submit'>
          Submit
        </button>
      </form>

      <div className="container">
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>#</th>
              <th>UserName</th>
              <th>Star</th>
              <th>Review</th>
            </tr>
          </thead>

          <tbody>
            {
              list.map((value, index) => {
                const { username, star, text } = value;
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{username}</td>
                    <td>{"⭐".repeat(star)}</td>
                    <td>{text}</td>
                  </tr>
                )
              })
            }

          </tbody>

        </table>

      </div>
    </>
  )
}

export default App;