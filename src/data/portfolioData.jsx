// src/data/portfolioData.js
export const profile = {
    name: "Abhilash R.",
    title: "Laravel & PHP Developer | React Developer",
    bio: "Full-stack web developer with 5 years of experience building reliable applications with PHP, Laravel, MySQL, Redis, and modern JavaScript. I specialise in backend architecture, REST APIs, database performance, third-party integrations, and responsive interfaces that solve practical business problems.",
    contact: {
        email: "abhilash14001@gmail.com",
        linkedin: null,
        github: "https://github.com/abhilash14001",
    },
};

export const projects = [
    {
        id: 1,
        title: "Ecommerce Project",
        description: "A responsive online store with product browsing, cart management, secure checkout, and order tracking.",
        imageUrl: "/images/ecommerce-electronics.webp", // Path relative to public folder or import image
        tags: ["React", "NodeJs", "MongoDB"],
        liveUrl: null,
        repoUrl: "https://github.com/abhilash14001/market-ready-ecommerce",
    },
    {
        id: 2,
        title: "Admin Dashboard",
        description: "A Laravel-powered dashboard for managing users, business data, reports, and daily operations from one place.",
        imageUrl: "/images/admin-dashboard.webp",
        tags: ["Laravel", "HTML", "CSS", "PHP"],
        liveUrl: null,
        repoUrl: "https://github.com/abhilash14001/laravel-charts",
    },
    {
        id: 3,
        title: "Cafe Table Booking System",
        description: "An online reservation system that lets customers choose a date, time, and table while staff manage bookings.",
        imageUrl: "/images/cafe.png",
        tags: ["ReactJs", "MongoDB", "NodeJs", 'Express'],
        liveUrl: null,
        repoUrl: "https://github.com/abhilash14001/Cafe_Table_Booking_Aplication",
    },
    {
        id: 4,
        title: "Medical Website",
        description: "A patient-friendly hospital website presenting departments, doctors, healthcare services, and appointment information.",
        imageUrl: "/images/medical.png",
        tags: ["ReactJs", "NodeJs", "MongoDB"],
        liveUrl: null,
        repoUrl: null,
    },
    {
        id: 5,
        title: "Ecommerce Project",
        description: "A Laravel ecommerce platform with product catalogues, customer accounts, shopping cart, and order management.",
        imageUrl: "/images/ecommerce-fashion.webp",
        tags: ["PHP", "Laravel"],
        liveUrl: null,
        repoUrl: null,
    },
    {
        id: 6,
        title: "Hotel Management System",
        description: "A responsive hotel website showcasing rooms, amenities, photo galleries, and contact details for prospective guests.",
        imageUrl: "/images/justinn.png",
        tags: ["HTML", "CSS", "JavaScript"],
        liveUrl: null,
        repoUrl: null,
    },
    // Add more projects
];

export const skills = [
    { name: "PHP", level: 95 },
    { name: "Laravel", level: 95 },
    { name: "MySQL", level: 90 },
    { name: "Redis", level: 85 },
    { name: "JavaScript", level: 85 },
    { name: "React", level: 80 },
    { name: "Node.js", level: 75 },
    { name: "Linux & Nginx", level: 85 },
];