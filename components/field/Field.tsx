import type {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react'

/**
 * Field — forms are conversations; they resemble a printed document, not
 * software (docs/04_COMPONENTS.md). Transparent ground, bottom hairline only,
 * --r-none, real <label> above in nano uppercase (placeholder is never a
 * label), 44px min. Focus draws the rule to patina — light landing on a
 * surface, not a box. Error turns the rule --err and explains below, never
 * red-fills the field.
 *
 * Debuts on Bespoke (bone), so tone defaults are authored for both worlds.
 */
type Tone = 'dark' | 'bone'

const LABEL: Record<Tone, string> = {
  dark: 'text-text-metadata',
  bone: 'text-text-bone-muted',
}

const CONTROL: Record<Tone, string> = {
  dark: 'border-line-hairline text-text-primary placeholder:text-text-muted',
  bone: 'border-line-bone text-text-bone placeholder:text-text-bone-muted',
}

const BASE_CONTROL =
  'w-full rounded-none border-0 border-b bg-transparent px-0 py-3 text-base outline-none transition-colors duration-fast ease-out focus-visible:border-accent'

type CommonProps = {
  label: string
  tone?: Tone
  error?: string
  /** id is required so the label/control pairing is real, never implicit. */
  id: string
}

function Shell({
  label,
  tone = 'bone',
  error,
  id,
  children,
}: CommonProps & { children: React.ReactNode }) {
  return (
    <div className="flex min-h-tap flex-col">
      <label
        htmlFor={id}
        className={`font-mono text-nano uppercase tabular-nums ${LABEL[tone]}`}
      >
        {label}
      </label>
      {children}
      {error ? (
        <p
          id={`${id}-error`}
          aria-live="polite"
          className="mt-2 text-small text-err"
        >
          {error}
        </p>
      ) : null}
    </div>
  )
}

export function TextField({
  label,
  tone = 'bone',
  error,
  id,
  className = '',
  ...props
}: CommonProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Shell label={label} tone={tone} error={error} id={id}>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${BASE_CONTROL} ${error ? 'border-err' : CONTROL[tone]} ${className}`}
        {...props}
      />
    </Shell>
  )
}

export function TextAreaField({
  label,
  tone = 'bone',
  error,
  id,
  className = '',
  ...props
}: CommonProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <Shell label={label} tone={tone} error={error} id={id}>
      <textarea
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${BASE_CONTROL} resize-y ${error ? 'border-err' : CONTROL[tone]} ${className}`}
        {...props}
      />
    </Shell>
  )
}

export function SelectField({
  label,
  tone = 'bone',
  error,
  id,
  className = '',
  children,
  ...props
}: CommonProps & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <Shell label={label} tone={tone} error={error} id={id}>
      <select
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${BASE_CONTROL} appearance-none ${error ? 'border-err' : CONTROL[tone]} ${className}`}
        {...props}
      >
        {children}
      </select>
    </Shell>
  )
}
