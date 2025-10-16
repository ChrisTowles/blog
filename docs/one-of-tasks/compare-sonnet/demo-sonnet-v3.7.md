
# Project Plan: Nuxt App Deployment to AWS ECS via GitHub Actions

## Executive Summary
This project plan outlines the migration of our Nuxt 3 blog application from Cloudflare Workers to AWS ECS, utilizing GitHub Actions for CI/CD. The plan focuses on maintaining functionality while leveraging AWS's ecosystem for improved scalability and management capabilities.

## Project Scope & Objectives

### Primary Objectives
1. Migrate the Nuxt 3 blog application to AWS ECS
2. Establish reliable CI/CD using GitHub Actions
3. Replace NuxtHub database with AWS RDS
4. Configure CDN and static assets on AWS
5. Maintain feature parity with current implementation

### Success Criteria
- Zero data loss during migration
- Identical or improved performance metrics
- Fully automated deployment pipeline
- Comprehensive monitoring and alerting
- Documentation for maintenance and troubleshooting

## Implementation Timeline: 6 Weeks

## Phase 1: Planning & Infrastructure Setup (Week 1)

### AWS Account & IAM Configuration
- [ ] Create dedicated AWS account or organize within existing account
- [ ] Set up IAM roles and policies following principle of least privilege
- [ ] Create service-linked roles for ECS, ECR, and CloudFormation
- [ ] Configure programmatic access for GitHub Actions

### Network Infrastructure
- [ ] Design VPC architecture with public and private subnets
- [ ] Set up security groups and NACLs
- [ ] Configure Internet and NAT gateways
- [ ] Set up Route 53 for DNS management

```terraform
# Example VPC Configuration
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true
  
  tags = {
    Name = "blog-vpc"
  }
}
```

### Infrastructure as Code Setup
- [ ] Initialize Terraform project structure
- [ ] Create base modules for networking, ECS, RDS
- [ ] Set up remote state with S3 and DynamoDB
- [ ] Configure Terraform Cloud or GitHub Actions for IaC deployment

## Phase 2: Containerization & Registry Setup (Week 2)

### Docker Configuration
- [ ] Create multi-stage Dockerfile for the Nuxt application
- [ ] Optimize image size and security
- [ ] Set up .dockerignore to exclude unnecessary files
- [ ] Test build locally to ensure proper functioning

```dockerfile
# Example Dockerfile for Nuxt 3
FROM node:20-alpine AS builder

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

FROM node:20-alpine AS runner
WORKDIR /app

COPY --from=builder /app/.output ./.output
COPY --from=builder /app/node_modules ./node_modules

ENV HOST=0.0.0.0
ENV PORT=3000
EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
```

### ECR Setup
- [ ] Create ECR repository for the blog application
- [ ] Set up lifecycle policies
- [ ] Configure image scanning for vulnerabilities
- [ ] Test image push and pull

## Phase 3: Database Migration Planning (Week 2)

### Database Architecture
- [ ] Choose appropriate RDS instance type (PostgreSQL)
- [ ] Design database subnet group and security
- [ ] Configure encryption, backups, and multi-AZ if needed
- [ ] Set up parameter groups for optimal performance

### Data Migration Strategy
- [ ] Export schema from NuxtHub database
- [ ] Adapt Drizzle ORM schema for AWS RDS
- [ ] Develop and test migration scripts
- [ ] Plan for zero-downtime data migration

```typescript
// Example database migration script
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../server/database/schema';

async function migrateData() {
  const sourceClient = postgres(process.env.SOURCE_DB_URL);
  const targetClient = postgres(process.env.TARGET_DB_URL);
  
  const sourceDb = drizzle(sourceClient, { schema });
  const targetDb = drizzle(targetClient, { schema });
  
  // Migration logic
  // ...
}
```

## Phase 4: ECS Cluster & Task Definition Setup (Week 3)

### ECS Cluster Configuration
- [ ] Create ECS cluster (Fargate for serverless operation)
- [ ] Configure capacity providers
- [ ] Set up CloudWatch log groups
- [ ] Configure cluster auto-scaling

### Task & Service Definition
- [ ] Create task definition for the Nuxt application
- [ ] Configure appropriate CPU and memory allocations
- [ ] Set up environment variables and secrets
- [ ] Configure container health checks and restart policies

