import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.answer.deleteMany();
  await prisma.question.deleteMany();
  await prisma.savedCollege.deleteMany();
  await prisma.course.deleteMany();
  await prisma.college.deleteMany();
  await prisma.user.deleteMany();

  // Create a Demo User
  const user = await prisma.user.create({
    data: {
      id: 'mock-user-123',
      email: 'demo@edunexus.com',
      name: 'Demo Student',
      passwordHash: '$2a$10$vI8ZWBv.z.V9.897.z.V9.897.z.V9.897.z.V9.897.', // mock bcrypt hash
    },
  });

  const colleges = [
    {
      name: 'Indian Institute of Technology Bombay (IITB)',
      location: 'Mumbai, Maharashtra',
      description: 'Established in 1958, IIT Bombay is a global leader in engineering education and research. Located in the heart of Mumbai, it offers a vibrant campus life and world-class facilities.',
      rating: 4.9,
      fees: 230000,
      placementPercentage: 98,
      imageUrl: '/colleges/iit_bombay.png',
      courses: ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Aerospace Engineering'],
    },
    {
      name: 'Indian Institute of Technology Madras (IITM)',
      location: 'Chennai, Tamil Nadu',
      description: 'Known for its beautiful wooded campus and excellence in technical education, IIT Madras consistently ranks #1 in the NIRF rankings in India.',
      rating: 4.9,
      fees: 215000,
      placementPercentage: 96,
      imageUrl: '/colleges/iit_madras.png',
      courses: ['Computer Science', 'Data Science', 'Civil Engineering', 'Chemical Engineering'],
    },
    {
      name: 'Indian Institute of Technology Delhi (IITD)',
      location: 'New Delhi, Delhi',
      description: 'IIT Delhi is a premier center of excellence for training, research and development in science, engineering and technology in India.',
      rating: 4.8,
      fees: 225000,
      placementPercentage: 97,
      imageUrl: '/colleges/iit_delhi.png',
      courses: ['Computer Science', 'Mathematics and Computing', 'Textile Technology', 'Biotechnology'],
    },
    {
      name: 'BITS Pilani',
      location: 'Pilani, Rajasthan',
      description: 'The Birla Institute of Technology & Science, Pilani is a world-class private university known for its merit-based admissions and rigorous academic culture.',
      rating: 4.7,
      fees: 480000,
      placementPercentage: 95,
      imageUrl: '/colleges/bits_pilani.png',
      courses: ['Computer Science', 'Electronics & Instrumentation', 'Manufacturing Engineering', 'Economics'],
    },
    {
      name: 'Indian Institute of Technology Kanpur (IITK)',
      location: 'Kanpur, Uttar Pradesh',
      description: 'IIT Kanpur is renowned for its research-focused environment and its strong focus on computer science and aerospace engineering.',
      rating: 4.8,
      fees: 210000,
      placementPercentage: 94,
      imageUrl: '/colleges/iit_kanpur.png',
      courses: ['Computer Science', 'Materials Science', 'Biological Sciences', 'Earth Sciences'],
    },
    {
      name: 'Indian Institute of Technology Kharagpur (IITKGP)',
      location: 'Kharagpur, West Bengal',
      description: 'The first IIT to be established, IIT Kharagpur has a massive campus and offers the widest range of courses among all IITs.',
      rating: 4.7,
      fees: 220000,
      placementPercentage: 92,
      imageUrl: '/colleges/iit_kharagpur.png',
      courses: ['Computer Science', 'Ocean Engineering', 'Mining Engineering', 'Architecture'],
    },
    {
      name: 'Indian Institute of Technology Roorkee (IITR)',
      location: 'Roorkee, Uttarakhand',
      description: 'Formerly the University of Roorkee, it is the oldest technical institution in Asia, known for its excellence in civil engineering.',
      rating: 4.7,
      fees: 225000,
      placementPercentage: 93,
      imageUrl: '/colleges/iit_roorkee.png',
      courses: ['Civil Engineering', 'Structural Engineering', 'Hydrology', 'Computer Science'],
    },
    {
      name: 'NIT Tiruchirappalli (NITT)',
      location: 'Tiruchirappalli, Tamil Nadu',
      description: 'Regularly ranked as the #1 NIT in India, NITT offers top-tier engineering programs and has a very strong placement record.',
      rating: 4.6,
      fees: 185000,
      placementPercentage: 91,
      imageUrl: '/colleges/nit_trichy.png',
      courses: ['Computer Science', 'Production Engineering', 'Instrumentation and Control', 'Electrical Engineering'],
    },
    {
      name: 'Vellore Institute of Technology (VIT)',
      location: 'Vellore, Tamil Nadu',
      description: 'VIT is a leading private university known for its international collaborations and modern curriculum.',
      rating: 4.3,
      fees: 198000,
      placementPercentage: 90,
      imageUrl: '/colleges/vit.png',
      courses: ['Computer Science', 'Information Technology', 'Biomedical Engineering', 'Electronics'],
    },
    {
      name: 'NIT Surathkal',
      location: 'Surathkal, Karnataka',
      description: 'Located right next to a beach, NIT Surathkal offers a unique campus experience and excellent academic programs.',
      rating: 4.5,
      fees: 190000,
      placementPercentage: 89,
      imageUrl: '/colleges/nit_surathkal.png',
      courses: ['Computer Science', 'Mining Engineering', 'Marine Engineering', 'Metallurgical Engineering'],
    },
  ];

  for (const c of colleges) {
    const { courses, ...collegeData } = c;
    const createdCollege = await prisma.college.create({
      data: collegeData,
    });

    for (const courseName of courses) {
      await prisma.course.create({
        data: {
          name: courseName,
          collegeId: createdCollege.id,
        },
      });
    }
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
