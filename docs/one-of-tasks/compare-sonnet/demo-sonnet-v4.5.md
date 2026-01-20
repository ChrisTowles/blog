# Project Plan: Deploy Nuxt App to AWS ECS via GitHub Actions

## Overview

This plan outlines the migration of the blog application from Cloudflare Workers (NuxtHub) to AWS ECS (Elastic Container Service) with automated deployment via GitHub Actions.

## Project Goals

- Deploy the Nuxt 3 blog application to AWS ECS
- Implement CI/CD pipeline using GitHub Actions
- Maintain feature parity with current Cloudflare deployment
- Ensure scalability and cost-effectiveness
- Minimize downtime during migration

## Prerequisites

- AWS Account with appropriate IAM permissions
- GitHub repository with Actions enabled
- Docker knowledge for containerization
- AWS CLI configured locally for testing

## Phase 1: Infrastructure Planning & Setup (Week 1)

### 1.1 AWS Architecture Design

- [ ] Design VPC architecture (public/private subnets)
- [ ] Plan ECS cluster configuration (Fargate vs EC2)
- [ ] Design Application Load Balancer (ALB) setup
- [ ] Plan RDS/Aurora database migration strategy
- [ ] Design S3 bucket structure for static assets
- [ ] Plan CloudFront CDN configuration
- [ ] Design secrets management with AWS Secrets Manager

### 1.2 Infrastructure as Code (IaC)

- [ ] Choose IaC tool (Terraform or AWS CDK)
- [ ] Create VPC and networking resources
- [ ] Configure security groups and NACLs
- [ ] Set up ECS cluster and task definitions
- [ ] Configure ALB with target groups
- [ ] Set up RDS instance for database
- [ ] Configure S3 buckets for storage
- [ ] Set up CloudWatch logging and monitoring

### 1.3 Domain & SSL

- [ ] Configure Route 53 hosted zone
- [ ] Request/import SSL certificate in ACM
- [ ] Plan DNS migration strategy
- [ ] Configure ALB listener rules for HTTPS

## Phase 2: Application Containerization (Week 2)

### 2.1 Dockerfile Creation

- [ ] Create optimized multi-stage Dockerfile
  ```dockerfile
  # Build stage
  FROM node:20-alpine AS builder
  # Runtime stage
  FROM node:20-alpine AS runner
  ```
- [ ] Optimize image size with .dockerignore
- [ ] Configure build arguments for environment variables
- [ ] Test local Docker build and run

### 2.2 Docker Compose (Local Development)

- [ ] Create docker-compose.yml for local testing
- [ ] Configure service dependencies (database, redis)
- [ ] Set up volume mounts for development
- [ ] Document local Docker workflow

### 2.3 Application Configuration

- [ ] Adapt Nuxt config for AWS environment
- [ ] Configure database connection for RDS
- [ ] Update static asset paths for S3/CloudFront
- [ ] Configure environment variable handling
- [ ] Update authentication flow (GitHub OAuth)
- [ ] Migrate NuxtHub-specific features

## Phase 3: Database Migration (Week 2-3)

### 3.1 Database Setup

- [ ] Provision RDS PostgreSQL instance
- [ ] Configure security groups for database access
- [ ] Set up automated backups
- [ ] Configure parameter groups
- [ ] Enable encryption at rest

### 3.2 Schema Migration

- [ ] Export Drizzle schema
- [ ] Test schema migration in staging
- [ ] Create migration scripts
- [ ] Plan data migration strategy
- [ ] Set up connection pooling

### 3.3 Data Migration

- [ ] Export data from NuxtHub database
- [ ] Transform data if needed
- [ ] Import data to RDS
- [ ] Verify data integrity
- [ ] Test application with migrated data

## Phase 4: AWS Services Integration (Week 3)

### 4.1 ECR (Elastic Container Registry)

- [ ] Create ECR repository
- [ ] Configure lifecycle policies
- [ ] Set up image scanning
- [ ] Document image tagging strategy

### 4.2 ECS Configuration

- [ ] Create ECS cluster
- [ ] Define task definition with proper resource limits
- [ ] Configure service with auto-scaling
- [ ] Set up health checks
- [ ] Configure service discovery (optional)

### 4.3 Storage & CDN

