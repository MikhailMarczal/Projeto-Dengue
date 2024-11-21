import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { isAxiosError } from 'axios';
import CustomButton from 'components/button';
import CustomInput from 'components/input';
import ShowToast from 'components/toast';
import { useAuth } from 'contexts/auth-context';
import { api } from 'infra/api';
import { Eye } from 'lucide-react-native';
import { RootStackParamList } from 'navigation';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// SÓ PARA PODER MOSTRAR EM AULA
type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList>;

export default function LoginPage() {
  const [user, setUser] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const { signIn } = useAuth();

  async function login() {
    try {
      await signIn({ user, senha }).then(() => {
        navigation.navigate('EntoResearch');
      });
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.status === 403) {
          return ShowToast({ text: 'Credenciais inválidas!' });
        }
        return ShowToast({ text: 'Erro ao fazer login' });
      }
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.text}>DENSYS</Text>
          <CustomInput value={user} onChange={(text) => setUser(text)} topText="USUÁRIO" />
          <CustomInput
            value={senha}
            onChange={(text) => setSenha(text)}
            topText="SENHA"
            rest={{ secureTextEntry: !isVisible }}
          />
          <CustomButton onPress={login} text="LOGIN" />
        </View>
        <Text style={styles.versionText}>v 1.0.0</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  container: { width: '100%', gap: 20 },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    lineHeight: 40,
    color: '#fff',
    marginHorizontal: 'auto',
  },
  versionText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 20,
    bottom: 4,
    right: 4,
    position: 'absolute',
  },
});
