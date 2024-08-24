import { FC } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../../constants/Colors';
import { getFormatedDate }  from '../../app/utils/date';
import { useNavigation } from '@react-navigation/native';
import { Expense } from '../../app/models/Expense';

type Props = {
    expense: Expense
}
const ExpenseItem: FC<Props> = ({ expense }) => {
    const navigation = useNavigation();
    const pressedHandler = () => {
        navigation.navigate('ManageExpense',{expenseId: expense.id});
    };
    const date = new Date(expense.date);
  return (
    <Pressable 
        onPress={pressedHandler} 
        style={({pressed}) => pressed && styles.pressed}>
      <View style={styles.expenseItem}>
        <View>    
            <Text style={[styles.text, styles.description]}>{expense.description}</Text>
            <Text style={styles.text}>{getFormatedDate(date)}</Text>
        </View> 
        <View style={styles.amountContainer}>
            <Text style={styles.amount}>{Number(expense.amount).toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  )
}
export default ExpenseItem
const styles = StyleSheet.create({
    pressed:{
        opacity:0.75
    },
    expenseItem:{
        padding:12,
        marginVertical:8,
        backgroundColor: GlobalStyles.colors.primary500,
        flexDirection:'row',
        justifyContent:'space-between',
        borderRadius:6, 
        elevation:3,
        shadowColor:GlobalStyles.colors.primary500,
        shadowRadius:4,
        shadowOffset:{width:1, height:1},
        shadowOpacity:0.4        
    },
    text:{
        color: GlobalStyles.colors.primary50,

    },
    description:{
        fontSize:16,
        marginBottom:4,
        fontWeight:"bold"
    },
    amountContainer:{
        paddingHorizontal:12,
        paddingVertical:4,
        backgroundColor:"white",
        justifyContent:'center',
        alignItems:'center',
        borderRadius:4,
        minWidth:8
    },
    amount:{
        color: GlobalStyles.colors.primary500,
        fontWeight:'bold'
    }
})