```yaml
# Example Task Definition
{
  "family": "blog-task",
  "networkMode": "awsvpc",
  "executionRoleArn": "arn:aws:iam::account:role/ecsTaskExecutionRole",
  "taskRoleArn": "arn:aws:iam::account:role/blogAppRole",
  "containerDefinitions": [
    {
      "name": "blog-container",
      "image": "account.dkr.ecr.region.amazonaws.com/blog:latest",
      "essential": true,
      "portMappings": [
        {
          "containerPort": 3000,
          "hostPort": 3000,
          "protocol": "tcp"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/blog-app",
          "awslogs-region": "region",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ],
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "512",
  "memory": "1024"
}
```

### Load Balancer Configuration
- [ ] Set up Application Load Balancer
- [ ] Configure target groups and health checks
- [ ] Set up SSL certificates via ACM
- [ ] Configure security groups for the ALB

## Phase 5: GitHub Actions CI/CD Pipeline (Week 4)

### GitHub Actions Workflows
- [ ] Create workflow for building and testing
- [ ] Implement deployment workflow for staging
- [ ] Create production deployment workflow
- [ ] Set up environment secrets in GitHub

```yaml
# Example GitHub Actions Workflow
name: Deploy to AWS ECS

on:
  push:
    branches:
      - main
  workflow_dispatch:

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - name: Setup PNPM
        uses: pnpm/action-setup@v2
        with:
          version: 8
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
        
      - name: Lint
        run: pnpm lint
        
      - name: Type check
        run: pnpm typecheck
        
      - name: Run tests
        run: pnpm test
        
  deploy:
    needs: build-and-test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ secrets.AWS_REGION }}
      
      - name: Login to Amazon ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v1
      
      - name: Build, tag, and push image to Amazon ECR
        id: build-image
        env:
          ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
          ECR_REPOSITORY: blog
          IMAGE_TAG: ${{ github.sha }}
        run: |
          docker build -t $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG -t $ECR_REGISTRY/$ECR_REPOSITORY:latest .
          docker push $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG
          docker push $ECR_REGISTRY/$ECR_REPOSITORY:latest
          echo "image=$ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG" >> $GITHUB_OUTPUT
      
      - name: Fill in the new image ID in the Amazon ECS task definition
        id: task-def
        uses: aws-actions/amazon-ecs-render-task-definition@v1
        with:
          task-definition: .aws/task-definition.json
          container-name: blog-container
          image: ${{ steps.build-image.outputs.image }}
      
      - name: Deploy Amazon ECS task definition
        uses: aws-actions/amazon-ecs-deploy-task-definition@v1
        with:
          task-definition: ${{ steps.task-def.outputs.task-definition }}
          service: blog-service
          cluster: blog-cluster
          wait-for-service-stability: true
```

### Environment Variables & Secrets
- [ ] Migrate NuxtHub environment variables to AWS Secrets Manager
- [ ] Configure GitHub OAuth credentials
- [ ] Set up database connection strings
- [ ] Configure AWS access keys for GitHub Actions

## Phase 6: CDN, S3 & Static Asset Configuration (Week 5)

### S3 Bucket Setup
- [ ] Create S3 bucket for static assets
- [ ] Configure bucket policies and CORS settings
- [ ] Set up lifecycle policies
- [ ] Configure server-side encryption

### CloudFront Configuration
- [ ] Create CloudFront distribution
- [ ] Configure origins for S3 and ALB
- [ ] Set up cache behaviors
- [ ] Configure SSL and custom domain

### Nuxt Application Updates
- [ ] Update static asset URLs for CloudFront
- [ ] Configure S3 client for uploads
- [ ] Test static asset delivery
- [ ] Optimize for CloudFront caching

```typescript
// Example nuxt.config.ts updates
export default defineNuxtConfig({
  app: {
    baseURL: '/',
    // Configure CDN URLs for static assets
    cdnURL: process.env.NODE_ENV === 'production' 
      ? 'https://dxxxxxxxxxxxxx.cloudfront.net'
      : '',
  },
  // Other configurations...
})
```

## Phase 7: Testing, Monitoring & Deployment (Week 6)

