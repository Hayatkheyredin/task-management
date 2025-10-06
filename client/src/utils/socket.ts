import { io, Socket } from 'socket.io-client'
import { useEffect, useRef } from 'react'

export function useSocket(): Socket {
  const ref = useRef<Socket | null>(null)
  if (!ref.current) {
    const url = (import.meta as any).env.VITE_SOCKET_URL || 'http://localhost:5000'
    ref.current = io(url, { withCredentials: true })
  }
  useEffect(() => {
    const s = ref.current!
    return () => { s.disconnect() }
  }, [])
  return ref.current!
}


