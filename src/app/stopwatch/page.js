'use client'
import React, { useState, useEffect, useRef } from 'react'

function page() {
	const [time, setTime] = useState(0)
	const [isStarted, setIsStarted] = useState(false)

	const timerRef = useRef()

	useEffect(() => {
		return () => {
			clearInterval(timerRef.current)
		}
	}, [])

	function formatTime(seconds) {
		// Get the whole number of seconds and milliseconds
		const ms = Math.floor((seconds * 1000) % 1000) // Get milliseconds from the seconds input
		const totalSeconds = Math.floor(seconds)
		const hours = Math.floor(totalSeconds / 3600)
		const minutes = Math.floor((totalSeconds % 3600) / 60)
		const secs = totalSeconds % 60

		const paddedHours = String(hours).padStart(2, '0')
		const paddedMinutes = String(minutes).padStart(2, '0')
		const paddedSeconds = String(secs).padStart(2, '0')
		const paddedMs = String(Math.floor(ms / 10)).padStart(2, '0') // Convert ms to 2-digit precision

		return `${paddedHours}::${paddedMinutes}::${paddedSeconds}::${paddedMs}`
	}

	const onStart = () => {
		setIsStarted(true)
		//  time = 1000 and prev + 1 if every second increamentation is needed
		timerRef.current = setInterval(() => {
			setTime((prev) => prev + 0.01)
		}, 10)
	}

	const onPause = () => {
		setIsStarted(false)
		clearInterval(timerRef.current)
	}
	const onReset = () => {
		if (timerRef.current) {
			clearInterval(timerRef.current)
		}
		setTime(0)
	}

	return (
		<div>
			<div>
				{!isStarted && <button onClick={onStart}>Start</button>}
				{isStarted && <button onClick={onPause}>Pause</button>}
				<button onClick={onReset}>Reset</button>
			</div>
			<div>{formatTime(time)}</div>
		</div>
	)
}

export default page
