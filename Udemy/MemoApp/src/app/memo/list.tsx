import { View, StyleSheet } from 'react-native'
import { useEffect } from 'react'

import MemoListItem from '../../components/MemoListItem'
import CicreButton from '../../components/CicrleButton'
import Icon from '../../components/Icon'
import { router, useNavigation } from 'expo-router'
import LogOutButton from '../../components/LogOutButton'

const handlePress = (): void => {
  router.push('/memo/create')
}

const List = (): JSX.Element => {
  // 画面が表示されたとき一度だけ実行
  const navigation = useNavigation()
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => { return <LogOutButton/> }
    })
  }, [])
  return (
    <View style = {styles.container}>
        <View>
          <MemoListItem />
          <MemoListItem />
          <MemoListItem />
        </View>
        <CicreButton onPress={handlePress}>
          <Icon name= 'plus' size={40} color='#ffffff'/>
        </CicreButton>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  }
})

export default List
