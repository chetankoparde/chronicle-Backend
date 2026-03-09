import { NextResponse } from "next/server"
import prisma from "../../lib/prisma"

export async function GET() {

  const categories = await prisma.category.findMany()

  return NextResponse.json(categories)

}

export async function POST(req: Request) {

  const body = await req.json()

  const category = await prisma.category.create({
    data:{
      name: body.name,
      slug: body.slug
    }
  })

  return NextResponse.json(category)

}