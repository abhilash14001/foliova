// src/data/portfolioData.js
export const profile = {
    name: "Your Name",
    title: "React Developer | UI/UX Enthusiast",
    bio: "Detailed biography goes here...",
    contact: {
        email: "your.email@example.com",
        linkedin: "https://linkedin.com/in/yourprofile",
        github: "https://github.com/yourusername",
    },
};

export const projects = [
    {
        id: 1,
        title: "Ecommerce Project",
        description: "A brief description of the first project.",
        imageUrl: "https://codewithabhilash.com/img/portfolio-2.jpg", // Path relative to public folder or import image
        tags: ["React", "NodeJs", "MongoDB"],
        liveUrl: "#",
        repoUrl: "#",
    },
    {
        id: 2,
        title: "Admin Dashboard",
        description: "Description for the second awesome project.",
        imageUrl: "https://codewithabhilash.com/img/portfolio-3.jpg",
        tags: ["Laravel", "HTML", "CSS", "PHP"],
        liveUrl: "#",
        repoUrl: "#",
    },
    {
        id: 3,
        title: "Cafe Table Booking System",
        description: "Description for the second awesome project.",
        imageUrl: "/images/cafe.png",
        tags: ["ReactJs", "MongoDB", "NodeJs", 'Express'],
        liveUrl: "#",
        repoUrl: "#",
    },
    {
        id: 4,
        title: "Medical Website",
        description: "Medical Website for a hospital.",
        imageUrl: "/images/medical.png",
        tags: ["ReactJs", "NodeJs", "MongoDB"],
        liveUrl: "#",
        repoUrl: "#",
    },
    {
        id: 5,
        title: "Ecommerce Project",
        description: "Description for the second awesome project.",
        imageUrl: "/images/shopalic.png",
        tags: ["PHP", "Laravel"],
        liveUrl: "#",
        repoUrl: "#",
    },
    {
        id: 6,
        title: "Hotel Management System",
        description: "Description for the second awesome project.",
        imageUrl: "/images/justinn.png",
        tags: ["HTML", "CSS", "JavaScript"],
        liveUrl: "#",
        repoUrl: "#",
    },
    // Add more projects
];

export const skills = [
    { name: "HTML", level: 95 },
    { name: "CSS/Sass", level: 90 },
    { name: "JavaScript", level: 90 },
    { name: "React", level: 95 },
    { name: "Redux", level: 85 },
    { name: "Node.js", level: 75 },
    { name: "Styled Components", level: 90 },
    { name: "Framer Motion", level: 80 },
    // Add more skills
];