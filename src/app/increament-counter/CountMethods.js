export const countAnimate = (obj, initVal, lastVal, duration) => {
	let startTime = null

	//get the current timestamp and assign it to the currentTime variable
	let currentTime = Date.now()

	//pass the current timestamp to the step function
	const step = (currentTime) => {
		//if the start time is null, assign the current time to startTime
		if (!startTime) {
			startTime = currentTime
		}

		//calculate the value to be used in calculating the number to be displayed
		const progress = Math.min((currentTime - startTime) / duration, 1)

		//calculate what to be displayed using the value gotten above
		obj.innerHTML = Math.floor(progress * (lastVal - initVal) + initVal)

		//checking to make sure the counter does not exceed the last value (lastVal)
		if (progress < 1) {
			window.requestAnimationFrame(step)
		} else {
			window.cancelAnimationFrame(window.requestAnimationFrame(step))

			// add time diff
			const diff = currentTime - startTime
			const elm = document.createElement('SPAN')
			elm.innerHTML = `  | Took : <b>${
				diff / 1000
			}</b> seconds to complete`
			obj.appendChild(elm)
		}
	}

	//start animating
	window.requestAnimationFrame(step)
}
