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
    TouchableHighlight
} from "react-native";
import HomeCategory from "./HomeCategory";

const { height, width } = Dimensions.get('window')

const UltimosParceiros = (props) => {
    return (
        <ScrollView scrollEventThrottle={16}  >    
            <View style={{ backgroundColor: 'white' }}>
                <View style={{ paddingHorizontal: 20, marginTop: 20, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between',  backgroundColor: 'white' }}>
                {props.parceiros.map((parceiro) => (
                    
                    <HomeCategory key={parceiro.id} width={width} 
                    imagem={parceiro.urlFoto}
                    nome={parceiro.nome}
                    nav={() => {props.navigation.navigate('Detalhes', { nome: parceiro.nome, imagem: parceiro.urlFoto,
                        proposta: parceiro.siglaPartido, endereco: parceiro.cpf, email: parceiro.email, fone: parceiro.siglaUf, cidade: parceiro.gabinete, bairro: parceiro.id,})}
                    }  
                    />
                ) 
                    
                 )  }
                    
                </View>
            </View>
        </ScrollView>      
    );
  };
  
  export default UltimosParceiros;