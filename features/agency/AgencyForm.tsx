'use client'

// Client: shared form island for the agency's two pathways. One component,
// two field configurations — not two forms with duplicated logic.
import { useState, type FormEvent } from 'react'
import { Button } from '@/components/button/Button'
import { TextAreaField, TextField } from '@/components/field/Field'

type Kind = 'become' | 'book'

const CONFIG: Record<
  Kind,
  {
    fields: { id: string; name: string; label: string; type?: string; autoComplete?: string }[]
    notesLabel: string
    submit: string
    confirm: string
  }
> = {
  become: {
    fields: [
      { id: 'agency-name', name: 'name', label: 'Name', autoComplete: 'name' },
      { id: 'agency-email', name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
      { id: 'agency-city', name: 'city', label: 'Where you are based' },
    ],
    notesLabel: 'Anything we should know',
    submit: 'Introduce Yourself',
    confirm:
      'Thank you. The agency reviews every introduction and replies within a week, whatever the answer.',
  },
  book: {
    fields: [
      { id: 'booking-name', name: 'name', label: 'Name', autoComplete: 'name' },
      { id: 'booking-email', name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
      { id: 'booking-company', name: 'company', label: 'Company or title' },
    ],
    notesLabel: 'The work, the dates, the city',
    submit: 'Request Booking',
    confirm:
      'Thank you. A booker will write within one working day to confirm availability.',
  },
}

export function AgencyForm({ kind }: { kind: Kind }) {
  const config = CONFIG[kind]
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [sent, setSent] = useState(false)

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const next: Record<string, string> = {}
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    if (!name) next.name = 'Add your name so we know who is writing.'
    if (!email || !email.includes('@'))
      next.email = 'Add an email so we can reply.'
    setErrors(next)
    setSent(Object.keys(next).length === 0)
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-8">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-5">
        {config.fields.map((f) => (
          <TextField
            key={f.id}
            id={f.id}
            name={f.name}
            label={f.label}
            type={f.type}
            autoComplete={f.autoComplete}
            tone="dark"
            error={errors[f.name]}
          />
        ))}
      </div>
      <TextAreaField
        id={`${config.fields[0]?.id}-notes`}
        name="notes"
        label={config.notesLabel}
        tone="dark"
        rows={4}
      />
      <div className="flex flex-col gap-3">
        <Button variant="primary" type="submit" className="sm:self-start">
          {config.submit}
        </Button>
        <p aria-live="polite" className="min-h-4 text-small text-text-muted">
          {sent ? config.confirm : ''}
        </p>
      </div>
    </form>
  )
}