- [ ] Set up S3 bucket for static assets
- [ ] Configure bucket policies and CORS
- [ ] Create CloudFront distribution
- [ ] Configure cache behaviors
- [ ] Set up S3 for uploaded content

### 4.4 Secrets Management

- [ ] Migrate environment variables to AWS Secrets Manager
- [ ] Configure ECS task role for secrets access
- [ ] Update application to read from Secrets Manager
- [ ] Store GitHub OAuth credentials securely
- [ ] Store database credentials

## Phase 5: GitHub Actions CI/CD Pipeline (Week 4)

### 5.1 Workflow Setup

- [ ] Create `.github/workflows/deploy-aws.yml`
- [ ] Configure workflow triggers (push to main, tags)
- [ ] Set up GitHub environments (staging, production)
- [ ] Configure required approvals

### 5.2 Build Job

- [ ] Checkout code
- [ ] Set up Node.js
- [ ] Install pnpm dependencies
- [ ] Run linting (eslint)
- [ ] Run type checking
- [ ] Run tests (vitest)
- [ ] Build Nuxt application

### 5.3 Docker Job

- [ ] Set up Docker Buildx
- [ ] Log in to ECR
- [ ] Build Docker image
- [ ] Tag image (commit SHA, branch, latest)
- [ ] Push to ECR
- [ ] Scan image for vulnerabilities

### 5.4 Deploy Job

- [ ] Configure AWS credentials
- [ ] Update ECS task definition
- [ ] Deploy to ECS service
- [ ] Wait for deployment stability
- [ ] Run smoke tests
- [ ] Notify team of deployment status

### 5.5 Rollback Strategy

- [ ] Implement automated rollback on failure
- [ ] Create manual rollback workflow
- [ ] Document rollback procedures
- [ ] Test rollback scenarios

## Phase 6: Monitoring & Logging (Week 4-5)

### 6.1 CloudWatch Setup

- [ ] Configure ECS container logging
- [ ] Create custom log groups
- [ ] Set up log retention policies
- [ ] Configure log insights queries

### 6.2 Monitoring & Alarms

- [ ] Set up CloudWatch dashboards
- [ ] Create alarms for:
  - [ ] CPU/Memory utilization
  - [ ] Request count and latency
  - [ ] Error rates (4xx, 5xx)
  - [ ] Database connections
  - [ ] Container health
- [ ] Configure SNS topics for notifications
- [ ] Integrate with Slack/email

### 6.3 Application Performance

- [ ] Integrate AWS X-Ray for tracing
- [ ] Set up RUM (Real User Monitoring)
- [ ] Configure custom metrics
- [ ] Monitor cold start times

## Phase 7: Testing & Validation (Week 5)

### 7.1 Staging Environment

- [ ] Deploy to staging environment
- [ ] Run integration tests
- [ ] Perform load testing
- [ ] Test auto-scaling behavior
- [ ] Validate monitoring and alerts

### 7.2 Security Testing

- [ ] Run security scanning (container, dependencies)
- [ ] Test IAM roles and policies
- [ ] Validate secrets management
- [ ] Test SSL/TLS configuration
- [ ] Perform penetration testing

### 7.3 Performance Testing

- [ ] Benchmark against Cloudflare deployment
- [ ] Test CDN cache hit rates
- [ ] Measure page load times
- [ ] Test database query performance
- [ ] Validate auto-scaling triggers

## Phase 8: Production Deployment (Week 6)

### 8.1 Pre-deployment

- [ ] Final review of all configurations
- [ ] Backup current production data
- [ ] Prepare rollback plan
- [ ] Schedule maintenance window
- [ ] Notify stakeholders

### 8.2 Deployment

- [ ] Deploy infrastructure to production
- [ ] Migrate production database
- [ ] Deploy application to ECS
- [ ] Update DNS records (gradual cutover)
- [ ] Monitor deployment closely

### 8.3 Post-deployment

- [ ] Verify all functionality
- [ ] Monitor error rates and performance
- [ ] Test all critical user flows
- [ ] Validate monitoring and alerts
- [ ] Document any issues

## Phase 9: Optimization & Documentation (Week 7)

### 9.1 Cost Optimization

- [ ] Review AWS Cost Explorer
- [ ] Optimize ECS task sizing
- [ ] Configure spot instances if applicable
- [ ] Review CloudFront costs
- [ ] Set up cost alerts

