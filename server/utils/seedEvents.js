import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Event from '../models/Event.js'

dotenv.config()

/**
 * Real professional events data
 */
const realEvents = [
  {
    title: 'Cairo AI Hackathon 2024',
    role: 'AI & Full-Stack Engineer',
    type: 'hackathon',
    description: 'A competitive AI-focused hackathon supporting startups and early-stage ideas, focused on innovation, idea validation, and feasibility assessment.',
    longDescription: `The Cairo AI Hackathon, organized by Athar Accelerator and Plan International, brought together ambitious developers and entrepreneurs to build AI-driven solutions that address real-world challenges. The event emphasized not just technical execution, but also market viability and social impact.

As an AI & Full-Stack Engineer, I worked intensively over 48 hours to develop a comprehensive solution that leveraged machine learning for practical applications. The hackathon environment pushed us to think critically about problem-solution fit, user experience, and technical feasibility under significant time constraints.

The experience was transformative—from rapid prototyping and iterative development to pitching our solution to a panel of judges from leading accelerators and investment firms. The collaborative atmosphere and mentorship opportunities provided invaluable insights into building products that matter.

Winning 3rd place and the 50,000 EGP award validated our technical approach and reinforced the importance of combining strong engineering with clear value proposition. This achievement reflects not just coding ability, but the capacity to execute under pressure and communicate technical concepts effectively.`,
    highlights: [
      'Won 3rd Place out of 50+ competing teams',
      'Awarded 50,000 EGP prize for technical excellence',
      'Built full-stack AI solution in 48-hour timeframe',
      'Presented to judges from Athar Accelerator and Plan International',
      'Validated technical approach through rigorous evaluation',
    ],
    techStack: ['Python', 'React', 'Node.js', 'TensorFlow', 'OpenAI API', 'MongoDB'],
    achievement: '3rd Place Winner • 50,000 EGP',
    date: new Date('2024-03-15'),
    endDate: new Date('2024-03-17'),
    location: 'Cairo, Egypt',
    organizer: 'Athar Accelerator & Plan International',
    teamSize: 4,
    image: '/images/events/cairo-ai-hackathon/cairo-ai-hackathon.jpg',
    featured: true,
    order: 1,
    status: 'completed',
  },
  {
    title: 'AI Caravan – MENA Region Summit',
    role: 'Volunteer, Youth Mentor & Project Evaluator',
    type: 'conference',
    description: 'Regional summit focused on AI advancements and digital transformation, organized by IEEE in collaboration with Egyptian Ministry of Finance and Tax Authority.',
    longDescription: `The AI Caravan MENA Region Summit represents one of the most significant gatherings of AI professionals, researchers, and policymakers in the Middle East and North Africa. Organized by IEEE in collaboration with the Egyptian Ministry of Finance and Egyptian Tax Authority, the summit addressed critical topics around AI adoption in government, finance, and enterprise systems.

My involvement spanned multiple roles: as a volunteer, I helped coordinate technical sessions and workshops; as a youth projects mentor, I guided emerging developers in building AI-powered solutions; and as a project evaluator, I assessed technical submissions from across the region.

The summit covered transformative topics including AI-driven automation in tax systems, data governance frameworks, and digital transformation strategies for government services. Being part of the evaluation process gave me unique insights into how AI solutions are being deployed at scale in public sector contexts.

This experience reinforced my understanding that AI's impact extends far beyond code—it requires careful consideration of ethics, governance, and real-world deployment challenges. Mentoring young developers and evaluating regional projects was particularly rewarding, as it allowed me to contribute to the growing AI ecosystem in MENA.`,
    highlights: [
      'Volunteered at IEEE-organized regional summit',
      'Mentored youth AI projects from across MENA',
      'Evaluated technical submissions as project judge',
      'Engaged with government officials on AI policy',
      'Networked with 500+ AI professionals and researchers',
    ],
    techStack: ['AI/ML', 'Data Governance', 'Digital Transformation', 'Public Sector Tech'],
    date: new Date('2024-01-20'),
    endDate: new Date('2024-01-22'),
    location: 'Cairo, Egypt',
    organizer: 'IEEE, Egyptian Ministry of Finance, Egyptian Tax Authority',
    image: '/images/events/ai-caravan-summit/ai-caravan-summit.jpg',
    featured: true,
    order: 2,
    status: 'completed',
  },
  {
    title: '1Billion Summit – AI Film Award',
    role: 'AI Filmmaker & Creative Technologist',
    type: 'competition',
    description: 'Global summit featuring AI Film Award category. Submitted "The Racer" — an AI-powered short film exploring the intersection of artificial intelligence and storytelling.',
    longDescription: `The 1Billion Summit is a global platform that brings together innovators, creators, and technologists to explore the future of AI across industries. The AI Film Award category specifically challenged participants to create short films that meaningfully integrate artificial intelligence—not just as a tool, but as a narrative element or creative collaborator.

My submission, "The Racer," was an experimental short film that explored themes of human-AI interaction through the lens of competitive racing. The project required deep technical work in AI video generation, scene composition, and narrative coherence—all while maintaining artistic integrity.

The film leveraged multiple AI tools for visual generation, scene transitions, and stylistic consistency. This wasn't just about using AI as a post-production tool; it was about understanding how AI can be a creative partner in storytelling, making decisions about pacing, visual style, and emotional tone.

While the film didn't win the award, the experience was invaluable. It pushed me to think about AI beyond traditional software applications and explore its potential in creative domains. The feedback from judges and fellow participants provided insights into how the industry views AI's role in media and entertainment.

This project reinforced that innovation isn't always about winning—it's about experimentation, learning, and contributing to the broader conversation about AI's creative potential.`,
    highlights: [
      'Created AI-powered short film "The Racer"',
      'Explored AI as creative storytelling partner',
      'Integrated multiple AI tools for visual generation',
      'Submitted to global competition with 1000+ entries',
      'Gained insights into AI's role in creative industries',
    ],
    techStack: ['AI Video Generation', 'Creative AI', 'Film Production', 'Narrative Design'],
    achievement: 'Official Selection',
    date: new Date('2024-05-10'),
    location: 'Global (Virtual)',
    organizer: '1Billion Summit',
    projectName: 'The Racer',
    projectUrl: 'https://youtu.be/mOMM3hP7Up0',
    image: '/images/events/1billion-summit/1billion-summit.jpg',
    featured: true,
    order: 3,
    status: 'completed',
  },
  {
    title: 'Egypt AI Innovation Forum',
    role: 'Technical Speaker & Panelist',
    type: 'conference',
    description: 'Annual forum bringing together AI researchers, industry leaders, and policymakers to discuss the future of AI in Egypt and the broader MENA region.',
    longDescription: `The Egypt AI Innovation Forum serves as a critical platform for dialogue between academia, industry, and government on advancing AI capabilities in the region. The event featured keynotes from leading AI researchers, panel discussions on policy and ethics, and technical workshops on cutting-edge AI applications.

As a technical speaker, I presented on "Building Production-Ready AI Systems: From Prototype to Scale," sharing practical insights from my experience deploying AI solutions in real-world contexts. The talk covered topics including model optimization, infrastructure considerations, and maintaining reliability at scale.

Participating in a panel discussion on "AI Talent Development in MENA" allowed me to contribute to the conversation about building sustainable AI ecosystems. We discussed educational pathways, industry-academia collaboration, and strategies for retaining technical talent in the region.

The forum provided valuable networking opportunities with researchers from Egyptian universities, representatives from multinational tech companies, and government officials working on AI strategy. These connections have led to ongoing collaborations and knowledge exchange.`,
    highlights: [
      'Presented technical talk on production AI systems',
      'Participated in panel on AI talent development',
      'Networked with 200+ AI professionals and researchers',
      'Engaged with government officials on AI policy',
      'Contributed to regional AI ecosystem development',
    ],
    techStack: ['AI Systems Architecture', 'MLOps', 'Production AI', 'Technical Leadership'],
    date: new Date('2023-11-15'),
    endDate: new Date('2023-11-17'),
    location: 'Cairo, Egypt',
    organizer: 'Egypt AI Innovation Forum',
    image: '/images/events/ai-innovation-forum/ai-innovation-forum.jpg',
    featured: false,
    order: 4,
    status: 'completed',
  },
]

/**
 * Seed the database with real professional events
 */
const seedEvents = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio'
    await mongoose.connect(mongoUri)
    console.log('✓ Connected to MongoDB')

    // Clear existing events
    await Event.deleteMany({})
    console.log('✓ Cleared existing events')

    // Insert real events
    const inserted = await Event.insertMany(realEvents)
    console.log(`✓ Inserted ${inserted.length} events`)

    console.log('\n╔════════════════════════════════════════╗')
    console.log('║  ✅ Events seeded successfully!        ║')
    console.log('╚════════════════════════════════════════╝\n')
    
    // Display inserted events
    console.log('Events added:')
    inserted.forEach((event, i) => {
      console.log(`  ${i + 1}. ${event.title} (${event.type})`)
    })
    
    process.exit(0)
  } catch (error) {
    console.error('✗ Seeding failed:', error.message)
    process.exit(1)
  }
}

// Run seeder
seedEvents()
