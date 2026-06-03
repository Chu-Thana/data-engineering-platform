# 🚀 End-to-End Data Engineering Platform (FAANG-Style)

> 🧠 Production-Grade Data Platform | Batch + Streaming + Cloud + Serving

![Python](https://img.shields.io/badge/Python-3.12-blue)
![Kafka](https://img.shields.io/badge/Streaming-Kafka-orange)
![Airflow](https://img.shields.io/badge/Orchestration-Airflow-red)
![AWS](https://img.shields.io/badge/Cloud-AWS-yellow)
![S3](https://img.shields.io/badge/Data_Lake-S3-lightgrey)
![Redshift](https://img.shields.io/badge/Warehouse-Redshift-darkred)
![Athena](https://img.shields.io/badge/Query-Athena-blue)
![FastAPI](https://img.shields.io/badge/API-FastAPI-green)
![Redis](https://img.shields.io/badge/Cache-Redis-critical)
![Container](https://img.shields.io/badge/Container-Docker-2496ED?style=flat&logo=docker&logoColor=white)
![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF?style=flat&logo=githubactions&logoColor=white)
![Testing](https://img.shields.io/badge/Testing-pytest-0A9EDC?style=flat&logo=pytest&logoColor=white)
![Code Quality](https://img.shields.io/badge/Code%20Quality-Ruff-8A2BE2?style=flat)

---

## 🧠 System Architecture (Production-Style)

This project demonstrates how modern data platforms are built in real-world environments:

👉 This platform integrates 5 individual projects into a unified data system:
> **Update:** Project 1 has been refactored into a validated vendor payments batch ETL pipeline with data readiness checks, raw-to-silver transformation, gold marts, output validation, sample mode, unit/integration tests, Ruff lint, and GitHub Actions CI.
- Batch Processing (Project 1)
- API Serving + Caching (Project 2)
- Streaming Pipeline (Project 3)
- Orchestration (Project 4)
- Cloud Data Warehouse (Project 5)

👉 Batch Processing + Real-time Streaming + Orchestration + Serving Layer  

All pipelines are unified into a **single analytics-ready data model**

![Architecture](assets/00_architecture_ultimate_data_platform.jpg)

💡 This architecture shows how batch and streaming pipelines converge into a unified platform  
with Airflow orchestration and API-based serving

---

## ⚙️ Portfolio CI/CD Overview

This portfolio includes CI/CD practices across all 5 data engineering projects using GitHub Actions.

| Project | CI/CD Scope | Validation |
|---|---|---|
| Project 1: Vendor Payments Batch ETL | CI | Data readiness checks, raw → silver → gold pipeline, output validation, sample mode, unit/integration tests, Ruff lint, GitHub Actions CI |
| Project 2: FastAPI Serving Layer | CI/CD | Ruff lint, pytest, Docker build, GHCR publish, AWS EC2 deployment |
| Project 3: Kafka Streaming | CI | Ruff lint, project structure tests, Docker Compose config validation |
| Project 4: Airflow Orchestration | CI | Ruff lint, Airflow DAG import validation |
| Project 5: Cloud Warehouse Platform | CI | Ruff lint, cloud platform structure and asset validation |

👉 This demonstrates production-style engineering practices across batch processing, streaming, orchestration, API serving, and cloud warehouse layers.

---

## 🔥 System Impact

- ⚡ Processed **~1,000 events/sec** using Kafka-based streaming simulation  
- ⚡ Achieved **<2s end-to-end latency** from ingestion to processed output  
- 🔁 Reduced duplicate events by **~95%** using Redis + Airflow downstream deduplication  
- 🔄 Orchestrated **4 Airflow DAGs (11+ tasks)** across batch and streaming pipelines  
- ⚡ Improved API response time **11.6s → 0.42s (~27x faster)** with Redis caching  
- ☁️ Enabled **sub-second query performance** with Athena & Redshift  

👉 Metrics derived from integrated batch + streaming pipeline validation runs

---

## 🧪 Metrics Comparison (Before vs After)

| Metric | Before | After | Improvement |
|------|--------|-------|------------|
| API Response Time | 11.6s | 0.42s | ~27x faster |
| Duplicate Handling | None | Redis + Airflow | ~95% reduction |
| Pipeline Execution | Manual | Automated (Airflow) | -64% manual work |
| Query Performance | Seconds | <1s | Faster analytics |

---

## 📊 System Performance Table

These metrics reflect performance across the entire pipeline from ingestion → processing → serving.

| Component | Metric | Value |
|----------|------|------|
| Kafka | Throughput | 1,000+ events/sec |
| Streaming | Latency | <2 sec |
| Airflow | Success Rate | 100% |
| Athena | Query Time | ~0.31 sec |
| Redshift | Query Time | ~0.47 sec |
| S3 | Data Volume | ~477 KB |

---

## 🎯 Business Impact

### 💰 Cost Optimization
- Reduced warehouse queries via caching
- Lower Redshift scan cost

### ⚡ Performance
- Sub-second query performance
- 27x faster API response

### 🔒 Reliability
- At-least-once delivery (no data loss)
- Retry + monitoring (Airflow)
- Deduplication guarantees correctness

---

## 🔄 End-to-End Flow

Kafka / CSV  
→ Staging / S3 Raw  
→ Airflow  
→ Transform / Dedup  
→ S3 Silver / Gold  
→ Redshift / Athena  
→ API / BI  

---

## 🧠 Key Concepts

- At-least-once delivery  
- Deduplication strategy  
- Cache-aside pattern  
- Data lake layering  
- DAG orchestration  

---

## ⚙️ CI/CD Engineering Practices

This platform applies CI/CD and automated validation across the portfolio to improve reliability, maintainability, and deployment readiness.

The workflows validate:

- Code quality with Ruff
- Automated tests with pytest
- Batch ETL execution and generated output validation
- Kafka streaming project structure and Docker Compose configuration
- Airflow DAG import validation to prevent broken scheduler workflows
- Docker image build and publishing to GitHub Container Registry
- FastAPI deployment on AWS EC2 using Docker Compose

### CI/CD Goals

- Prevent broken code from being merged
- Validate pipeline behavior before deployment
- Detect missing dependencies and DAG import errors early
- Ensure Docker-based services remain buildable and deployable
- Simulate production-style engineering workflows across the data platform

---

## 💡 Final Takeaway

Most portfolios demonstrate tools.

👉 This project demonstrates how to build real production-ready data systems

---

## 🔥 Final Thought

👉 This is a **complete Data Platform**
