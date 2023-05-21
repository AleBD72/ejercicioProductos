import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, ScrollView, Button, Alert, TextInput } from 'react-native';
import { useState } from 'react'; 

//Arreglo de productos
let productos = [
  {nombre: "Doritos", categoria: "Snack", precioCompra: 0.40, precioVenta: 0.48, id: 100},
  {nombre: "Manicho", categoria: "Golosinas", precioCompra: 0.20, precioVenta: 0.24, id: 101},
  {nombre: "Leche", categoria: "Lacteos", precioCompra: 0.8, precioVenta: 0.96, id: 102},
  {nombre: "Mango", categoria: "Frutas", precioCompra: 0.73, precioVenta: 0.88, id: 103},
  {nombre: "Fresas", categoria: "Frutas", precioCompra: 1.1, precioVenta: 1.32, id: 104},
  {nombre: "Atún", categoria: "Enlatados", precioCompra: 0.65, precioVenta: 0.78, id: 105},
  //{nombre: "Helado", categoria: "Golosinas", precioCompra: 1.20, precioVenta: 2.45, id: 106},
  //{nombre: "Agua Imperial", categoria: "Bebidas", precioCompra: 0.60, precioVenta: 0.85, id: 107},
  //{nombre: "Coca Cola", categoria: "Bebidas", precioCompra: 0.60, precioVenta: 0.85, id: 108},
  //{nombre: "Chupetes Plop", categoria: "Golosinas", precioCompra: 0.95, precioVenta: 1.25, id: 109},
  //{nombre: "Nutella", categoria: "Golosinas", precioCompra: 2.15, precioVenta: 4.85, id: 110},
  //{nombre: "Vino Bones", categoria: "Licores", precioCompra: 4.65, precioVenta: 6.85, id: 111},
  //{nombre: "Café Instantaneo", categoria: "Bebidas", precioCompra: 0.85, precioVenta: 1.95, id: 112},
]

//Variables globales
//Estado que verifica si se crea o edita un producto
let esNuevo = true;
//Varible para almacenar el indice del elemento que se desea editar o eliminar
let prodSeleccionado=-1;

