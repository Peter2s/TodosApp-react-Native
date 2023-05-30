import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';


export const TodosList = ({navigation ,filteredTodos,toggleTodo,handleDeleteTodo,handleShowModal}) => {

	return (
		<>
			<FlatList
				data={filteredTodos}
				keyExtractor={(item=> item.id)}
				renderItem={({ item, index }) => (
					<View style={{flex: 1,flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
						<TouchableOpacity style={styles.item} onPress={() => toggleTodo(index)}>
								<Text style={item.done ? styles.todoDone : styles.todo}>{item.title}</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Details',{todoId : item.id})}>
							<Icon  name="external-link" size={20} color="#0f99ea" />
						</TouchableOpacity>
						<TouchableOpacity style={styles.icon} onPress={()=>handleShowModal(item)} >
							<Icon  name="trash" size={20} color="red" />
						</TouchableOpacity>
					</View>
				)}
			/>
		</>
	)
}
const styles = StyleSheet.create({

	item:{
		flex:12,
		borderBottomWidth : 2 ,
		borderColor : '#8f8989',
		borderRadius :5,
		width: '80%',
		marginVertical:'auto',

	},
	todo: {
		fontSize: 18,
		marginBottom: 10,
		padding: 5,
		textAlign: 'center',

	},
	todoDone: {

		fontSize: 18,
		marginBottom: 10,
		textDecorationLine: 'line-through',
		color: '#800909',
		textAlign:'center',
		padding: 5,
	},
	icon:{
		flex:1,
		padding:"5%",
	}
});
