import { useReducer, useState } from 'react'
import './App.css'

type Book = string

interface AppState {
	books: Book[]
	inventory: string[]
}

type AppAction = {
	type: 'add_book' | 'take_book' | 'inventory'
	payload: Book
}

const books = [
	'War and Peace',
	'1984',
	'Crime and Punishment',
	'Ulysses',
	'Pride and Prejudice',
	'Quiet Flows the Don',
	'The Great Gatsby',
]

// reducer - якась інструкція, за якою змінюється стан. Отримуємо дані про подію, яка відбулася, і маємо повернути оновлений store. Через reducer dispatch-чер змінює store.
// Було 10 книг в бібліотеці 1 видали залишилось 9 - ці розрахунки робить саме reducer.
const reducer = (state: AppState, action: AppAction): AppState => {
	console.log('reducer:state', state)
	console.log('reducer:action', action)

	switch (action.type) {
		case 'add_book':
			// action.payload - нова книга
			return {
				...state,
				books: [...state.books, action.payload],
			}
		case 'take_book':
			return {
				...state,
				books: state.books.filter(book => book !== action.payload),
			}
		case 'inventory':
			return {
				...state,
				inventory: [...state.inventory, new Date().toLocaleString()],
			}
		default:
			return state
	}
}

function App() {
	const [value, setValue] = useState('')
	// initialArg - початкове значення стану. Можна масив використовувати, але буде об'єкт.
	// book - положым книги в наш store
	const [state, dispatch] = useReducer(reducer, {
		books,
		inventory: [],
	} as AppState)

	const handleAddBook = (e: React.FormEvent) => {
		e.preventDefault()
		dispatch({
			type: 'add_book',
			payload: value,
		})
	}

	const handlerTakeBook = (book: Book) => {
		dispatch({
			type: 'take_book',
			payload: book,
		})
	}

	const handleInventory = () => {
		dispatch({
			type: 'inventory',
			payload: '',
		})
	}

	console.log('state', state)

	return (
		<>
			<h3>Book list</h3>

			<form>
				<input
					value={value}
					onChange={e => setValue(e.target.value)}
					type='text'
				/>
				<button onClick={handleAddBook} className='add'>
					Add book
				</button>
			</form>

			<ul className='list'>
				{state.books.map(book => (
					<li key={book}>
						<div>{book}</div>
						<button onClick={() => handlerTakeBook(book)} className='take'>
							Take book
						</button>
					</li>
				))}
			</ul>

			<h3>Inventory</h3>
			{state.inventory.map(date => (
				<ul className='inventory-list'>
					<li className='inventory-item' key={date}>{date}</li>
				</ul>
			))}
			<button onClick={handleInventory} className='take'>
				Make inventory
			</button>
		</>
	)
}

export default App