export default function App() {
  //Variables de estado
  const [pNombre, setPNombre]= useState();
  const [pCategoria, setPCategoria]= useState();
  const [pPrecioCompra, setPPrecioCompra]= useState();
  const [pPrecioVenta, setPPrecioVenta]= useState();
  const [pCodigo, setPCodigo]= useState();
  const [numProductos, setNumProductos]= useState(productos.length);
  
  //Varible precio compra transformado a decimales
  let precio= parseFloat(pPrecioCompra);


  //Componente generado para el render Item
  //Cajas en las que se almacena la información de los productos
  //abajo debe ser producto={elemento.item}
  // estructura: id item, nombre y categoria, precio, botones 
  let ItemProducto = (props)=>{
    return (
      <View style={styles.itemProducto}>
        <View style={styles.itemId}>
          <Text>{props.producto.id}</Text>
        </View>
        <View style={styles.itemDescripcion}>
          <Text style={styles.textoPricipal}>{props.producto.nombre}</Text> 
          <Text style={styles.textoSecundario}>{props.producto.categoria} </Text>
        </View> 
        <View style={styles.itemPrecio}>
          <Text style={styles.textoSecundario}> {props.producto.precioVenta} </Text>
        </View>
        <View style={styles.itemBotones}>
          <Button title='E' color='green'
            onPress={()=>{
              //console.log("datos: ", props.producto);
              console.log(props.producto.id);
              console.log(props.producto.nombre);
              console.log(props.producto.categoria);
              console.log(props.producto.precioCompra);
              console.log(props.producto.precioVenta);
              //visual
              setPCodigo(props.producto.id);
              setPNombre(props.producto.nombre);
              setPCategoria(props.producto.categoria);
              setPPrecioCompra(props.producto.precioCompra);
              setPPrecioVenta(props.producto.precioVenta);
              esNuevo=false;
              prodSeleccionado=props.indice;
              //se supone estó está bien 
              /*
              setPNombre(props.producto.nombre);
              setPCategoria(props.producto.categoria);
              setPPrecioCompra(props.producto.precioCompra);
              setPPrecioVenta(props.producto.precioVenta);*/
              
            }}
          />
          <Button title='X' color='red'
            onPress={()=>{
              prodSeleccionado= props.indice;
              productos.splice(prodSeleccionado,1);
              setNumProductos(productos.length);
            }}
          />
        </View>
      </View>

    );
  }

  //Función limpiar
  let limpiar = ()=>{
    setPNombre(null);
    setPCategoria(null);
    setPPrecioCompra(null);
    setPPrecioVenta(null);
    setPCodigo(null);
    esNuevo = true;
  }

  //función verifica existencia de un producto en el arreglo
  let existeProd=()=>{
    for(let i=0; i<productos.length; i++){
      if(productos[i].id==pCodigo){
        return true;
      }
    }
    return false;
  }

  //Funcion para sacar el precio de un producto
  let calcularPrecio= (valorCompra)=>{
    let precioVenta = ((valorCompra*0.2) + valorCompra);
    precioVenta.toFixed(2);
    let valor= precioVenta.toString();
    //console.log(precioVenta);
    return valor;
    
    //setPPrecioVenta(precioVenta.toFixed(2));
    //return pPrecioVenta;
  }

  let guardarProd= ()=> {
    
    if (esNuevo) {
      if (pNombre != null && pCategoria != null && pPrecioCompra != null && pCodigo != null) {
        if (existeProd()) {
          Alert.alert("INFO", "Ya existe un producto con el id " + pId);
        } else {
          let nuevoProducto = { nombre: pNombre, categoria: pCategoria, precioCompra: pPrecioCompra, precioVenta: calcularPrecio(precio), id: pCodigo };
          productos.push(nuevoProducto);
        }
      } else {
        Alert.alert("INFO", "Debe ingresar valores validos para registar el producto");
      }

    } else {
      //console.log("modificar producto")
      
      productos[prodSeleccionado].nombre= pNombre;
      productos[prodSeleccionado].categoria= pCategoria;
      productos[prodSeleccionado].precioCompra= pPrecioCompra;
    }
  
    
    limpiar();
    setNumProductos(productos.length);
  }

  //Programa o vista principal
  return (
    <View style={styles.container}>
      <View style={styles.areaCabecera}>
        <Text style={styles.Titulo}>PRODUCTOS</Text>
        <ScrollView>
          <TextInput
            value={pCodigo}
            placeholder='CODIGO'
            onChangeText={setPCodigo}
            style={styles.txt}
            editable={esNuevo}
            keyboardType='numeric'
          />
          <TextInput
            value={pNombre}
            placeholder='NOMBRE'
            onChangeText={setPNombre}
            style={styles.txt}
          />
          <TextInput
            value={pCategoria}
            placeholder='CATEGORIA'
            onChangeText={setPCategoria}
            style={styles.txt}
          />
          <TextInput
            value={pPrecioCompra}
            placeholder='PRECIO COMPRA'
            onChangeText={setPPrecioCompra}
            style={styles.txt}
            keyboardType='numeric'
          />
          <TextInput
            value={pPrecioVenta}
            placeholder= {
                calcularPrecio(precio)
            }
            style={styles.txt}
            editable= {false}
          />
        </ScrollView>
        <View style={styles.botones}>
          <Button title='NUEVO'onPress={()=>{limpiar();}}/>
          <Button title='GUARDAR' onPress={()=>{guardarProd();}}/>
          <Text>Productos: {numProductos}</Text>
        </View>
      </View>
      <View style={styles.areaContenido}>
        <FlatList 
          data={productos}
          renderItem={(elemento)=>{
            return (
              <ItemProducto 
                indice={elemento.index}
                producto={elemento.item}
              />
            );
          }}
          keyExtractor={ 
            (item) => {
              return item.id;
            }
          }
        />
      </View>
      <View style={styles.areaPie}>
        <Text>Autor: Camila Mier</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke',
    paddingTop : 60,
    paddingHorizontal: 15,
  },
  itemProducto: {
    backgroundColor: 'lavender',
    flexDirection: 'row',
    marginBottom : 10,
    padding : 15,
    paddingHorizontal: 20,
    borderRadius : 13,
    borderColor: 'gray',
    borderWidth: 2,
    //justifyContent: 'center',
    alignItems: 'center',
  },
  Titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    fontStyle: 'italic',
    paddingVertical: 15,
    textAlign: 'center',
  },
  textoPricipal : {
    fontSize: 18,
    //marginBottom: 3,
  },
  textoSecundario: {
    fontStyle: 'italic',
    fontSize: 15,
    paddingVertical: 3,
    fontWeight: 'bold',
  },
  itemId:{
    flex: 1,
  },
  itemDescripcion:{
    flex: 4,
  },
  itemPrecio:{
    flex: 1,
  },
  itemBotones:{
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  areaCabecera: {
    flex: 4,
  },
  areaContenido: {
    flex: 6,
  },
  areaPie: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  txt: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 5,
    marginBottom: 8,
  },
  botones: {
    flexDirection: 'row',
    justifyContent:'space-around',
    alignItems: 'center',
    paddingBottom: 8,
  }
});
