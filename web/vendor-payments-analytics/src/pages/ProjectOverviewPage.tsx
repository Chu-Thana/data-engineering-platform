import {
Activity,
Boxes,
Braces,
Cloud,
Database,
GitBranch,
Layers3,
Server,
} from 'lucide-react'

import { Link } from 'react-router-dom'

const projectMetrics = [
{
value: '5',
label: 'Integrated Projects',
},
{
value: '3.35M+',
label: 'Batch Records Processed',
},
{
value: '100,000',
label: 'Validated Streaming Events',
},
{
value: '3',
label: 'Analytics Dashboards',
},
]

const capabilities = [
{
icon: Database,
title: 'Batch & Streaming Pipelines',
description:
'Processes 3.35M+ batch records and a validated 100,000-event streaming dataset through structured data pipelines.',
},
{
icon: GitBranch,
title: 'Orchestration & Data Quality',
description:
'Coordinates cross-project execution with Apache Airflow, automated validation, runtime metadata, testing, and CI.',
},
{
icon: Cloud,
title: 'Cloud Analytics Platform',
description:
'Publishes trusted datasets to Amazon S3, Athena, AWS Glue, and Redshift Serverless analytics layers.',
},
{
icon: Server,
title: 'Analytics Consumption',
description:
'Serves reusable Batch and Streaming analytics through FastAPI to Power BI dashboards and this React application.',
},
]

const skillGroups = [
{
title: 'Data Engineering',
skills: ['Python', 'SQL', 'Pandas', 'Batch ETL', 'Data Validation'],
},
{
title: 'Streaming & Orchestration',
skills: ['Apache Kafka', 'Redis', 'Apache Airflow', 'Runtime Metadata'],
},
{
title: 'Cloud & Warehouse',
skills: [
'Amazon S3',
'AWS Glue',
'Athena',
'Redshift Serverless',
],
},
{
title: 'Serving & Analytics',
skills: ['FastAPI', 'Power BI', 'React', 'TypeScript', 'Recharts'],
},
{
title: 'Quality & Infrastructure',
skills: [
'Pytest',
'Ruff',
'GitHub Actions',
'Docker',
'Docker Compose',
],
},
]

const platformStages = [
{
icon: Layers3,
label: 'Batch & Streaming',
},
{
icon: Braces,
label: 'Processing & Validation',
},
{
icon: Activity,
label: 'Airflow Orchestration',
},
{
icon: Cloud,
label: 'Cloud Analytics',
},
{
icon: Server,
label: 'FastAPI Serving',
},
{
icon: Boxes,
label: 'Power BI & Web',
},
]

