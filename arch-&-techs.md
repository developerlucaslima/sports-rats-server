# Architecture and Technologies - Sports Rats MVP
## Overview

The Sports Rats MVP will be built with a focus on agility, maintainability, and future scalability. The chosen architecture and technologies enable rapid development while preparing the groundwork for product evolution and growth.

## 1. Frontend
- **Framework**: Next.js (React)
  - SSR/SSG for performance, SEO, and caching
  - App Router for modularity and nested layouts
- **Styling**: Tailwind CSS
  - Utility-first for rapid and responsive development
- **Components**: shadcn/ui
  - Accessible and customizable components
- **State Management**: Zustand
  - Simple, flexible, and easy to scale
- **Data Fetching**:
  - SSR/SSG with Next.js fetch for caching and performance
  - React Query for client-side cache and request management
- **Authentication**:
  - JWT (access/refresh) in httpOnly cookies
  - Google Auth and Google One Tap integration
- **TypeScript**:
  - Static typing for enhanced safety and productivity
- **Testing**:
  - Jest and React Testing Library (planned for future)

## 2. Backend
- **Framework**: NestJS (Node.js)
  - Modular, scalable, with native TypeScript support
- **ORM**: Prisma
  - Safe migrations, performant queries, and strong typing
- **Database**: PostgreSQL (AWS RDS)
  - Relational, robust, and scalable
- **Authentication**:
  - JWT (access/refresh) in httpOnly cookies
  - Google Auth and One Tap
- **Validation**: class-validator
- **Password Hashing**: bcrypt
- **Email Sending**: nodemailer (synchronous in MVP, queue-based in future)
- **File Storage**: AWS S3 (direct backend upload)
- **Testing**: Jest (planned for future)

## 3. Infrastructure
- **Provider**: AWS (Amazon Web Services)
- **Frontend**: AWS Amplify (continuous deployment, CDN, SSL)
- **Backend**: AWS ECS (Fargate) or EC2 (Docker container)
- **Database**: AWS RDS (PostgreSQL)
- **File Storage**: AWS S3
- **Monitoring**: AWS CloudWatch, Sentry
- **CI/CD**: GitHub Actions (build, test, deploy)
- **DNS & SSL**: AWS Route 53 and AWS Certificate Manager

## 4. Folder Architecture (Frontend)
```
src/
├── app/                    # Routes and pages (Next.js App Router)
├── features/              # Domains/features
│   ├── auth/              # Authentication Feature
│   │   ├── components/     # Auth-specific components
│   │   ├── hooks/          # Auth-specific hooks
│   │   ├── store/          # Auth Zustand store
│   │   ├── services/       # Auth services/API
│   │   └── index.ts        # Barrel file (optional)
│   ├── user/              # User Feature
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── store/
│   │   ├── services/
│   │   └── index.ts
│   ├── match/             # Match Feature
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── store/
│   │   ├── services/
│   │   └── index.ts
│   └── ... (other features)
├── components/             # Global components (e.g., Button, Modal)
├── hooks/                  # Global hooks (e.g., useMediaQuery)
├── store/                  # Global stores (if needed)
├── services/              # Global services (e.g., apiClient)
├── styles/                # Global styles and Tailwind config
├── utils/                 # Global utility functions
└── lib/                   # Global instances/configs (e.g., axios, auth)
```

## 5. Future Planning (Scalability)
- **Asynchronous Queues**:
  - Add AWS SQS or RabbitMQ for:
    - Email sending
    - Image processing
    - Statistics calculation
    - Push notifications
- **Microservices**:
  - Separate critical domains (e.g., notifications, statistics) into independent services
- **Caching**:
  - Add Redis (AWS ElastiCache) for session caching, rankings, etc.
- **Advanced Monitoring**:
  - Custom dashboards, automatic alerts
- **Admin Dashboard**:
  - Interface for managing sports, skills, etc.
- **Automated Testing**:
  - Unit and integration test coverage
- **Horizontal Scaling**:
  - Auto Scaling in ECS/Fargate and RDS
- **CDN and Asset Optimization**:
  - Advanced use of CloudFront for assets and images

## 6. Summary
The MVP will be simple yet prepared for growth: modular architecture, automated deployment, secure authentication, SSR/SSG, and native AWS integration. Queues, microservices, and caching will be added as the product evolves and demand increases.