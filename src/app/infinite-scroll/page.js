'use client'
import React, { useState, useRef, useCallback, useEffect } from 'react'
const LIMIT = 10

//https://jsonplaceholder.typicode.com/posts?_page=2&_limit=10

function page() {
	const [data, setData] = useState([])
	const [hasMore, setHasMore] = useState(false)
	const [page, setPage] = useState(1)

	const observer = useRef()

	const lastItemRef = useCallback(
		(node) => {
			if (observer.current) observer.current.disconnect()
			observer.current = new IntersectionObserver(
				(entries) => {
					const entry = entries[0]
					if (entry.isIntersecting && hasMore) {
						setPage((prev) => prev + 1)
					}
				},
				{
					threshold: '1',
				}
			)

			if (node) observer.current.observe(node)
		},
		[hasMore]
	)

	const fetchPosts = async (page) => {
		const response = await fetch(
			`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${LIMIT}`
		)
		const result = await response.json()
		const newData = [...data]
		setHasMore(result.length > 0)
		setData([...newData, ...result])
	}

	useEffect(() => {
		fetchPosts(page)
	}, [page])

	return (
		<div>
			<div className='grid grid-cols-5 gap-2'>
				{data.map((it, idx) => {
					return (
						<div
							className='h-[300px] w-[200px] border border-solid border-gray-400 rounded-sm'
							key={idx}
						>
							{it.title}
						</div>
					)
				})}
			</div>
			{hasMore ? (
				<div
					ref={lastItemRef}
					className='h-[40px] border border-solid border-gray-600 rounded-sm'
				>
					Loading...
				</div>
			) : null}
		</div>
	)
}

export default page
