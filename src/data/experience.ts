import type { ExperienceSectionData } from '../types';

export const experienceSections: ExperienceSectionData[] = [
  {
    number: '01',
    title: 'Education',
    items: [
      {
        title: 'Master of Science in Artificial Intelligence',
        subtitle: 'Texas A&M University, College Station · Fall 2026',
        date: 'Aug 2026 – Apr 2028',
      },
      {
        title: 'B.Tech. in Computer Science & Engineering',
        subtitle: 'Indian Institute of Information Technology, Vadodara',
        date: 'Jul 2020 – Jun 2024',
        gpa: 'CGPA: 8.37/10',
      },
    ],
  },
  {
    number: '02',
    title: 'Experience',
    items: [
      {
        title: 'Quant Tools Developer',
        subtitle: 'Graviton Research Capital LLP',
        date: 'Aug 2025 – Present',
        bullets: [
          'Own market data infrastructure and exchange integrations across 12 global exchanges (primary owner for 9), ensuring high-availability, low-latency pipelines.',
          'Engineered automation for exchange configs, symbol mappings, and monitoring workflows — minimizing manual intervention.',
          'Validated tick-level market data, corporate actions, and instrument mappings across quantitative trading pipelines.',
          'Enhanced PnL systems and C++ alpha frameworks, accelerating strategy validation and research-to-production latency.',
          'Led exchange onboarding initiatives, coordinating with quant researchers and engineering teams.',
        ],
      },
      {
        title: 'Software Engineer',
        subtitle: 'Searce Inc.',
        date: 'Jul 2024 – Aug 2025',
        bullets: [
          'Built Go-based automated refactoring system with Cursor AI + prompt engineering — 4× productivity (4 days/Lambda → 4 Lambdas in 4 days).',
          'Delivered production RAG system over stock market data with 30+ backend APIs in 22 days.',
          'Architected cloud-agnostic, interface-driven AWS Lambda transformation system.',
          'Reduced incident response from 2 hours to under 5 minutes (97% improvement).',
          'Developed real-time scheduling & alerting systems using Node.js, Firebase, and Google Apps Script.',
        ],
      },
      {
        title: 'Software Engineering Analyst',
        subtitle: 'Searce Inc.',
        date: 'Jan 2024 – Jun 2024',
        bullets: [
          'Built React Native FSM app used by 2,400+ field technicians, reducing turnaround time.',
          'Delivered cross-platform Flutter SOS app with real-time emergency alerts.',
          'Automated employee certification tracking for 1,500+ users via Google Apps Script, saving 40+ hours/month.',
        ],
      },
      {
        title: 'Data Science Intern',
        subtitle: 'ArcelorMittal Nippon Steel India',
        date: 'May 2023 – Jul 2023',
        bullets: [
          'Designed interactive Tableau dashboards for finance, procurement, and sales teams.',
          'Implemented OCR & NLP pipelines to automate document handling and reduce manual extraction errors.',
          'Conducted data wrangling, feature engineering, and model evaluation for ML workflows.',
        ],
      },
      {
        title: 'Research Intern',
        subtitle: 'iHub-Data, IIIT Hyderabad',
        date: 'May 2022 – Jul 2022',
        bullets: [
          'Selected for Srishti Research Internship — analyzed large-scale traffic datasets using H3 indexing and ML.',
          'Identified accident-prone zones, contributing to predictive road safety systems.',
        ],
      },
    ],
  },
  {
    number: '03',
    title: 'Achievements & Leadership',
    items: [
      {
        title: 'IMPACT Hackathon — Runner-Up',
        subtitle: 'GiftAbled · Cisco, Walmart Global Tech, Allstate, Publicis Sapient',
        date: 'May 2021',
        bullets: [
          'Built IoT + computer vision glasses for visually impaired navigation using face and speech-to-text recognition.',
        ],
      },
      {
        title: 'Niti Vishleshak — National Finalist (2nd Place)',
        subtitle: 'Indian Institute of Management Bangalore',
        date: 'Aug 2021',
        bullets: [
          'Ranked among top teams out of 735 teams and 1,500+ participants in IIMB policy case study competition.',
        ],
      },
      {
        title: 'Vice President, Cultural Committee',
        subtitle: 'Indian Institute of Information Technology, Vadodara',
        date: 'Jul 2021 – Jun 2022',
        bullets: [
          'Led a 20-member team organizing Rhythm and large-scale campus events with record student participation.',
        ],
      },
      {
        title: 'Tech Lead, Internship Program',
        subtitle: 'IIIT Vadodara',
        date: '2022 – 2023',
        bullets: [
          'Mentored interns and drove delivery of 5+ projects across full-stack and cloud-native stacks.',
        ],
      },
    ],
  },
];
