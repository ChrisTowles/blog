"""Port availability checking."""
from __future__ import annotations

import socket
from typing import Any


def check_port(port: int, host: str = "127.0.0.1", timeout: float = 1.0) -> bool:
    """Check if port is in use. Returns True if in use."""
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.settimeout(timeout)
    try:
        sock.connect((host, port))
        sock.close()
        return True  # Connection succeeded = port in use
    except (socket.timeout, ConnectionRefusedError, OSError):
        return False  # Port is free


def check_ports(ports: list[int]) -> dict[int, bool]:
    """Check multiple ports. Returns dict of port -> in_use."""
    return {port: check_port(port) for port in ports}


def extract_ports_from_slot(slot_config: Any) -> list[int]:
    """Extract port values from slot config."""
    ports = []
    for key, value in slot_config.items():
        if "port" in key.lower() and isinstance(value, int):
            ports.append(value)
    return ports
