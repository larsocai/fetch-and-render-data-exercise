import React from 'react'
import {Button} from "react-bootstrap"

  const range = (start, end) => {
    return Array(end - start + 1)
      .fill(0)
      .map((item, i) => start + i);
  };

const Pagination = ({ items, pageSize, onPageChange }) => {

    if (!items || items.length <= 1) return null;
  
    let num = items.length % pageSize === 0 ? items.length / pageSize : Math.ceil(items.length / pageSize);
    let pages = range(1, num);
    const list = pages.map((page) => {
      return (
        <Button key={page} onClick={onPageChange} className="button">
          {page}
        </Button>
      );
    });
    return (
      <nav>
        <ul className="pagination">{list}</ul>
      </nav>
    );
  };

export default Pagination
