'use client'
import React, { useState, useEffect, useRef } from 'react'

function page() {
	const [count, setCount] = useState(1) // Initial count
	const [direction, setDirection] = useState('increment') // Track direction
	const intervalRef = useRef(null) // Reference to store the interval

	useEffect(() => {
		intervalRef.current = setInterval(() => {
			setCount((prev) => {
				// Calculate next count based on current direction
				const nextCount =
					direction === 'increment' ? prev + 1 : prev - 1

				// Determine if we need to change direction
				if (nextCount > 10) {
					setDirection('decrement')
					return 10 // Ensure count stays at 10
				}
				if (nextCount < 1) {
					setDirection('increment')
					return 1 // Ensure count stays at 1
				}

				return nextCount // Return the calculated count
			})
		}, 1000) // 1000ms = 1 second

		// Cleanup function to clear the interval when component unmounts
		return () => clearInterval(intervalRef.current)
	}, [direction]) // Dependency array includes direction to handle updates

	return (
		<div className='flex justify-center'>
			<h1>{count}</h1>
		</div>
	)
}

export default page
