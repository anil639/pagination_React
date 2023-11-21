import react, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
function App() {
  const [post, setPost] = useState([]);
  const [postPerPage, setPostPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => setPost(res.data));
  }, []);

  const numOfPage = Math.ceil(post.length / postPerPage);
  const pages = [...Array(numOfPage + 1).keys()].slice(1);

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;

  const visiblePost = post.slice(indexOfFirstPost, indexOfLastPost);

  const handlePrev = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };
  const handleNext = () => {
    if (currentPage !== numOfPage) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="App">
      <h1>Pagination</h1>
      {visiblePost.map((post) => (
        <p key={post.id}>{post.title}</p>
      ))}
      <button onClick={handlePrev}>PREV</button>
      <p>
        {pages.map((pg) => (
          <button
            key={pg}
            onClick={() => setCurrentPage(pg)}
            style={{ margin: "5px" }}
            className={`${currentPage === pg ? "active" : ""}`}
          >{`${pg}`}</button>
        ))}
      </p>
      <button onClick={handleNext}>NEXT</button>
      <div>
        <select onChange={(e) => setPostPerPage(e.target.value)}>
          <option value="10"> 10</option>
          <option value="20"> 20</option>
        </select>
      </div>
    </div>
  );
}

export default App;
