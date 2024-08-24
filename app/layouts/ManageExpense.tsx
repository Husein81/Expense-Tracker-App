import { FC, useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import IconButton from '../../components/UI/IconButton';
import { GlobalStyles } from '../../constants/Colors';
import { useDispatch } from 'react-redux';
import { addExpense, removeExpense, updateExpense } from '../redux/slice/expenseSlice';
import ExpenseForm from '../../components/ManageExpense/ExpenseForm';
import { Expense } from '../models/Expense';
import { storeExpense, editExpense, deleteExpense } from '../utils/http';
import Loading from '../../components/UI/Loading';

type Props = {
    route: any;
    navigation: any;
}
const ManageExpense:FC<Props> = ({ route, navigation }) => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();
    const editedExpenseId: string = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        })
    },[isEditing, navigation]);

    const deleteExpenseHandler = async () => {
        setIsSubmitting(true);
        await deleteExpense(editedExpenseId);
        setIsSubmitting(false);
        dispatch(removeExpense({ id: editedExpenseId }));
        navigation.goBack();
    };

    const cancelHandler = () => {
        navigation.goBack();
    };

    const confirmHandler = async (expense: Expense) => {
        setIsSubmitting(true);
        if(isEditing){
            await editExpense(expense);
            dispatch(updateExpense(expense));
        }else{
            await storeExpense(expense);
            dispatch(addExpense(expense))
        }
        navigation.goBack();
    };
    if(isSubmitting){
        <Loading/>
    }
  return (
    <View style={styles.container}>
        <ExpenseForm
            editedExpenseId={editedExpenseId}   
            submitButtonText={isEditing ? 'Update Expense' : 'Add Expense'}
            onCancel={cancelHandler}
            onSubmit={confirmHandler}
        />
        
        {isEditing 
        &&
        (<View style={styles.deleteContainer}>
            <IconButton 
                icon="trash" 
                size={36} 
                color={GlobalStyles.colors.error500} 
                onPress={deleteExpenseHandler}/>
        </View> 
        )}
    </View>
  )
}
export default ManageExpense
const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:24,
        backgroundColor: GlobalStyles.colors.primary800,
    },
   
    deleteContainer:{
        marginTop:16,
        paddingTop: 8,
        borderTopWidth:2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems:'center'
    }
})