import React, { useState } from 'react';
import s from './Pagination.module.css';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const [selected, setSelected] = useState(1);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className={s.container}>
        {pageNumbers.map(number => (
          <li key={number} className={selected === number ? s.selected : s.item} onClick={() => {paginate(number); setSelected(number); window.scrollTo(0, 0);}}>
            <p style={{margin: '0'}}>
              {number}
            </p>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;