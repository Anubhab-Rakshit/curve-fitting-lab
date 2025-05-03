"use client"

import { useState } from "react"
import { MessageSquare, Send, ThumbsUp, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Comment {
  id: string
  author: string
  content: string
  timestamp: string
  likes: number
  liked: boolean
}

export default function DiscussionForum() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      author: "Dr. Smith",
      content:
        "I've found that cubic polynomials work best for modeling population growth data, as they can capture both the initial exponential growth and the later plateau as resources become limited.",
      timestamp: "2 days ago",
      likes: 5,
      liked: false,
    },
    {
      id: "2",
      author: "Jane Researcher",
      content:
        "Has anyone tried using weighted least squares for data where some points are more reliable than others? I'm working with sensor data that has variable uncertainty.",
      timestamp: "1 day ago",
      likes: 3,
      liked: false,
    },
    {
      id: "3",
      author: "Physics Student",
      content:
        "I'm having trouble deciding between a quadratic and cubic fit for my lab data. The R-squared values are 0.92 and 0.94 respectively. Is the small improvement worth the additional complexity?",
      timestamp: "12 hours ago",
      likes: 2,
      liked: false,
    },
  ])

  const handleAddComment = () => {
    if (newComment.trim() === "") return

    const comment: Comment = {
      id: Date.now().toString(),
      author: "You",
      content: newComment,
      timestamp: "Just now",
      likes: 0,
      liked: false,
    }

    setComments([...comments, comment])
    setNewComment("")
  }

  const handleLike = (id: string) => {
    setComments(
      comments.map((comment) => {
        if (comment.id === id) {
          return {
            ...comment,
            likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
            liked: !comment.liked,
          }
        }
        return comment
      }),
    )
  }

  return (
    <div className="mt-4 bg-white rounded-lg shadow-md overflow-hidden">
      <div
        className="p-4 bg-gradient-to-r from-teal-500 to-emerald-600 text-white flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <MessageSquare className="mr-2 h-5 w-5" />
          <h2 className="text-xl font-bold">Discussion Forum</h2>
        </div>
        <div>{isExpanded ? <ChevronUp /> : <ChevronDown />}</div>
      </div>

      {isExpanded && (
        <div className="p-4">
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Join the Conversation</h3>
            <p className="text-gray-600 mb-4">
              Share your experiences, ask questions, or discuss curve fitting techniques with others.
            </p>

            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="border rounded-lg p-3">
                  <div className="flex items-start space-x-3">
                    <Avatar>
                      <AvatarFallback>{comment.author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <div className="font-medium">{comment.author}</div>
                        <div className="text-xs text-gray-500">{comment.timestamp}</div>
                      </div>
                      <p className="text-gray-700">{comment.content}</p>
                      <div className="mt-2 flex items-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`text-xs flex items-center ${comment.liked ? "text-blue-600" : "text-gray-500"}`}
                          onClick={() => handleLike(comment.id)}
                        >
                          <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                          {comment.likes}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <div className="flex items-start space-x-3">
                <Avatar>
                  <AvatarFallback>
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder="Add your comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="resize-none mb-2"
                    rows={3}
                  />
                  <Button onClick={handleAddComment} className="flex items-center">
                    <Send className="h-4 w-4 mr-2" />
                    Post Comment
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

import { ChevronDown, ChevronUp } from "lucide-react"
