variable "cloudflare_api_token" {
  description = "Cloudflare API token with Zone:Read and Zone:DNS:Edit on the towles.dev zone. Supply via TF_VAR_cloudflare_api_token."
  type        = string
  sensitive   = true
}

variable "zone_name" {
  description = "DNS zone this stack manages"
  type        = string
  default     = "towles.dev"
}
