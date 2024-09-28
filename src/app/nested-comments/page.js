'use client'
import NestedComments from './NestedComments'
import commentsData from './data.json'

function Page() {
	return (
		<div>
			<h1>Nested Comment System</h1>
			<NestedComments
				comments={commentsData}
				onSubmit={() => {}}
				onEdit={() => {}}
				onDelete={() => {}}
			/>
		</div>
	)
}

export default Page