export function ProjectOverviewPage() {
return ( <div className="overview-page"> <section className="hero-section"> <div className="hero-section__content"> <p className="page-eyebrow">Data Engineering Portfolio</p>

      <h1>
        Vendor Payments
        <span> Data Platform</span>
      </h1>

      <p className="hero-section__lead">
        An end-to-end data platform connecting batch and streaming
        pipelines, orchestration, cloud analytics, API serving, and
        analytics consumption.
      </p>

      <p className="hero-section__about">
        Built independently by Thanaseth Chuachan, a Data Engineer candidate with
        a Mathematics background and hands-on experience building reliable data
        pipelines, validation workflows, cloud analytics, and API-driven
        applications.
      </p>

      <div className="hero-section__actions">
        <Link className="button button--primary" to="/overview">
          Explore Analytics
        </Link>

        <a
          className="button button--secondary"
          href="#platform-architecture"
        >
          View Architecture
        </a>

        <a
          className="button button--secondary"
          href="https://github.com/Chu-Thana"
          target="_blank"
          rel="noreferrer"
        >
          View GitHub
        </a>
      </div>
    </div>

    <div className="hero-section__panel">
      <p className="hero-section__panel-label">Platform Scope</p>

      <strong>From Data Ingestion to Analytics Consumption</strong>

      <div className="hero-section__status">
        <span className="status-dot" />
        Live React portfolio application connected to FastAPI analytics
        endpoints
      </div>
    </div>
  </section>

  <section className="metrics-grid" aria-label="Project metrics">
    {projectMetrics.map((metric) => (
      <article className="metric-card" key={metric.label}>
        <strong>{metric.value}</strong>
        <span>{metric.label}</span>
      </article>
    ))}
  </section>

  <section
    className="content-section architecture-section"
    id="platform-architecture"
  >
    <div className="section-heading">
      <p className="page-eyebrow">Platform Architecture</p>

      <h2>Five integrated projects, one analytics platform</h2>

      <p>
        The architecture connects trusted Batch and Streaming processing
        with Airflow orchestration, AWS cloud analytics, a reusable FastAPI
        serving layer, and two analytics consumption experiences.
      </p>
    </div>

    <figure className="architecture-card">
      <img
        src="/images/00_vendor-payments-data-platform-overview.png"
        alt="Vendor Payments Data Platform architecture showing Airflow orchestration, Batch and Streaming processing, AWS cloud analytics, FastAPI serving, Power BI dashboards, and the Web Analytics Application."
      />

      <figcaption>
        End-to-end architecture from validated data processing to business
        intelligence and interactive web analytics.
      </figcaption>
    </figure>
  </section>

  <section className="content-section" id="platform-journey">
    <div className="section-heading">
      <p className="page-eyebrow">Platform Journey</p>

      <h2>From raw payment data to usable analytics</h2>

      <p>
        Each layer has a focused responsibility while sharing validated
        outputs and runtime evidence across the complete platform.
      </p>
    </div>

    <div className="journey-grid">
      {platformStages.map((stage, index) => {
        const Icon = stage.icon

        return (
          <article className="journey-card" key={stage.label}>
            <span className="journey-card__number">
              {String(index + 1).padStart(2, '0')}
            </span>

            <Icon aria-hidden="true" size={24} />

            <strong>{stage.label}</strong>
          </article>
        )
      })}
    </div>
  </section>

  <section className="content-section">
    <div className="section-heading">
      <p className="page-eyebrow">What I Built</p>

      <h2>Production-oriented platform capabilities</h2>

      <p>
        The portfolio demonstrates data processing, reliability,
        orchestration, cloud analytics, API design, and downstream
        consumption as parts of one connected system.
      </p>
    </div>

    <div className="capabilities-grid">
      {capabilities.map((capability) => {
        const Icon = capability.icon

        return (
          <article className="capability-card" key={capability.title}>
            <div className="capability-card__icon">
              <Icon aria-hidden="true" size={22} />
            </div>

            <h3>{capability.title}</h3>
            <p>{capability.description}</p>
          </article>
        )
      })}
    </div>
  </section>

  <section className="content-section">
    <div className="section-heading">
      <p className="page-eyebrow">Technical Skills</p>

      <h2>Technology used across the platform</h2>

      <p>
        Tools were selected to support clear ownership boundaries,
        repeatable validation, and reusable analytics outputs.
      </p>
    </div>

    <div className="skills-grid">
      {skillGroups.map((group) => (
        <article className="skill-group" key={group.title}>
          <h3>{group.title}</h3>

          <div className="skill-group__tags">
            {group.skills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </article>
      ))}
    </div>
  </section>

  <section className="content-section next-focus project-outcome">
    <div>
      <p className="page-eyebrow">Project Outcome</p>

      <h2>A complete analytics delivery workflow</h2>
    </div>

    <ul>
      <li>
        Trusted Batch and Streaming outputs are processed and validated
        before analytics consumption.
      </li>
      <li>
        Airflow coordinates independent platform components without
        duplicating their processing responsibilities.
      </li>
      <li>
        Reusable FastAPI endpoints support both Power BI dashboards and a
        React analytics application.
      </li>
    </ul>
  </section>
</div>
)
}
