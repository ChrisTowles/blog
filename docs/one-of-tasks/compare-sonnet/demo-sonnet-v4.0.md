
# AWS ECS Deployment Plan for Nuxt Blog App

## Project Overview

This document outlines the complete migration plan from Cloudflare Workers (NuxtHub) to AWS ECS for the personal blog application built with Nuxt 3.

## Current State Analysis

- **Current Platform**: Cloudflare Workers via NuxtHub
- **Application**: Nuxt 3 blog with TypeScript, Nuxt UI Pro
- **Database**: Currently using NuxtHub database (Cloudflare D1)
- **Content**: Nuxt Content for markdown blog posts
- **AI Features**: Chat functionality with Anthropic AI
- **Authentication**: GitHub OAuth

## Target AWS Architecture

### Core Services
- **ECS Fargate**: Container orchestration for the Nuxt app
- **Application Load Balancer (ALB)**: Traffic distribution and SSL termination
- **RDS PostgreSQL**: Database replacement for NuxtHub DB
- **CloudFront**: CDN for static assets and caching
- **S3**: Static asset storage and build artifacts
- **ECR**: Container registry for Docker images
- **Route 53**: DNS management
- **Certificate Manager**: SSL/TLS certificates

### Supporting Services
- **VPC**: Network isolation and security
- **Secrets Manager**: Secure storage for API keys and database credentials
- **CloudWatch**: Monitoring and logging
- **IAM**: Security and access management

## Phase 1: Infrastructure Setup (Week 1-2)

### 1.1 AWS Account & Initial Setup
- [ ] Create/configure AWS account
- [ ] Set up AWS CLI and credentials
- [ ] Create dedicated IAM user for deployments
- [ ] Configure billing alerts

### 1.2 Network Infrastructure
- [ ] Create VPC with public/private subnets across multiple AZs
- [ ] Set up Internet Gateway and NAT Gateways
- [ ] Configure Route Tables
- [ ] Create Security Groups for ALB, ECS, and RDS

### 1.3 Domain & SSL
- [ ] Transfer domain to Route 53 (or configure DNS)
- [ ] Request SSL certificate via Certificate Manager
- [ ] Validate domain ownership

### 1.4 Database Setup
- [ ] Create RDS PostgreSQL instance in private subnets
- [ ] Configure security groups for database access
- [ ] Set up database credentials in Secrets Manager
- [ ] Create initial database and user

## Phase 2: Application Containerization (Week 2-3)

### 2.1 Docker Configuration
- [ ] Create optimized Dockerfile for Nuxt production build
- [ ] Create docker-compose.yml for local development
- [ ] Configure .dockerignore file
- [ ] Test local container build and run

### 2.2 Database Migration Preparation
- [ ] Update Drizzle config for PostgreSQL
- [ ] Create database migration scripts
- [ ] Update environment variables structure
- [ ] Test database connections locally

### 2.3 Application Updates
- [ ] Remove NuxtHub specific dependencies
- [ ] Update environment variable handling
- [ ] Configure for container deployment
- [ ] Update health check endpoints

## Phase 3: ECS Infrastructure (Week 3-4)

### 3.1 ECS Cluster Setup
- [ ] Create ECS Fargate cluster
- [ ] Configure CloudWatch log groups
- [ ] Set up ECR repository
- [ ] Create task definition with proper resource allocation

### 3.2 Load Balancer Configuration
- [ ] Create Application Load Balancer
- [ ] Configure target groups for ECS service
- [ ] Set up health checks
- [ ] Configure HTTPS listeners and redirect HTTP to HTTPS

### 3.3 ECS Service Configuration
- [ ] Create ECS service with auto-scaling
- [ ] Configure service discovery
- [ ] Set up rolling deployment strategy
- [ ] Configure environment variables and secrets

## Phase 4: CI/CD Pipeline (Week 4-5)

### 4.1 GitHub Actions Workflow
```yaml
# .github/workflows/deploy.yml structure:
# - Build and test on multiple Node versions
# - Build Docker image
# - Push to ECR
# - Deploy to ECS
# - Run post-deployment tests
```

### 4.2 Pipeline Stages
- [ ] **Build Stage**: Install dependencies, run tests, build application
- [ ] **Security Stage**: Vulnerability scanning, code analysis
- [ ] **Docker Stage**: Build and tag container images
- [ ] **Deploy Stage**: Push to ECR, update ECS service
- [ ] **Verification Stage**: Health checks and smoke tests

### 4.3 Environment Strategy
- [ ] Set up staging environment
- [ ] Configure production deployment
- [ ] Implement blue-green deployment strategy
- [ ] Set up rollback mechanisms

## Phase 5: Monitoring & Security (Week 5-6)

