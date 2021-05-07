import LocationButton from '../components/LocationButton';

const SearchBox = ({ hasLocation, handleLocation }) => {
  return (
    <LocationButton hasLocation={hasLocation} handleLocation={handleLocation} />
  );
};

export default SearchBox;
