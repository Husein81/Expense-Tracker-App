import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Expense } from "../../models/Expense";

const initialState: Expense[] =  []

const expenseSlice = createSlice({
    name: "expenses",
    initialState,
    reducers: {
        setExpenses: (state, action: PayloadAction<Expense[]>)=> {
            return action.payload;
        },
     
        addExpense: (state, action: PayloadAction<Expense>) => {
            state.push(action.payload);
        },
        removeExpense: (state, action: PayloadAction<{id:string}>) => {
            return state.filter((expense) => expense.id !== action.payload.id);
        },
        updateExpense: (state, action: PayloadAction<Expense>) => {
            const index = state.findIndex((expense) => expense.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        }
    },
});

export const { 
    addExpense, 
    removeExpense, 
    updateExpense,
    setExpenses,
    
} = expenseSlice.actions;
export default expenseSlice.reducer;