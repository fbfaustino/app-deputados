import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
} from "react-native";
import Navigation from 'react-navigation'

class Category extends Component {
    render() {
        return (
            
                <View style={styles.container}>
                    <View style={{ flex: 3 }}>
                        <Image source={this.props.imageUri}
                            style={{ flex: 1, width: null, height: null, resizeMode: 'contain' }}
                        />
                    </View>
                    <View style={{ flex: 1, padding: 10, alignItems:'center'}}>
                        <Text style={{color: '#B31D1F',fontFamily:'Raleway-SemiBold', fontSize:13 }}>{this.props.name}</Text>
                    </View>
                </View>

        );
    }
}
export default Category;

const styles = StyleSheet.create({
    container: {
        height: 120,
        width: 140, 
        marginLeft: 20,
        borderWidth: 0.8, 
        borderColor: '#dddddd',
        shadowOffset:{  width: 10,  height: 10,  },
        shadowColor: 'black',
        shadowOpacity: 0.0,
        borderRadius:7

    }
});