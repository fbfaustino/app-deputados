import React from "react";
import {
  AsyncStorage,
  StyleSheet,
  StatusBar,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
  Modal,
  TouchableHighlight,
  Picker,
  Alert,
  Linking,
  Platform
} from "react-native";

import API_SITE from "../../config/apiSite.js";
import Icon from "react-native-vector-icons/FontAwesome";
import Button from '../../components/Button';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Loader from '../../components/Loader';
//import MapView from 'react-native-maps';

export default class ClubeDescontosScreen extends React.Component {
  static navigationOptions = {
    title: "Clube de Descontos"
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      refreshing: false,
      modalVisible: false,
      municipio: null,
      municipios: [],
      segmento: null,
      segmentos: []
    };

    this.arrayHolder = [];
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = async () => {
    this.setState({loading: true});
    
    if (!this.state.loading) {
  
      fetch(`${API_SITE.clubeDesconto}/0/0/0`)
      .then((response) => response.json())
      .then((parceiros) =>{
        this.setState({
          data: [...this.state.data, ...parceiros],
          loading: false
        });

        this.arrayholder = parceiros;
      })
      .catch((error) => {
        this.setState({
          loading: false
        });
        
        if (error === 401){
          Alert.alert(
            "Erro",
            "Tempo de sessão expirado, você será redirecionado"
          );
          AsyncStorage.clear();
          this.props.navigation.navigate('Auth');
        } else {
          Alert.alert(
            "Erro",
            `(${error}) Não foi possível estabelecer conexão`
          );
        }
      });
    }

  };

  municipios = async () => {
    if (!this.state.loading) {
      const response = await fetch(`${API_SITE.municipios}`);
      const municipios = await response.json();

      this.setState({
        municipios: [...this.state.municipios, ...municipios],
        loading: false
      });

      return this.st
    }
  };

  segmentos = async () => {
    if (!this.state.loading) {
      const response = await fetch(`${API_SITE.segmentos}`);
      const segmentos = await response.json();
      
      this.setState({
        segmentos: [...this.state.segmentos, ...segmentos],
        loading: false
      });

      return this.st
    }
  };

