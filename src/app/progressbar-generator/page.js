'use client'
import React, { useState, useEffect, useCallback } from 'react'

function page() {
	const [count, setCount] = useState([])
	const [current, setCurrent] = useState(0)

	const onAdd = () => {
		setCount((prev) => [...prev, 'BAR'])
	}

	const handleCurrent = useCallback(() => {
		setCurrent(current + 1)
	}, [current])

	return (
		<div>
			<button onClick={onAdd}>Add</button>
			{count?.map((_, idx) => (
				<ProgressBar
					key={idx}
					start={current === idx}
					handleCurrent={handleCurrent}
				/>
			))}
		</div>
	)
}

export default page

function ProgressBar({ start, handleCurrent }) {
	const [width, setWidth] = useState(0)

	useEffect(() => {
		const intervalId = setInterval(() => {
			if (!start) return
			setWidth((prev) => {
				if (prev >= 100) {
					clearInterval(intervalId)
					handleCurrent()
					return prev
				}
				return prev + 20
			})
		}, 100)

		return () => clearInterval(intervalId)
	}, [start])

	return (
		<div className='flex w-[300px] rounded-md h-[40px] relative bg-gray-500 mt-[20px]'>
			<div
				className='absolute bg-green-500 h-full transition-[width] ease-in-out rounded-[inherit]'
				style={{ width: `${width}%` }}
			></div>
		</div>
	)
}
