'use client'
import React, { useState } from 'react'
import data from './data.json'

// Helper Function to Flatten Nested Data
const flattenTree = (node, parentId = null, result = {}) => {
	result[node.id] = {
		id: node.id,
		title: node.title,
		isFolder: node.isFolder,
		parent: parentId,
		children: node.items.map((child) => child.id),
	}

	node.items.forEach((child) => flattenTree(child, node.id, result))
	return result
}

const FileExplorer = () => {
	const [flatData, setFlatData] = useState(flattenTree(data))
	const [expandedFolders, setExpandedFolders] = useState({})
	const [editingNode, setEditingNode] = useState(null) // Track node being edited
	const [addingNodeParent, setAddingNodeParent] = useState(null) // Track folder for adding new node
	const [newNode, setNewNode] = useState({ title: '', isFolder: false }) // For adding new nodes

	const toggleFolder = (id) => {
		setExpandedFolders((prev) => ({
			...prev,
			[id]: !prev[id],
		}))
	}

	// Add a new node
	const handleAddNode = () => {
		// Prevent empty titles
		if (!newNode.title.trim()) return

		const newId = Date.now() // Generate a unique ID for the new node
		const parentId = addingNodeParent
		const nodeToAdd = { ...newNode }

		// Immediately reset the states for addingNodeParent and newNode
		setAddingNodeParent(null)
		setNewNode({ title: '', isFolder: false }) // Reset to initial state for the new node

		// Update flatData and expandedFolders states
		setFlatData((prevData) => {
			const newFlatData = JSON.parse(JSON.stringify(prevData))

			// Add the new node to the flat data
			newFlatData[newId] = {
				id: newId,
				title: nodeToAdd.title,
				isFolder: nodeToAdd.isFolder,
				parent: parentId,
				children: [], // Initially empty
			}

			// Attach the new node to the parent's children
			if (parentId !== null && newFlatData[parentId]) {
				newFlatData[parentId].children = [
					...newFlatData[parentId].children,
					newId,
				]
			}

			return newFlatData
		})

		// Update expandedFolders to ensure the folder remains expanded if necessary
		if (nodeToAdd.isFolder && expandedFolders[parentId]) {
			setExpandedFolders((prev) => ({
				...prev,
				[parentId]: true, // Ensure the folder stays expanded
			}))
		}
	}

	// Delete a node and its children
	const handleDeleteNode = (nodeId) => {
		setFlatData((prevData) => {
			const newFlatData = { ...prevData }

			// Recursive function to delete all descendants
			const deleteRecursively = (id) => {
				newFlatData[id].children.forEach(deleteRecursively)
				delete newFlatData[id]
			}

			const parentId = newFlatData[nodeId].parent
			if (parentId) {
				newFlatData[parentId].children = newFlatData[
					parentId
				].children.filter((id) => id !== nodeId)
			}
			deleteRecursively(nodeId)

			return newFlatData
		})
	}

	// Edit a node
	const handleEditNode = (nodeId, newTitle) => {
		setFlatData((prevData) => ({
			...prevData,
			[nodeId]: {
				...prevData[nodeId],
				title: newTitle,
			},
		}))
		setEditingNode(null)
	}

	const renderTree = (nodeId, level = 0) => {
		const node = flatData[nodeId]

		return (
			<div key={node.id} style={{ marginLeft: `${level * 20}px` }}>
				{node.isFolder ? (
					<>
						{/* Folder */}
						<div>
							<button onClick={() => toggleFolder(node.id)}>
								{expandedFolders[node.id] ? '-' : '+'}
							</button>
							{editingNode === node.id ? (
								<input
									type='text'
									defaultValue={node.title}
									onBlur={(e) =>
										handleEditNode(node.id, e.target.value)
									}
								/>
							) : (
								<span
									onDoubleClick={() =>
										setEditingNode(node.id)
									}
								>
									📁 {node.title}
								</span>
							)}
							<button onClick={() => handleDeleteNode(node.id)}>
								Delete
							</button>
							<button
								onClick={() => setAddingNodeParent(node.id)}
							>
								Add Item
							</button>
						</div>
						{expandedFolders[node.id] &&
							node.children.map((childId) =>
								renderTree(childId, level + 1)
							)}
						{addingNodeParent === node.id && (
							<div
								style={{ marginLeft: `${(level + 1) * 20}px` }}
							>
								<input
									type='text'
									placeholder='Enter name'
									value={newNode.title}
									onChange={(e) =>
										setNewNode((prev) => ({
											...prev,
											title: e.target.value,
										}))
									}
								/>
								<select
									value={newNode.isFolder ? 'folder' : 'file'}
									onChange={(e) =>
										setNewNode((prev) => ({
											...prev,
											isFolder:
												e.target.value === 'folder',
										}))
									}
								>
									<option value='folder'>Folder</option>
									<option value='file'>File</option>
								</select>
								<button onClick={handleAddNode}>Add</button>
								<button
									onClick={() => setAddingNodeParent(null)}
								>
									Cancel
								</button>
							</div>
						)}
					</>
				) : (
					// File
					<div>
						{editingNode === node.id ? (
							<input
								type='text'
								defaultValue={node.title}
								onBlur={(e) =>
									handleEditNode(node.id, e.target.value)
								}
							/>
						) : (
							<span onDoubleClick={() => setEditingNode(node.id)}>
								📄 {node.title}
							</span>
						)}
						<button onClick={() => handleDeleteNode(node.id)}>
							Delete
						</button>
					</div>
				)}
			</div>
		)
	}

	return (
		<div>
			<h1>File Explorer</h1>
			{renderTree(1)} {/* Start rendering from root node */}
		</div>
	)
}

export default FileExplorer
