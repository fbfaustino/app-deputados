import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Platform,
    StatusBar,
    ScrollView,
    Image,
    Dimensions,
    TouchableOpacity,
    Picker,
    Animated
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'
import Category from './components/Explore/Category'
import ListaParceiros from "./components/Explore/ListaParceiros";
import axios from "axios";
import { Col, Row, Grid } from "react-native-easy-grid";
import { thisExpression } from "@babel/types";
import { Button } from "react-native-elements";
import { Dropdown } from 'react-native-material-dropdown';
import UltimosParceiros from "./components/Explore/UltimosParceiros";


const { height, width } = Dimensions.get('window')
class Explore extends Component {

    constructor(props){
        super(props);
        this.state = { 
            ultimosParceiros:[], 
            municipios: [],
            cities: [],
            municipio: '2587',
            pesquisaInput: '0',
            destaques: [] }
        
    }
    static navigationOptions = {     
        title: 'App Deputados',   
        headerStyle: {
            backgroundColor: '#B31D1F',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 14, 
            fontWeight: '200',
            color:'white',
            fontFamily:'Raleway-SemiBold'
          },
         
      };

   async componentDidMount() {

        this.scrollY = new Animated.Value(0)

        this.startHeaderHeight = 80
        this.endHeaderHeight = 50
        if (Platform.OS == 'android') {
            this.startHeaderHeight = 100 + StatusBar.currentHeight
            this.endHeaderHeight = StatusBar.currentHeight
        }

        this.animatedHeaderHeight = this.scrollY.interpolate({
            inputRange: [0, 50],
            outputRange: [this.startHeaderHeight, this.endHeaderHeight],
            extrapolate: 'clamp'
        })

        this.animatedOpacity = this.animatedHeaderHeight.interpolate({
            inputRange: [this.endHeaderHeight, this.startHeaderHeight],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        })
        this.animatedTagTop = this.animatedHeaderHeight.interpolate({
            inputRange: [this.endHeaderHeight, this.startHeaderHeight],
            outputRange: [-30, 10],
            extrapolate: 'clamp'
        })
        this.animatedMarginTop = this.animatedHeaderHeight.interpolate({
            inputRange: [this.endHeaderHeight, this.startHeaderHeight],
            outputRange: [50, 30],
            extrapolate: 'clamp'
        })

        const data = await axios.get(`http://ec2-18-216-101-153.us-east-2.compute.amazonaws.com:3000/listarDeputados?UF=MA`)
        .then(response => { this.setState({ ultimosParceiros: response.data }) })
        .catch(() => { console.log('Erro ao carregar os dados!');})

        const responseCidade = await fetch(`https://www.portaldoservidor.ma.gov.br/api/get/parceiros/municipios/6DA857AB0`);
        this.setState({municipios: await responseCidade.json()}) 

        const responseDestaques = await fetch(`https://www.portaldoservidor.ma.gov.br/api/get/parceirosapp/destaque/6DA857AB0`);
        this.setState({destaques: await responseDestaques.json()}) 
        
        const cities = []
        await this.state.municipios.map((municipio) => {
            return {
                value: municipio.id,
                label:municipio.municipio
            }

        }).forEach((obj) => cities.push(obj));
        await this.setState({cities});

    }
    
    onChangeMunicipio = value => {
        this.setState({municipio: value})
    }
    

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                
                <View style={{ flex: 1 , backgroundColor:'white'}}>
                    <Animated.View style={{ height: this.animatedHeaderHeight, height:70, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#dddddd' }}>
                        <View style={{
                            flexDirection: 'row', padding: 2,
                            backgroundColor: 'white', marginHorizontal: 10,
                            shadowOffset: { width: 0, height: 0 },
                            shadowColor: 'black',
                            shadowOpacity: 0.2,
                            elevation: 1,
                            borderRadius: 10,
                            marginTop: Platform.OS == 'android' ? 10 : null
                        }}>
                            <Icon name="ios-search" size={30} style={{ marginRight: 10 }} />
                            <TextInput onChangeText = { (valor) =>  this.setState({pesquisaInput: valor})  }
                                onSubmitEditing  = {() => this.props.navigation.navigate('Produtos', { nome: 'Busca', pesquisaInput:this.state.pesquisaInput })}
                                underlineColorAndroid="transparent"
                                placeholder="Procure um deputado"
                                placeholderTextColor="#B31D1F"
                                style={{ flex: 1,  fontFamily:'Raleway-SemiBold', backgroundColor: 'white' }}
                            />
                        </View>
                    </Animated.View>
                    <ScrollView
                        scrollEventThrottle={16}
                        onScroll={Animated.event(
                            [
                                { nativeEvent: { contentOffset: { y: this.scrollY } } }
                            ]
                        )}
                    >
                        <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 20 }}>
                            <Text style={{ fontSize: 24, paddingHorizontal: 20, fontFamily:'Raleway-SemiBold', color:'black' }}>
                                Escolha uma Região
                            </Text>

