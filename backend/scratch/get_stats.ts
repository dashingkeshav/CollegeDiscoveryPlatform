import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const colleges = await prisma.college.count();
  const questions = await prisma.question.count();
  const answers = await prisma.answer.count();
  console.log({ colleges, questions, answers });
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
