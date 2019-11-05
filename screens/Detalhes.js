import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    Dimensions,
    StyleSheet,
    Button,
    Linking,
    Platform
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Footer, Header } from "native-base";

const { height, width } = Dimensions.get('window')

class Detalhes extends Component {

    static navigationOptions = {
        title: 'Informações Gerais',
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


    constructor(props){
        super(props)
        const { params } = this.props.navigation.state;
        
        this.state = {
            detalhes: params,
            detalhesdeputado: []
        } 
    }
    
    async componentDidMount() {
        const detalhesdeputado = await fetch(`http://ec2-18-216-101-153.us-east-2.compute.amazonaws.com:3000/deputado/${this.state.detalhes.bairro}/1`);
        this.setState({detalhesdeputado: await detalhesdeputado.json()}) 
    }

    _pressCall=()=>{
        //alert(this.state.detalhes.cidade)
        //console.log(this.state.detalhesdeputado.ultimoStatus.gabinete.telefone)
        const url=`tel:${this.state.detalhesdeputado.ultimoStatus.gabinete.telefone}`
        Linking.openURL(url)
    }
    

openMap = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL(`http://maps.apple.com/?q=${this.state.detalhes.cidade}+${this.state.detalhes.endereco}+${this.state.detalhes.bairro}+${this.state.detalhes.nome}`);
    } else {
      Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${this.state.detalhes.nome}+${this.state.detalhes.cidade}+${this.state.detalhes.endereco}+${this.state.detalhes.bairro}`);
    }
  }

  render() {
    return (
        <Grid style={styles.container}>
            <Row size={2} style={{paddingTop: 5}}>
                <Image
                    style={{ flex: 1, height: null, width: null, resizeMode: 'contain', borderRadius:5}}
                    source={{uri:this.state.detalhes.imagem}} />
            </Row>
            <Row size={0.3} style={{paddingTop:10}}>
                <Col style={{marginLeft:20}}>
                    <Text style={{ fontSize: 24, fontFamily:'Raleway-SemiBold' }}>
                        {this.state.detalhes.nome} 
                    </Text>
                </Col>
            </Row>
            
            <Row size={0.3}>
                <Col size={0.1} style={{marginLeft:20, marginTop: 10}}>
                    <Icon name="md-mail" size={20}  color='#B31D1F'/>
                </Col>
                <Col>
                    <Text style={{ fontWeight: '100', marginTop: 10 , marginRight:10, fontFamily:'Raleway-SemiBold'}}>
                        {this.state.detalhes.email}
                    </Text>
                </Col>
            </Row>
            <Row size={0.3}>
                <Col size={0.1} style={{marginLeft:20, marginTop: 10}}>
                    <Icon name="md-phone-portrait" size={20}  color='#B31D1F'/>
                </Col>
                <Col>
                    <Text style={{ fontWeight: '100', marginTop: 10 , marginRight:10, fontFamily:'Raleway-SemiBold'}}>
                        {this.state.detalhes.fone}
                    </Text>
                </Col>
            </Row>
            <Row size={0.3}>
                <Col size={0.1} style={{marginLeft:20, marginTop: 10}}>
                    <Icon name="md-pricetag" size={20}  color='#B31D1F'/>
                </Col>
                <Col>
                    <Text style={{ fontWeight: '100', marginTop: 10 , marginRight:10, fontWeight: 'bold',  fontFamily:'Raleway-SemiBold'}}>
                        {this.state.detalhes.proposta}
                    </Text>
                </Col>
            </Row>
            <Row size={1}>
            </Row>
            <Footer style={{backgroundColor: '#ededed'}}>
                <View style={{marginBottom: 10, marginTop:10}}>
                <Button
                    title="Ligar"
                    color="#B31D1F"
                    onPress={this._pressCall}
                    />
                </View>
            </Footer>
        </Grid>
    );
  }
}

export default Detalhes;

const styles = StyleSheet.create({
    container: {    
        backgroundColor: 'white',
    }
});