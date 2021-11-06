import React from 'react';

const InputBox = ({ handleChange, type }) => {
  return (
    <div>
      <input
        type="text"
        onChange={handleChange}
        placeholder={`Enter ${type} pokemon`}
      ></input>
    </div >
  );
}

export default InputBox;