"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Seeding database with real advanced data...');
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
            name: 'Indian Institute of Technology Bombay (IITB)',
            location: 'Mumbai, Maharashtra',
            fees: 230000,
            rating: 4.9,
            description: 'IIT Bombay is a globally acclaimed public technical and research university. Known for its rigorous academic programs and an outstanding entrepreneurial ecosystem. It boasts the best computer science department in India.',
            placementPercentage: 98,
            imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            courses: ['Computer Science & Engineering', 'Electrical Engineering', 'Mechanical Engineering', 'Aerospace Engineering']
        },
        {
            name: 'Indian Institute of Technology Delhi (IITD)',
            location: 'New Delhi, Delhi',
            fees: 220000,
            rating: 4.8,
            description: 'Located in the capital city, IIT Delhi is one of the premier engineering institutes of India. It has strong ties with industry leaders and offers exceptional research opportunities.',
            placementPercentage: 97,
            imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            courses: ['Computer Science & Engineering', 'Mathematics and Computing', 'Civil Engineering', 'Textile Technology']
        },
        {
            name: 'Indian Institute of Technology Madras (IITM)',
            location: 'Chennai, Tamil Nadu',
            fees: 210000,
            rating: 4.9,
            description: 'Ranked #1 in the NIRF engineering rankings consistently. IIT Madras features a beautiful campus built out of a natural forest and leads in core engineering research and AI.',
            placementPercentage: 96,
            imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            courses: ['Computer Science', 'Electrical Engineering', 'Engineering Design', 'Ocean Engineering']
        },
        {
            name: 'Birla Institute of Technology and Science (BITS)',
            location: 'Pilani, Rajasthan',
            fees: 540000,
            rating: 4.8,
            description: 'BITS Pilani is India\'s top private engineering institute. Known for its zero-attendance policy, highly flexible curriculum, and stellar entrepreneurial network.',
            placementPercentage: 95,
            imageUrl: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            courses: ['Computer Science', 'Electronics & Instrumentation', 'Mechanical Engineering', 'Pharmacy']
        },
        {
            name: 'National Institute of Technology, Tiruchirappalli (NITT)',
            location: 'Tiruchirappalli, Tamil Nadu',
            fees: 145000,
            rating: 4.7,
            description: 'NIT Trichy is the top-ranked NIT in India. It offers exceptional faculty, diverse student culture, and some of the best core engineering placements in the country.',
            placementPercentage: 94,
            imageUrl: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            courses: ['Computer Science', 'Chemical Engineering', 'Production Engineering', 'Architecture']
        },
        {
            name: 'International Institute of Information Technology (IIIT-H)',
            location: 'Hyderabad, Telangana',
            fees: 350000,
            rating: 4.8,
            description: 'IIIT Hyderabad is an autonomous university focused tightly on Information Technology. It has one of the highest median packages for CS in the country and unparalleled research in AI/Robotics.',
            placementPercentage: 100,
            imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            courses: ['Computer Science & Engineering', 'Electronics and Communication']
        },
        {
            name: 'Vellore Institute of Technology (VIT)',
            location: 'Vellore, Tamil Nadu',
            fees: 198000,
            rating: 4.3,
            description: 'VIT is a leading private deemed university with a massive campus, international collaborations, and a fully flexible credit system.',
            placementPercentage: 90,
            imageUrl: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            courses: ['Computer Science', 'Information Technology', 'Biotechnology', 'Mechanical Engineering']
        },
        {
            name: 'Delhi Technological University (DTU)',
            location: 'New Delhi, Delhi',
            fees: 166000,
            rating: 4.5,
            description: 'Formerly known as DCE, DTU boasts a massive 164-acre campus in the capital. It provides phenomenal exposure and highly lucrative placements, particularly in the tech sector.',
            placementPercentage: 92,
            imageUrl: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            courses: ['Software Engineering', 'Computer Engineering', 'Information Technology', 'Mathematics and Computing']
        },
        {
            name: 'National Institute of Technology, Surathkal (NITK)',
            location: 'Surathkal, Karnataka',
            fees: 140000,
            rating: 4.7,
            description: 'NITK Surathkal offers a private beach and a phenomenal academic environment. It is consistently ranked among the top 3 NITs and has exceptional placement records.',
            placementPercentage: 93,
            imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            courses: ['Computer Science', 'IT', 'Electronics and Communication', 'Mining Engineering']
        },
        {
            name: 'Jadavpur University (JU)',
            location: 'Kolkata, West Bengal',
            fees: 10000,
            rating: 4.6,
            description: 'JU is renowned for its incredible return on investment. With nearly negligible fees, it offers top-tier engineering education and brilliant placements.',
            placementPercentage: 91,
            imageUrl: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            courses: ['Computer Science & Engineering', 'Electronics & Telecommunication', 'Instrumentation', 'Mechanical Engineering']
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
