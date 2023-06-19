import React from 'react';

import styles from './HotelsFilter.module.css';

const HotelsFilter = (props) => {
  const dropdownChangeHandler = (event) => {
    props.onChangeFilter(event.target.value);
  };

  return (
    <div className='expenses-filter'>
      <div className='expenses-filter__control'>
        <label>Filter by stars </label>
        <select value={props.selected} onChange={dropdownChangeHandler}>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
        </select>
      </div>
    </div>
  );
};

export default HotelsFilter;
