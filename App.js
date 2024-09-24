import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Alert, Keyboard } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { API_KEY } from '@env';

export default function App() {
  const [address, setAddress] = useState('');
  const [region, setRegion] = useState({
    latitude: 60.1699,
    longitude: 24.9384,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [marker, setMarker] = useState(null);

  const getCoordinates = async () => {
    try {
      Keyboard.dismiss();
      const response = await fetch(`https://geocode.maps.co/search?q=${encodeURIComponent(address)}&api_key=${API_KEY}`);
      const data = await response.json();

      if (data.length > 0) {
        const location = data[0];
        const lat = parseFloat(location.lat);
        const lon = parseFloat(location.lon);

        setRegion({
          latitude: lat,
          longitude: lon,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
        setMarker({ latitude: lat, longitude: lon });
      } else {
        Alert.alert('Error');
      }
    } catch (error) {
      Alert.alert('Error');
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
      >
        {marker && (
          <Marker coordinate={marker}
          pinColor='pink' />
        )}
      </MapView>
      <TextInput
        style={styles.input}
        placeholder="Syötä osoite"
        value={address}
        onChangeText={setAddress}
        
      />
      <Button title="Show" onPress={getCoordinates}
      color="pink" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '80%',
  },
  map: {
    width: '100%',
    height: '80%',
  },
});