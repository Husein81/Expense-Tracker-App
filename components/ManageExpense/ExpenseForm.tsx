import { Alert, StyleSheet, Text, View } from 'react-native'
import Input from './Input'
import {  FC, useEffect, useState } from 'react';
import { Expense } from '../../app/models/Expense';
import Button from '../UI/Button';
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values';
import { fetchExpense } from '../../app/utils/http';

type Props ={ 
    editedExpenseId:string,
    submitButtonText:string,
    onCancel:() => void,
    onSubmit:(expense:Expense ) => void
}
const ExpenseForm: FC<Props> = ({editedExpenseId,submitButtonText, onCancel, onSubmit}) => {
    const [expense, setExpense] = useState<Expense | null>(null);

    const getExpense = async (id: string) => {
        const response = await fetchExpense(id);
        setExpense(response);
    }

    useEffect(() => {
        getExpense(editedExpenseId);
    },[]);

    const [formData, setFormData] = useState<Expense>({
        id: '',
        amount:  0.0,
        date:  '',
        description:  '',
    });

    useEffect(() => {
        if(expense){
            setFormData(expense);
        }
    },[expense]);

    const changeHandler = (name:string, value:string) => {
        setFormData({...formData, [name]: value});
    }
    
    const submitHandler = () => {
        const expense: Expense = {
            amount: formData.amount,
            date: formData.date,
            description: formData.description,
            id: editedExpenseId ? editedExpenseId : uuidv4()
        }
        
        const amountIsValid = !isNaN(expense.amount) && expense.amount > 0;
        const dateIsValid = expense.date !== 'invalid';
        const descriptionIsValid = expense.description.trim().length > 0;

        if(!amountIsValid || !dateIsValid || !descriptionIsValid){
            Alert.alert('Invalid Input', 
                'Please enter a valid amount, date and description', [{text:'Okay'}]);
            return;
        }

        onSubmit(expense);
    };
    const cancelHandler = () => {
        onCancel();
    }
  return (
    <View style={styles.form}>
        <Text style={styles.title}>Expense Details</Text>
        <View style={styles.inputsRow}>
            <Input
                style={styles.rowInput} 
                label='Amount' 
                textInputConfig={{
                    value:formData.amount,
                    keyboardType: 'decimal-pad',
                    placeholder: 'Enter Amount',
                    onChangeText:(value) => changeHandler('amount', value)
                }}/>
            <Input
                style={styles.rowInput} 
                label='Date' 
                textInputConfig={{
                    value:formData.date,
                    placeholder:'YYYY-MM-DD',
                    maxLength: 10,
                    onChangeText:(value) => changeHandler('date', value)
                }}/>
        </View>
        <View>
            <Input label='Description' textInputConfig={{
                value:formData.description,
                multiline:true,
                placeholder:'Enter Description',
                onChangeText: (value) => changeHandler('description', value),
            }}/>
        </View>
        <View style={styles.buttons}>
            <Button 
                style={styles.button}
                onPress={cancelHandler}
                mode="flat"
            >Cancel</Button>
            <Button 
                style={styles.button}
                onPress={submitHandler}
            >{submitButtonText}</Button>
        </View>
    </View>
  )
}
export default ExpenseForm
const styles = StyleSheet.create({
    form:{
        marginTop:40,
    },
    title:{
        fontSize:24,
        fontWeight:'bold',
        color:'white',
        marginVertical:18,
        textAlign:'center'
    },
    inputsRow:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    rowInput:{
        flex:1
    }, 
    buttons:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    button:{
        minWidth:120,
        marginHorizontal:8
    },
})