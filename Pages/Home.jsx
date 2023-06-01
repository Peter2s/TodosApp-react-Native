import React, {useEffect, useState} from "react";
import {Button, StyleSheet, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context"

import {TodosList} from "../components/TodosList";
import {DeleteTodoModal} from "../components/DeleteTodoModal";
import {CreateTodo} from "../components/CreateTodo";

import {deleteTodo, toggleTodo} from '../redux/Reducers/todosSlice';
import {useDispatch, useSelector} from "react-redux";


export const Home = ({navigation}) => {

	const [filter, setFilter] = useState('All');
	const [filteredTodos,setFilteredTodos] = useState([]);
	const [showModal, setShowModal] = React.useState(false);
	const [todoToDelete, setTodoToDelete] = useState(null);
	const todos = useSelector((state) => state.todos.todos);
	const dispatch = useDispatch()
	const handleDeleteTodo = () => {
		console.log(todoToDelete)
		dispatch(deleteTodo(todoToDelete));
		setShowModal(false)
	};

	const handleShowModal = (id) => {
		setTodoToDelete(id);
		setShowModal(true);
	};

	useEffect(() => {
	setFilteredTodos('Done')
	}, []);


	const toggle = async (id) => {
		dispatch(toggleTodo(id));
	};
	const filterTodos = (status)=>{
		setFilter(status)
		const filtered = todos.filter(item => {
			if (status === 'All')  return true;
			if (status === 'Active')  return !item.done;
			if (status === 'Done')  return item.done;
		})
		setFilteredTodos(filtered);
		console.log("\n\n",filtered)
	}

	return (
		<>
			<SafeAreaView style={styles.container}>

				<Text style={styles.title}>TODO APP</Text>
				<CreateTodo/>
				<View style={styles.buttonsContainer}>
					<Button title="All" onPress={() => filterTodos('All')} />
					<Button title="Active" onPress={() => filterTodos('Active')} />
					<Button title="Done" onPress={() => filterTodos('Done')} />
				</View>
				<View style={styles.divider} />

				<TodosList navigation={navigation}
						   toggleTodo={toggle}
						   filteredTodos={filteredTodos}
						   handleShowModal={handleShowModal}
				/>
				<DeleteTodoModal showModal={showModal} setShowModal={setShowModal} handleDeleteTodo={handleDeleteTodo}/>
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

	divider: {
		borderBottomWidth: 1,
		borderBottomColor: '#8f8989',
		marginBottom: 20,
		padding: 20,
	},
	deleteButton: {
		backgroundColor: 'red',
		padding: 10,
		borderRadius: 5,
	},
	deleteButtonText: {
		color: 'white',
		fontWeight: 'bold',
	},
});
