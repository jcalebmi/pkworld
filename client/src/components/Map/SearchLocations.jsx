import React from 'react';

const SearchLocations = (props) => {
  //returns suggested locations with data and functions to use
  const {
    ready,
    value,
    suggestions: {status, data},
    setValue,
    clearSuggestions
  } = props.usePlaces({
    requestOptions: {
      //where to search for nearby locations
      location: {
        lat: () => props.location.lat ? props.location.lat : 28.5383,
        lng: () => props.location.lng ? props.location.lng : -81.3792,
      },
      //radius of places by meters
      radius: 200
    }
  });

  return (
    <div className="search">
      <input value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={!ready}
            placeholder="Search Location">
      </input>
      {status === 'OK'
      ? <div className="popup">
        <ul className=
        "popOver">
            {data.map((suggestion, index) => <li
              key={index}
              onClick={async (e) => {
                try {
                  const address = e.target.childNodes[0].data;
                  //sets value to selected address
                  //should fetch data argument set to false
                  //no need to continue searching api
                  setValue(address, false);
                  //clears the rest of the suggestions
                  clearSuggestions()
                  //gets info object about a location
                  const results = await props.getGeocode({ address });
                  // console.log(results);
                  //gets lat and long of location
                  const { lat, lng} = await props.getLatLng(results[0]);
                  props.panTo({lat, lng})
                  setValue('')
                } catch (error) {
                  console.log(error);
                }
              }}>{suggestion.description}</li>)}
          </ul>
        </div>
      : null}
    </div>
  )
}

export default SearchLocations;