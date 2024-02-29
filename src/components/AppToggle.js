import {View, StyleSheet} from 'react-native'
import AppButton from './AppButton'

const AppToggle = ({selectedValue, onChangeSelectedValue, activeColor}) => {
  return (
    <View style={styles.mainContainer}>
      <AppButton id={'due'} title={'Due'} isSelected={selectedValue==='due'} onPress={onChangeSelectedValue} activeColor={activeColor}/>
      <AppButton id={'done'} title={'Done'} isSelected={selectedValue==='done'} onPress={onChangeSelectedValue} activeColor={activeColor} />
      <AppButton id={'late'} title={'Late'} isSelected={selectedValue==='late'} onPress={onChangeSelectedValue} activeColor={activeColor} />
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    marginRight: 5,
    width:'60%',
    borderRadius: 5,
    overflow: 'hidden'
  }
})

export default AppToggle