import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {

  const admin = await prisma.user.upsert({
    where: { email: "admin@test.com" },
    update: {},
    create: {
      name:"Admin",
      username:"admin",
      email:"admin@test.com",
      password:"123456",
      role:"ADMIN"
    }
  })

  const author = await prisma.user.upsert({
    where: { email: "author@test.com" },
    update: {},
    create: {
      name:"Author",
      username:"author",
      email:"author@test.com",
      password:"123456",
      role:"AUTHOR"
    }
  })

  const category = await prisma.category.upsert({
    where: { slug: "technology" },
    update: {},
    create: {
      name:"Technology",
      slug:"technology"
    }
  })

  await prisma.post.upsert({
    where: { slug: "my-first-blog" },
    update: {},
    create: {
      title:"My First Blog",
      slug:"my-first-blog",
      content:"This is my first blog content",
      excerpt:"First blog",
      status:"PUBLISHED",
      authorId:author.id,
      categoryId:category.id
    }
  })

  console.log("Seed completed successfully!")
  console.log("Admin ID:", admin.id)
  console.log("Author ID:", author.id)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })