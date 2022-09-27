import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

interface IButtonProps {
  title: string;
  onPress: () => void;
}

const CustomButton = ({title, onPress}: IButtonProps) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
    width: 180,
    backgroundColor: '#000',
    borderRadius: 50,
  },
  text: {
    fontSize: 18,
    color: '#fff',
  },
});

export default CustomButton;
