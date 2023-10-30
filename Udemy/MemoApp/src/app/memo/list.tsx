import { View, StyleSheet } from 'react-native'
import { useEffect, useState } from 'react'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'

import MemoListItem from '../../components/MemoListItem'
import CicreButton from '../../components/CicrleButton'
import Icon from '../../components/Icon'
import { router, useNavigation } from 'expo-router'
import LogOutButton from '../../components/LogOutButton'
import { db, auth } from '../../config'
import { type Memo } from '../../../types/memo'

const handlePress = (): void => {
  router.push('/memo/create')
}

const List = (): JSX.Element => {
  const [memos, setMemos] = useState<Memo[]>([])
  // 画面が表示されたとき一度だけ実行
  const navigation = useNavigation()
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => { return <LogOutButton/> }
    })
  }, [])
  useEffect(() => {
    if (auth.currentUser === null) { return }
    const ref = collection(db, `users/${auth.currentUser.uid}/memos`)
    const q = query(ref, orderBy('updateAt', 'desc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const remoteMemos: Memo[] = []
      snapshot.forEach((doc) => {
        console.log('memo', doc.data())
        const { bodyText, updateAt } = doc.data()
        remoteMemos.push({
          id: doc.id,
          bodyText,
          updateAt
        })
      })
      setMemos(remoteMemos)
    })
    return unsubscribe
  }, [])
  return (
    <View style = {styles.container}>
        <View>
          {memos.map((memo) => <MemoListItem memo={memo} />)}
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
