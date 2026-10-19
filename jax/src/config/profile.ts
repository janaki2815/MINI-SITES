/**
 * Centralized Verified Profile & Projects Data for Boya Janaki Ramu (JAX)
 * Authentic representation:
 * - Primary focus: Full-stack software engineering & creative systems
 * - Secondary focus: AI engineering & machine learning systems
 * - Developing knowledge: Data systems & analytics
 * - Degree: B.Tech in Computer Science and Engineering (Data Science)
 * - College: Rajeev Gandhi Memorial College of Engineering and Technology, Nandyal (RGMCET '26)
 * - GitHub: https://github.com/janaki2815
 */

export interface SkillCategoryGroup {
  id: string;
  index: string;
  title: string;
  description: string;
  skills: string[];
}

export interface SkillItem {
  name: string;
  category: string;
  color: string;
}

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  category: string;
  role: string;
  summary: string;
  description: string;
  techStack: string[];
  highlights: string[];
  architecture: string;
  asciiFlow: string[];
  githubUrl: string;
  repoName: string;
  cloneCmd: string;
  accentColor: string;
  badge: string;
  demoType: 'sales_forecast' | 'os_dashboard' | 'sql_agent' | 'vision_ai' | 'recipe_planner';
  liveUrl?: string;
}

export const SKILL_GROUPS: SkillCategoryGroup[] = [
  {
    id: 'languages_core',
    index: '01',
    title: 'Languages & Core Systems',
    description: 'Foundational syntax, type safety, algorithmic logic, and web standards',
    skills: ['Java', 'JavaScript', 'TypeScript', 'Python', 'SQL', 'HTML5', 'CSS3'],
  },
  {
    id: 'web_fullstack',
    index: '02',
    title: 'Full-Stack & Web Architecture',
    description: 'Modern component systems, reactive state, REST gateways, and server runtimes',
    skills: ['React 19', 'Tailwind CSS', 'Vite', 'Node.js', 'Express', 'Flask', 'REST APIs', 'TanStack Query'],
  },
  {
    id: 'ai_machine_learning',
    index: '03',
    title: 'AI, Neural Networks & Machine Learning',
    description: 'Deep learning architectures, tabular inference, and autonomous agent loops',
    skills: [
      'TensorFlow',
      'Keras (EfficientNetB0)',
      'Scikit-learn',
      'Prophet',
      'XGBoost',
      'DuckDB',
      'AGNO Agent',
      'Pandas',
      'NumPy',
      'OpenCV',
      'Streamlit',
    ],
  },
  {
    id: 'datastores_tooling',
    index: '04',
    title: 'Data Stores & Engineering Workflow',
    description: 'Relational databases, document stores, version control, and developer toolchains',
    skills: [
      'Supabase (PostgreSQL)',
      'MySQL',
      'SQLite',
      'MongoDB',
      'Git',
      'GitHub',
      'VS Code',
      'Jupyter Notebook',
      'Google Colab',
    ],
  },
];

export const TOTAL_VERIFIED_SKILLS_COUNT = SKILL_GROUPS.reduce(
  (total, group) => total + group.skills.length,
  0
);

export const FLATTENED_SKILLS: SkillItem[] = SKILL_GROUPS.flatMap((group) =>
  group.skills.map((name) => ({
    name,
    category: group.id,
    color: '#fdfbf7',
  }))
);