### Monitoring Setup
- [ ] Configure CloudWatch dashboards
- [ ] Set up CloudWatch alarms
- [ ] Configure X-Ray for distributed tracing
- [ ] Set up SNS topics for alerting

### Final Testing
- [ ] Perform load testing
- [ ] Test auto-scaling capabilities
- [ ] Verify monitoring and alerting
- [ ] Conduct security review

### Production Deployment
- [ ] Perform final data migration
- [ ] Deploy to production ECS service
- [ ] Configure Route 53 for domain cutover
- [ ] Monitor initial production traffic
- [ ] Verify all functionality works as expected

## Resource Requirements

### AWS Services
- ECS (Fargate)
- ECR
- RDS PostgreSQL
- Application Load Balancer
- S3
- CloudFront
- Route 53
- CloudWatch
- Secrets Manager

### Team Resources
- DevOps Engineer: 50% time commitment
- Backend Developer: 30% time commitment
- Frontend Developer: 20% time commitment
- QA Engineer: As needed for testing

### Estimated Monthly Costs
- ECS Fargate: $50-80/month
- RDS (db.t3.small): $30-40/month
- ALB: $20/month
- CloudFront + S3: $15-25/month
- Other services: $15-25/month
- **Total estimate**: $130-190/month

## Risk Assessment & Mitigation

### Identified Risks

1. **Data migration issues**
   - Risk Level: High
   - Mitigation: Perform multiple test migrations, create verification scripts, maintain source database until migration is validated

2. **CI/CD pipeline failures**
   - Risk Level: Medium
   - Mitigation: Implement thorough testing in the pipeline, create manual deployment procedures as backup

3. **Performance degradation**
   - Risk Level: Medium
   - Mitigation: Load testing, performance monitoring, ability to scale resources quickly

4. **Cost overruns**
   - Risk Level: Low
   - Mitigation: Set up AWS budgets and alerts, regular cost review

5. **Dependency on GitHub availability**
   - Risk Level: Low
   - Mitigation: Document manual deployment procedures

## Documentation & Knowledge Transfer

### Required Documentation
- [ ] AWS architecture diagram
- [ ] Deployment workflow documentation
- [ ] Database migration procedures
- [ ] Rollback procedures
- [ ] Monitoring and alerting guide
- [ ] Cost optimization recommendations

### Knowledge Transfer Sessions
- [ ] AWS infrastructure overview
- [ ] CI/CD pipeline walkthrough
- [ ] Monitoring and troubleshooting
- [ ] Deployment and rollback procedures

## Post-Deployment Activities

### Performance Optimization
- [ ] Review and optimize ECS task configurations
- [ ] Analyze and tune database performance
- [ ] Optimize CloudFront caching

### Security Review
- [ ] Conduct security assessment
- [ ] Review IAM permissions
- [ ] Implement any needed security improvements

### Cost Optimization
- [ ] Review actual usage vs. provisioned resources
- [ ] Identify opportunities for cost savings
- [ ] Implement reserved instances if appropriate

## Appendix: Key File Changes

### New Files to Create
```
.github/workflows/
  ├── ci.yml                  # Testing and building
  ├── deploy-staging.yml      # Staging deployment
  └── deploy-production.yml   # Production deployment
  
.aws/
  ├── task-definition.json    # ECS task definition
  └── appspec.yaml            # AWS CodeDeploy configuration
  
terraform/
  ├── main.tf                 # Main Terraform configuration
  ├── variables.tf            # Variables definition
  ├── outputs.tf              # Outputs definition
  ├── network.tf              # VPC and networking
  ├── ecs.tf                  # ECS cluster and service
  ├── rds.tf                  # Database configuration
  └── cdn.tf                  # CloudFront and S3
  
scripts/
  ├── migrate-db.js           # Database migration script
  └── deploy-helpers.sh       # Helper scripts for deployment
```

### Files to Modify
```
packages/blog/
  ├── nuxt.config.ts          # Update for AWS configuration
  ├── server/database/        # Update database connection
  └── app.config.ts           # Update app configuration
```

## Conclusion

This project plan provides a structured approach to migrating the Nuxt 3 blog application from Cloudflare Workers to AWS ECS using GitHub Actions for CI/CD. By following this plan, we'll achieve a scalable, maintainable deployment with automated processes, comprehensive monitoring, and documentation to support future development.