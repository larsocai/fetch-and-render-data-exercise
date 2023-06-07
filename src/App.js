import React, { useState, useEffect } from "react";
import './App.css';
import Pagination from "./components/Pagination";
import paginate from "./utils/paginate";
import useDataApi from "./utils/useDataApi";
import ReactSearchBox from "react-search-box";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 14;
  const [{ data, isLoading }] = useDataApi(
    "https://thronesapi.com/api/v2/Characters",
    []
  );

  const handlePageChange = (e) => {
    setCurrentPage(Number(e.target.textContent));
  };

  const [searchResults, setSearchResults] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setSearchResults(
      data.filter((item) =>
        item.fullName.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
    setCurrentPage(1);
  }, [data, searchValue]);

  let page = searchResults ? searchResults : [];
  if (page.length >= 1) {
    page = paginate(page, currentPage, pageSize);
  }

  return (
    <>
      <div className="search-box-container">
        <ReactSearchBox
        placeholder="Search characters"
        value={searchValue}
        data={data.map((item) => ({
          key: item.name,
          value: item.fullName,
        }))}
        onChange={(value) => setSearchValue(value)}
      />
      </div>

      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <div className="got-group">
          {page.map((item) => (
            <div className="item-container" key={item.imageUrl}>
              <div className="polaroid">
              <div className="got-img" style={{ backgroundImage: `url(${item.imageUrl})` }}></div>
                <div className="got-title">{item.fullName}</div>
                <div className="got-info">{item.title}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Pagination
        items={searchResults}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default App;
