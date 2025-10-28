# Infrastructure

CloudFormation templates for AWS resources.

## Aurora DSQL

### Prerequisites

- AWS CLI configured
- SAM CLI installed (`pip install aws-sam-cli`)

### Deploy

Standard deployment:

```bash
./deploy.sh
```

Guided deployment (interactive):

```bash
./deploy.sh --guided
```

Custom environment:

```bash
ENVIRONMENT=staging CLUSTER_NAME=blog-staging-dsql ./deploy.sh
```

### Manage

View stack outputs:

```bash
./deploy.sh --status
```

Delete stack:

```bash
./deploy.sh --delete
```
