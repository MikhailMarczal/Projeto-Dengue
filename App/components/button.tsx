import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/colors';

type ButtonProps = {
  onPress: () => void;
  text?: string;
};

export default function CustomButton(props: ButtonProps) {
  return (
    <TouchableOpacity onPress={() => props.onPress()} style={styles.button}>
      <Text style={styles.text}>{props.text ?? 'Enviar'}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.DEFAULT,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    height: 52,
  },
  text: {
    lineHeight: 32,
    fontSize: 20,
    color: '#FFF',
  },
});
