import { forwardRef } from 'react';

const SearchInput = forwardRef(
  ({ className, value, handleChange, handleFocus }, ref) => (
    <input
      ref={ref}
      type="search"
      value={value}
      className={className}
      onChange={handleChange}
      onFocus={handleFocus}
    />
  )
);

export default SearchInput;
