'use client'

import React, { useState, useRef } from 'react'
import { countAnimate } from './CountMethods'

const page = () => {
	const [number, setNumber] = useState(0)
	const [duration, setDuration] = useState(0)
	const [start, setStart] = useState(false)
	const countRef = useRef()

	//If any input changes reset
	const basicReset = () => {
		setStart(false)
		countRef.current.innerHTML = '0'
	}

	//store number
	const numberChangeHandler = (e) => {
		const { value } = e.target
		setNumber(value)
		basicReset()
	}

	//store duration
	const durationChangeHandler = (e) => {
		const { value } = e.target
		setDuration(value)
		basicReset()
	}

	const startHandler = () => {
		// trigger the animation
		setStart(true)
		countAnimate(
			countRef.current,
			0,
			parseInt(number),
			parseInt(duration) * 1000
		)
	}

	const resetHandler = () => {
		window.location.reload()
	}

	return (
		<main style={{ width: '500px', margin: '50px auto' }}>
			<section className='input-area'>
				<div>
					<div>
						<label>Number:</label>
						<input
							className='text-gray-500'
							type='number'
							value={number}
							onChange={numberChangeHandler}
						/>
					</div>
					<div>
						<label>Duration:</label>
						<input
							className='text-gray-500'
							type='number'
							value={duration}
							onChange={durationChangeHandler}
						/>
					</div>
				</div>
				<br />
				<div>
					<button onClick={startHandler}>start</button>
					<button onClick={resetHandler}>reset</button>
				</div>
			</section>
			<br />
			<section className='result-area'>
				<div>
					Animate:<span ref={countRef}>0</span>
				</div>
			</section>
		</main>
	)
}

export default page
