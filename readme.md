# 🏗 Architecture and Technologies - Sports Rats MVP

## Overview

The Sports Rats MVP is designed for **agility, clarity, and long-term scalability**. This document outlines the architectural decisions, folder structure, and technologies used in both frontend and backend, reflecting modern best practices such as **modularization**, **domain-driven design**, **type safety**, and **AWS-native infrastructure**.

---

## 1. Frontend

### ⚙️ Technologies
- **Framework**: Next.js (App Router)
  - SSR/SSG for SEO and performance
  - Modular routing with layouts
- **Styling**: Tailwind CSS
- **UI Library**: shadcn/ui
  - Accessible, customizable primitives
- **Type System**: TypeScript
- **State Management**: Zustand
- **Data Fetching**: Next.js fetch + React Query
- **Authentication**:
  - JWT in `httpOnly` cookies
  - Google Auth + Google One Tap
- **Testing** (Planned): Jest + React Testing Library

### 🗂 Folder Structure

```
src/
├── app/                   # Next.js routes (App Router)
├── features/              # Domain modules (DDD-aligned)
│   ├── auth/
│   │   ├── components/    # Auth-specific UI
│   │   ├── hooks/         # Custom logic
│   │   ├── store/         # Zustand store
│   │   ├── services/      # API & domain services
│   │   └── index.ts
│   ├── players/
│   ├── matches/
│   └── ...
├── components/            # Global UI primitives
├── hooks/                 # Global hooks
├── store/                 # Global Zustand stores
├── services/              # Global service clients (e.g., axios)
├── lib/                   # External libs/configs (e.g., auth, axios)
├── styles/                # Global styles and Tailwind config
└── utils/                 # Global utilities
```

---

## 2. Backend

### ⚙️ Technologies
- **Framework**: NestJS (modular, scalable)
- **Language**: TypeScript
- **Architecture**: Clean Architecture + DDD
- **ORM**: Prisma
- **Database**: PostgreSQL (via AWS RDS)
- **Authentication**: JWT (access/refresh), Google Auth, Google One Tap
- **Validation**: class-validator
- **Hashing**: bcrypt
- **Email**: nodemailer (sync → SQS queue in future)
- **Storage**: AWS S3 (direct uploads)
- **Testing** (Planned): Jest

### 🗂 Folder Structure

```
src/
├── config/                 # App-wide configuration
│   └── database/
├── env/                    # Env service + schema
├── modules/                # Feature-based domains (DDD modules)
│   ├── auth/
│   │   ├── controllers/
│   │   ├── domain/
│   │   │   ├── entities/
│   │   │   ├── repositories/
│   │   │   └── value-objects/
│   │   ├── use-cases/
│   │   ├── infra/          # Persistence, APIs
│   │   │   └── prisma/
│   │   └── auth.module.ts
│   ├── players/
│   └── ...
├── shared/                 # Reusable, pure, side-effect free
│   ├── entities/           # BaseEntity or shared aggregates
│   ├── value-objects/      # Globally reusable VOs
│   ├── utils/
│   └── types/
├── app.module.ts
└── main.ts
```

---

## 3. Infrastructure

### ☁️ AWS Stack
- **Frontend**: Vercel or AWS Amplify (CI, CDN, SSL)
- **Backend**: ECS Fargate or EC2 (Docker)
- **Database**: RDS PostgreSQL
- **Storage**: S3
- **Monitoring**: CloudWatch, Sentry
- **CI/CD**: GitHub Actions
- **DNS/SSL**: Route 53 + ACM

---

## 4. Future Roadmap

### ✅ Features to scale into
- **Async Processing**: Email, notifications, stats → via AWS SQS or RabbitMQ
- **Microservices**: Extract modules (e.g., notifications, stats) into standalone services
- **Caching**: Redis for auth/session, game state, leaderboard
- **Monitoring**: CloudWatch alarms + custom dashboards
- **Admin Panel**: Internal dashboard to manage sports, matches, players
- **Testing**: Add unit + integration tests
- **Horizontal Scaling**: Auto Scaling (ECS & DB read replicas)
- **CDN Optimization**: CloudFront + optimized media

---

## 5. Summary

The MVP is structured for rapid delivery with a clean path to future scalability:

- **Frontend**: Next.js modular SSR with global state via Zustand and strong domain separation
- **Backend**: Clean Architecture with DDD per module, Prisma + PostgreSQL, decoupled use cases and infrastructure
- **Infrastructure**: Cloud-native on AWS, ready for async, caching, monitoring, and scaling

This ensures **fast iteration today, safe evolution tomorrow**.