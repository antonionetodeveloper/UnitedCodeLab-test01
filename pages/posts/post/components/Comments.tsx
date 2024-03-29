/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { useContext, useState } from "react"

import { CommentType } from "../../../../types/Comment"

import { formatDate } from "../../../api/posts/services/formatDate"
import Context from "../../../../context/Context"
import AddComment from "./addComment"
import { parseCookies } from "nookies"

import styled, { DefaultTheme, StyledComponent } from "styled-components"

const Comments = ({ postId, comments, addComment }) => {
	// eu tentei fazer isso não parecer uma bagunça...
	// simplesmente impossivel de fazer isso.

	const { auth } = useContext(Context)
	const cookies = parseCookies()

	const [addCommentVisible, setAddCommentVisible] = useState("none")
	const [loading, setLoading] = useState(false)

	const [commentID, setCommentId] = useState("")
	const [comment, setComment] = useState("")
	const [reference, setReference] = useState(null)

	const addItemComment = async () => {
		setLoading(true)

		const CommentData = {
			PostID: postId,
			PostOwerID: commentID,
			Content: comment,
			Author: auth ? cookies.name : "Anônimo",
			Reference: reference,
		}

		addComment &&
			(await addComment(CommentData, () => {
				setComment("")
				setCommentId("")
				setAddCommentVisible("none")
				setReference(null)
			}))

		setLoading(false)
	}

	return (
		<>
			{comments ? (
				<Container>
					{comments.map((Comment: CommentType) => (
						<PaddingCommentContainer>
							<CommentContainer
								AddCommentVisible={addCommentVisible}
								CommentID={Comment?.id}
							>
								<div className={`Container_` + Comment?.id}>
									<div className="parent">
										<div>
											<p className="author">{Comment?.author}</p>
											<span>:</span>
											<p className="updatedAt">
												{formatDate(Date.parse(Comment?.updatedAt))}
											</p>
										</div>
										<p>{Comment?.content}</p>
									</div>
									{addCommentVisible == "none" ? (
										<button
											onClick={() => {
												setAddCommentVisible(Comment?.id)
												setCommentId(Comment?.id)
											}}
										>
											<img
												className="open"
												src="/assets/chat.png"
												alt="resposta"
											/>
											<img
												className="close"
												src="/assets/close.png"
												alt="fechar"
											/>
										</button>
									) : (
										<button
											onClick={() => {
												setAddCommentVisible("none")
												setComment("")
												setCommentId("")
												setReference(null)
											}}
										>
											<img
												className="open"
												src="/assets/chat.png"
												alt="resposta"
											/>
											<img
												className="close"
												src="/assets/close.png"
												alt="fechar"
											/>
										</button>
									)}
								</div>
								<AddComment
									submit={() => {
										addItemComment()
									}}
									comment={comment}
									setComment={setComment}
									loading={loading}
								/>
							</CommentContainer>

							{Comment?.children?.length > 0
								? Comment?.children?.map((ChildComment: CommentType) => (
										<PaddingCommentContainer>
											<CommentContainer
												AddCommentVisible={addCommentVisible}
												CommentID={ChildComment?._id}
											>
												<div className={`Container_` + ChildComment?._id}>
													<div className="parent">
														<div className="header">
															<p className="author">{ChildComment?.author}</p>
															<span>:</span>
															<p className="updatedAt">
																{formatDate(
																	Date.parse(ChildComment?.updatedAt),
																)}
															</p>
														</div>
														{ChildComment?.reference != null ? (
															<p className="reference">
																{ChildComment?.reference?.substring(0, 30)} ...
															</p>
														) : null}
														<p>{ChildComment?.content}</p>
													</div>
													{addCommentVisible == "none" ? (
														<button
															onClick={() => {
																setAddCommentVisible(ChildComment?._id)
																setCommentId(Comment?.id)
																setReference(ChildComment?.content)
															}}
														>
															<img
																className="open"
																src="/assets/chat.png"
																alt="resposta"
															/>
															<img
																className="close"
																src="/assets/close.png"
																alt="fechar"
															/>
														</button>
													) : (
														<button
															onClick={() => {
																setAddCommentVisible("none")
																setComment("")
																setCommentId("")
																setReference(null)
															}}
														>
															<img
																className="open"
																src="/assets/chat.png"
																alt="resposta"
															/>
															<img
																className="close"
																src="/assets/close.png"
																alt="fechar"
															/>
														</button>
													)}
												</div>
												<AddComment
													submit={() => addItemComment()}
													comment={comment}
													setComment={setComment}
													loading={loading}
												/>
											</CommentContainer>
										</PaddingCommentContainer>
								  ))
								: null}
						</PaddingCommentContainer>
					))}
				</Container>
			) : null}
		</>
	)
}

export const CommentContainer: StyledComponent<
	"div",
	DefaultTheme,
	{ AddCommentVisible?: string; CommentID?: string },
	never
> = styled.div`
	${(props: any): any => `.Container_${props.CommentID}`} {
		display: flex;
		justify-content: space-between;

		button {
			width: 50px;
			height: 50px;
			padding: 10px;
			border-radius: 50%;
			background-color: #041a29;
			transition: 300ms;

			:hover {
				background-color: #fff;
				cursor: pointer;
			}

			img {
				width: 30px;
			}

			.open {
				display: ${(props: any): any =>
					props.AddCommentVisible === props.CommentID ? "none" : "flex"};
			}
			.close {
				display: ${(props: any): any =>
					props.AddCommentVisible === props.CommentID ? "flex" : "none"};
			}
		}
	}

	.addComment {
		display: ${(props: any): any =>
			props.AddCommentVisible === props.CommentID ? "flex" : "none"};

		flex-direction: column;
	}
`

export const PaddingCommentContainer = styled.div`
	border-radius: 10px;
	padding: 1vw;

	border: 1px solid rgba(255, 255, 255, 0.222);
	border-radius: 10px;
	padding: 1vw;
	background-color: #020c13;

	display: flex;
	flex-direction: column;
	gap: 1vw;

	.parent {
		display: block;

		div {
			display: flex;
			gap: 5px;
		}

		.updatedAt {
			color: #ccc;
		}
	}
	.header {
		color: #ccc;
		display: flex;
		gap: 5px;
	}
	.reference {
		background-color: #313335;
		display: inline;
		border-radius: 5px;
		padding: 0px 5px;
		position: relative;
		top: 4px;
	}
`

export const Container = styled.section`
	color: #fff;
	display: flex;
	flex-direction: column;
	gap: 2vw;
`

export default Comments
