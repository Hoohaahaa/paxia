'use client'

// Client: the one form island. Every PAXIA inquiry form (bespoke, agency,
// contact) is this component with a serializable config — validation and the
// honest aria-live confirmation live here once, not per feature.
import { useState, type FormEvent } from 'react'
import { Button } from '@/components/button/Button'
import { SelectField, TextAreaField, TextField } from '@/components/field/Field'

export type InquiryFieldSpec = {
  kind: 'text' | 'email' | 'textarea' | 'select'
  id: string
  name: string
  label: string
  autoComplete?: string
  rows?: number
  options?: { value: string; label: string }[]
  /** When set, submitting without a (valid) value shows this message. */
  requiredMessage?: string
}

export interface InquiryFormProps {
  fields: InquiryFieldSpec[]
  submitLabel: string
  /** Shown via aria-live after a valid submit. Promise only what is true. */
  confirmMessage: string
  tone?: 'dark' | 'bone'
}

export function InquiryForm({
  fields,
  submitLabel,
  confirmMessage,
  tone = 'dark',
}: InquiryFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [sent, setSent] = useState(false)

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const next: Record<string, string> = {}
    for (const field of fields) {
      if (!field.requiredMessage) continue
      const value = String(data.get(field.name) ?? '').trim()
      const invalid =
        !value || (field.kind === 'email' && !value.includes('@'))
      if (invalid) next[field.name] = field.requiredMessage
    }
    setErrors(next)
    setSent(Object.keys(next).length === 0)
  }

  const half = fields.filter((f) => f.kind === 'text' || f.kind === 'email')
  const full = fields.filter((f) => f.kind === 'select' || f.kind === 'textarea')

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-8">
      {half.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-5">
          {half.map((f) => (
            <TextField
              key={f.id}
              id={f.id}
              name={f.name}
              type={f.kind === 'email' ? 'email' : 'text'}
              label={f.label}
              autoComplete={f.autoComplete}
              tone={tone}
              error={errors[f.name]}
            />
          ))}
        </div>
      ) : null}

      {full.map((f) =>
        f.kind === 'select' ? (
          <SelectField key={f.id} id={f.id} name={f.name} label={f.label} tone={tone}>
            {(f.options ?? []).map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </SelectField>
        ) : (
          <TextAreaField
            key={f.id}
            id={f.id}
            name={f.name}
            label={f.label}
            tone={tone}
            rows={f.rows ?? 4}
            error={errors[f.name]}
          />
        ),
      )}

      <div className="flex flex-col gap-3">
        <Button tone={tone} variant="primary" type="submit" className="sm:self-start">
          {submitLabel}
        </Button>
        <p
          aria-live="polite"
          className={`min-h-4 text-small ${tone === 'bone' ? 'text-text-bone-muted' : 'text-text-muted'}`}
        >
          {sent ? confirmMessage : ''}
        </p>
      </div>
    </form>
  )
}
