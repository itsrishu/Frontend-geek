'use client'
import React, { useState, useRef } from 'react'

function page() {
	const [circles, setCircles] = useState([])
	const [isDrawing, setIsDrawing] = useState(false)
	const [currentCircle, setcurrentCircle] = useState(null)
	const [undowedPoints, setUndowedPoints] = useState([])

	const canvasRef = useRef()

	const handleMouseDown = (e) => {
		if (!canvasRef.current) return
		const { clientX, clientY } = e
		setIsDrawing(true)
		const startX = clientX
		const startY = clientY
		setcurrentCircle({ startX, startY, radius: 0 })
	}

	const handleMouseMove = (e) => {
		if (!canvasRef.current || !isDrawing) return
		const { clientX, clientY } = e
		const currentX = clientX
		const currentY = clientY
		const radius = Math.sqrt(
			Math.pow(currentX - currentCircle.startX, 2) +
				Math.pow(currentY - currentCircle.startY, 2)
		)
		setcurrentCircle({ ...currentCircle, currentY, radius })
	}
	const handleMouseUp = (e) => {
		if (isDrawing) {
			setCircles([...circles, currentCircle])
			setIsDrawing(false)
			setcurrentCircle(null)
		}
	}

	const handleRedo = (e) => {
		const newUndowedCircles = [...undowedPoints]
		const newPoppedCircle = newUndowedCircles.pop()
		setCircles([...circles, newPoppedCircle])
		setUndowedPoints(newUndowedCircles)
	}

	const handleUndo = (e) => {
		const newCircles = [...circles]
		const newPopedCircle = newCircles.pop()
		const filteredCircles = newCircles.filter(
			(cr) => cr.startX !== newPopedCircle.startX
		)
		setUndowedPoints([...undowedPoints, newPopedCircle])
		setCircles(filteredCircles)
	}

	return (
		<div>
			<div className='flex justify-center'>
				<h1>Click and Drag to Draw Circles</h1>
			</div>
			<div className='flex justify-center mt-2'>
				<button
					className='flex p-2 border border-solid border-gray-300 mr-2 rounded-md'
					onClick={handleUndo}
				>
					Undo
				</button>
				<button
					className='flex p-2 border border-solid border-gray-300 rounded-md'
					onClick={handleRedo}
				>
					Redo
				</button>
			</div>

			<div
				className='flex h-screen w-screen'
				ref={canvasRef}
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
			>
				{circles.map((item, idx) => (
					<div
						style={{
							position: 'absolute',
							left: `${item.startX - item.radius}px`,
							top: `${item.startY - item.radius}px`,
							width: `${item.radius * 2}px`,
							height: `${item.radius * 2}px`,
							borderRadius: '50%',
							border: '1px solid red',
						}}
					/>
				))}
				{isDrawing && currentCircle && (
					<div
						style={{
							position: 'absolute',
							left: `${
								currentCircle.startX - currentCircle.radius
							}px`,
							top: `${
								currentCircle.startY - currentCircle.radius
							}px`,
							width: `${currentCircle.radius * 2}px`,
							height: `${currentCircle.radius * 2}px`,
							borderRadius: '50%',
							border: '1px solid blue',
						}}
					/>
				)}
			</div>
		</div>
	)
}

export default page
