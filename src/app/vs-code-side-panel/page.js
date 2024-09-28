'use client'
import React, { useState } from 'react'
import { FolderClosed, File, FolderPlus, FilePlus } from 'lucide-react'
import data from './data.json'

function useTreeTraversal() {
	const insertNode = (tree, folderId, text, isFolder) => {
		if (tree.id === folderId && tree.isFolder) {
			tree.items.unshift({
				id: new Date().getTime(),
				title: text,
				isFolder: isFolder,
				items: [],
			})

			return tree
		}
		let latestNode = []
		latestNode = tree.items.map((ob) => {
			return insertNode(ob, folderId, text, isFolder)
		})

		return { ...tree, items: latestNode }
	}

	const deleteNode = (tree, folderId, text, isFolder) => {}
	const renameNode = (tree, folderId, text, isFolder) => {}

	return { insertNode, deleteNode, renameNode }
}

function page() {
	const [explorer, setExplorer] = useState(data)
	const { insertNode } = useTreeTraversal()

	function handleInsert(id, title, isFolder) {
		const tree = insertNode(explorer, id, title, isFolder)
		setExplorer(tree)
	}

	return (
		<div>
			<Folder explorer={explorer} insert={handleInsert} />
		</div>
	)
}

export default page

function Folder({ explorer, insert }) {
	const [isExpanded, setIsExpanded] = useState(false)
	const [input, setInput] = useState({
		isVisible: false,
		isFolder: false,
	})
	const [text, setText] = useState('')

	const handleRowClick = () => {
		setIsExpanded(!isExpanded)
	}

	const handleAdd = (id) => {
		insert(id, text, input.isFolder)
		setText('')
		setInput({
			isVisible: false,
			isFolder: false,
		})
		setIsExpanded(true)
	}

	if (explorer.isFolder) {
		return (
			<div className='flex flex-col cursor-pointer ml-3'>
				<div className='flex cursor-pointer w-[200px] justify-between'>
					<div className='flex' onClick={handleRowClick}>
						<FolderClosed />
						<div className='flex ml-2'>{explorer.title}</div>
					</div>
					<div className='flex'>
						<div
							className='mr-3'
							onClick={() =>
								setInput({ isVisible: true, isFolder: true })
							}
						>
							<FolderPlus />
						</div>
						<div
							onClick={() =>
								setInput({ isVisible: true, isFolder: false })
							}
						>
							<FilePlus />
						</div>
					</div>
				</div>
				{input.isVisible && (
					<div className='flex items-center'>
						<input
							value={text}
							onChange={(e) => setText(e.target.value)}
							className='text-gray-700'
						/>
						<button
							onClick={() =>
								handleAdd(explorer.id, input.isFolder)
							}
						>
							Add
						</button>
					</div>
				)}

				{explorer.items.map((itm, idx) => (
					<Folder explorer={itm} key={idx} insert={insert} />
				))}
			</div>
		)
	} else {
		return (
			<div className='flex cursor-pointer ml-3'>
				<File />
				<div className='flex ml-2'>{explorer.title}</div>
			</div>
		)
	}
}
