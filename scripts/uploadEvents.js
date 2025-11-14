#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const FormData = require("form-data");
const fetch = require("node-fetch");

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const events = [
  {
    title: "Cloud Next 2026",
    slug: "cloud-next-2026",
    description:
      "Google's premier cloud computing event, showcasing innovations in AI, infrastructure, and enterprise solutions.",
    overview:
      "Cloud Next 2026 highlights the latest in cloud-native development, Kubernetes, AI, and enterprise scalability. Developers, architects, and executives gather to learn about new Google Cloud services, best practices, and success stories.",
    image: "event1.png",
    venue: "Moscone Center",
    location: "San Francisco, CA",
    date: "2026-04-10",
    time: "08:30",
    mode: "Hybrid (In-Person & Online)",
    audience: "Cloud engineers, DevOps, enterprise leaders, AI researchers",
    agenda: JSON.stringify([
      "08:30 AM - 09:30 AM | Keynote: AI-Driven Cloud Infrastructure",
      "09:45 AM - 11:00 AM | Deep Dives: Kubernetes, Data Analytics, Security",
      "11:15 AM - 12:30 PM | Product Demos & Networking",
      "12:30 PM - 01:30 PM | Lunch",
      "01:30 PM - 03:00 PM | Workshops: Scaling with GCP",
      "03:15 PM - 04:30 PM | Fireside Chat: The Future of Enterprise Cloud",
    ]),
    organizer:
      "Google Cloud organizes Cloud Next to connect global businesses, developers, and innovators with the latest technologies and best practices in cloud computing.",
    tags: JSON.stringify(["Cloud", "DevOps", "Kubernetes", "AI"]),
  },
  {
    title: "React Conf 2026",
    slug: "react-conf-2026",
    description:
      "The official conference for the React community, featuring talks on the latest React features, hooks, and best practices.",
    overview:
      "React Conf brings together developers from around the world to explore the future of web development with React. Join us for talks about performance, state management, testing, and more.",
    image: "event2.png",
    venue: "Denver Convention Center",
    location: "Denver, CO",
    date: "2026-05-15",
    time: "09:00",
    mode: "In-Person",
    audience:
      "Frontend developers, React enthusiasts, JavaScript developers, full-stack engineers",
    agenda: JSON.stringify([
      "09:00 AM - 10:00 AM | Opening Keynote: The Future of React",
      "10:15 AM - 11:30 AM | Concurrent Features & Suspense",
      "11:45 AM - 12:45 PM | Advanced Hooks Patterns",
      "12:45 PM - 02:00 PM | Lunch",
      "02:00 PM - 03:15 PM | State Management Deep Dive",
      "03:30 PM - 04:45 PM | Testing Strategies & Best Practices",
    ]),
    organizer:
      "React Conf is organized by the React team and community leaders to foster learning and networking within the React ecosystem.",
    tags: JSON.stringify(["React", "JavaScript", "Web Development", "Frontend"]),
  },
  {
    title: "Node.js World",
    slug: "nodejs-world",
    description:
      "The ultimate gathering for Node.js developers, featuring talks on scalability, performance, and modern backend practices.",
    overview:
      "Node.js World showcases cutting-edge developments in server-side JavaScript. Learn from industry leaders about building scalable applications, microservices, and cloud-native solutions.",
    image: "event3.png",
    venue: "Austin Convention Center",
    location: "Austin, TX",
    date: "2026-06-20",
    time: "10:00",
    mode: "Hybrid (In-Person & Online)",
    audience:
      "Backend developers, DevOps engineers, full-stack developers, system architects",
    agenda: JSON.stringify([
      "10:00 AM - 11:00 AM | Opening: The State of Node.js",
      "11:15 AM - 12:30 PM | Performance Optimization Techniques",
      "12:30 PM - 01:30 PM | Lunch",
      "01:30 PM - 02:45 PM | Building Microservices with Node.js",
      "03:00 PM - 04:15 PM | Security Best Practices",
      "04:30 PM - 05:30 PM | Community Showcase",
    ]),
    organizer:
      "Node.js World brings together maintainers, contributors, and users of Node.js to share knowledge and drive innovation.",
    tags: JSON.stringify([
      "Node.js",
      "JavaScript",
      "Backend",
      "DevOps",
      "Microservices",
    ]),
  },
  {
    title: "TypeScript Summit",
    slug: "typescript-summit",
    description:
      "Deep dive into TypeScript, the language that brings type safety to JavaScript. Learn advanced patterns and best practices.",
    overview:
      "TypeScript Summit is dedicated to helping developers master TypeScript, from basics to advanced patterns. Discover how to build more reliable and maintainable applications with static typing.",
    image: "event4.png",
    venue: "New York Hilton",
    location: "New York, NY",
    date: "2026-07-12",
    time: "09:30",
    mode: "In-Person",
    audience:
      "JavaScript developers, TypeScript enthusiasts, full-stack engineers, architects",
    agenda: JSON.stringify([
      "09:30 AM - 10:30 AM | Welcome: Why TypeScript Matters",
      "10:45 AM - 12:00 PM | Advanced Type System Features",
      "12:00 PM - 01:15 PM | Lunch",
      "01:15 PM - 02:30 PM | TypeScript in Large Scale Projects",
      "02:45 PM - 04:00 PM | Framework Integration & Tooling",
      "04:15 PM - 05:15 PM | Panel Discussion",
    ]),
    organizer:
      "TypeScript Summit is organized to foster a community of developers committed to writing better, safer JavaScript.",
    tags: JSON.stringify(["TypeScript", "JavaScript", "Type Safety", "Tooling"]),
  },
  {
    title: "GraphQL Europe",
    slug: "graphql-europe",
    description:
      "The premier conference for GraphQL developers, exploring API design, performance, and real-world implementations.",
    overview:
      "GraphQL Europe brings together API architects and developers to discuss the latest trends in GraphQL. Learn about federation, performance optimization, and best practices for building scalable APIs.",
    image: "event5.png",
    venue: "Berlin Convention Center",
    location: "Berlin, Germany",
    date: "2026-08-05",
    time: "08:45",
    mode: "In-Person",
    audience:
      "Backend developers, API architects, full-stack engineers, DevOps professionals",
    agenda: JSON.stringify([
      "08:45 AM - 09:45 AM | Keynote: The GraphQL Ecosystem",
      "10:00 AM - 11:15 AM | Federation & Schema Composition",
      "11:30 AM - 12:45 PM | Performance & Optimization",
      "12:45 PM - 02:00 PM | Lunch",
      "02:00 PM - 03:15 PM | Real-world Case Studies",
      "03:30 PM - 04:45 PM | Building Production APIs",
    ]),
    organizer:
      "GraphQL Europe is dedicated to advancing the adoption and understanding of GraphQL in enterprise environments.",
    tags: JSON.stringify(["GraphQL", "API", "Backend", "Architecture"]),
  },
  {
    title: "DevOps Days 2026",
    slug: "devops-days-2026",
    description:
      "Industry leaders discuss modern DevOps practices, infrastructure automation, and continuous deployment strategies.",
    overview:
      "DevOps Days brings together engineers and operators to share practices and tools for building, testing, and deploying software. Learn about CI/CD, containerization, and infrastructure-as-code.",
    image: "event6.png",
    venue: "Vancouver Convention Centre",
    location: "Vancouver, BC",
    date: "2026-09-18",
    time: "10:00",
    mode: "Hybrid (In-Person & Online)",
    audience:
      "DevOps engineers, SREs, system administrators, cloud architects, developers",
    agenda: JSON.stringify([
      "10:00 AM - 11:00 AM | Welcome: DevOps in 2026",
      "11:15 AM - 12:30 PM | Kubernetes at Scale",
      "12:30 PM - 01:30 PM | Lunch",
      "01:30 PM - 02:45 PM | CI/CD Pipeline Optimization",
      "03:00 PM - 04:15 PM | Observability & Monitoring",
      "04:30 PM - 05:30 PM | Panel: The Future of DevOps",
    ]),
    organizer:
      "DevOps Days is a community-run conference series for DevOps practitioners sharing their experiences and best practices.",
    tags: JSON.stringify(["DevOps", "CI/CD", "Kubernetes", "Infrastructure"]),
  },
];

