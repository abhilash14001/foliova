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
        description: "A responsive online store with product browsing, cart management, secure checkout, and order tracking.",
        imageUrl: "https://abhilashr.netlify.app/images/shopalic.png", // Path relative to public folder or import image
        tags: ["React", "NodeJs", "MongoDB"],
        liveUrl: "#",
        repoUrl: "#",
    },
    {
        id: 2,
        title: "Admin Dashboard",
        description: "A Laravel-powered dashboard for managing users, business data, reports, and daily operations from one place.",
        imageUrl: "https://codewithabhilash.com/img/portfolio-3.jpg",
        tags: ["Laravel", "HTML", "CSS", "PHP"],
        liveUrl: "#",
        repoUrl: "#",
    },
    {
        id: 3,
        title: "Cafe Table Booking System",
        description: "An online reservation system that lets customers choose a date, time, and table while staff manage bookings.",
        imageUrl: "/images/cafe.png",
        tags: ["ReactJs", "MongoDB", "NodeJs", 'Express'],
        liveUrl: "#",
        repoUrl: "#",
    },
    {
        id: 4,
        title: "Medical Website",
        description: "A patient-friendly hospital website presenting departments, doctors, healthcare services, and appointment information.",
        imageUrl: "/images/medical.png",
        tags: ["ReactJs", "NodeJs", "MongoDB"],
        liveUrl: "#",
        repoUrl: "#",
    },
    {
        id: 5,
        title: "Ecommerce Project",
        description: "A Laravel ecommerce platform with product catalogues, customer accounts, shopping cart, and order management.",
        imageUrl: "/images/shopalic.png",
        tags: ["PHP", "Laravel"],
        liveUrl: "#",
        repoUrl: "#",
    },
    {
        id: 6,
        title: "Hotel Management System",
        description: "A responsive hotel website showcasing rooms, amenities, photo galleries, and contact details for prospective guests.",
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