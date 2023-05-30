import React, {useEffect, useState} from "react";
import {Button, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import {TodosList} from "../components/TodosList";

export const Home = ({navigation}) => {
	const [todoTitle, setTodoTitle] = useState('');
	const [todoDescription, setTodoDescription] = useState('');
	const [todos, setTodos] = useState([]);
	const [filter, setFilter] = useState('All');

	const generateUniqueId = () => {
		return Math.random().toString(36).substr(2, 9);
	};
	const addTodo = async () => {
		if (todoTitle.trim() !== '') {
			const newTodo = {
				id: generateUniqueId(),
				title: todoTitle,
				description: todoDescription,
				done: false,
			};
			const existingTodos = await AsyncStorage.getItem('todos');
			let updatedTodos = [];

			if (existingTodos) {
				updatedTodos = JSON.parse(existingTodos);
			}

			updatedTodos.push(newTodo);

			// Save the updated todos in AsyncStorage
			await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));

			setTodos(updatedTodos);
			setTodoTitle('');
			setTodoDescription('');
		}
	};

	useEffect(() => {
		const loadTodos = async () => {
			try {
				const existingTodos = await AsyncStorage.getItem('todos');
				if (existingTodos) {
					setTodos(JSON.parse(existingTodos));
				}
			} catch (error) {
				console.log('Error loading todos:', error);
			}
		};

		loadTodos();
	}, []);


	const toggleTodo = async (index) => {
		const updatedTodos = [...todos];
		updatedTodos[index].done = !updatedTodos[index].done;

		// Save the updated todos in AsyncStorage
		await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));

		setTodos(updatedTodos);
	};

	const filterTodos = (status) => {
		setFilter(status);
	};

	const filteredTodos = todos.filter(todo => {
		if (filter === 'All') return true;
		if (filter === 'Active') return !todo.done;
		if (filter === 'Done') return todo.done;
	});
	return (
		<>
			<SafeAreaView style={styles.container}>

				<Text style={styles.title}>TODO APP</Text>
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
					<TouchableOpacity style={styles.btnContainer} onPress={addTodo} >
						<Text style={styles.btn}> Add Todo </Text>
					</TouchableOpacity>
				</View>
				<View style={styles.buttonsContainer}>
					<Button title="All" onPress={() => filterTodos('All')} />
					<Button title="Active" onPress={() => filterTodos('Active')} />
					<Button title="Done" onPress={() => filterTodos('Done')} />
				</View>
				<View style={styles.divider} />

				<TodosList navigation={navigation} filteredTodos={filteredTodos} toggleTodo={toggleTodo}/>
			</SafeAreaView>
		</>
	)
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
		padding: 20,
	},
	inputContainer: {
		marginBottom: 20,
		padding: 20,
	},
	input: {
		borderWidth: 1,
		borderColor: '#8f8989',
		paddingVertical: 8,
		paddingHorizontal: 10,
		marginBottom: 10,
		padding: 20,
	},
	buttonsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
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
	divider: {
		borderBottomWidth: 1,
		borderBottomColor: '#8f8989',
		marginBottom: 20,
		padding: 20,
	},

});
