import { forwardRef } from 'react';

const SearchInput = forwardRef(
  ({ className, value, handleChange, handleBlur, handleFocus }, ref) => (
    <input
      ref={ref}
      type="search"
      value={value}
      className={className}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
    />
  )
);

export default SearchInput;
