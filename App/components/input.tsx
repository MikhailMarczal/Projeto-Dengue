import { ReactNode } from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

type Props = {
  value: string;
  onChange: (text: string) => void;
  topText?: string;
  rest?: TextInputProps;
};

export default function CustomInput(props: Props) {
  return (
    <View style={styles.container}>
      {props.topText ? <Text style={styles.topText}>{props.topText}</Text> : null}
      <TextInput
        style={styles.input}
        value={props.value}
        onChangeText={props.onChange}
        {...props.rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    height: 40,
    lineHeight: 32,
    fontSize: 20,
  },
  topText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
