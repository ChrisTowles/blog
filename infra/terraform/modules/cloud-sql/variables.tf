variable "project_id" {
  description = "GCP project ID"
  type        = string
}

variable "environment" {
  description = "Environment name (staging/prod)"
  type        = string
}

variable "region" {
  description = "GCP region"
  type        = string
  default     = "us-central1"
}

variable "database_version" {
  description = "Database version"
  type        = string
  default     = "POSTGRES_17"
}

variable "tier" {
  description = "Machine tier"
  type        = string
  default     = "db-f1-micro" # Cheapest tier, upgrade for prod
}

variable "availability_type" {
  description = "Availability type (ZONAL or REGIONAL)"
  type        = string
  default     = "ZONAL"
}

variable "disk_size" {
  description = "Disk size in GB"
  type        = number
  default     = 10
}

variable "backup_enabled" {
  description = "Enable automated backups"
  type        = bool
  default     = true
}

variable "point_in_time_recovery_enabled" {
  description = "Enable point-in-time recovery"
  type        = bool
  default     = false
}

variable "deletion_protection" {
  description = "Enable deletion protection"
  type        = bool
  default     = true
}

variable "database_name" {
  description = "Database name"
  type        = string
  default     = "blog"
}

variable "database_user" {
  description = "Database user"
  type        = string
  default     = "blog_app"
}

variable "database_password" {
  description = "Database password"
  type        = string
  sensitive   = true
}
