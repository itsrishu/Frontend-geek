'use client'
import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

const OPTIONS = {
	root: null,
	rootMargin: '300px',
	threshold: 1.0,
}

export default function Page() {
	const [text, setText] = useState('')
	const [data, setData] = useState([])
	const [page, setPage] = useState(0)
	const [hasMore, setHasMore] = useState(false)
	const lastItemRef = useRef(null)

	const handleChange = (e) => {
		const {
			target: { value },
		} = e
		setText(value)
		setPage(0) // Reset page when new search query is entered
	}

	// Fetch data whenever `page` or `text` changes
	useEffect(() => {
		if (text) {
			fetchPosts(text, page)
		}
	}, [text, page])

	useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			const entry = entries[0]
			if (hasMore && entry.isIntersecting) {
				setPage((prevPage) => prevPage + 1) // Trigger next page load
			}
		}, OPTIONS)

		if (lastItemRef.current) {
			observer.observe(lastItemRef.current)
		}
		return () => {
			if (lastItemRef.current) {
				observer.unobserve(lastItemRef.current)
			}
		}
	}, [hasMore])

	const fetchPosts = async (q, pageNum) => {
		const resp = await fetch(
			`https://dummyjson.com/products/search?q=${q}&limit=10&skip=${
				pageNum * 10
			}`
		)
		const response = await resp.json()
		const newData =
			pageNum === 0 ? response.products : [...data, ...response.products] // If it's the first page, reset the data
		setData(newData)
		setHasMore(response.products.length === 10) // If fewer than 10 items are returned, there's no more data
	}

	return (
		<div className='flex flex-col items-center mt-4'>
			<input
				onChange={handleChange}
				value={text}
				className='text-[#3C4852] focus:outline-none w-[400px] p-[8px] rounded-lg'
				placeholder='Search for products...'
			/>
			<div className='grid grid-cols-5 gap-3 w-full mt-4'>
				{data?.map((item, idx) => (
					<div
						key={idx}
						ref={idx === data.length - 1 ? lastItemRef : null} // Attach ref to the last item for infinite scroll
						className='flex flex-col border border-solid border-gray-500 w-[200px] p-2'
					>
						<div className='my-20'>
							<Image
								src={item?.thumbnail}
								width={200}
								height={400}
								alt={item?.title}
							/>
						</div>
						<h3 className='text-white'>{item?.title}</h3>
						<h6 className='text-white'>${item?.price}</h6>
					</div>
				))}
			</div>
			{!hasMore && text && <p className='text-white'>No more products</p>}
		</div>
	)
}
