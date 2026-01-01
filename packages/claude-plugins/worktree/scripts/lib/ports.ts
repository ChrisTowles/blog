import { createConnection } from 'node:net'

export function checkPort(port: number, host: string = '127.0.0.1'): Promise<boolean> {
    return new Promise((resolve) => {
        const socket = createConnection({ port, host })

        socket.once('connect', () => {
            socket.destroy()
            resolve(true) // Port is in use
        })

        socket.once('error', () => {
            socket.destroy()
            resolve(false) // Port is free
        })

        socket.setTimeout(1000, () => {
            socket.destroy()
            resolve(false) // Timeout = port likely free
        })
    })
}

export async function checkPorts(ports: number[]): Promise<Map<number, boolean>> {
    const results = new Map<number, boolean>()
    await Promise.all(
        ports.map(async (port) => {
            const inUse = await checkPort(port)
            results.set(port, inUse)
        })
    )
    return results
}

export function extractPortsFromSlot(slotConfig: Record<string, string | number>): number[] {
    const ports: number[] = []
    for (const [key, value] of Object.entries(slotConfig)) {
        if (key.toLowerCase().includes('port') && typeof value === 'number') {
            ports.push(value)
        }
    }
    return ports
}
