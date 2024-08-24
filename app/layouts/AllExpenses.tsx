import { StyleSheet } from 'react-native';
import ExpensesOutput from '../../components/Expenses/ExpensesOutput';
import { useEffect, useState } from 'react';
import { fetchExpenses } from '../utils/http';
import { Expense } from '../models/Expense';
import Loading from '../../components/UI/Loading';
import { setExpenses } from '../redux/slice/expenseSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const AllExpenses = () => {
  const dispatch = useDispatch();
  const expenses = useSelector((state: RootState) => state.expenses);
  const [isLoading, setIsLoading] = useState(true);

  const getExpenses = async () => {
    try {
      setIsLoading(true);
      const expenses = await fetchExpenses();
      dispatch(setExpenses(expenses));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getExpenses();
  }, []); 

  const expensePeriod = 'Total';
  const fallbackText = 'No registered expenses found!';

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ExpensesOutput
      expensePeriod={expensePeriod}
      expenses={expenses}
      fallbackText={fallbackText}
    />
  );
};

export default AllExpenses;

const styles = StyleSheet.create({});
