import { FaPalette, FaGlobe, FaMobileAlt, FaLayerGroup } from 'react-icons/fa';

export const servicesData = [
  {
    id: 'branding',
    title: 'Branding & Identity',
    subtitle: 'Forging digital legacies.',
    icon: FaPalette,
    description: "We don't just design logos; we craft the soul of your business.",
    subServices: [
      {
        name: "Logo Design",
        description: "Strategic visual symbols that define your brand's core.",
        packages: [
          { name: "Starter Tier", features: ["Master Logo Files", "Source Files", "High Res Export"] },
          { name: "Professional Tier", features: ["Wordmark Variants", "Brandmark Hierarchy", "Web & App Sizes", "Documentation"] },
          { name: "Business Tier", features: ["Vector Formats", "PDF for Print", "Variations Book", "Social Media Kits"] },
          { name: "Enterprise Tier", highlight: true, features: ["Business Cards", "Letterhead & Stamp", "Email Signatures", "ID Card Suite", "Lanyards"] }
        ]
      },
      {
        name: "Visual Identity",
        description: "The complete visual language of your brand.",
        packages: [
          { name: "Core Identity", features: ["Color Palette System", "Typography Selection", "Imagery Guidelines"] },
          { name: "Full Brand System", highlight: true, features: ["Core Identity", "Brand Patterns", "Iconography Set", "Social Media Templates"] }
        ]
      }
    ]
  },
  {
    id: 'uiux',
    title: 'UI/UX Design',
    subtitle: 'User-centric digital experiences.',
    icon: FaLayerGroup,
    description: "Interfaces that are beautiful to look at and intuitive to use.",
    subServices: [
      {
        name: "UX Design",
        description: "The logic and flow behind the screen.",
        packages: [
          { name: "Research", features: ["User Personas", "Competitor Analysis", "Info Architecture"] },
          { name: "Prototyping", highlight: true, features: ["Clickable Prototypes", "User Flow Mapping", "Usability Testing"] }
        ]
      },
      {
        name: "UI Design",
        description: "The visual layer that users interact with.",
        packages: [
          { name: "Visual Design", features: ["High-Fidelity Mockups", "Custom Icons", "Design System"] },
          { name: "Handover", features: ["Figma Handoff", "Asset Export", "Style Guide"] }
        ]
      }
    ]
  },
  {
    id: 'web',
    title: 'Web Development',
    subtitle: 'Performance meets aesthetics.',
    icon: FaGlobe,
    description: "Modern, fast, and SEO-optimized websites built for growth.",
    subServices: [
      {
        name: "Corporate",
        description: "Professional digital presence.",
        packages: [
          { name: "Standard", features: ["Responsive Design", "CMS Integration", "Contact Forms"] },
          { name: "Premium", highlight: true, features: ["Custom React/Next.js", "GSAP Animations", "Performance Opt."] }
        ]
      },
      {
        name: "E-Commerce",
        description: "Online stores that convert.",
        packages: [
          { name: "Storefront", features: ["Product Catalog", "Cart & Checkout", "Payment Gateway"] },
          { name: "Enterprise", features: ["Inventory Logic", "ERP Integration", "Customer Accounts"] }
        ]
      }
    ]
  },
  {
    id: 'app',
    title: 'App Development',
    subtitle: 'Powerful mobile solutions.',
    icon: FaMobileAlt,
    description: "Native and Cross-platform apps for iOS and Android.",
    subServices: [
      {
        name: "Mobile Apps",
        description: "Applications for the modern world.",
        packages: [
          { name: "Hybrid App", features: ["React Native / Flutter", "Single Codebase", "iOS & Android"] },
          { name: "Native Performance", highlight: true, features: ["Swift & Kotlin", "Hardware Integration", "Real-time DB"] }
        ]
      }
    ]
  }
];