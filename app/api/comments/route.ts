import { NextResponse } from "next/server"
import prisma from "../../lib/prisma"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    console.log('comment body:', body)

    // validate existence of referenced records
    const authorExists = await prisma.user.findUnique({ where: { id: body.authorId } })
    const postExists = await prisma.post.findUnique({ where: { id: body.postId } })
    console.log('authorExists', !!authorExists, 'postExists', !!postExists)

    const comment = await prisma.comment.create({
      data: {
        content: body.content,
        authorId: body.authorId,
        postId: body.postId
      }
    })

    return NextResponse.json(comment)

  } catch (error) {
    console.error('creation error:', error)
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    )
  }
}