import { FC } from 'react';
import { KeyboardType, NativeSyntheticEvent, StyleProp, StyleSheet, Text, TextInput, TextInputChangeEventData, View, ViewStyle } from 'react-native';
import { GlobalStyles } from '../../constants/Colors';


type TextInputConfig = {
    value?: string | number;
    onChangeText?: (text: string) => void;
    placeholder?: string;
    keyboardType?: KeyboardType;
    secureTextEntry?: boolean;
    maxLength?: number;
    multiline?: boolean;
}
type Props = {
    label: string;
    style?:StyleProp<ViewStyle>
    textInputConfig?:TextInputConfig;
}
const Input:FC<Props> = ({ label, style, textInputConfig}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
    <TextInput 
      style={[styles.input, textInputConfig?.multiline 
        && styles.inputMultiline]} 
      {...textInputConfig} 
      value={textInputConfig?.value?.toString()} />
    </View>
  )
}
export default Input
const styles = StyleSheet.create({
    container:{
        marginHorizontal:4,
        marginVertical:8,
    },
    label:{
        fontSize:12,
        color:GlobalStyles.colors.primary100,
        marginBottom:4,
    },
    input:{
        backgroundColor: GlobalStyles.colors.primary100,
        padding: 6,
        borderRadius: 6,
        fontSize: 18,
        color: GlobalStyles.colors.primary700,
        
    },
    inputMultiline:{
        minHeight: 100,
        textAlignVertical:'top'
    }
})