async function uploadEvent(eventData) {
  try {
    const imagePath = path.join(
      process.cwd(),
      "public",
      "images",
      eventData.image
    );

    if (!fs.existsSync(imagePath)) {
      console.error(`❌ Image not found: ${imagePath}`);
      return;
    }

    const formData = new FormData();

    // Add all fields except image
    Object.entries(eventData).forEach(([key, value]) => {
      if (key !== "image") {
        formData.append(key, value);
      }
    });

    // Add the image file
    formData.append("image", fs.createReadStream(imagePath));

    console.log(`⏳ Uploading event: ${eventData.title}...`);

    const response = await fetch(`${BASE_URL}/api/events`, {
      method: "POST",
      body: formData,
      headers: formData.getHeaders(),
    });

    const result = await response.json();

    if (response.ok) {
      console.log(`✅ Successfully uploaded: ${eventData.title}`);
    } else {
      console.error(`❌ Failed to upload ${eventData.title}:`, result);
    }
  } catch (error) {
    console.error(`❌ Error uploading ${eventData.title}:`, error);
  }
}

async function uploadAllEvents() {
  console.log("🚀 Starting event upload...\n");

  for (const event of events) {
    await uploadEvent(event);
  }

  console.log("\n✨ All events processed!");
}

// Run the script
uploadAllEvents().catch(console.error);
