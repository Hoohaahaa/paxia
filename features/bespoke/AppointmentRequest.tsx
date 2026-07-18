'use client'

// Client: form state + validation live here; the page around it stays server.
import { useState, type FormEvent } from 'react'
import { Button } from '@/components/button/Button'
import { SelectField, TextAreaField, TextField } from '@/components/field/Field'
import { getStores } from '@/lib/stores'

/**
 * AppointmentRequest — the Bespoke conversation opener. A printed-document
 * form (Field primitive, bone tone). Validation reassures, never blames
 * (docs/04): errors name the fix, the confirmation names the next step. No
 * backend is wired yet, so submission confirms honestly via aria-live instead
 * of pretending to send.
 */
export function AppointmentRequest() {
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({})
  const [sent, setSent] = useState(false)

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()

    const next: typeof errors = {}
    if (!name) next.name = 'Add your name so we know who to expect.'
    if (!email || !email.includes('@'))
      next.email = 'Add an email so we can confirm the appointment.'
    setErrors(next)
    setSent(Object.keys(next).length === 0)
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-8">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-5">
        <TextField
          id="bespoke-name"
          name="name"
          label="Name"
          autoComplete="name"
          error={errors.name}
        />
        <TextField
          id="bespoke-email"
          name="email"
          type="email"
          label="Email"
          autoComplete="email"
          error={errors.email}
        />
      </div>

      <SelectField id="bespoke-city" name="city" label="Preferred atelier">
        {getStores().map((store) => (
          <option key={store.slug} value={store.slug}>
            {store.city}
          </option>
        ))}
      </SelectField>

      <TextAreaField
        id="bespoke-notes"
        name="notes"
        label="What are we making"
        rows={4}
      />

      <div className="flex flex-col gap-3">
        <Button tone="bone" variant="primary" type="submit" className="sm:self-start">
          Request Bespoke
        </Button>
        <p aria-live="polite" className="min-h-4 text-small text-text-bone-muted">
          {sent
            ? 'Thank you. The atelier will write within two working days to set a time.'
            : ''}
        </p>
      </div>
    </form>
  )
}
