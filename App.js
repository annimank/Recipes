import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Alert, Image } from 'react-native';

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
      <View style={styles.headerCont}>
        <text style={styles.header}>Search for recipes based on an ingredient</text>
      </View>
      <FlatList
        style={styles.flatlistCont} keyExtractor={(item) => item.idMeal.toString()}
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
      <TextInput
        style={styles.input}
        placeholder='ingredient?'
        value={keyword}
        onChangeText={text => setKeyword(text)}
      />
      <View style={styles.buttonCont}>
      <TouchableOpacity
        style={styles.button}
        onPress={getRepositories}
      >
        <Text style={styles.buttonText}>Find</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerCont: {
    margin: 40,
  },
  header: {
    color: '#5F7483',
  },
  container: {
    flex: 1,
    backgroundColor: '#C3DEF1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    margin: 50,
    color: '#5F7483',
    textAlign: 'center',
  },
  flatlistCont: {
    margin: 30,
  },
  buttonCont: {
    marginBottom: 50,
  },
  button: {
    backgroundColor: '#96AFC1',
    padding: 10,
  },
  buttonText: {
    color: '#5F7483',
  }
});
