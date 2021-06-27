import React, {useState} from 'react';

const SearchSpots = (props) => {
  //returns suggested locations with data and functions to use
  const [value, setValue] = useState('');
  const [marker, setMarker] = useState(null)
  const [location, setLocation] = useState(null);

  const handleClick = (marker) => {
    props.panTo({lat: marker.lat, lng: marker.lng})
    setValue('')
  }

  return (
    <div className="search">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search Spots">
      </input>
      {value.length > 0
      ? <div className="popup">
        <ul className=
        "popOver">
            {props.markers.filter(marker => marker.name.toLowerCase().includes(value.toLowerCase())).map((marker, index) => <li key={index} onClick={() => handleClick(marker)}>{`${marker.name} \n ${marker.address}`}</li>)}
          </ul>
        </div>
      : null}
    </div>
  )
}

export default SearchSpots;
