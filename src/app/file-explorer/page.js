'use client'
import React, { useState } from 'react'
import data from './data.json'

function page() {
	const [expData, setExpData] = useState(data)
	const insert = (id, name, isFolder) => {}
	return <Folder expData={expData} />
}

export default page

function Folder({ expData, insert }) {
	const [isExpanded, setIsExpanded] = useState(false)
	const [text, setText] = useState('')
	const [isFolder, setIsFolder] = useState(true)

	const handleChange = (e) => {
		const {
			target: { value },
		} = e

		setText(value)
	}

	const openInput = () => {
		setIsExpanded(true)
		setIsFolder()
	}

	const closeInput = () => {
		setIsExpanded(true)
		setIsFolder(false)
	}

	const add = () => {
		console.log(expData.id, text, expData.isFolder)
		insert(expData.id, text, expData.isFolder)
	}

	if (expData.isFolder) {
		return (
			<div className='flex flex-col ml-[10px]'>
				<div className='flex'>
					<div className='flex'>
						<h1 className='mr-[8px]'>Folder</h1>
						<h3>{expData.title}</h3>
					</div>
					<div className='flex'>
						<div onClick={openInput}>Folder</div>
						<div onClick={openInput}>File</div>
					</div>
				</div>
				{isExpanded ? (
					<div>
						<input value={text} onChange={handleChange} />
						<button onClick={add}>asdd</button>
					</div>
				) : null}

				{expData.items.map((item, idx) => (
					<Folder expData={item} key={idx} />
				))}
			</div>
		)
	} else {
		return (
			<div className='flex flex-col'>
				<div className='flex'>
					<h1 className='mr-[8px]'>File</h1>
					<h3>{expData.title}</h3>
				</div>
			</div>
		)
	}
}
