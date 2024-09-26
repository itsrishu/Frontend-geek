'use client'
import React, { useState } from 'react'
import menuData from './data.json'

const mimicApi = () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(menuData)
		}, 400)
	})
}

function Page() {
	const [data, setData] = useState(menuData)
	const [burgerOrder, setBurgerOrder] = useState({
		bun: '',
		patty: '2',
		cheese: '',
		sauce: [],
		toppings: '',
	})
	const [error, setError] = useState('')

	const {
		menu,
		burgerOptions: { buns, patties, sauces },
	} = data

	// Handle form submission
	const handleSubmit = (e) => {
		e.preventDefault()
		if (!burgerOrder.bun || !burgerOrder.patty) {
			setError('Please select a bun and patty')
			return
		}

		// Reset error state
		setError('')

		const newOrder = {
			customerName: 'abhishek',
			burger: {
				bun: buns.find((it) => it.id.toString() === burgerOrder.bun),
				patty: patties.find(
					(it) => it.id.toString() === burgerOrder.patty
				),
				sauces: sauces.filter((it) =>
					burgerOrder.sauce.includes(it.id.toString())
				),
			},
		}

		// Add the new order to the existing menu
		const updatedMenu = [...menu, newOrder]
		setData({ ...data, menu: updatedMenu })
	}

	// Handle checkbox toggle for sauces
	const handleSauceChange = (sauceId) => {
		setBurgerOrder((prev) => ({
			...prev,
			sauce: prev.sauce.includes(sauceId)
				? prev.sauce.filter((id) => id !== sauceId) // Remove if already selected
				: [...prev.sauce, sauceId], // Add if not selected
		}))
	}

	return (
		<div className='flex flex-col items-center'>
			<div className='flex flex-col'>
				<h1>Create Order</h1>
				<form onSubmit={handleSubmit}>
					{/* Display error if exists */}
					{error && <p className='text-red-500'>{error}</p>}

					<div>
						<label className='mr-2'>Bun</label>
						<select
							value={burgerOrder.bun}
							onChange={(e) =>
								setBurgerOrder({
									...burgerOrder,
									bun: e.target.value,
								})
							}
							className='h-[40px] text-gray-900 rounded-md'
						>
							<option value=''>Select a bun</option>
							{buns.map((itm) => (
								<option key={itm.id} value={itm.id}>
									{itm.name}
								</option>
							))}
						</select>
					</div>

					<div>
						<label className='mr-2'>Patty</label>
						{patties.map((itm) => (
							<div key={itm.id} className='flex'>
								<input
									type='radio'
									value={itm.id}
									className='h-[24px] w-[24px] mr-2 mb-2'
									checked={
										burgerOrder.patty === itm.id.toString()
									}
									onChange={(e) =>
										setBurgerOrder({
											...burgerOrder,
											patty: e.target.value,
										})
									}
								/>
								<span>{itm.name}</span>
							</div>
						))}
					</div>

					<div>
						<label className='mr-2'>Sauce</label>
						{sauces.map((itm) => (
							<div key={itm.id} className='flex'>
								<input
									type='checkbox'
									value={itm.id}
									className='h-[24px] w-[24px] mr-2 mb-2'
									checked={burgerOrder.sauce.includes(
										itm.id.toString()
									)}
									onChange={() =>
										handleSauceChange(itm.id.toString())
									}
								/>
								<span>{itm.name}</span>
							</div>
						))}
					</div>

					<button type='submit' className='mt-4'>
						Create order
					</button>
				</form>
			</div>

			{/* Display current orders */}
			<div className='flex flex-col w-[500px]'>
				{menu.map((item, idx) => (
					<div
						key={idx}
						className='flex flex-col border border-solid border-gray-400 rounded-md m-2 p-2'
					>
						<h2 className='text-white'>{item.customerName}</h2>
						<div>
							<h3>{item.burger.bun.name}</h3>
							<h3>{item.burger.patty.name}</h3>
							<h3>
								{item.burger.sauces
									.map((sc) => sc.name)
									.join(', ')}
							</h3>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default Page
