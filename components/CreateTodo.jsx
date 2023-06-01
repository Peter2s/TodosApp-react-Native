import {StyleSheet,Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import { addTodo } from '../redux/Reducers/todosSlice';
import {useDispatch} from "react-redux";

export const CreateTodo = () => {
	const [todoTitle, setTodoTitle] = useState('');
	const [todoDescription, setTodoDescription] = useState('');
	const dispatch = useDispatch();
	const generateUniqueId = () => {
		return Math.random().toString(36).substr(2, 9);
	};
	const addNewTodo = async () => {
		if (todoTitle.trim() !== '') {
			const newTodo = {
				id: generateUniqueId(),
				title: todoTitle,
				description: todoDescription,
				done: false,
			};
			// dispatch new todo to slices
			dispatch(addTodo(newTodo))
			setTodoTitle('');
			setTodoDescription('');
		}
	};
	return (
		<>
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					placeholder="Todo Title"
					value={todoTitle}
					onChangeText={text => setTodoTitle(text)}
				/>
				<TextInput
					style={styles.input}
					placeholder="Todo Description"
					value={todoDescription}
					onChangeText={text => setTodoDescription(text)}
				/>
				<TouchableOpacity style={styles.btnContainer} onPress={addNewTodo} >
					<Text style={styles.btn}> Add Todo </Text>
				</TouchableOpacity>
			</View></>
	)
}
const styles = StyleSheet.create({
	input: {
		borderWidth: 1,
		borderColor: '#8f8989',
		paddingVertical: 8,
		paddingHorizontal: 10,
		marginBottom: 10,
		padding: 20,
	},
	inputContainer: {
		marginBottom: 20,
		padding: 20,
	},
	btnContainer:{
		backgroundColor:'#0f99ea',
		padding:10,
	},
	btn:{
		color:"white",
		fontSize:18,
		fontWeight:"bold",
		textAlign: 'center',
	},
})