export const PROJECTS: ProjectItem[] = [
  {
    id: 'sales-predict',
    index: '01',
    title: 'Sales Predict',
    subtitle: 'Time-Series & Gradient Boosted Demand Forecasting Platform',
    category: 'Full-Stack Machine Learning & Time-Series Systems',
    role: 'Creator & Machine Learning Full-Stack Engineer',
    summary:
      'A data-driven web application for retail and clothing demand forecasting. Leverages Facebook Prophet for seasonal time-series decomposition and XGBoost regressors to forecast future sales demand across apparel categories with real-time inventory stock recommendations and interactive KPI telemetry.',
    description:
      'Sales Predict is a production-style demand forecasting application engineered to eliminate retail stockouts and overstock risks through predictive time-series modeling. The system pairs Facebook Prophet for capturing weekly, monthly, and holiday seasonality with an XGBoost gradient-boosted regressor for non-linear category demand trends. Pre-trained model artifacts are served through a lightweight Python Flask REST API backed by an SQLite transaction store, providing multi-day category projections, confidence bounds, and inventory health metrics directly to a modern React 18 frontend with interactive Chart.js visualizations.',
    techStack: [
      'React 18',
      'TypeScript',
      'Tailwind CSS',
      'Chart.js',
      'react-chartjs-2',
      'Axios',
      'Vite 5',
      'Python (Flask)',
      'Prophet',
      'XGBoost',
      'Scikit-learn',
      'SQLite',
    ],
    highlights: [
      'Engineered dual-model forecasting pipeline utilizing Facebook Prophet for seasonal time-series decomposition and XGBoost regressors for category-level sales demand prediction.',
      'Designed interactive analytics dashboard with real-time KPI cards, multi-day projection charts, and date-wise prediction tables using Chart.js and react-chartjs-2.',
      'Implemented automated inventory intelligence engine delivering category stock recommendations, reorder alerts, and trajectory indicators.',
      'Built RESTful Flask API with SQLite logging to serve serialized model bundles (prophet_all.pkl, xgb_all.pkl) with low-latency inference.',
    ],
    architecture:
      'React 18 Client + Chart.js ➔ Axios REST Client ➔ Flask API Gateway ➔ Dual ML Pipeline (Prophet + XGBoost) ➔ SQLite Datastore',
    asciiFlow: [
      '[ Client Browser (React + Chart.js) ] ──(Axios REST)──▶ [ Flask API (/predict) ]',
      '                                                               │',
      '                                            (Category & Horizon Days)',
      '                                                               ▼',
      '[ SQLite Datastore (sales.db) ] ◀──(Inference)──▶ [ Prophet + XGBoost Models ]',
    ],
    githubUrl: 'https://github.com/janaki2815/sales_predict',
    repoName: 'janaki2815/sales_predict',
    cloneCmd: 'git clone https://github.com/janaki2815/sales_predict.git',
    accentColor: '#38bdf8',
    badge: 'Flagship ML Forecasting System',
    demoType: 'sales_forecast',
    liveUrl: 'https://sales-predict-eta.vercel.app',
  },
  {
    id: 'data-analyst-agent',
    index: '02',
    title: 'Data Analyst Agent (SQL + AI)',
    subtitle: 'Autonomous Natural Language to SQL Analytics Engine',
    category: 'AI Agents & Analytical Data Systems',
    role: 'AI & Data Systems Engineer',
    summary:
      'Intelligent autonomous analytical agent powered by DuckDB, AGNO Agent framework, and LLMs that converts natural language prompts into executable SQL queries and instant tabular visualizations.',
    description:
      'Data Analyst Agent eliminates analytical friction for business and technical stakeholders by translating plain conversational questions into optimized SQL queries on raw CSV and XLSX datasets. Powered by DuckDB\'s in-memory columnar engine and the AGNO agent framework with Groq/OpenAI LLM inference, the system autonomously analyzes schemas, writes dialect-accurate SQL, executes analytical aggregations in sub-second response times, and formats interactive dataframes with exportable results.',
    techStack: [
      'Python',
      'Streamlit',
      'DuckDB',
      'AGNO Agent',
      'Pandas',
      'Groq API',
      'OpenAI',
      'SQL',
    ],
    highlights: [
      'Integrated DuckDB in-process OLAP engine allowing instant sub-second SQL execution across heavy multi-megabyte CSV/Excel files.',
      'Constructed specialized prompt engineering and schema-injection pipelines using the AGNO agentic framework for hallucination-free SQL generation.',
      'Implemented bi-directional interface supporting both conversational queries and direct manual SQL editing with interactive tabular preview.',
      'Delivered one-click CSV export and dynamic data visualization components built with Streamlit and Pandas.',
    ],
    architecture:
      'Raw Tabular Data (CSV/XLSX) ➔ In-Memory Columnar Database (DuckDB) ➔ AGNO Agent Schema Reflection ➔ LLM Inference Gateway (Groq / OpenAI) ➔ Automated SQL Execution & Streamlit Visualization',
    asciiFlow: [
      '[ CSV / XLSX Upload ] ──▶ [ DuckDB In-Memory OLAP ]',
      '                                 │ (Schema Graph)',
      '                                 ▼',
      '[ Natural Query ] ──────▶ [ AGNO Agent + LLM ] ──▶ [ Executable SQL ]',
      '                                                         │',
      '                                                         ▼',
      '[ Streamlit UI ] ◀────── [ Dataframe / Aggregation ] ◀───┘',
    ],
    githubUrl: 'https://github.com/janaki2815/Data-Analyst-Agent',
    repoName: 'janaki2815/Data-Analyst-Agent',
    cloneCmd: 'git clone https://github.com/janaki2815/Data-Analyst-Agent.git',
    accentColor: '#fde047',
    badge: 'Autonomous AI Agent',
    demoType: 'sql_agent',
  },
  {
    id: 'pneumonia-detection',
    index: '03',
    title: 'Pneumonia Detection AI',
    subtitle: 'Deep Convolutional Radiograph Classifier & Diagnostic PDF Engine',
    category: 'Deep Learning & Computer Vision',
    role: 'Machine Learning Engineer',
    summary:
      'Clinical decision support system employing a fine-tuned EfficientNetB0 convolutional neural network to classify chest radiographs as Normal or Pneumonia with automated PDF diagnostic reports.',
    description:
      'Pneumonia Detection leverages state-of-the-art computer vision to assist medical professionals in rapidly screening chest radiographs for bacterial and viral pneumonia patterns. Built on a fine-tuned EfficientNetB0 deep convolutional neural network, the system processes input X-ray imagery, extracts high-level pulmonary features, outputs calibrated probabilistic confidence scores, and automatically compiles clinical findings into an archival PDF diagnostic summary.',
    techStack: [
      'Python',
      'TensorFlow',
      'Keras',
      'EfficientNetB0',
      'Flask',
      'ReportLab (PDF)',
      'OpenCV',
      'NumPy',
    ],
    highlights: [
      'Trained and fine-tuned EfficientNetB0 deep CNN on thousands of labeled pediatric chest radiographs, achieving high sensitivity and specificity.',
      'Constructed an automated clinical PDF generator embedding patient metadata, original radiograph image, model confidence metrics, and doctor review signoffs.',
      'Engineered lightweight Flask REST service for low-latency image ingestion, preprocessing (resizing, normalization), and asynchronous model inference.',
      'Applied image augmentation and feature extraction techniques to mitigate radiology dataset class imbalances and overfitting.',
    ],
    architecture:
      'Chest X-Ray Ingestion ➔ OpenCV Preprocessing & Tensor Normalization ➔ EfficientNetB0 Deep CNN Inference ➔ Confidence Scoring & Classification ➔ Flask API & ReportLab Automated PDF Generation',
    asciiFlow: [
      '[ Chest Radiograph ] ──▶ [ OpenCV Tensor Prep (224x224) ]',
      '                                      │',
      '                                      ▼',
      '[ Softmax Score ] ◀── [ EfficientNetB0 CNN Layers ]',
      '       │',
      '       ▼',
      '[ Flask REST Engine ] ──▶ [ ReportLab Clinical PDF Generator ]',
    ],
    githubUrl: 'https://github.com/janaki2815/Pneumonia-Detection',
    repoName: 'janaki2815/Pneumonia-Detection',
    cloneCmd: 'git clone https://github.com/janaki2815/Pneumonia-Detection.git',
    accentColor: '#38bdf8',
    badge: 'Clinical Vision Model',
    demoType: 'vision_ai',
  },
  {
    id: 'meal-map',
    index: '04',
    title: 'MealMap',
    subtitle: 'Zero-Dependency Vanilla JavaScript Culinary Planner',
    category: 'Frontend Engineering & Client Architecture',
    role: 'Frontend Systems Developer',
    summary:
      'Zero-dependency vanilla JavaScript application featuring recipe discovery via TheMealDB API, interactive weekly meal planning, client-side favorites persistence, and dynamic shopping lists.',
    description:
      'MealMap is a fast, responsive culinary coordination application built entirely with vanilla HTML, modern CSS, and native JavaScript ES modules without heavy frameworks or build tool overhead. It features multi-criteria recipe discovery powered by TheMealDB REST API, client-side hashtag SPA routing, weekly drag/assign meal planners, and persistent shopping lists utilizing localStorage and sessionStorage.',
    techStack: [
      'JavaScript (ES Modules)',
      'HTML5',
      'CSS3',
      'TheMealDB REST API',
      'LocalStorage / SessionStorage',
      'Hash Routing',
    ],
    highlights: [
      'Architected modular client-side state without external dependencies using native JavaScript ES modules and reactive DOM event emitters.',
      'Implemented smooth hash-based SPA routing (#discover, #favourites, #planner, #shopping) supporting browser history back/forward operations.',
      'Integrated TheMealDB API with client-side query caching and debounce mechanisms to minimize redundant network calls.',
      'Constructed persistent weekly meal planning calendar and interactive shopping checklist with localStorage sync and dynamic ingredient aggregation.',
    ],
    architecture:
      'Client Browser (Vanilla ES Modules) ➔ Native Hash Router ➔ TheMealDB External REST API ➔ Reactive DOM Renderers ➔ Persistent Storage (LocalStorage / SessionStorage)',
    asciiFlow: [
      '[ User Navigation ] ──▶ [ Hash Router (#discover / #planner) ]',
      '                                      │',
      '                                      ▼',
      '[ TheMealDB API Cache ] ◀──▶ [ ES Module Controllers ]',
      '                                      │',
      '                                      ▼',
      '[ DOM View System ] ◀───▶ [ LocalStorage State Engine ]',
    ],
    githubUrl: 'https://github.com/janaki2815/meal_map',
    repoName: 'janaki2815/meal_map',
    cloneCmd: 'git clone https://github.com/janaki2815/meal_map.git',
    accentColor: '#4ade80',
    badge: 'Native JavaScript Craft',
    demoType: 'recipe_planner',
  },
];

