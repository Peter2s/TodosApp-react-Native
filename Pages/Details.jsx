import {View,Text,StyleSheet} from "react-native";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getTodo} from '../redux/Reducers/todosSlice';


export const Details = ({ route }) => {
	const { todoId } = route.params;
	const todos = useSelector((state) => state.todos.todos);
	const [todo, setTodo] = useState(null);

	useEffect( () => {
		const todo = todos.find(todo =>todo.id ===todoId)
		setTodo(todo);
	}, []);

	if (!todo) {
		return (
			<View>
				<Text>Loading...</Text>
			</View>
		);
	}

	return (
		<View>
			<Text style={styles.title}>Title: {todo.title}</Text>
			<Text style={styles.description}>Description: {todo.description}</Text>
		</View>
	);
}
const styles = StyleSheet.create({
		title:{
			fontSize: 24,
			fontWeight: 'bold',
			padding: 10,
		},
	description:{
		fontSize: 16,
		padding: 10,
	}
})