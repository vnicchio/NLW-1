import React, {useState, useEffect} from 'react';
import {Feather as Icon} from '@expo/vector-icons'
import {View, ImageBackground, Image, StyleSheet, Text, TextInput, KeyboardAvoidingView, Platform} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

interface IBGEUFProps {
  sigla: string;
}

interface IBGECityProps {
  nome: string;
}

interface PickerProps {
  label: string;
  value: string;
  key: string;
}

const Home = () => {
  const [ufs, setUfs] = useState<PickerProps[]>([])
  const [cities, setCities] = useState<PickerProps[]>([])
  const [uf, setUf] = useState('');
  const [city, setCity] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    axios.get<IBGEUFProps[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome').then(response => {
      const IBGEUfs = response.data.map(uf => {
        return {
          label: uf.sigla,
          value: uf.sigla,
          key: uf.sigla
        }
      })
      setUfs(IBGEUfs);
    })
  }, [])

  useEffect(() => {
    if(uf === '0'){
      setCities([]);
      return;
    }

    axios.get<IBGECityProps[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`).then(response => {
      const IBGECities = response.data.map(city => {
        return {
          label: city.nome,
          value: city.nome,
          key: city.nome
        }
      })
      setCities(IBGECities)
    })
  }, [uf])

  function handleNavigateToPoints(){
    navigation.navigate('Points', {uf, city});
  }

  function handleChangeUF(value: string){
    setUf(value);
  }

  function handleChangeCity(value: string){
    setCity(value);
  }

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding': undefined}>
      <ImageBackground 
        source={require('../../assets/home-background.png')}  
        style={styles.container} 
        imageStyle={{width: 274, height: 368}} 
        >
        <View style={styles.main}>
          <Image source={require('../../assets/logo.png')} />
          <View>
            <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
            <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
          </View>
        </View>
        <View style={styles.footer}>
          <RNPickerSelect
            onValueChange={handleChangeUF}
            items={ufs}
            placeholder={{label: 'Digite a UF', value: '0'}}
            style={{inputIOS: styles.input, inputAndroid: styles.input}}
          />
          <RNPickerSelect
            onValueChange={handleChangeCity}
            items={cities}
            placeholder={{label: 'Digite a Cidade', value: '0'}}
            style={{inputIOS: styles.input, inputAndroid: styles.input}}
          />
          <RectButton style={styles.button} onPress={handleNavigateToPoints}>
            <View style={styles.buttonIcon}>
              <Text>
                <Icon name="arrow-right" color="#FFF" size={24} />
              </Text>
            </View>
            <Text style={styles.buttonText}>
              Entrar
            </Text>
          </RectButton>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
    color: '#888'
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }
});

export default Home;