  openMap = (parceiro) => {
    if (Platform.OS === 'ios') {
      Linking.openURL(`http://maps.apple.com/?q=${parceiro.cidade}+${parceiro.endereco}+${parceiro.bairro}+${parceiro.nome}`);
    } else {
      Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${parceiro.nome}+${parceiro.cidade}+${parceiro.endereco}+${parceiro.bairro}`);
    }
  }

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.itemFlatList} onPress={() => this.openMap(item)}>
        <Grid>
          <Row>
            <Image style={styles.thumbnail} source={{ uri: item.imagem }} />
            <View style={{ flex: 1, justifyContent: "center", marginLeft: 5 }}>
              <Text style={styles.itemTextFlatList}>{item.nome}</Text>
              <Text style={styles.itemDataTextFlatList}>{item.fone}</Text>
              <Text style={styles.itemDataTextFlatList}>
                {item.endereco + ", " + item.bairro + " - " + item.cidade}
              </Text>
            </View>
          </Row>
          <Row>
            <Text style={styles.itemDataTextPropostaFlatList}>
                {item.proposta}
            </Text>
          </Row>
        </Grid>
      </TouchableOpacity>
    );
  };

  filtro(text) {
    const newData = this.arrayholder.filter(function(item) {
      const itemData = item.nome.toUpperCase();
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
      text: text
    });
    this.setModalVisible(false);
  }

  filtroMunicipioSeguimento() {
    const municipio = this.state.municipio;
    const segmento = this.state.segmento;


    const newData = this.arrayholder.filter(function(item) {

      if (segmento === null && municipio === null) {
        return true;
      }

      if (segmento !== null && municipio !== null) {
        return item.cidade.indexOf(municipio) > -1 && item.segmento.indexOf(segmento) > -1;
      }
      
      if (segmento !== null || municipio !== null) {
        return item.cidade.indexOf(municipio) > -1 || item.segmento.indexOf(segmento) > -1;
      }

    });
    this.setState({
      data: newData,
    });
    this.setModalVisible(false);
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
    const municipio = this.state.municipio;
    const segmento = this.state.segmento;
    
    this.municipios();
    this.segmentos();
  }

  onChangeMunicipio = value => {
    this.setState({municipio: value})
  }

  onChangeSegmento = value => {
    this.setState({segmento: value})
  }

  renderSeparator = () => {
    return (
      <View
        style={styles.separator}>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Loader loading={this.state.loading} />
        <View style={styles.searchSection}>
            <Grid style={{padding: 10}}>
                <Col style={{ width: '90%'}}>
                  <TextInput
                    style={styles.TextInputStyleClass}
                    onChangeText={text => this.filtro(text, null, null)}
                    value={this.state.text}
                    underlineColorAndroid="transparent"
                    placeholder="Buscar"
                  />
                </Col>
                <Col style={{ width: '10%'}}>
                  <Icon
                    name="filter"
                    size={30}
                    style={styles.searchIcon}
                    onPress={() => this.setModalVisible(true)}/>
                </Col>
            </Grid>

        </View>
        <FlatList
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
          renderSectionHeader={this.renderSectionHeader}
          ItemSeparatorComponent={this.renderSeparator}
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert("Modal has been closed.");}}>

          <View style={styles.wrapper}>
            <View style={styles.containerModal}>
              <View style={{padding: 30}}>
                <Text style={{fontSize:20}}>Selecione a Cidade</Text>
                <Picker style={styles.picker}
                  selectedValue={this.state.municipio}
                  prompt="Selecione a Cidade"
                  onValueChange={this.onChangeMunicipio}>
                  <Picker.Item value={null} label={'TODOS'}/>
                  {this.state.municipios.map((municipio, i) => {
                    return <Picker.Item value={municipio.municipio} label={`${municipio.municipio}`} key={i}  /> })
                  }
                </Picker>
                <Text style={{fontSize:20}}>Selecione o Segmento</Text>
                <Picker style={styles.picker}
                  selectedValue={this.state.segmento}
                  prompt="Selecione o Segmento"
                  onValueChange={this.onChangeSegmento}>
                  <Picker.Item value={null} label={'TODOS'}/>
                  {this.state.segmentos.map((segmento, i) => {
                    return <Picker.Item value={segmento.segmento} label={`${segmento.segmento}`} key={i}  /> })
                  }
                </Picker>
              </View>  
              <View style={{flex: 1, marginLeft: '30%'}}>
                <Button
                label="Buscar" 
                styles={{button: styles.primaryButton, label: styles.buttonWhiteText}}
                onPress={() => {
                  this.filtroMunicipioSeguimento()
                }} />
              </View>
              </View>
          </View>
        </Modal>
        <StatusBar barStyle="default" />
      </View>

    );
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 5
  },
  searchSection: {
    height: 60
  },
  searchIcon: {
    flex: 1,
    padding: 5
  },
  input: {
    flex: 1,
  },
  TextInputStyleClass: { 
    textAlign: 'center',
    height: 40,
    borderWidth: 1,
    borderColor: '#1b72e2',
    borderRadius: 7 ,
    backgroundColor : "#FFFFFF" 
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#CED0CE",
    marginBottom: 5
  },
  thumbnail: {
    width: 80,
    height: 80,
    margin: 5
  },
  itemFlatList: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 3
  },
  itemTextFlatList: {
    fontSize: 18
  },
  itemDataTextFlatList: {
    fontSize: 10
  },
  itemDataTextPropostaFlatList: {
    fontSize: 15,
    fontWeight: "bold"
  },
  primaryButton: {
    backgroundColor: '#5d9cec',
    width: '50%'
  },
  buttonWhiteText: {
    fontSize: 20,
    color: '#FFF',
  },
  picker: {
    width: '100%'
  },
  wrapper: {
    flex:1, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000040'
  },
  containerModal: {
    backgroundColor : "#FFF", 
    borderColor: '#fff',
    height: 300 ,
    width: '90%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff', 
    justifyContent: 'center'
  },
});
