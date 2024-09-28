'use client'
import React, { useState, useRef, useEffect } from 'react'

const CheckoutSteps = [
	{
		name: 'Customer info',
		component: () => <div>Provide your contact details.</div>,
	},
	{
		name: 'Shipping info',
		component: () => <div>Provide your shipping details.</div>,
	},
	{
		name: 'Payment',
		component: () => <div>Complete payment for your order.</div>,
	},
	{
		name: 'Delivered',
		component: () => <div>Your order has been delivered.</div>,
	},
]

function page() {
	return (
		<div className=''>
			<h2>Checkout steps</h2>
			<CheckoutStepper stepsConfig={CheckoutSteps} />
		</div>
	)
}

export default page

const CheckoutStepper = ({ stepsConfig = [] }) => {
	const [currentStep, setCurrentStep] = useState(1)
	const [isComplete, setIsComplete] = useState(false)
	const [margins, setMargins] = useState({
		marginLeft: 0,
		marginRight: 0,
	})
	const stepRef = useRef([])

	useEffect(() => {
		setMargins({
			marginLeft: stepRef.current[0].offsetWidth / 2,
			marginRight:
				stepRef.current[stepsConfig.length - 1].offsetWidth / 2,
		})
	}, [stepRef, stepsConfig.length])

	if (!stepsConfig.length) {
		return <></>
	}

	const handleNext = () => {
		setCurrentStep((prevStep) => {
			if (prevStep === stepsConfig.length) {
				setIsComplete(true)
				return prevStep
			} else {
				return prevStep + 1
			}
		})
	}

	const calculateProgressBarWidth = () => {
		return ((currentStep - 1) / (stepsConfig.length - 1)) * 100
	}

	const ActiveComponent = stepsConfig[currentStep - 1]?.component

	return (
		<>
			<div className='relative flex justify-between items-center mb-5'>
				{stepsConfig.map((step, index) => {
					return (
						<div
							key={step.name}
							ref={(el) => (stepRef.current[index] = el)}
							className={`flex flex-col items-center ${
								currentStep > index + 1 || isComplete
									? 'complete'
									: ''
							} ${currentStep === index + 1 ? 'active' : ''}`}
						>
							<div
								className={`w-8 h-8 rounded-full flex justify-center items-center mb-1 z-10 ${
									currentStep > index + 1 || isComplete
										? 'bg-green-500 text-white'
										: currentStep === index + 1
										? 'bg-blue-500 text-white'
										: 'bg-gray-300'
								}`}
							>
								{currentStep > index + 1 || isComplete ? (
									<span>&#10003;</span>
								) : (
									index + 1
								)}
							</div>
							<div className='text-sm'>{step.name}</div>
						</div>
					)
				})}

				<div
					className='absolute top-1/4 left-0 h-1 bg-gray-300 w-full'
					style={{
						width: `calc(100% - ${
							margins.marginLeft + margins.marginRight
						}px)`,
						marginLeft: margins.marginLeft,
						marginRight: margins.marginRight,
					}}
				>
					<div
						className='h-full bg-green-500 transition-all duration-200'
						style={{ width: `${calculateProgressBarWidth()}%` }}
					></div>
				</div>
			</div>

			<ActiveComponent />

			{!isComplete && (
				<button
					className='px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600'
					onClick={handleNext}
				>
					{currentStep === stepsConfig.length ? 'Finish' : 'Next'}
				</button>
			)}
		</>
	)
}
