output "zone_id" {
  description = "Zone id for towles.dev"
  value       = data.cloudflare_zone.towles.zone_id
}

output "name_servers" {
  description = "Authoritative name servers for the zone"
  value       = data.cloudflare_zone.towles.name_servers
}
