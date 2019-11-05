import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
} from "react-native";
import axios from "axios";
import ListaParceiros from "./components/Explore/ListaParceiros";
import AnimatedLoader from  'react-native-animated-loader';
import SemResultados from "./components/Explore/SemResultados";
                             
class Produtos extends Component {

    constructor(props){
        super(props);
        const { params } = this.props.navigation.state;
        this.state = { listaParceiros:[], detalhes: params, visible: true, loading: false }
        
    }

    static navigationOptions = {     
        title: 'App Deputados',   
        headerStyle: {
            backgroundColor: '#B31D1F',
          },
          headerTitleStyle: {
            fontWeight: "200",
            fontSize: 14, 
            color:'white',
            fontFamily:'Raleway-SemiBold'
          },
      };

    async componentDidMount(){
        this.setState({loading:true});
        if(this.state.detalhes.pesquisaInput==undefined){
            const { detalhes } = this.state
            detalhes.pesquisaInput = "0"
            this.setState({detalhes})

        }
        const data = await axios.get(`http://ec2-18-216-101-153.us-east-2.compute.amazonaws.com:3000/listarDeputados?${this.state.detalhes.cat}`)
            .then(response => { this.setState({ listaParceiros: response.data, visible: false, loading: false }) })
            .catch(() => { this.setState({loading:false}); console.log('Erro ao carregar os dados!');})
       
    }

   
    render() {
        const { visible } = this.state;
        if (this.state.loading) {
            return <View>
                <AnimatedLoader
                    visible={true}
                    overlayColor="rgba(255,255,255,0.75)"
                    source={require("./loader.json")}
                    animationStyle={styles.lottie}
                    speed={1}
                />
            </View>;
        }

        return (
            
            this.state.listaParceiros.length > 0 ? <View style={styles.container}>
                <ListaParceiros titulo={this.state.detalhes.nome} {...this.props} parceiros={this.state.listaParceiros } ></ListaParceiros>
            </View> : <SemResultados></SemResultados>
        );
    }
}
export default Produtos;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white', 
    },
    lottie: {
        width: 100,
        height: 100
      }
});