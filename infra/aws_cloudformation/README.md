# AWS Infrastructure for Bedrock RAG

AWS resources for RAG (embeddings + reranking) via AWS Bedrock.

## Resources Created

### IAM Policy

- **Name**: `BedrockRAGPolicy`
- **ARN**: `arn:aws:iam::223452314076:policy/BedrockRAGPolicy`
- **Permissions**: `bedrock:InvokeModel` on Titan Embeddings v2 and Cohere Rerank v3

### IAM Users

| Environment | User Name              | Purpose                                 |
| ----------- | ---------------------- | --------------------------------------- |
| Staging     | `blog-staging-bedrock` | Bedrock access for staging Cloud Run    |
| Production  | `blog-prod-bedrock`    | Bedrock access for production Cloud Run |

## IAM Policy Document

`bedrock-iam.yaml`

## Credential Storage

AWS credentials are stored in **GCP Secret Manager** (not AWS Secrets Manager) for use by Cloud Run:

| GCP Secret              | AWS Credential        |
| ----------------------- | --------------------- |
| `aws-access-key-id`     | AWS Access Key ID     |
| `aws-secret-access-key` | AWS Secret Access Key |

Each GCP project (staging/production) has its own secrets with environment-specific credentials.

## Management Commands

### Rotate credentials

```bash
# Delete old key
aws iam delete-access-key \
  --user-name blog-staging-bedrock \
  --access-key-id AKIAXXXXXXXX \
  --profile AdministratorAccess-223452314076

# Create new key
aws iam create-access-key \
  --user-name blog-staging-bedrock \
  --profile AdministratorAccess-223452314076

# Update GCP secret
echo -n "NEW_ACCESS_KEY" | gcloud secrets versions add aws-access-key-id \
  --data-file=- --project=blog-towles-staging
echo -n "NEW_SECRET_KEY" | gcloud secrets versions add aws-secret-access-key \
  --data-file=- --project=blog-towles-staging
```

### List access keys

```bash
aws iam list-access-keys \
  --user-name blog-staging-bedrock \
  --profile AdministratorAccess-223452314076
```

### Delete user (teardown)

```bash
# Delete access keys first
aws iam list-access-keys --user-name blog-staging-bedrock --profile AdministratorAccess-223452314076
aws iam delete-access-key --user-name blog-staging-bedrock --access-key-id AKIAXXXX --profile AdministratorAccess-223452314076

# Detach policy
aws iam detach-user-policy \
  --user-name blog-staging-bedrock \
  --policy-arn arn:aws:iam::223452314076:policy/BedrockRAGPolicy \
  --profile AdministratorAccess-223452314076

# Delete user
aws iam delete-user --user-name blog-staging-bedrock --profile AdministratorAccess-223452314076
```

## Related

- GCP Terraform: `infra/terraform/` - references these credentials via GCP Secret Manager
- Bedrock code: `packages/blog/server/utils/ai/bedrock.ts`