                            <View style={{ height: 130, marginTop: 20 }}>
                                <ScrollView
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                >
                                    <TouchableOpacity onPress={() =>  this.props.navigation.navigate('Produtos', { nome: 'Deputados', cat: 'UF=AC', cidade:this.state.municipio })}> 
                                        <Category imageUri={require('../assets/estados/acre.png')}
                                            name="Acre"
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() =>  this.props.navigation.navigate('Produtos', { nome: 'Deputados', cat: 'UF=AL', cidade:this.state.municipio })}> 
                                        <Category imageUri={require('../assets/estados/alagoas.png')}
                                            name="Alagoas"
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() =>  this.props.navigation.navigate('Produtos', { nome: 'Deputados', cat: 'UF=AM', cidade:this.state.municipio })}> 
                                        <Category imageUri={require('../assets/estados/amapa.png')}
                                            name="Amapá"
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() =>  this.props.navigation.navigate('Produtos', { nome: 'Deputados', cat: 'UF=BA', cidade:this.state.municipio })}> 
                                        <Category imageUri={require('../assets/estados/bahia.png')}
                                            name="Bahia"
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() =>  this.props.navigation.navigate('Produtos', { nome: 'Deputados', cat: 'UF=CE', cidade:this.state.municipio })}> 
                                        <Category imageUri={require('../assets/estados/ceara.png')}
                                            name="Ceará"
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() =>  this.props.navigation.navigate('Produtos', { nome: 'Deputados', cat: 'UF=DF', cidade:this.state.municipio })}> 
                                        <Category imageUri={require('../assets/estados/df.png')}
                                            name="Dist. Federal"
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() =>  this.props.navigation.navigate('Produtos', { nome: 'Deputados', cat: 'UF=ES', cidade:this.state.municipio })}> 
                                        <Category imageUri={require('../assets/estados/espiritosanto.png')}
                                            name="Esp. Santo"
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() =>  this.props.navigation.navigate('Produtos', { nome: 'Deputados', cat: 'UF=GO', cidade:this.state.municipio })}> 
                                        <Category imageUri={require('../assets/estados/goias.png')}
                                            name="Goias"
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() =>  this.props.navigation.navigate('Produtos', { nome: 'Deputados', cat: 'UF=MA', cidade:this.state.municipio })}> 
                                        <Category imageUri={require('../assets/estados/maranhao.png')}
                                            name="Maranhão"
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() =>  this.props.navigation.navigate('Produtos', { nome: 'Deputados', cat: 'UF=MT', cidade:this.state.municipio })}> 
                                        <Category imageUri={require('../assets//estados/matogrosso.png')}
                                            name="Mato Grosso"
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() =>  this.props.navigation.navigate('Produtos', { nome: 'Deputados', cat: 'UF=MS', cidade:this.state.municipio })}> 
                                        <Category imageUri={require('../assets/estados/matogrossodosul.png')}
                                            name="Mato Grosso do Sul"
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() =>  this.props.navigation.navigate('Produtos', { nome: 'Deputados', cat: 'UF=MG', cidade:this.state.municipio })}> 
                                        <Category imageUri={require('../assets/estados/minasgerais.png')}
                                            name="Minas Gerais"
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() =>  this.props.navigation.navigate('Produtos', { nome: 'Deputados', cat: 'UF=PA', cidade:this.state.municipio })}> 
                                        <Category imageUri={require('../assets/estados/para.png')}
                                            name="Pará"
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() =>  this.props.navigation.navigate('Produtos', { nome: 'Deputados', cat: 'UF=PB', cidade:this.state.municipio })}> 
                                        <Category imageUri={require('../assets/estados/paraiba.png')}
                                            name="Paraíba"
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() =>  this.props.navigation.navigate('Produtos', { nome: 'Deputados', cat: 'UF=PR', cidade:this.state.municipio })}> 
                                        <Category imageUri={require('../assets/estados/parana.png')}
                                            name="Paraná"
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() =>  this.props.navigation.navigate('Produtos', { nome: 'Deputados', cat: 'UF=PE', cidade:this.state.municipio })}> 
                                        <Category imageUri={require('../assets/estados/pernambuco.png')}
                                            name="Pernambuco"
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() =>  this.props.navigation.navigate('Produtos', { nome: 'Deputados', cat: 'UF=PI', cidade:this.state.municipio })}> 
                                        <Category imageUri={require('../assets/estados/piaui.png')}
                                            name="Piauí"
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() =>  this.props.navigation.navigate('Produtos', { nome: 'Deputados', cat: 'UF=RJ', cidade:this.state.municipio })}> 
                                        <Category imageUri={require('../assets/estados/riodejaneiro.png')}
                                            name="Rio de Janeiro"
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() =>  this.props.navigation.navigate('Produtos', { nome: 'Deputados', cat: 'UF=RN', cidade:this.state.municipio })}> 
                                        <Category imageUri={require('../assets/estados/riograndedonorte.png')}
                                            name="Rio Grande do Norte"
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() =>  this.props.navigation.navigate('Produtos', { nome: 'Deputados', cat: 'UF=RS', cidade:this.state.municipio })}> 
                                        <Category imageUri={require('../assets/estados/riograndedosul.png')}
                                            name="Rio Grande do Sul"
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() =>  this.props.navigation.navigate('Produtos', { nome: 'Deputados', cat: 'UF=RO', cidade:this.state.municipio })}> 
                                        <Category imageUri={require('../assets/estados/rondonia.png')}
                                            name="Rondonia"
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() =>  this.props.navigation.navigate('Produtos', { nome: 'Deputados', cat: 'UF=RR', cidade:this.state.municipio })}> 
                                        <Category imageUri={require('../assets/estados/roraima.png')}
                                            name="Roraima"
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() =>  this.props.navigation.navigate('Produtos', { nome: 'Deputados', cat: 'UF=SC', cidade:this.state.municipio })}> 
                                        <Category imageUri={require('../assets/estados/santacatarina.png')}
                                            name="Santa Catarina"
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() =>  this.props.navigation.navigate('Produtos', { nome: 'Deputados', cat: 'UF=SP', cidade:this.state.municipio })}> 
                                        <Category imageUri={require('../assets/estados/saopaulo.png')}
                                            name="São Paulo"
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() =>  this.props.navigation.navigate('Produtos', { nome: 'Deputados', cat: 'UF=SE', cidade:this.state.municipio })}> 
                                        <Category imageUri={require('../assets/estados/sergipe.png')}
                                            name="Sergipe"
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() =>  this.props.navigation.navigate('Produtos', { nome: 'Deputados', cat: 'UF=TO', cidade:this.state.municipio })}> 
                                        <Category imageUri={require('../assets/estados/tocantins.png')}
                                            name="Tocantins"
                                        />
                                    </TouchableOpacity>
                                </ScrollView>
                            </View>
                            
                        </View>
                        <Grid style={{ marginTop: 30 ,backgroundColor:'white'}}>
                            <Row>
                                <Text style={{ fontSize: 24, fontFamily:'Raleway-SemiBold', color:'black', paddingHorizontal: 20 }}>
                                    Deputados da sua Região
                                </Text>
                            </Row>
                            <Row>
                                <UltimosParceiros  {...this.props} parceiros={this.state.ultimosParceiros } ></UltimosParceiros>
                            </Row>
                        </Grid>
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}
export default Explore;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

