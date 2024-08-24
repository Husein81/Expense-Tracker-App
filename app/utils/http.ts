import axios, { AxiosResponse } from "axios"
import { Expense } from "../models/Expense"

const EXPENSES_URL ='https://react-native-course-6a0f7-default-rtdb.firebaseio.com'

export const storeExpense = async (expense: Expense) => {
    await axios.post(EXPENSES_URL+ '/expenses.json', expense);
}

export const fetchExpenses = async (): Promise<Expense[]> => {
    const response = await axios.get(EXPENSES_URL + '/expenses.json');

    const expenses: Expense[] = [];

    for (const key in response.data) {
        expenses.push({ ...response.data[key], id: key });
    }   
    return expenses.reverse();
}

export const fetchExpense = async (id: string): Promise<Expense> => {
    const response = await axios.get(EXPENSES_URL + `/expenses/${id}.json`);
    return { ...response.data, id };
}

export const editExpense = async (expense: Expense) => {
    await axios.put(EXPENSES_URL + `/expenses/${expense.id}.json`, expense);
}

export const deleteExpense = async (id: string) => {
    await axios.delete(EXPENSES_URL + `/expenses/${id}.json`);
}