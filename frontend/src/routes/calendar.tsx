import Calendar from '@/app/calendar/Calendar'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/calendar')({
  component: () => <Calendar/>
})