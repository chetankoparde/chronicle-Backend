import { NextResponse } from "next/server"
import prisma from "../../../lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(req: Request){

  const body = await req.json()

  const hashedPassword = await bcrypt.hash(body.password, 10)

  const user = await prisma.user.create({
    data:{
      name: body.name,
      username: body.username,
      email: body.email,
      password: hashedPassword
    }
  })

  return NextResponse.json(user)
}