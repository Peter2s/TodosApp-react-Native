import {View,Text} from "react-native";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Details = ({ route }) => {
	const { todoId } = route.params;
	const [todo, setTodo] = useState(null);

	useEffect(async () => {
		let todos = await AsyncStorage.getItem('todos');
		todos = JSON.parse(todos);
		console.log(todo)
		let selectedTodo;
		if (todos){
			selectedTodo = todos.find(todo => todo.id === todoId);
			setTodo(selectedTodo);
		}

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
			<Text>Title: {todo.title}</Text>
			<Text>Description: {todo.description}</Text>
		</View>
	);
}