import React from 'react';
import {View, StyleProp, ViewStyle, StyleSheet, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface IFabProps {
  iconName: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const Fab = ({iconName, onPress, style = {}}: IFabProps) => {
  return (
    <View style={[style]}>
      <Pressable style={styles.btn} onPress={onPress}>
        <Icon name={iconName} size={26} color="#fff" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    height: 50,
    width: 50,
    backgroundColor: '#252525',
    borderRadius: 50,
    shadowColor: '#252525',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
});

export default Fab;
