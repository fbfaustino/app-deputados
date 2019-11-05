import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

class HomeCategory extends Component { 

    render() {
        return (
            <TouchableOpacity onPress={() => this.props.nav()} > 
            <View style={{ width: this.props.width / 2 - 30, height: this.props.width / 2 - 10, borderWidth: 1, 
                    borderColor: '#dddddd', marginBottom:15, borderRadius:10, padding:5}} >
                <View style={{ flex: 1,  backgroundColor: 'white'}}>
                    <Image
                        style={{ flex: 1, width: null, height: null, resizeMode: 'contain' }}
                        source={{uri:this.props.imagem}}  />
                </View>
                <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'space-evenly', paddingLeft: 10, backgroundColor: 'white', borderBottomEndRadius:10, borderBottomStartRadius:10  }}>
                    <Text style={{ fontSize: 12, color: '#B31D1F', fontFamily:'Raleway-SemiBold' }}><Icon name="md-pricetag" size={15}  color='#B31D1F'/>{this.props.nome}</Text>
                </View>
            </View>
            </TouchableOpacity>
        );
    }
}

export default HomeCategory;

