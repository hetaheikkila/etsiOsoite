import { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';

export default function FindPlace() {

const [address, setAddress] = useState("");

useEffect( () => {
    fetch('https://geocode.maps.co/search?q=${address}&api_key=')
})

return(
<MapView
  style={{ width: '100%', height: '100%' }} 
  address={address} 
/>
);

}