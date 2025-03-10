import { redirect } from 'next/navigation'

export default function Home() {
  // Redirect to chat page
  redirect('/chat')
}