### 9.2 Performance Optimization

- [ ] Tune auto-scaling policies
- [ ] Optimize database queries
- [ ] Configure CDN caching strategies
- [ ] Optimize Docker image size
- [ ] Review and optimize logs

### 9.3 Documentation

- [ ] Document architecture diagram
- [ ] Create runbook for common operations
- [ ] Document deployment procedures
- [ ] Create troubleshooting guide
- [ ] Update README with AWS deployment info

## Key Files to Create/Modify

### New Files

```
packages/blog/
├── Dockerfile
├── .dockerignore
├── docker-compose.yml
└── .github/
    └── workflows/
        ├── deploy-aws.yml
        ├── rollback.yml
        └── staging-deploy.yml
infrastructure/
├── terraform/
│   ├── main.tf
│   ├── variables.tf
│   ├── vpc.tf
│   ├── ecs.tf
│   ├── rds.tf
│   ├── alb.tf
│   └── cloudfront.tf
└── scripts/
    ├── deploy.sh
    └── migrate-db.sh
```

### Modified Files

```
packages/blog/
├── nuxt.config.ts          # AWS-specific configuration
├── server/database/        # RDS connection updates
└── package.json            # Add deployment scripts
```

## Environment Variables Mapping

### From NuxtHub to AWS

```
NUXT_HUB_* → AWS Secrets Manager
NUXT_OAUTH_GITHUB_* → AWS Secrets Manager
Database: NuxtHub DB → RDS PostgreSQL connection string
Storage: NuxtHub Storage → S3 bucket
AI: NuxtHub AI → AWS Bedrock or external API
```

## Risk Assessment & Mitigation

### High Priority Risks

1. **Downtime during migration**
   - Mitigation: Blue-green deployment, DNS gradual cutover
2. **Data loss during database migration**
   - Mitigation: Multiple backups, dry-run migrations, verification scripts

3. **Cost overruns**
   - Mitigation: Set billing alerts, use AWS cost calculator, start with small instance sizes

4. **Performance degradation**
   - Mitigation: Load testing before production, monitoring dashboards, rollback plan

### Medium Priority Risks

1. **OAuth configuration issues**
   - Mitigation: Test authentication thoroughly in staging
2. **Static asset delivery delays**
   - Mitigation: Pre-warm CloudFront cache, optimize S3 configuration

3. **Container startup time**
   - Mitigation: Optimize Docker image, configure proper health checks

## Success Criteria

- [ ] Application accessible via HTTPS on production domain
- [ ] All blog posts and content migrated successfully
- [ ] Authentication (GitHub OAuth) working
- [ ] Chat functionality operational
- [ ] Page load times < 2 seconds (p95)
- [ ] Zero data loss during migration
- [ ] Automated deployments via GitHub Actions
- [ ] Monitoring and alerts operational
- [ ] Cost within budget ($X/month)
- [ ] Auto-scaling working as expected

## Estimated Timeline

- **Total Duration**: 7 weeks
- **Part-time effort**: ~15-20 hours/week
- **Full-time effort**: ~5-6 weeks

## Budget Estimate (Monthly)

- ECS Fargate (2 tasks): ~$50-80
- RDS PostgreSQL (db.t3.small): ~$30-40
- Application Load Balancer: ~$20-25
- S3 Storage: ~$5-10
- CloudFront: ~$10-20
- Data Transfer: ~$10-20
- CloudWatch: ~$5-10
- **Total**: ~$130-205/month (varies by traffic)

## Next Steps

1. Review and approve this plan
2. Set up AWS account and IAM users
3. Choose IaC tool (Terraform recommended)
4. Create GitHub Actions workflow skeleton
5. Begin Phase 1: Infrastructure Planning

## References

- [Nuxt Deployment Docs](https://nuxt.com/docs/getting-started/deployment)
- [AWS ECS Best Practices](https://docs.aws.amazon.com/AmazonECS/latest/bestpracticesguide/intro.html)
- [GitHub Actions for AWS](https://github.com/aws-actions)
- [Docker Multi-stage Builds](https://docs.docker.com/build/building/multi-stage/)

---

**Last Updated**: October 15, 2025  
**Status**: Planning Phase  
**Owner**: [Your Name]