export const PROFILE = {
  name: 'Boya Janaki Ramu',
  displayName: 'JAX*',
  nickname: 'JAX*',
  moniker: 'JAX*',
  brand: 'JAX*',
  subtitle: 'Full-Stack Developer & Applied AI · RGMCET \'26',
  graduationLabel: "RGMCET '26",
  headline: 'Full-Stack Developer & Applied AI · Computer Science & Data Science',
  subline: "RGMCET '26",
  tagline: "Full-Stack Developer & Applied AI · RGMCET '26",
  role: 'Full-Stack Developer & Applied AI',
  location: 'RGMCET Nandyal',
  status: "RGMCET '26 · B.Tech CSE (Data Science)",
  introduction:
    'I’m a full-stack software developer building responsive web applications, intelligent AI agents, and interactive digital experiences. I’m pursuing a B.Tech in Computer Science and Engineering (Data Science) at RGMCET, Nandyal.',
  philosophy: [
    { title: 'High visual conviction', desc: 'Crafting bold, intentional digital artifacts with distinct point of view.' },
    { title: 'Architectural discipline', desc: 'Modular components, typed state systems, and clean boundaries.' },
    { title: 'Tangible user delight', desc: 'Tactile sound synthesis, physics-backed motion, and responsive feel.' },
    { title: 'Full-stack systems engineering', desc: 'End-to-end client runtimes, REST gateways, and serverless workflows.' },
    { title: 'Applied machine learning and autonomous data agents', desc: 'Prophet & XGBoost demand forecasting, autonomous DuckDB SQL compilers, and deep CNN inference pipelines.' },
    { title: 'Clean client-side engineering', desc: 'Zero bloat, responsive layouts, native DOM performance, and accessible standards.' },
  ],
  manifesto: [
    'High visual conviction.',
    'Architectural discipline.',
    'Tangible user delight.',
    'Full-stack systems engineering.',
    'Applied machine learning and autonomous data agents.',
    'Clean client-side engineering.',
  ],
  direction: {
    primaryFocus: 'Full-stack development',
    exploring: 'AI engineering and agents',
    developingKnowledge: 'Data systems and machine learning vision',
  },
  education: {
    degree: 'B.Tech in Computer Science and Engineering (Data Science)',
    college: 'Rajeev Gandhi Memorial College of Engineering and Technology (RGMCET), Nandyal',
    institution: 'Rajeev Gandhi Memorial College of Engineering and Technology (RGMCET), Nandyal',
    institutionShort: 'RGMCET Nandyal',
    gradYear: 2026,
    gradBadge: "RGMCET '26",
    statusText: 'Graduation: 2026',
  },
  bio: [
    'Boya Janaki Ramu (JAX) — Full-stack developer.',
    'B.Tech in Computer Science and Engineering (Data Science) from Rajeev Gandhi Memorial College of Engineering and Technology, Nandyal (RGMCET).',
    'Focused on full-stack development, with curiosity for AI engineering and data analytics.',
  ],
  focusDomains: [
    'Full-stack systems',
    'AI autonomous agents',
    'Computer vision & deep learning',
    'Interactive web motion',
  ],
  interests: [
    'Full-stack systems',
    'AI autonomous agents',
    'Computer vision & deep learning',
    'Interactive web motion',
  ],
  links: {
    github: 'https://github.com/janaki2815',
    linkedin: 'https://www.linkedin.com/in/boya-janakiramu-132514280/',
    instagram: 'https://www.instagram.com/jay__._28/',
  },
  channels: {
    github: 'https://github.com/janaki2815',
    linkedin: 'https://www.linkedin.com/in/boya-janakiramu-132514280/',
    instagram: 'https://www.instagram.com/jay__._28/',
    email: 'contact@jax.world',
    x: 'https://x.com',
  },
  skillGroups: SKILL_GROUPS,
  skills: FLATTENED_SKILLS,
  totalSkillsCount: TOTAL_VERIFIED_SKILLS_COUNT,
  projects: PROJECTS,
};
