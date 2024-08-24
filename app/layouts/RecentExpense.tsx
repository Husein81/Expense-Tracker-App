import { StyleSheet, Text, View } from 'react-native'
import ExpensesOutput from '../../components/Expenses/ExpensesOutput'
import { Expense } from '../models/Expense';
import { getDateMinusDays } from '../utils/date';
import { useEffect, useState } from 'react';
import { fetchExpenses } from '../utils/http';
import Loading from '../../components/UI/Loading';
import { setExpenses } from '../redux/slice/expenseSlice';
import { RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';

const RecentExpense = () => {
    const dispatch = useDispatch(); 
    const expenses = useSelector((state: RootState) => state.expenses);
    const [isLoading, setIsLoading] = useState(true);

    const getExpenses = async () => {
      try{
        setIsLoading(true);
        const expenses = await fetchExpenses();
        dispatch(setExpenses(expenses));
      }catch(error){
        console.log(error);
        setIsLoading(false);
      }finally{
        setIsLoading(false);
      }
    }
    useEffect(() => {
      getExpenses();
    },[]);
    const recentExpenses = expenses.filter((expenses) => {
      const today = new Date();
      const last7Days: Date = getDateMinusDays(today, 7);
        return (new Date(expenses.date) >= last7Days) && (new Date(expenses.date) <= today); ; 
    });
    const expensePeriod= 'Last 7 Days';
    const fallbackText = 'No expenses found for the last 7 days';

    if(isLoading){
      return <Loading/>
    }
  return (
    <ExpensesOutput 
      expensePeriod={expensePeriod} 
      expenses={recentExpenses} 
      fallbackText={fallbackText} />
  )
}
export default RecentExpense
const styles = StyleSheet.create({})