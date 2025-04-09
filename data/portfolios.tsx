// data/portfolio.ts
const portfolio = [
    {
        id: 1,
        slug: "mgls-travel-platform",
        title: "MGLS Travel Platform",
        category: "website",
        featured: true,
        client: "M. Abdou, CEO",
        description: "A seamless travel booking platform with real-time updates and user-friendly interface.",
        image: "/project1.webp",
        content: (
            <>
                <p className="mb-4">
                    We built a full-stack travel booking platform using Next.js and Supabase. The site features real-time trip management, secure user dashboards, and an admin backend.
                </p>
                <ul className="list-disc list-inside space-y-2">
                    <li>Next.js App Router with Tailwind CSS</li>
                    <li>Integrated Stripe for bookings</li>
                    <li>Supabase for authentication and database</li>
                </ul>
            </>
        ),
    },
    {
        id: 2,
        slug: "elam-ecommerce-store",
        title: "ELAM Ecommerce Store",
        category: "website",
        featured: true,
        client: "A. Ilhsan, CEO",
        description: "A fully functional eCommerce store with smooth UI, fast checkout, and secure payments.",
        image: "/project.webp",
        content: (
            <>
                <p className="mb-4">
                    A scalable eCommerce storefront built with performance in mind. Includes product management, cart logic, and Stripe integration for secure payments.
                </p>
                <ul className="list-disc list-inside space-y-2">
                    <li>Custom CMS for product and inventory management</li>
                    <li>Responsive design with fast load times</li>
                    <li>Integrated with Stripe and PayPal</li>
                </ul>
            </>
        ),
    },
    {
        id: 3,
        slug: "red-platinum-transport",
        title: "Red Platinum Transport System",
        category: "website",
        featured: true,
        client: "E. Hicham, CEO",
        description: "A modern transport management system optimizing logistics and customer experience.",
        image: "/project2.webp",
        content: (
            <>
                <p className="mb-4">
                    We developed a transport and logistics management system tailored for a fleet-based business.
                </p>
                <ul className="list-disc list-inside space-y-2">
                    <li>Driver and route management</li>
                    <li>Real-time vehicle tracking</li>
                    <li>Customer feedback integration</li>
                </ul>
            </>
        ),
    },
    {
        id: 4,
        slug: "sahara-seo-webdev",
        title: "Sahara Service – SEO & Web Development",
        category: "seo",
        featured: true,
        client: "O. Jawad, Manager",
        description: "Comprehensive SEO, web development, DevOps, and technical support.",
        image: "/project3.webp",
        content: (
            <>
                <p className="mb-4">
                    A full digital package from keyword research to server management. Helped increase Google visibility and backend stability.
                </p>
                <ul className="list-disc list-inside space-y-2">
                    <li>SEO audit, on-page/off-page SEO</li>
                    <li>Website performance optimizations</li>
                    <li>CI/CD pipeline with GitHub Actions</li>
                </ul>
            </>
        ),
    },
    {
        id: 5,
        slug: "asara-digital-marketing",
        title: "Asara Digital Marketing",
        category: "website",
        featured: true,
        client: "M. Abdessamad, CEO & Manager",
        description: "SEO, Paid Ads, and full website development for brand growth.",
        image: "/project4.webp",
        content: (
            <>
                <p className="mb-4">
                    Asara was looking for aggressive brand visibility and conversion-based marketing. We combined web dev with performance marketing to drive growth.
                </p>
                <ul className="list-disc list-inside space-y-2">
                    <li>Custom Next.js landing pages</li>
                    <li>Google Ads and Meta Ads integration</li>
                    <li>Monthly analytics reports and A/B testing</li>
                </ul>
            </>
        ),
    },
    {
        id: 6,
        slug: "crs-leadgen-app",
        title: "CRS Lead Gen & App Development",
        category: "app",
        featured: true,
        client: "K. Hussain",
        description: "Lead generation strategies, website creation, and mobile app development.",
        image: "/project5.webp",
        content: (
            <>
                <p className="mb-4">
                    This project focused on collecting high-quality leads via landing pages and pushing data into a custom-built mobile app.
                </p>
                <ul className="list-disc list-inside space-y-2">
                    <li>React Native app synced with backend via Supabase</li>
                    <li>Google Tag Manager for tracking lead events</li>
                    <li>Landing pages tailored for PPC campaigns</li>
                </ul>
            </>
        ),
    },
];

export default portfolio;
