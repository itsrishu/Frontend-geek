'use client'
import React, { useState, useEffect } from 'react'
import { useFetchPosts } from './useFetchPosts'

const LIMIT_PER_PAGE = 15

function page() {
	const { data, loading } = useFetchPosts()
	const [pages, setPages] = useState([])
	const [activePage, setActivePage] = useState(1)

	useEffect(() => {
		setPages(Array(Math.floor(data?.length / LIMIT_PER_PAGE)).fill(null))
	}, [data])

	const handleClick = (page) => {
		setActivePage(page + 1)
	}

	const handleNext = () => {
		if (activePage === pages.length) return
		setActivePage((prev) => prev + 1)
	}
	const handlePrev = () => {}

	const initialPage = (activePage - 1) * LIMIT_PER_PAGE
	const finalPage = LIMIT_PER_PAGE * activePage - 1

	return (
		<div className='flex flex-col'>
			<div className='grid grid-cols-5 gap-3'>
				{!loading &&
					data.slice(initialPage, finalPage).map((post, idx) => (
						<div
							key={idx}
							className='w-[200px] grid-cols-5 gap-3 border border-solid border-gray-400 p-3'
						>
							<h2>{post.title}</h2>
							<h5>{post.userId}</h5>
						</div>
					))}
			</div>
			<div className='flex w-full justify-center mt-5'>
				<div
					disabled={activePage === pages.length}
					onClick={handleNext}
					style={{}}
					className='flex items-center h-10 w-10 rounded-sm cursor-pointer justify-center border border-solid border-gray-300'
				>
					Next
				</div>
				{pages.map((_, idx) => (
					<div
						onClick={() => handleClick(idx)}
						className='flex items-center h-10 w-10 rounded-sm cursor-pointer justify-center border border-solid border-gray-300'
						style={{
							backgroundColor:
								idx + 1 === activePage ? 'green' : 'unset',
						}}
					>
						{idx + 1}
					</div>
				))}
				<div
					onClick={handlePrev}
					className='flex items-center h-10 w-10 rounded-sm cursor-pointer justify-center border border-solid border-gray-300'
				>
					Prev
				</div>
			</div>
		</div>
	)
}

export default page
