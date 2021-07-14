
import React, { useState, useRef, useEffect, useCallback } from 'react';
import {GoogleMap, useLoadScript, Marker, InfoWindow} from '@react-google-maps/api';
import styles from './helpers/mapStyles.js';
const moment = require('moment');
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox';
import SearchLocations from './SearchLocations.jsx';
import SearchSpots from './SearchSpots.jsx';
import Locate from './Locate.jsx';
import getMarkers from './helpers/getMarkers.js';
import firebase from 'firebase';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import MapInfo from './MapInfo.jsx';
import Auth from '../../Auth.jsx';
import LoggedIn from './LoggedIn.jsx';
import LoggedOut from './LoggedOut.jsx';
import gym from './assets/1552884071.svg';
const auth = firebase.auth();

const libraries = ["places", "geometry"];
//Height and width necessary for map to work
const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
  margin: '0 auto',
  padding: 0
}
//map starting point
const center = {
  lat: 28.5383,
  lng: -81.3792
}
//style and controls options
const options = {
  // styles: styles,
  disableDefaultUI: true,
  mapTypeControl: true,
  zoomControl: true,
  streetViewControl: true,
  rotateControl: true,
  // fullscreenControl:true
}



const PKMap = (props) => {
  const [user] = useAuthState(auth);
  const [markers, setMarkers] = useState([])
  const [searching, setSearching] = useState('Locations')
  const [temp, setTemp] = useState(null)
  //create info pop ups on markers
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    loadMarkers();
  },[])

  const loadMarkers = () => {
    getMarkers().then(data => {
      setMarkers(data)
    });
  }

  const onMapClick = useCallback((e) => {
    setTemp({
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    })
    setSelected(null);
  }, [])

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, [])

  //pans to location
  const panTo = useCallback(({lat, lng}) => {
    mapRef.current.panTo({lat, lng});
    mapRef.current.setZoom(18);
  }, [])

  const handleSearching = (e) => {
    setSearching(e.target.value)
  }
  //loads in the script for google API
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLEAPI,
    libraries,
  });
  // handle loading of map
  if (loadError) return "error";
  if(!isLoaded) return "Loading";

  return (
    <div id="map">
      <MapInfo
        changeFeed={props.changeFeed}
        searching={searching}
        onChange={handleSearching}
        usePlaces={usePlacesAutocomplete}
        getGeocode={getGeocode}
        getLatLng={getLatLng}
        panTo={panTo}
        location={props.location}
        markers={markers}
        />
      <Locate
        panTo={panTo}
        location={props.location}/>
      <div className="mapContainer">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={8}
          center={props.location || center}
          options={options}
          onClick={onMapClick}
          onLoad={onMapLoad}>
          {markers.map((marker, index) =>
          marker.gym
          ? <Marker
              key={index}
              position={{lat: marker.lat, lng: marker.lng}}
              icon={{
                url: gym,
                //fix size of icon
                scaledSize: new window.google.maps.Size(80, 80),
                //Keep icon in middle of click
                origin: new window.google.maps.Point(0,0),
                //Set to half of size
                anchor: new window.google.maps.Point(40,40)
              }}
              onClick={() => {
                setSelected(marker)
              }}
              />
              : <Marker
              key={index}
              position={{lat: marker.lat, lng: marker.lng}}
              // icon={{
              //   url: gym,
              //   //fix size of icon
              //   scaledSize: new window.google.maps.Size(20, 20),
              //   //Keep icon in middle of click
              //   origin: new window.google.maps.Point(0,0),
              //   //Set to half of size
              //   anchor: new window.google.maps.Point(10,10)
              // }}
              onClick={() => {
                setSelected(marker)
              }}
              />
          )}
          {temp ? <Marker
              position={{lat: temp.lat, lng: temp.lng}}
              onClick={() => {
                setSelected(temp)
              }}/> : null}
          {selected ? (
          <InfoWindow
            position={{
              lat: selected.lat,
              lng: selected.lng}}
            onCloseClick={() => {
              setSelected(null);
            }}>
            {user
              ? <LoggedIn
                  changeFeed={props.changeFeed}
                  setMarkers={setMarkers}
                  setTemp={setTemp}
                  setSelected={setSelected}
                  selected={selected}/>
              : <LoggedOut
                  changeFeed={props.changeFeed}
                  selected={selected}/>}

          </InfoWindow>) : null}
        </GoogleMap>
        </div>
    </div>
  )
}

export default PKMap;

