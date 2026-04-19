variable "project_id" {
  description = "GCP project ID"
  type        = string
}

variable "region" {
  description = "GCP region"
  type        = string
  default     = "us-central1"
}

variable "container_image" {
  description = "Container image URL"
  type        = string
}

variable "service_account_email" {
  description = "Service account email for Cloud Run"
  type        = string
}

variable "database_connection_secret_id" {
  description = "Secret Manager secret ID for database connection"
  type        = string
  default     = ""
}

variable "site_url" {
  description = "Public URL for the site"
  type        = string
}

variable "cpu_limit" {
  description = "CPU limit"
  type        = string
  default     = "1"
}

variable "memory_limit" {
  description = "Memory limit. Bumped to 2Gi for MCP aviation demo (DuckDB in-process aggregation can spike on the 15M-row fact table; plan Key Decisions line 122)."
  type        = string
  default     = "2Gi"
}

variable "request_timeout" {
  description = "Cloud Run request timeout (seconds). 300s for MCP aviation ask_aviation LLM→DuckDB flow (plan Key Decisions line 123)."
  type        = string
  default     = "300s"
}

variable "session_affinity" {
  description = "Route same-client requests to same instance. Reduces Mcp-Session-Id-across-instances risk (plan Key Decisions line 124)."
  type        = bool
  default     = true
}

variable "mcp_data_bucket" {
  description = "GCS bucket for MCP tool datasets (aviation Parquet and any future tools). Injected as MCP_DATA_BUCKET env var."
  type        = string
  default     = ""
}

variable "mcp_rate_limit_rpm" {
  description = "Per-IP rate limit for /mcp/* paths (requests per 5-minute window). Injected as MCP_RATE_LIMIT_RPM."
  type        = number
  default     = 60
}

variable "mcp_sandbox_url" {
  description = "Public MCP host URL used by UI iframes. Injected as NUXT_PUBLIC_MCP_SANDBOX_URL."
  type        = string
  default     = ""
}

variable "aviation_duckdb_memory_limit" {
  description = "DuckDB memory_limit pragma for the aviation tool. Injected as AVIATION_DUCKDB_MEMORY_LIMIT."
  type        = string
  default     = "768MB"
}

variable "aviation_duckdb_threads" {
  description = "DuckDB threads pragma for the aviation tool. Injected as AVIATION_DUCKDB_THREADS."
  type        = string
  default     = "4"
}

variable "min_instances" {
  description = "Minimum number of instances"
  type        = number
  default     = 0
}

variable "max_instances" {
  description = "Maximum number of instances"
  type        = number
  default     = 10
}

variable "allow_public_access" {
  description = "Allow public access to Cloud Run service"
  type        = bool
  default     = true
}

variable "additional_env_vars" {
  description = "Additional environment variables"
  type        = map(string)
  default     = {}
}

variable "anthropic_api_key_secret_id" {
  description = "Secret Manager secret ID for Anthropic API key"
  type        = string
  default     = ""
}

variable "session_password_secret_id" {
  description = "Secret Manager secret ID for Nuxt session password"
  type        = string
  default     = ""
}

variable "cloud_sql_connection_name" {
  description = "Cloud SQL instance connection name (project:region:instance)"
  type        = string
}

variable "aws_access_key_id_secret_id" {
  description = "Secret Manager secret ID for AWS access key ID"
  type        = string
}

variable "aws_secret_access_key_secret_id" {
  description = "Secret Manager secret ID for AWS secret access key"
  type        = string
}

variable "github_oauth_client_id_secret_id" {
  description = "Secret Manager secret ID for GitHub OAuth client ID"
  type        = string
}

variable "github_oauth_client_secret_secret_id" {
  description = "Secret Manager secret ID for GitHub OAuth client secret"
  type        = string
}

variable "google_oauth_client_id_secret_id" {
  description = "Secret Manager secret ID for Google OAuth client ID"
  type        = string
}

variable "google_oauth_client_secret_secret_id" {
  description = "Secret Manager secret ID for Google OAuth client secret"
  type        = string
}

variable "braintrust_api_key_secret_id" {
  description = "Secret Manager secret ID for Braintrust API key"
  type        = string
}

variable "nuxt_og_image_secret_secret_id" {
  description = "Secret Manager secret ID for Nuxt OG image signing secret"
  type        = string
}

variable "gcs_hmac_key_id_secret_id" {
  description = "Secret Manager secret ID for GCS HMAC access key ID (MCP data bucket)"
  type        = string
  default     = ""
}

variable "gcs_hmac_secret_secret_id" {
  description = "Secret Manager secret ID for GCS HMAC secret (MCP data bucket)"
  type        = string
  default     = ""
}

variable "braintrust_project_name" {
  description = "Braintrust project name"
  type        = string
}

variable "gcs_bucket_name" {
  description = "GCS media bucket name"
  type        = string
  default     = ""
}
