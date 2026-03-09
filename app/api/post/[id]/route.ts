import { NextResponse } from "next/server"
import prisma from "../../../lib/prisma"

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await prisma.post.delete({
    where: { id: params.id }
  })
  return NextResponse.json({ message: "Post deleted" })
}