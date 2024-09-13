'use client'
import React, { useState, useRef } from 'react'

const DURATION_MS = 300 * 1000

function page() {
	const [time, setTime] = useState(DURATION_MS)
	const [isStarted, setIsStarted] = useState(false)

	const timerRef = useRef(null)

	const formatTime = (milliseconds) => {
		const hours = Math.floor(milliseconds / (1000 * 60 * 60))
		milliseconds %= 1000 * 60 * 60
		const minutes = Math.floor(milliseconds / (1000 * 60))
		milliseconds %= 1000 * 60
		const seconds = Math.floor(milliseconds / 1000)
		const ms = Math.floor((milliseconds % 1000) / 10)

		return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
			2,
			'0'
		)}:${String(seconds).padStart(2, '0')}:${String(ms).padStart(2, '0')}`
	}

	function onStart(e) {
		setIsStarted(true)
		timerRef.current = setInterval(() => {
			setTime((prev) => prev - 10)
		}, 10)
	}
	function onPause(e) {
		setIsStarted(false)
		clearInterval(timerRef.current)
	}
	function onReset(e) {
		setIsStarted(false)
		clearInterval(timerRef.current)
		setTime(DURATION_MS)
	}

	return (
		<div className='flex flex-col items-center'>
			<div className='flex text-white'>{formatTime(time)}</div>
			<div>
				{!isStarted && (
					<button
						className='flex p-2 bg-slate-300 border border-solid border-gray-600 rounded-md text-gray-800'
						onClick={onStart}
					>
						Play
					</button>
				)}

				{isStarted && (
					<div className='flex'>
						<button
							className='flex p-2 bg-slate-300 border border-solid border-gray-600 rounded-md text-gray-800'
							onClick={onPause}
						>
							Pause
						</button>
						<button
							className='flex p-2 bg-slate-300 border border-solid border-gray-600 rounded-md text-gray-800'
							onClick={onReset}
						>
							Reset
						</button>
					</div>
				)}
			</div>
		</div>
	)
}

export default page