### 5.1 Observability
- [ ] Configure CloudWatch dashboards
- [ ] Set up application metrics
- [ ] Create alerts for critical metrics
- [ ] Implement distributed tracing (X-Ray)

### 5.2 Security Hardening
- [ ] Implement least-privilege IAM policies
- [ ] Enable VPC Flow Logs
- [ ] Configure AWS Config for compliance
- [ ] Set up GuardDuty for threat detection

### 5.3 Backup & Disaster Recovery
- [ ] Configure RDS automated backups
- [ ] Set up cross-region backup for critical data
- [ ] Document disaster recovery procedures
- [ ] Test backup and restore processes

## Phase 6: Data Migration & Go-Live (Week 6-7)

### 6.1 Data Migration
- [ ] Export data from NuxtHub/Cloudflare D1
- [ ] Transform data for PostgreSQL schema
- [ ] Import data to RDS PostgreSQL
- [ ] Verify data integrity

### 6.2 DNS & Traffic Switching
- [ ] Configure CloudFront distribution
- [ ] Set up Route 53 records with health checks
- [ ] Implement gradual traffic shifting
- [ ] Monitor application performance

### 6.3 Post-Migration Tasks
- [ ] Update documentation
- [ ] Train team on new deployment process
- [ ] Monitor system performance
- [ ] Optimize resource allocation based on usage

## Technical Implementation Details

### Dockerfile Example
```dockerfile
# Multi-stage build for optimized production image
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Environment Variables
```env
# Database
DATABASE_URL=postgresql://user:pass@rds-endpoint:5432/blog
DB_HOST=blog-db.region.rds.amazonaws.com
DB_PASSWORD_SECRET_ARN=arn:aws:secretsmanager:region:account:secret:db-password

# Application
NODE_ENV=production
NUXT_SECRET_KEY=your-secret-key
NUXT_AUTH_GITHUB_CLIENT_ID=github-client-id
NUXT_AUTH_GITHUB_CLIENT_SECRET=github-client-secret

# AI
ANTHROPIC_API_KEY=anthropic-key

# AWS
AWS_REGION=us-east-1
```

### ECS Task Definition
```json
{
  "family": "blog-app",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "512",
  "memory": "1024",
  "executionRoleArn": "arn:aws:iam::account:role/ecsTaskExecutionRole",
  "taskRoleArn": "arn:aws:iam::account:role/ecsTaskRole",
  "containerDefinitions": [
    {
      "name": "blog-container",
      "image": "account.dkr.ecr.region.amazonaws.com/blog:latest",
      "portMappings": [
        {
          "containerPort": 3000,
          "protocol": "tcp"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/blog-app",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
```

## Cost Estimation

### Monthly AWS Costs (Estimated)
- **ECS Fargate**: $30-50 (1 vCPU, 2GB RAM, 24/7)
- **Application Load Balancer**: $18-25
- **RDS PostgreSQL** (t3.micro): $15-20
- **CloudFront**: $5-15 (based on traffic)
- **S3 Storage**: $5-10
- **Data Transfer**: $10-20
- **Other Services**: $10-15

**Total Estimated Monthly Cost**: $93-155

## Risk Mitigation

### Technical Risks
- **Database Migration**: Plan for data consistency and minimal downtime
- **Performance**: Load test before migration
- **Dependencies**: Audit all NuxtHub-specific code

### Operational Risks
- **Monitoring**: Implement comprehensive monitoring before migration
- **Rollback Plan**: Maintain Cloudflare deployment until stability confirmed
- **Team Training**: Ensure team familiarity with AWS services

## Success Criteria

### Performance Metrics
- [ ] Application response time < 200ms (95th percentile)
- [ ] 99.9% uptime SLA
- [ ] Zero data loss during migration
- [ ] CI/CD pipeline deployment time < 10 minutes

### Operational Metrics
- [ ] Automated deployments working correctly
- [ ] Monitoring and alerting functional
- [ ] Backup and restore procedures validated
- [ ] Documentation complete and team trained

## Timeline Summary

| Phase | Duration | Key Deliverables |
|-------|----------|------------------|
| 1 | 2 weeks | AWS infrastructure setup |
| 2 | 1 week | Application containerization |
| 3 | 1 week | ECS configuration |
| 4 | 1 week | CI/CD pipeline |
| 5 | 1 week | Monitoring & security |
| 6 | 1 week | Migration & go-live |

**Total Project Duration**: 7 weeks

## Next Steps

1. **Week 1**: Begin with AWS account setup and VPC configuration
2. **Week 2**: Start containerizing the application in parallel
3. **Week 3**: Set up ECS infrastructure and begin CI/CD development
4. **Week 4**: Complete pipeline and begin security configuration
5. **Week 5**: Finalize monitoring and prepare for migration
6. **Week 6**: Execute migration with minimal downtime
7. **Week 7**: Post-migration optimization and documentation