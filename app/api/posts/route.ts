import { NextResponse } from "next/server"
import prisma from "../../lib/prisma"

export async function GET() {
  try {

    const posts = await prisma.post.findMany({
      include: {
        author: true,
        category: true
      }
    })

    return NextResponse.json(posts)

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      { message: "Failed to fetch posts" },
      { status: 500 }
    )

  }
}