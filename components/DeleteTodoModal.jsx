import {Modal, Text, TouchableOpacity, View,StyleSheet} from "react-native";
import React from "react";
import { deleteTodo } from '../redux/Reducers/todosSlice';
import {useDispatch} from "react-redux";


export const DeleteTodoModal = ({showModal,setShowModal,handleDeleteTodo}) => {
	const dispatch = useDispatch()

	return (
		<>
			<Modal
				visible={showModal}
				animationType="slide"
				transparent={true}
			>
				<View style={styles.modalContainer}>
					<View style={styles.modalContent}>
						<Text style={styles.modalText}>Are you sure you want to delete this todo?</Text>
						<View style={styles.modalButtonsContainer}>
							<TouchableOpacity
								style={styles.modalButton}
								onPress={handleDeleteTodo}
							>
								<Text style={styles.modalButtonText}>Delete</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={styles.modalButton}
								onPress={()=>setShowModal(false)}
							>
								<Text style={styles.modalButtonText}>Cancel</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal></>
	)
}
const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	modalContent: {
		backgroundColor: 'white',
		padding: 20,
		borderRadius: 10,
		width: '80%',
	},
	modalText: {
		fontSize: 18,
		marginBottom: 20,
	},
	modalButtonsContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	modalButton: {
		padding: 10,
		marginLeft: 10,
	},
	modalButtonText: {
		fontSize: 16,
		color: 'blue',
	},
})