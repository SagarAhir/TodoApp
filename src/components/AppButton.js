import {TouchableOpacity, Text, StyleSheet} from 'react-native'

const AppButton = ({id, title, isSelected, onPress, activeColor}) => {
  const backgroundColor = isSelected ? activeColor : 'white'
  return (
    <TouchableOpacity style={[styles.mainContainer, {backgroundColor}]} onPress={() => onPress(id)}>
      <Text style={styles.titleText}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5
  },
  titleText: {
    color: 'black',
    textAlign: 'center',
    fontWeight:'600',
    fontSize: 16
  }
})

export default AppButton