import { useState } from 'react'
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

function App() {
	const [value, setValue] = useState('')

	return (
		<>
			<h3>Book list</h3>

			<form>
				<input
					value={value}
					onChange={e => setValue(e.target.value)}
					type='text'
				/>
				<button className='add'>Add book</button>
			</form>

			<ul className='list'>
				{books.map(book => (
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
