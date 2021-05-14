const SearchInput = ({
  className,
  value,
  handleChange,
  handleBlur,
  handleFocus,
}) => {
  return (
    <input
      type="search"
      value={value}
      className={className}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
    />
  );
};

export default SearchInput;
