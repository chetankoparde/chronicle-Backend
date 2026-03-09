import { NextResponse } from "next/server"
import prisma from "../../../lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(req: Request){

  const body = await req.json()

  const user = await prisma.user.findUnique({
    where:{ email: body.email }
  })

  if(!user){
    return NextResponse.json({ error:"User not found" })
  }

  const validPassword = await bcrypt.compare(body.password, user.password)

  if(!validPassword){
    return NextResponse.json({ error:"Invalid password" })
  }

  return NextResponse.json({ message:"Login successful", user })
}