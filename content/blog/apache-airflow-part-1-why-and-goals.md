---
title: Apache Airflow Part 1 - Why and Goals for a near Serverless ELT
description: "Reasons I want to use Airflow for a Proof of Concept near Serverless ELT"
date: 2024-07-10
image:
  src: /images/blog/airflow-part-1-blog-image.png
  alt: "A laptop with a data analytics"
authors:
  - name: Chris Towles
    to: https://twitter.com/Chris_Towles
    avatar:
      src: /images/ctowles-profile-512x512.png

badge:
  label: airflow
---

At work, at [GE Aerospace](https://www.geaerospace.com/), I work around supporting data ingestions into a Datalake. I'm not going to go into the details here, but I would love to use Airflow instead of the current stack we have today.

I've done a few proofs of concept work with Airflow in the past. It is solid solution and with the hype of AI these days, quick and reliable data ingestion has never been more critical.

## Why Apache Airflow?

![Apache Airflow](/images/blog/airflow-logo.png)

- It's open source
- Hugely popular and used by many companies.
  - Features and interpretations are available with nearly everything

## Why not other solutions?

Over the last few years ever provider seems to be reducing their on-premises options to only their hosted solution.

  - [Talend](https://www.talend.com/products/talend-open-studio/) and other features are already being deprecated
  - [Fivetran](https://fivetran.com) moving to their own cloud based solution.
  - [Databricks](https://docs.databricks.com/en/resources/supported-regions.html) not in us-gov-east-1 as of (2024-07-10)
  - [Perfect](https://docs.prefect.io/latest/guides/host/) lots of cloud only features, like audit logs, Workspaces, and Automations
  - [Dagster](https://github.com/dagster-io/dagster/issues/2219) - Dagit lacks any authentication when self hosted.


And I get why, for small to be midsize companies, it's easier to just deploy a cloud based solution. But when you have a really large and/or regulation heavy environment it's both more important to be able to self-host and manage your own data. No shipping it off to a third party and trust them with your data.


## My goals

I am however going to put a few constraints in place around how I want to use Airflow.

- Can't use [AWS MWAA](https://aws.amazon.com/mwaa/) (it's not offered in AWS US Gov East)
- Local Development
  - Changes to a job must be able to be tested locally before being pushed
- CICD Pipeline
  - Changes to a job must be able to be deployed to production via a CI/CD pipeline.
- Job Management
  - Offer Web UI to view and retrigger jobs
  - prefer Code first and config rather UI based.
  - Time to modify a job should be less than 5 minutes.
  - Time to create a job should be less than 30 minutes.
- Cost
  - I'd like as close to zero cost as possible, ideally spinning down to near no resource usage when no jobs running.
- Maintenance 
  - Would like to be able to deploy new versions of the Airflow container on ECS.
    - This isn't a hard requirement could use an EC2 instance and updated in place but that another box to maintain long term.
      - If instead it was just ECS pointing at an RDS database, you could restore the DB from snapshot and test a deployment before release to production.

## Repo

Just started with a repo at: https://github.com/ChrisTowles/airflow-playground

I don't usually post Proof of Concepts's like this publicly but i'm doing it on my own time so lets see how this goes and see where it takes me.

