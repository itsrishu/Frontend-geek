'use client'
import React, { useState } from 'react'

export function Comments({ data, insert }) {
	const [isExpanded, setIsExpanded] = useState(false)
	const [isVisible, setIsVisible] = useState(false)
	const [text, setText] = useState('')

	const onAdd = () => {
		insert(data.uid, text)
		setIsExpanded(true)
	}

	const togglesReplies = () => {
		setIsExpanded(!isExpanded)
	}

	const toggleInput = () => {
		setIsVisible(!isVisible)
	}
	const handleChange = (e) => {
		setText(e.target.value)
	}

	return (
		<div className='border border-solid border-gray-400 p-2 mt-2'>
			<h2>{data.title}</h2>
			<div className='flex flex-col justify-end'>
				<div className='flex justify-end'>
					<div
						onClick={togglesReplies}
						className='mr-2 cursor-pointer'
					>
						Replies
					</div>
					<button className='cursor-pointer' onClick={toggleInput}>
						Add
					</button>
				</div>
				{isVisible && (
					<div className='flex justify-end'>
						<input
							value={text}
							onChange={handleChange}
							className='text-red-400'
						/>
						<button onClick={onAdd}>Submit</button>
					</div>
				)}
			</div>
			{isExpanded &&
				data.items.map((comment, idx) => (
					<Comments data={comment} key={idx} insert={insert} />
				))}
		</div>
	)
}
