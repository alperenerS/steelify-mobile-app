import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

interface SearchBarProps {
  searchQuery: string;
  onSearchQueryChange: (newSearchQuery: string) => void;
}

const SearchBar = ({ searchQuery, onSearchQueryChange }: SearchBarProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={onSearchQueryChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: 50,
    borderRadius: 10,
    marginHorizontal: 15,
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    fontSize: 18,
  },
});

export default SearchBar;