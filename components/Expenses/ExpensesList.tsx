import { FC } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Expense } from '../../app/models/Expense';
import ExpenseItem from './ExpenseItem';

type Props = {
  expenses: Expense[]
}
const ExpensesList: FC<Props> = ({ expenses }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id }
        renderItem={(itemData) => 
          <ExpenseItem 
            expense={itemData.item} />}
      />
    </View>
  )
}
export default ExpensesList
const styles = StyleSheet.create({
  container:{
    marginBottom: 32
  }
})