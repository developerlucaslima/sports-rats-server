# Sports Rats - Detailed MVP
## Overview

Sports Rats MVP is a digital platform connecting beach sports players (beach tennis, beach volleyball, altinha, footvolley), allowing them to create profiles, assess their skills, find and organize matches, and interact with other players through friendships.

## MVP Features

### 1. Authentication and User Management
#### User Registration:
- Email and password registration
- Google Auth and Google One Tap integration
- Email confirmation
- Password recovery
- Secure password storage (hashing)
- JWT tokens (access and refresh) in httpOnly cookies for security

#### Login:
- Email/password or Google login
- JWT token generation and renewal

#### Player Profile:
- Basic information editing (name, bio, avatar, age, country, main sport)
- Profile picture upload
- Geolocation (latitude/longitude)

### 2. Sports and Skills
#### Sports:
- Available sports listing (beach tennis, beach volleyball, altinha, footvolley)
- Main sport selection and secondary sports addition to profile

#### Skills:
- Sport-specific skills listing
- Skills self-assessment (category, rating, preferred side, etc.)
- Monthly skills registration (evolution history)
- Statistics visualization (fundamentals, resources, attack, defense, overall)

### 3. Matches
- Match creation and management

### 4. Friendships
#### Friendship Management:
- Friendship requests sending
- Request acceptance or rejection
- Friends listing and removal

### 5. Initial Seeds and Administration
#### Seeds:
- Initial registration of sports, skills, skill types, player conditions, and countries via seed script
- Future administration via dashboard

## Architecture and Infrastructure
- Frontend: Next.js, Tailwind CSS, shadcn/ui, Zustand
- Backend: NestJS, Prisma, PostgreSQL (AWS RDS)
- Infrastructure: AWS (Amplify for frontend, ECS/Fargate for backend, RDS for database, S3 for files, SQS for queues)
- Security: JWT in httpOnly cookies, data validation, authentication best practices
- CI/CD: Automated deployment via GitHub Actions and AWS

## MVP Roadmap
1. Initial project and database setup
2. Initial deploy and CI/CD
3. Authentication and user registration (backend)
4. Authentication screens (frontend)
5. Sports and skills seeds
6. Profile and skills features (backend)
7. Profile and skills screens (frontend)
8. Matches and friendships features (backend)
9. Matches and friendships screens (frontend)
10. Testing, quality, and monitoring
11. Final adjustments and production deploy

This document details the Sports Rats MVP scope and serves as a reference for project development and tracking.