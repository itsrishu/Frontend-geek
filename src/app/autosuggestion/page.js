'use client'
import React, { useState, useEffect, useRef } from 'react'

const DB = [
	{ title: 'apple', uid: 1 },
	{ title: 'mango', uid: 2 },
	{ title: 'guava', uid: 3 },
	{ title: 'grape', uid: 4 },
	{ title: 'lyche', uid: 5 },
]

function page() {
	const [text, setText] = useState('')

	const handleChange = (e) => {
		const {
			target: { value },
		} = e
		setText(value)
	}

	return (
		<div className='flex flex-col items-center w-[400px]'>
			<input
				value={text}
				onChange={handleChange}
				className='flex focus:outline-none w-full p-2 text-gray-800 border border-solid border-gray-400'
			/>
			{text ? <Suggestion q={text} /> : null}
		</div>
	)
}

export default page

function Suggestion({ q }) {
	return (
		<div className='bg-white w-full flex flex-col'>
			{DB.filter((it) =>
				it.title.toLowerCase().includes(q.toLowerCase())
			).map((item, idx) => {
				const parts = item.title.split(new RegExp(`(${q})`, 'gi'))
				return (
					<div key={idx}>
						{parts.map((part, idx) =>
							part.toLowerCase() === q.toLowerCase() ? (
								<strong className='text-gray-800' key={idx}>
									{part}
								</strong>
							) : (
								<span className='text-gray-800' key={idx}>
									{part}
								</span>
							)
						)}
					</div>
				)
			})}
		</div>
	)
}
