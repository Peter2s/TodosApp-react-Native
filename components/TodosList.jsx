import {FlatList, StyleSheet, Text, TouchableOpacity} from "react-native";

export const TodosList = ({filteredTodos,toggleTodo}) => {
	return (
		<>
			<FlatList
				data={filteredTodos}
				keyExtractor={(item=> item.id)}
				renderItem={({ item, index }) => (
					<TouchableOpacity style={styles.item} onPress={() => toggleTodo(index)}>
						<Text style={item.done ? styles.todoDone : styles.todo}>{item.title}</Text>
					</TouchableOpacity>
				)}
			/>
		</>
	)
}
const styles = StyleSheet.create({

	item:{
		borderBottomWidth : 2 ,
		borderColor : '#8f8989',
		borderRadius :5,
		width: '80%',
		margin:'auto'
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
});
