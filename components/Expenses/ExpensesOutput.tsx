import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ExpensesSummary from './ExpensesSummary';
import ExpensesList from './ExpensesList';
import { Expense } from '../../app/models/Expense';
import { GlobalStyles } from '../../constants/Colors';

type Props = {
  expenses: Expense[];
  expensePeriod: string;
  fallbackText: string;
}

const ExpensesOutput: FC<Props> = ({ expenses, expensePeriod, fallbackText }) => {
    let content:JSX.Element = <Text style={styles.infoText}>{fallbackText}</Text>;
   
    if(expenses.length > 0){
      content = <ExpensesList expenses={expenses}/>
    }
  return (
  <View style={styles.container}>  
    <ExpensesSummary periodName={expensePeriod} expenses={expenses} />
    {content}
  </View>
)
}
export default ExpensesOutput
const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:24,
    backgroundColor: GlobalStyles.colors.primary700,
    gap:16,
  },
  infoText:{
    color:'white',
    fontSize:16,
    textAlign:'center',
    marginTop:32
  }
})