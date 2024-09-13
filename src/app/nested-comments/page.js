'use client'
import React, { useState } from 'react'
import data from './data.json'
import { Comments } from './Comments'

export const useTreeTraversal = () => {
	const insertNode = (tree, uid, text) => {
		if (tree.uid === uid) {
			tree.items.unshift({
				title: text,
				uid: Math.floor(Math.random() * 100000),
				items: [],
			})
			return tree
		}
		let latestNode = []
		latestNode = tree.items.map((item) => insertNode(item, uid, text))
		return { ...tree, items: latestNode }
	}

	return { insertNode }
}

function page() {
	const [comments, setComments] = useState(data)
	const { insertNode } = useTreeTraversal()

	const insert = (target, reply) => {
		const newData = insertNode(comments, target, reply)
		setComments(newData)
	}

	return (
		<div>
			<Comments data={comments} insert={insert} />
		</div>
	)
}

export default page
