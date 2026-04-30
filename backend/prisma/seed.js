"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Seeding database...');
    await prisma.savedCollege.deleteMany();
    await prisma.course.deleteMany();
    await prisma.college.deleteMany();
    await prisma.user.deleteMany();
    const mockUser = await prisma.user.create({
        data: {
            id: 'mock-user-123',
            name: 'Demo User',
            email: 'demo@example.com',
        }
    });
    const colleges = [
        {
            name: 'Indian Institute of Technology Bombay',
            location: 'Mumbai, Maharashtra',
            fees: 250000,
            rating: 4.9,
            description: 'IIT Bombay is a public technical and research university located in Powai, Mumbai, Maharashtra, India. It is acknowledged as a leader in engineering education and research.',
            placementPercentage: 98,
            imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            courses: ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering']
        },
        {
            name: 'Delhi Technological University',
            location: 'New Delhi, Delhi',
            fees: 166000,
            rating: 4.5,
            description: 'DTU, formerly Delhi College of Engineering, is a state university in New Delhi, India. It offers a variety of engineering and management programs.',
            placementPercentage: 92,
            imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            courses: ['Software Engineering', 'Computer Engineering', 'Information Technology', 'Mathematics and Computing']
        },
        {
            name: 'Vellore Institute of Technology',
            location: 'Vellore, Tamil Nadu',
            fees: 198000,
            rating: 4.3,
            description: 'VIT is a private research deemed university located in Vellore, India. It consistently ranks among the top private engineering colleges in India.',
            placementPercentage: 88,
            imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            courses: ['Computer Science', 'Information Technology', 'Electronics and Communication', 'Biotechnology']
        },
        {
            name: 'National Institute of Technology Trichy',
            location: 'Tiruchirappalli, Tamil Nadu',
            fees: 140000,
            rating: 4.8,
            description: 'NIT Trichy is a public technical and research university near the city of Tiruchirappalli in Tamil Nadu, India.',
            placementPercentage: 96,
            imageUrl: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            courses: ['Computer Science', 'Chemical Engineering', 'Production Engineering', 'Architecture']
        },
        {
            name: 'Birla Institute of Technology and Science',
            location: 'Pilani, Rajasthan',
            fees: 550000,
            rating: 4.7,
            description: 'BITS Pilani is a private deemed university in Pilani, India. It focuses primarily on higher education and research in engineering and sciences.',
            placementPercentage: 95,
            imageUrl: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            courses: ['Computer Science', 'Electrical and Electronics', 'Mechanical Engineering', 'Pharmacy']
        },
        {
            name: 'SRM Institute of Science and Technology',
            location: 'Chennai, Tamil Nadu',
            fees: 250000,
            rating: 4.1,
            description: 'SRM Institute of Science and Technology is a private deemed university located in Kattankulathur, Chennai, India.',
            placementPercentage: 82,
            imageUrl: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            courses: ['Computer Science', 'Aerospace Engineering', 'Biomedical Engineering', 'Data Science']
        }
    ];
    for (const c of colleges) {
        const created = await prisma.college.create({
            data: {
                name: c.name,
                location: c.location,
                fees: c.fees,
                rating: c.rating,
                description: c.description,
                placementPercentage: c.placementPercentage,
                imageUrl: c.imageUrl,
            }
        });
        for (const courseName of c.courses) {
            await prisma.course.create({
                data: {
                    name: courseName,
                    collegeId: created.id
                }
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
//# sourceMappingURL=seed.js.map