// Single source of truth for the site. Edit text here, then run:  node build.mjs
// Every user-facing string lives under `en` and `es`. Structure must match between the two.

export const site = {
  url: 'https://aldacl.github.io',
  name: 'Aldair Cortés',
  handle: 'alda',
  email: 'aldair.alda27@gmail.com',
  github: 'https://github.com/AldaCL',
  linkedin: 'https://linkedin.com/in/aldacortes',
};

const repo = (name) => `https://github.com/AldaCL/${name}`;

export const content = {
  en: {
    htmlLang: 'en',
    path: '/',
    title: 'Aldair Cortés — Data & ML Platform Engineer',
    description:
      'Data and ML platform engineer. Technical lead for 30 engineers. I build data pipelines and ML systems on GCP, Azure and Databricks, and I teach data governance, SQL and Python.',
    ui: {
      skip: 'Skip to content',
      theme: 'Toggle light / dark theme',
      langLabel: 'Español',
      langShort: 'ES',
      langTitle: 'Leer en español',
      filterLabel: 'Filter projects',
      art: {
        a: 'CanSat · simulated telemetry',
        b: 'Mission clock · simulated',
        c: 'Ortholinear, 40 keys, zero merge conflicts',
        alt: 'ALT', vel: 'VEL', temp: 'TEMP', pkt: 'PKT',
        landed: 'LANDED',
        descending: 'DESCENT',
        clock: 'T+',
        orbit: 'ORBIT',
        signal: 'SIGNAL',
      },
      repo: 'repo',
      repos: 'repos',
      fork: 'fork',
    },
    nav: [
      { id: 'work', label: 'Work' },
      { id: 'projects', label: 'Projects' },
      { id: 'keyboards', label: 'Keyboards' },
      { id: 'lessons', label: 'Lessons' },
      { id: 'teaching', label: 'Teaching' },
      { id: 'contact', label: 'Contact' },
    ],
    hero: {
      kicker: '$ whoami',
      name: 'Aldair Cortés',
      role: 'Data & ML Platform Engineer',
      lead: 'I get data and models into production, and I make sure they stay there.',
      sub: 'I build data platforms and ML systems that run in production, and I lead the teams that keep them healthy. Pipelines, cloud infrastructure, engineering standards, and the occasional mechanical keyboard.',
      status: 'Based in Mexico · works in English and Spanish',
      ctaPrimary: { label: 'See the work', href: '#work' },
      ctaSecondary: { label: 'Say hi', href: '#contact' },
    },
    stats: [
      { value: 'Data', label: 'platforms and pipelines that survive Mondays' },
      { value: 'ML', label: 'from notebook to production, with tests' },
      { value: 'Ops', label: 'CI/CD, IaC and monitoring on GCP, Azure and Databricks' },
      { value: 'People', label: 'standards, code reviews and mentoring' },
    ],
    work: {
      label: '## work',
      title: 'Case studies',
      intro:
        'Real systems, told without the confidential parts. The logs are staying where they are.',
      cases: [
        {
          title: 'An ML platform on Databricks',
          meta: 'CEMEX Global Data Science · 2022 – today',
          problem:
            'Models were deployed by hand, about an hour each, and every model had its own serving endpoint.',
          approach:
            'Designed an ML lifecycle standard on Databricks: automated CI/CD, MLflow pipelines, self-updating deployments and monitoring for both infrastructure and model drift. Rolled it out across 4 production projects.',
          results: [
            '67% faster deployments: 60 minutes of manual work became a 20-minute automated pipeline.',
            '70% lower inference cost by routing one endpoint to the model each request needs.',
            'Infrastructure and model-performance monitoring on all 4 projects.',
          ],
          stack: ['Databricks', 'MLflow', 'PySpark', 'Asset Bundles', 'Lakeflow', 'CI/CD'],
        },
        {
          title: 'A Customer Data Platform from zero',
          meta: 'El Puerto de Liverpool · 2022',
          problem: 'A retailer needed its first production Customer Data Platform, built greenfield.',
          approach:
            'Led the launch: 4 Java/Spring Boot microservices, a data access layer, and streaming and batch pipelines on GCP, provisioned with Terraform. Real-time ingestion ran on Pub/Sub, Cloud Functions matched data and Cloud Run executed the pipelines that deployed updates.',
          results: [
            '75% lower Cloud SQL cost (60 to 6 vCPUs) by tuning queries, stored procedures and Apache Beam code.',
            'Observability for services, pipelines and databases that cut the time to detect performance problems.',
            'Near real-time Looker dashboards for daily sales and nationwide ticket volume.',
          ],
          stack: ['GCP', 'BigQuery', 'Dataflow', 'Pub/Sub', 'Cloud Run', 'Terraform', 'Java'],
        },
        {
          title: 'From R to Python, in four countries',
          meta: 'CEMEX · supply chain services',
          problem:
            'Five critical supply chain services written in R had to become maintainable production software.',
          approach:
            'Led the migration to Python and FastAPI, deployed and monitored on Azure across the US, Mexico, Colombia and the UK. Also owned the dispatch scheduling algorithm behind concrete delivery logistics.',
          results: [
            '50% better response time on the migrated services.',
            'Dispatch scheduling answers in under 5 seconds, with fewer manual validations and real-time inventory visibility.',
            'Migrated legacy Airflow DAGs from Cloud Composer 1 to 2.',
          ],
          stack: ['Python', 'FastAPI', 'Azure', 'Airflow', 'Cloud Composer'],
        },
        {
          title: 'Engineering standards, human and AI',
          meta: 'Technical leadership · 30 engineers',
          problem:
            'Data science work needed the same engineering rigor as software, and AI assistants needed house rules too.',
          approach:
            'Led the Testing Learning Path, set MLOps standards and code templates, and defined how the team works with GitHub Copilot and Claude Code: better context engineering and lower AI credit use.',
          results: [
            'Test coverage from 0% to 70%+ across 14 data science projects.',
            'Two mentees hired as junior ML engineers.',
            'Co-organizer of the Mesa de Arquitectura, an internal architecture committee with its own Python and design patterns curriculum.',
          ],
          stack: ['Pytest', 'CI', 'Copilot', 'Claude Code', 'SOLID', 'DDD'],
        },
      ],
      labels: { problem: 'Problem', approach: 'What I did', results: 'Results' },
    },
    projects: {
      label: '## projects',
      title: 'Public projects',
      intro: 'Teaching material, research, geodata and hardware I could not leave alone.',
      filters: [
        { id: 'all', label: 'All' },
        { id: 'data', label: 'Data' },
        { id: 'ml', label: 'ML & research' },
        { id: 'geo', label: 'Geo' },
        { id: 'hw', label: 'Hardware' },
        { id: 'web', label: 'Web' },
      ],
      items: [
        {
          title: 'Practical CKAN manual',
          tags: ['data'],
          desc: 'A four-part hands-on manual for publishing open data with CKAN: Docker Compose install, FileStore and DataStore, the API, and a full data-to-portal workflow. In Spanish.',
          chips: ['CKAN', 'Docker', 'Open data'],
          note: 'docker compose up && hope',
          links: [{ label: 'ckan-manual', href: repo('ckan-manual') }],
        },
        {
          title: 'Data governance playbook',
          tags: ['data'],
          desc: 'An integrated data policy (quality, classification, access) for a sample company, plus a manual that turns it into reproducible OpenMetadata configuration: tags, RBAC, quality tests and lineage. In Spanish.',
          chips: ['Governance', 'OpenMetadata', 'RBAC'],
          note: 'policy-as-code, minus the drama',
          links: [{ label: 'GobiernoDatos', href: repo('GobiernoDatos') }],
        },
        {
          title: 'SQL guide with exercises',
          tags: ['data'],
          desc: 'From basic queries on a customer-orders dataset to indexes, query plans, permissions and backups in PostgreSQL. In Spanish.',
          chips: ['SQL', 'PostgreSQL'],
          note: 'SELECT * FROM patience;',
          links: [{ label: 'sql-guide', href: repo('sql-guide') }],
        },
        {
          title: 'KAN interpretability',
          tags: ['ml'],
          desc: 'My master’s research at IPN on Kolmogorov-Arnold Networks and the interpretability of neural networks. Thesis in progress; these are the related forks.',
          chips: ['KAN', 'Interpretability', 'Research'],
          note: 'interpretable, unlike my commit messages',
          links: [
            { label: 'pykan (fork)', href: repo('pykan') },
            { label: 'Convolutional-KANs (fork)', href: repo('Convolutional-KANs') },
          ],
        },
        {
          title: 'Drug-drug interaction prediction',
          tags: ['ml'],
          desc: 'A graph machine learning course paper that reproduces DPDDI, a deep predictor for drug-drug interactions. Written in LaTeX at CIC-IPN. In Spanish.',
          chips: ['Graph ML', 'LaTeX'],
          note: 'peer review, but make it a notebook',
          links: [{ label: 'MLwG-TEXT', href: repo('MLwG-TEXT') }],
        },
        {
          title: 'Human-inspired optimization',
          tags: ['ml'],
          desc: 'A Python implementation of the Social Algorithm tested on benchmark functions, with convergence and diversity analysis over repeated runs.',
          chips: ['Python', 'Optimization'],
          note: 'converges. eventually.',
          links: [{ label: 'human-inspired-optimization-algorithms', href: repo('human-inspired-optimization-algorithms') }],
        },
        {
          title: 'Random walk robots',
          tags: ['ml'],
          desc: 'Random walk simulation and analysis with PyGame for a time series course at CIC-IPN, built with a classmate.',
          chips: ['Python', 'PyGame', 'Time series'],
          note: 'built with caffeine and hurry (the README says so)',
          links: [{ label: 'random-walker-cic', href: repo('random-walker-cic') }],
        },
        {
          title: 'Course notebooks',
          tags: ['ml'],
          desc: 'Pattern recognition and deep learning notebooks from my master’s courses: logistic regression, SVM, back-propagation and deep graph learning.',
          chips: ['Notebooks', 'Deep learning'],
          note: 'loss going down, mostly',
          links: [
            { label: 'PatterRecognition', href: repo('PatterRecognition') },
            { label: 'Deep-Learning-Notes', href: repo('Deep-Learning-Notes') },
          ],
        },
        {
          title: 'Point-in-polygon on a map of Mexico',
          tags: ['geo'],
          desc: 'Automates counting the points that fall inside polygons with GeoPandas and draws them on a Bokeh map. Built for broadcast coverage analysis.',
          chips: ['GeoPandas', 'Bokeh', 'GIS'],
          note: 'finally, a use for all those shapefiles',
          links: [{ label: 'broadcast-coverage-calc', href: repo('broadcast-coverage-calc') }],
        },
        {
          title: 'CanSat telemetry',
          tags: ['hw'],
          desc: 'On-board telemetry with Arduino, Xbee and a GY-80 sensor, plus a Python ground station with OpenGL, pygame and Matplotlib.',
          chips: ['Arduino', 'Xbee', 'Python'],
          note: 'my first deploy went to space(ish)',
          links: [{ label: 'CanSat', href: repo('CanSat') }],
        },
        {
          title: 'Abogabot: from requirement to UI',
          tags: ['web'],
          desc: 'A template for taking a software requirement from understanding document to user stories, flow diagrams, UML and UI design, shown with a case management platform for a law firm. In Spanish.',
          chips: ['Requirements', 'UML', 'UX'],
          note: 'objection: scope creep',
          links: [{ label: 'Abogabot', href: repo('Abogabot') }],
        },
        {
          title: 'React Tetris',
          tags: ['web'],
          desc: 'Tetris in React, from 2019.',
          chips: ['React', 'JavaScript'],
          note: 'game over',
          links: [{ label: 'react-tetris', href: repo('react-tetris') }],
        },
      ],
    },
    keyboards: {
      label: '## keyboards',
      title: 'Mechanical keyboard nerd',
      intro: 'Diagnosis: chronic. Prescription: one more keyboard.',
      body: [
        'When I am not moving data, I am probably moving switches. I translated the README, the bill of materials and the build guide of Lumberjack into Spanish, so more people can solder their own board.',
        'Lumberjack is a through-hole ortholinear 60% PCB designed by Paul James. All through-hole parts, no SMD soldering, and it works in standard tray-mount 60% cases. The design is his; the Spanish version is mine.',
      ],
      chips: ['Through-hole', 'Ortholinear 60%', 'KiCad', 'MX switches'],
      links: [
        { label: 'Spanish translation (my fork)', href: repo('lumberjack-keyboard') },
        { label: 'Original by Paul James', href: 'https://github.com/peej/lumberjack-keyboard' },
      ],
      aside: 'There is also a QMK firmware fork on my GitHub, because of course there is.',
      keycapsLabel: 'Try typing it',
      keycapsWord: 'LUMBERJACK',
    },
    lessons: {
      label: '## lessons',
      title: 'Lessons learned',
      intro: 'Two lessons I learned the hard way, so you can skip the hard part. Or at least nod knowingly.',
      rulesLabel: 'Rules I keep now',
      items: [
        {
          num: '01',
          title: 'Start simple. Stay native. Earn the framework.',
          story:
            'More than once I reached for the big framework before the problem had earned it, and paid for it in setup, upgrades and onboarding. Complexity is a loan, and the interest shows up in every sprint. Over-engineering feels like diligence while you are doing it.',
          rules: [
            'Start with what the platform already gives you: plain SQL, the standard library, native browser APIs, a script and a scheduler.',
            'Prove the value with the simple version first. Add a framework only when a specific, measurable pain asks for it.',
            'If a feature needs a diagram to justify its existence, ask whether it needs to exist.',
          ],
          proof: ['$ ls node_modules', "ls: cannot access 'node_modules': No such file or directory", '# this site, on purpose'],
        },
        {
          num: '02',
          title: 'If it is not documented, it does not exist.',
          story:
            'The most frequent victim of my undocumented decisions is future me, who opens a file and asks who wrote this. Knowledge that lives in one head is a single point of failure, and that head also takes vacations.',
          rules: [
            'Write down the why, not only the how: the decision, the trade-offs and what was rejected.',
            'Keep docs next to the code (README, decision records, runbooks) so they change in the same pull request.',
            'A task is done when someone else can run it without asking me.',
          ],
          proof: ['$ git blame', 'future-me: who wrote this?', 'git: you did.'],
        },
      ],
    },
    teaching: {
      label: '## teaching',
      title: 'Teaching and community',
      intro: 'I like it when other people’s pipelines stop breaking.',
      items: [
        {
          title: 'Private instructor',
          desc: 'Databases, data governance and Python for government institutions. The CKAN, SQL and governance materials above are the open version of that work.',
        },
        {
          title: 'Mesa de Arquitectura',
          desc: 'Co-organizer of an internal architecture committee. I wrote a Python onboarding curriculum (Clean Code, OOP, SOLID, design patterns) and a 16-topic roadmap covering DDD, hexagonal architecture, messaging, RAG, multi-agent orchestration and LLM evaluation.',
        },
        {
          title: 'Mentoring',
          desc: 'Code reviews, pair programming and mentoring sessions for junior engineers and data scientists. Two of my mentees were hired as junior ML engineers.',
        },
      ],
    },
    stack: {
      label: '## stack',
      title: 'Tools I reach for',
      groups: [
        { name: 'Languages', items: ['Python', 'SQL', 'PySpark', 'Java', 'R', 'Shell'] },
        { name: 'Data', items: ['Apache Beam', 'Airflow', 'Databricks', 'Spark', 'BigQuery', 'PostgreSQL / PostGIS', 'Snowflake'] },
        { name: 'Cloud', items: ['GCP', 'Azure', 'Terraform', 'Docker', 'Kubernetes', 'CI/CD'] },
        { name: 'ML & AI', items: ['MLflow', 'XGBoost', 'Prophet', 'Azure OpenAI', 'Gemini', 'MCP', 'GitHub Copilot', 'Claude Code'] },
        { name: 'Backend', items: ['FastAPI', 'Spring Boot', 'Flask', 'Django', 'Looker'] },
      ],
      certs: ['Google Cloud Associate Cloud Engineer', 'Google Gemini Certified Partner Specialist: Gemini Enterprise Agent Development'],
      certsLabel: 'Certifications',
    },
    contact: {
      label: '## contact',
      title: 'Let’s talk',
      intro: 'Data platforms, MLOps, or mechanical keyboards. I answer all three.',
      emailLabel: 'Email',
      githubLabel: 'GitHub',
      linkedinLabel: 'LinkedIn',
    },
    footer: {
      built: 'Built by hand with HTML, CSS and zero frameworks. No deploys on Fridays.',
      updated: 'Last updated',
    },
    notFound: {
      title: '404: endpoint not found',
      body: 'This page was probably migrated from R to Python and lost on the way.',
      back: 'Back to the homepage',
      backHref: '/',
    },
  },

  es: {
    htmlLang: 'es',
    path: '/es/',
    title: 'Aldair Cortés — Ingeniero de plataformas de datos y ML',
    description:
      'Ingeniero de plataformas de datos y ML. Líder técnico de 30 ingenieros. Construyo pipelines de datos y sistemas de ML en GCP, Azure y Databricks, y enseño gobierno de datos, SQL y Python.',
    ui: {
      skip: 'Saltar al contenido',
      theme: 'Cambiar entre tema claro y oscuro',
      langLabel: 'English',
      langShort: 'EN',
      langTitle: 'Read in English',
      filterLabel: 'Filtrar proyectos',
      art: {
        a: 'CanSat · telemetría simulada',
        b: 'Reloj de misión · simulado',
        c: 'Ortolineal, 40 teclas, cero conflictos de merge',
        alt: 'ALT', vel: 'VEL', temp: 'TEMP', pkt: 'PKT',
        landed: 'ATERRIZADO',
        descending: 'DESCENSO',
        clock: 'T+',
        orbit: 'ÓRBITA',
        signal: 'SEÑAL',
      },
      repo: 'repo',
      repos: 'repos',
      fork: 'fork',
    },
    nav: [
      { id: 'work', label: 'Casos' },
      { id: 'projects', label: 'Proyectos' },
      { id: 'keyboards', label: 'Teclados' },
      { id: 'lessons', label: 'Lecciones' },
      { id: 'teaching', label: 'Enseñanza' },
      { id: 'contact', label: 'Contacto' },
    ],
    hero: {
      kicker: '$ whoami',
      name: 'Aldair Cortés',
      role: 'Ingeniero de plataformas de datos y ML',
      lead: 'Llevo datos y modelos a producción, y me aseguro de que se queden ahí.',
      sub: 'Construyo plataformas de datos y sistemas de ML que corren en producción, y lidero a los equipos que los mantienen sanos. Pipelines, infraestructura en la nube, estándares de ingeniería y, de vez en cuando, algún teclado mecánico.',
      status: 'Desde México · trabajo en español e inglés',
      ctaPrimary: { label: 'Ver mi trabajo', href: '#work' },
      ctaSecondary: { label: 'Saludar', href: '#contact' },
    },
    stats: [
      { value: 'Data', label: 'plataformas y pipelines que sobreviven a los lunes' },
      { value: 'ML', label: 'del notebook a producción, con pruebas' },
      { value: 'Ops', label: 'CI/CD, IaC y monitoreo en GCP, Azure y Databricks' },
      { value: 'People', label: 'estándares, code reviews y mentoría' },
    ],
    work: {
      label: '## casos',
      title: 'Casos de estudio',
      intro:
        'Sistemas reales, contados sin las partes confidenciales. Los logs se quedan donde están.',
      cases: [
        {
          title: 'Una plataforma de ML en Databricks',
          meta: 'CEMEX Global Data Science · 2022 – hoy',
          problem:
            'Los modelos se desplegaban a mano, cerca de una hora cada uno, y cada modelo tenía su propio endpoint.',
          approach:
            'Diseñé un estándar de ciclo de vida de ML en Databricks: CI/CD automatizado, pipelines con MLflow, despliegues que se actualizan solos y monitoreo de infraestructura y de drift del modelo. Lo desplegué en 4 proyectos productivos.',
          results: [
            '67% más rápido: 60 minutos de trabajo manual pasaron a un pipeline automático de 20.',
            '70% menos costo de inferencia al enrutar un solo endpoint hacia el modelo que cada petición necesita.',
            'Monitoreo de infraestructura y de desempeño de modelos en los 4 proyectos.',
          ],
          stack: ['Databricks', 'MLflow', 'PySpark', 'Asset Bundles', 'Lakeflow', 'CI/CD'],
        },
        {
          title: 'Una Customer Data Platform desde cero',
          meta: 'El Puerto de Liverpool · 2022',
          problem:
            'Una cadena de tiendas necesitaba su primera Customer Data Platform en producción, construida desde cero.',
          approach:
            'Lideré el lanzamiento: 4 microservicios en Java/Spring Boot, una capa de acceso a datos y pipelines batch y streaming en GCP, aprovisionados con Terraform. La ingesta en tiempo real corría sobre Pub/Sub, Cloud Functions hacía el match de datos y Cloud Run ejecutaba los pipelines que desplegaban las actualizaciones.',
          results: [
            '75% menos costo en Cloud SQL (de 60 a 6 vCPUs) afinando consultas, procedimientos almacenados y código de Apache Beam.',
            'Observabilidad de servicios, pipelines y bases de datos que redujo el tiempo para detectar problemas de desempeño.',
            'Dashboards de Looker casi en tiempo real con ventas diarias y volumen de tickets a nivel nacional.',
          ],
          stack: ['GCP', 'BigQuery', 'Dataflow', 'Pub/Sub', 'Cloud Run', 'Terraform', 'Java'],
        },
        {
          title: 'De R a Python, en cuatro países',
          meta: 'CEMEX · servicios de cadena de suministro',
          problem:
            'Cinco servicios críticos de cadena de suministro escritos en R tenían que convertirse en software de producción mantenible.',
          approach:
            'Lideré la migración a Python y FastAPI, con despliegue y monitoreo en Azure en EE. UU., México, Colombia y Reino Unido. También fui responsable del algoritmo de despacho detrás de la logística de entrega de concreto.',
          results: [
            '50% de mejora en tiempo de respuesta de los servicios migrados.',
            'El despacho responde en menos de 5 segundos, con menos validaciones manuales y visibilidad de inventario en tiempo real.',
            'Migré DAGs de Airflow de Cloud Composer 1 a 2.',
          ],
          stack: ['Python', 'FastAPI', 'Azure', 'Airflow', 'Cloud Composer'],
        },
        {
          title: 'Estándares de ingeniería, humanos y de IA',
          meta: 'Liderazgo técnico · 30 ingenieros',
          problem:
            'El trabajo de ciencia de datos necesitaba el mismo rigor que el software, y los asistentes de IA también necesitaban reglas.',
          approach:
            'Lideré el Testing Learning Path, definí estándares de MLOps y plantillas de código, y establecí cómo trabaja el equipo con GitHub Copilot y Claude Code: mejor ingeniería de contexto y menor consumo de créditos de IA.',
          results: [
            'Cobertura de pruebas de 0% a 70%+ en 14 proyectos de ciencia de datos.',
            'Dos personas que mentoré fueron contratadas como ML engineers junior.',
            'Co-organizador de la Mesa de Arquitectura, un comité interno con su propio currículo de Python y patrones de diseño.',
          ],
          stack: ['Pytest', 'CI', 'Copilot', 'Claude Code', 'SOLID', 'DDD'],
        },
      ],
      labels: { problem: 'Problema', approach: 'Qué hice', results: 'Resultados' },
    },
    projects: {
      label: '## proyectos',
      title: 'Proyectos públicos',
      intro: 'Material de enseñanza, investigación, datos geográficos y hardware que no pude dejar pasar.',
      filters: [
        { id: 'all', label: 'Todos' },
        { id: 'data', label: 'Datos' },
        { id: 'ml', label: 'ML e investigación' },
        { id: 'geo', label: 'Geo' },
        { id: 'hw', label: 'Hardware' },
        { id: 'web', label: 'Web' },
      ],
      items: [
        {
          title: 'Manual práctico de CKAN',
          tags: ['data'],
          desc: 'Manual práctico en cuatro partes para publicar datos abiertos con CKAN: instalación con Docker Compose, FileStore y DataStore, la API y un flujo completo de los datos al portal.',
          chips: ['CKAN', 'Docker', 'Datos abiertos'],
          note: 'docker compose up && ojalá',
          links: [{ label: 'ckan-manual', href: repo('ckan-manual') }],
        },
        {
          title: 'Guía de gobierno de datos',
          tags: ['data'],
          desc: 'Una política integrada de datos (calidad, clasificación, acceso) para una empresa de ejemplo, más un manual que la convierte en configuración reproducible de OpenMetadata: etiquetas, RBAC, pruebas de calidad y linaje.',
          chips: ['Gobierno de datos', 'OpenMetadata', 'RBAC'],
          note: 'política como código, sin el drama',
          links: [{ label: 'GobiernoDatos', href: repo('GobiernoDatos') }],
        },
        {
          title: 'Guía de SQL con ejercicios',
          tags: ['data'],
          desc: 'De consultas básicas sobre un dataset de pedidos de clientes a índices, planes de consulta, permisos y respaldos en PostgreSQL.',
          chips: ['SQL', 'PostgreSQL'],
          note: 'SELECT * FROM paciencia;',
          links: [{ label: 'sql-guide', href: repo('sql-guide') }],
        },
        {
          title: 'Interpretabilidad con KAN',
          tags: ['ml'],
          desc: 'Mi investigación de maestría en el IPN sobre Redes Kolmogorov-Arnold y la interpretabilidad de redes neuronales. Tesis en curso; estos son los forks relacionados.',
          chips: ['KAN', 'Interpretabilidad', 'Investigación'],
          note: 'interpretable, a diferencia de mis commits',
          links: [
            { label: 'pykan (fork)', href: repo('pykan') },
            { label: 'Convolutional-KANs (fork)', href: repo('Convolutional-KANs') },
          ],
        },
        {
          title: 'Predicción de interacciones entre fármacos',
          tags: ['ml'],
          desc: 'Artículo de un curso de aprendizaje automático con grafos que reproduce DPDDI, un predictor profundo de interacciones entre fármacos. Escrito en LaTeX en el CIC-IPN.',
          chips: ['ML en grafos', 'LaTeX'],
          note: 'revisión por pares, pero en notebook',
          links: [{ label: 'MLwG-TEXT', href: repo('MLwG-TEXT') }],
        },
        {
          title: 'Optimización inspirada en humanos',
          tags: ['ml'],
          desc: 'Implementación en Python del Social Algorithm probada con funciones de referencia, con análisis de convergencia y diversidad sobre ejecuciones repetidas.',
          chips: ['Python', 'Optimización'],
          note: 'converge. eventualmente.',
          links: [{ label: 'human-inspired-optimization-algorithms', href: repo('human-inspired-optimization-algorithms') }],
        },
        {
          title: 'Robots de caminata aleatoria',
          tags: ['ml'],
          desc: 'Simulación y análisis de caminatas aleatorias con PyGame para un curso de series de tiempo en el CIC-IPN, hecho con un compañero.',
          chips: ['Python', 'PyGame', 'Series de tiempo'],
          note: 'hecho con cafeína y prisa (lo dice el README)',
          links: [{ label: 'random-walker-cic', href: repo('random-walker-cic') }],
        },
        {
          title: 'Notebooks de cursos',
          tags: ['ml'],
          desc: 'Notebooks de reconocimiento de patrones y aprendizaje profundo de mis cursos de maestría: regresión logística, SVM, retropropagación y aprendizaje profundo en grafos.',
          chips: ['Notebooks', 'Deep learning'],
          note: 'la pérdida baja, casi siempre',
          links: [
            { label: 'PatterRecognition', href: repo('PatterRecognition') },
            { label: 'Deep-Learning-Notes', href: repo('Deep-Learning-Notes') },
          ],
        },
        {
          title: 'Puntos en polígonos sobre un mapa de México',
          tags: ['geo'],
          desc: 'Automatiza el conteo de puntos que caen dentro de polígonos con GeoPandas y los dibuja en un mapa de Bokeh. Hecho para analizar cobertura de radiodifusión.',
          chips: ['GeoPandas', 'Bokeh', 'GIS'],
          note: 'por fin, un uso para tantos shapefiles',
          links: [{ label: 'broadcast-coverage-calc', href: repo('broadcast-coverage-calc') }],
        },
        {
          title: 'Telemetría para CanSat',
          tags: ['hw'],
          desc: 'Telemetría a bordo con Arduino, Xbee y un sensor GY-80, más una estación terrena en Python con OpenGL, pygame y Matplotlib.',
          chips: ['Arduino', 'Xbee', 'Python'],
          note: 'mi primer deploy llegó al espacio (más o menos)',
          links: [{ label: 'CanSat', href: repo('CanSat') }],
        },
        {
          title: 'Abogabot: del requerimiento a la interfaz',
          tags: ['web'],
          desc: 'Una plantilla para llevar un requerimiento de software desde el documento de entendimiento hasta historias de usuario, diagramas de flujo, UML y diseño de interfaz, ilustrada con una plataforma de gestión de casos para un despacho de abogados.',
          chips: ['Requerimientos', 'UML', 'UX'],
          note: 'objeción: el alcance crece',
          links: [{ label: 'Abogabot', href: repo('Abogabot') }],
        },
        {
          title: 'React Tetris',
          tags: ['web'],
          desc: 'Tetris en React, de 2019.',
          chips: ['React', 'JavaScript'],
          note: 'game over',
          links: [{ label: 'react-tetris', href: repo('react-tetris') }],
        },
      ],
    },
    keyboards: {
      label: '## teclados',
      title: 'Nerd de teclados mecánicos',
      intro: 'Diagnóstico: crónico. Tratamiento: un teclado más.',
      body: [
        'Cuando no estoy moviendo datos, probablemente estoy moviendo switches. Traduje al español el README, la lista de materiales y la guía de ensamble de Lumberjack, para que más gente pueda soldar su propia placa.',
        'Lumberjack es una PCB ortolineal 60% de componentes through-hole diseñada por Paul James. Todo through-hole, sin soldadura SMD, y funciona en cases 60% estándar de tipo tray mount. El diseño es suyo; la versión en español es mía.',
      ],
      chips: ['Through-hole', 'Ortolineal 60%', 'KiCad', 'Switches MX'],
      links: [
        { label: 'Traducción al español (mi fork)', href: repo('lumberjack-keyboard') },
        { label: 'Original de Paul James', href: 'https://github.com/peej/lumberjack-keyboard' },
      ],
      aside: 'En mi GitHub también hay un fork del firmware QMK, porque claro que sí.',
      keycapsLabel: 'Pruébalo: escríbelo',
      keycapsWord: 'LUMBERJACK',
    },
    lessons: {
      label: '## lecciones',
      title: 'Lecciones aprendidas',
      intro: 'Dos lecciones que aprendí por las malas, para que tú te saltes lo difícil. O al menos asientas con conocimiento de causa.',
      rulesLabel: 'Reglas que sigo ahora',
      items: [
        {
          num: '01',
          title: 'Empieza simple. Usa lo nativo. Gánate el framework.',
          story:
            'Más de una vez recurrí al framework grande antes de que el problema se lo ganara, y lo pagué en configuración, actualizaciones y onboarding. La complejidad es un préstamo, y los intereses aparecen en cada sprint. La sobreingeniería se siente como diligencia mientras la haces.',
          rules: [
            'Empieza con lo que la plataforma ya te da: SQL simple, la biblioteca estándar, APIs nativas del navegador, un script y un scheduler.',
            'Demuestra el valor con la versión simple primero. Agrega un framework solo cuando un dolor específico y medible lo pida.',
            'Si una funcionalidad necesita un diagrama para justificar su existencia, pregunta si necesita existir.',
          ],
          proof: ['$ ls node_modules', "ls: cannot access 'node_modules': No such file or directory", '# este sitio, a propósito'],
        },
        {
          num: '02',
          title: 'Si no está documentado, no existe.',
          story:
            'La víctima más frecuente de mis decisiones sin documentar es mi yo del futuro, que abre un archivo y pregunta quién escribió esto. El conocimiento que vive en una sola cabeza es un punto único de falla, y esa cabeza además se va de vacaciones.',
          rules: [
            'Escribe el porqué, no solo el cómo: la decisión, los trade-offs y lo que se descartó.',
            'Mantén la documentación junto al código (README, registros de decisiones, runbooks) para que cambie en el mismo pull request.',
            'Una tarea está terminada cuando otra persona puede ejecutarla sin preguntarme.',
          ],
          proof: ['$ git blame', 'yo-del-futuro: ¿quién escribió esto?', 'git: tú.'],
        },
      ],
    },
    teaching: {
      label: '## enseñanza',
      title: 'Enseñanza y comunidad',
      intro: 'Me gusta cuando los pipelines de los demás dejan de romperse.',
      items: [
        {
          title: 'Instructor privado',
          desc: 'Bases de datos, gobierno de datos y Python para instituciones de gobierno. Los materiales de CKAN, SQL y gobierno de datos de arriba son la versión abierta de ese trabajo.',
        },
        {
          title: 'Mesa de Arquitectura',
          desc: 'Co-organizador de un comité interno de arquitectura. Escribí un currículo de introducción a Python (Clean Code, POO, SOLID, patrones de diseño) y una ruta de 16 temas que cubre DDD, arquitectura hexagonal, mensajería, RAG, orquestación multiagente y evaluación de LLM.',
        },
        {
          title: 'Mentoría',
          desc: 'Code reviews, pair programming y sesiones de mentoría para ingenieros junior y científicos de datos. Dos personas que mentoré fueron contratadas como ML engineers junior.',
        },
      ],
    },
    stack: {
      label: '## stack',
      title: 'Herramientas a las que recurro',
      groups: [
        { name: 'Lenguajes', items: ['Python', 'SQL', 'PySpark', 'Java', 'R', 'Shell'] },
        { name: 'Datos', items: ['Apache Beam', 'Airflow', 'Databricks', 'Spark', 'BigQuery', 'PostgreSQL / PostGIS', 'Snowflake'] },
        { name: 'Nube', items: ['GCP', 'Azure', 'Terraform', 'Docker', 'Kubernetes', 'CI/CD'] },
        { name: 'ML e IA', items: ['MLflow', 'XGBoost', 'Prophet', 'Azure OpenAI', 'Gemini', 'MCP', 'GitHub Copilot', 'Claude Code'] },
        { name: 'Backend', items: ['FastAPI', 'Spring Boot', 'Flask', 'Django', 'Looker'] },
      ],
      certs: ['Google Cloud Associate Cloud Engineer', 'Google Gemini Certified Partner Specialist: Gemini Enterprise Agent Development'],
      certsLabel: 'Certificaciones',
    },
    contact: {
      label: '## contacto',
      title: 'Hablemos',
      intro: 'Plataformas de datos, MLOps o teclados mecánicos. Contesto los tres.',
      emailLabel: 'Correo',
      githubLabel: 'GitHub',
      linkedinLabel: 'LinkedIn',
    },
    footer: {
      built: 'Hecho a mano con HTML, CSS y cero frameworks. Sin deploys en viernes.',
      updated: 'Última actualización',
    },
    notFound: {
      title: '404: endpoint no encontrado',
      body: 'Esta página probablemente se migró de R a Python y se perdió en el camino.',
      back: 'Volver al inicio',
      backHref: '/es/',
    },
  },
};
