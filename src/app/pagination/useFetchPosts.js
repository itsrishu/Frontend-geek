'use client'
import React, { useEffect, useState } from 'react'

const REQUEST_URL = 'https://jsonplaceholder.typicode.com/posts'

export const useFetchPosts = () => {
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)

	async function fetchPosts() {
		try {
			setLoading(true)
			const resp = await fetch(REQUEST_URL)
			const response = await resp.json()
			setData(response)
		} catch (err) {
			console.log(err)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchPosts()
	}, [])

	return { data, loading }
}
