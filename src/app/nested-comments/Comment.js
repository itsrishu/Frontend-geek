import { useState } from 'react'

const Comment = ({
	comment = {},
	onSubmitComment = () => {},
	onEditComment = () => {},
	onDeleteComment = () => {},
}) => {
	const [expand, setExpand] = useState(false)
	const [replyContent, setReplyContent] = useState('')
	const [editMode, setEditMode] = useState(false)
	const [editedContent, setEditedContent] = useState(comment.content)

	const toggleExpand = () => {
		setExpand(!expand)
	}

	const handleReplySubmit = () => {
		if (replyContent) {
			onSubmitComment(comment.id, replyContent)
			setReplyContent('')
		}
	}

	const toggleEditMode = () => {
		setEditMode(!editMode)
		setEditedContent(comment.content) // Reset edited content to current comment content
	}

	const handleChange = (e) => {
		if (editMode) {
			setEditedContent(e.target.value)
		} else {
			setReplyContent(e.target.value)
		}
	}

	const handleEditSubmit = () => {
		onEditComment(comment.id, editedContent)
		setEditMode(false)
	}

	return (
		<div className='ml-5'>
			{!editMode ? (
				<>
					<p className='comment-content'>{comment.content}</p>
					<p className='comment-info'>Votes: {comment.votes}</p>
					<p className='comment-info'>
						{new Date(comment.timestamp).toLocaleString()}
					</p>
				</>
			) : (
				<div className='add-comment'>
					<textarea
						value={editedContent}
						onChange={handleChange}
						rows={3}
						cols={50}
						className='flex text-gray-900'
					/>
					<button
						onClick={handleEditSubmit}
						className='p-3 text-lg cursor-pointer bg-[#007bff] text-white rounded-[3px] mr-2'
					>
						Save Edit
					</button>
					<button
						onClick={toggleEditMode}
						className='p-3 text-lg cursor-pointer bg-[#007bff] text-white rounded-[3px] mr-2'
					>
						Cancel Edit
					</button>
				</div>
			)}

			<div className='flex'>
				<button
					onClick={toggleExpand}
					className='p-3 text-lg cursor-pointer bg-[#007bff] text-white rounded-[3px] mr-2'
				>
					{expand ? 'Hide Replies' : 'Reply'}
				</button>
				<button
					onClick={toggleEditMode}
					className='p-3 text-lg cursor-pointer bg-[#007bff] text-white rounded-[3px] mr-2'
				>
					Edit
				</button>
				<button
					onClick={() => onDeleteComment(comment.id)}
					className='p-3 text-lg cursor-pointer bg-[#007bff] text-white rounded-[3px]'
				>
					Delete
				</button>
			</div>

			{expand && (
				<div className='comment-replies'>
					<div className='add-comment'>
						<textarea
							value={replyContent}
							onChange={handleChange}
							placeholder='Add a reply...'
							rows={3}
							cols={50}
							className='flex text-gray-900'
						/>
						<button
							onClick={handleReplySubmit}
							className='p-3 text-lg cursor-pointer bg-[#007bff] text-white rounded-[3px] mr-2'
						>
							Submit Reply
						</button>
					</div>
					{comment?.replies?.map((reply) => (
						<Comment
							key={reply.id}
							comment={reply}
							onSubmitComment={onSubmitComment}
							onEditComment={onEditComment}
							onDeleteComment={onDeleteComment}
						/>
					))}
				</div>
			)}
		</div>
	)
}

export default Comment
