

import React, { useState, useEffect } from "react";
import axios from "axios";
import UserList from "./UserList";

function PostFeed() {
	const [commentInputs, setCommentInputs] = useState({});
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		axios
			.get("http://localhost:5000/api/posts")
			.then((response) => setPosts(response.data))
			.catch((error) => console.error("Error fetching posts:", error));
	}, []);

	const handleLike = (postId) => {
		axios
			.post(`http://localhost:5000/api/posts/like/${postId}`)
			.then((response) => {
				const updatedPosts = posts.map((post) =>
					post._id === postId ? response.data : post
				);
				setPosts(updatedPosts);
			})
			.catch((error) => console.error("Error liking post:", error));
	};

	const handleAddComment = (postId, commentText) => {
		if (commentText.trim() === "") {
			// If the comment text is empty or contains only whitespace, do nothing
			return;
		}
		axios
			.post(`http://localhost:5000/api/posts/comment/${postId}`, {
				text: commentText,
			})
			.then((response) => {
				const updatedPosts = posts.map((post) =>
					post._id === postId ? response.data : post
				);
				setPosts(updatedPosts);
				setCommentInputs({ ...commentInputs, [postId]: "" }); // Clear comment input for the specific post
				// document.querySelector('.comment-input').value = '';
			})
			.catch((error) => console.error("Error adding comment:", error));
	};

	const handleCommentInputChange = (postId, commentText) => {
		setCommentInputs({ ...commentInputs, [postId]: commentText }); // Update comment input for the specific post
	};

	return (
		<div className="container" style={{display: 'flex'}}>

			<div className="post-feed" style={{ overflowY: 'auto', maxHeight: '90vh', maxWidth: '80vh' }}>
				<h2>Recent Posts</h2>
				{posts.map((post) => (
					<div key={post._id} className="post">
						<h3>{post.title}</h3>
						<p>{post.content}</p>
						{post.file && (
							<div>
								{post.file.includes(".mp4") ? (
									<video width="320" height="240" controls>
										<source
											src={
												`http://localhost:5000/uploads/${post.file}`
											}
											type="video/mp4"
										/>
										Your browser does not support the video tag.
									</video>
								) : (
									<img
										src={
											`http://localhost:5000/uploads/${post.file}`
										}
										alt="Post Media"
									/>
								)}
							</div>
						)}
						<p>Likes: {post.likes}</p>
						<button onClick={() => handleLike(post._id)}>Like</button>
						<p>Comments: {post.comments.length}</p>
						<ul>
							{post.comments.map((comment, index) => (
								<li key={index}>{comment.text}</li>
							))}
						</ul>

						<input
							type="text"
							placeholder="Add a comment"
							value={commentInputs[post._id] || ""}
							className="comment-input"
							onChange={(e) => handleCommentInputChange(post._id, e.target.value)}
						/>
						<button
							onClick={() => handleAddComment(post._id, commentInputs[post._id] || "")}
							className="comment-button"
						>
							Add Comment
						</button>
					</div>
				))}
			</div>

			<div className="userlist" style={{width:'30vh', display: 'flex', flexDirection: 'row-reverse', justifyContent: 'center', background: '#f3f3ce', marginBottom: '20px'}}>
				<UserList />
			</div>

		</div>
	);
}

export default PostFeed;
