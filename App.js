import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Alert, Image } from 'react-native';

export default function App() {
  const [keyword, setKeyword] = useState('');
  const [repositories, setRepositories] = useState([]);

  const getRepositories = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
      .then(response => response.json())
      .then(data => {
        setRepositories(data.meals);
      })
      .catch(error => {
        Alert.alert('Error', error);
      });
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={{ fontSize: 18, width: 200 }}
        placeholder='keyword'
        value={keyword}
        onChangeText={text => setKeyword(text)}
      />
      <Button title="Find" onPress={getRepositories} />
      <FlatList
        keyExtractor={(item) => item.idMeal.toString()}
        renderItem={({ item }) => (
          <View>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.strMeal}</Text>
            <Image
              source={{ uri: `https://www.themealdb.com/images/media/meals/${item.idMeal}.jpg/preview` }}
              style={{ width: 100, height: 100 }}
              onError={(error) => {
                console.error('Image loading error:', error.nativeEvent.error);
              }}
            />
            <Text style={{ fontSize: 16 }}>{item.strInstructions}</Text>
          </View>
        )}
        data={repositories}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 30,
  },
});
