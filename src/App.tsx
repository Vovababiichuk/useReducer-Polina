import { useState, useReducer } from 'react'
import './App.css'

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
const reducer = (state, action) => {
	switch(action.type) {
		case 'add_book':
			// action.payload - нова книга
			return {
				...state,
				books: [...state.books, action.payload]
			}
		// case 'take_book':
		default: return state
	}
}

function App() {
	const [value, setValue] = useState('')
	// initialArg - початкове значення стану. Можна масив використовувати, але буде об'єкт.
	// book - положым книги в наш store
	const [state, dispatch] = useReducer(reducer, {
		books,
		inventory: []
	})

	const handleAddBook = (e) => {
		e.preventDefault()
		dispatch({
			type: 'add_book',
			payload: value
		})
	}

	return (
		<>
			<h3>Book list</h3>

			<form>
				<input
					value={value}
					onChange={e => setValue(e.target.value)}
					type='text'
				/>
				<button onClick={handleAddBook} className='add'>Add book</button>
			</form>

			<ul className='list'>
				{state.books.map(book => (
					<li key={book}>
						<div>{book}</div>
						<button>Issue a book</button>
					</li>
				))}
			</ul>

			<h3>Inventory</h3>
			<button>Take inventory</button>
		</>
	)
}

export default App
