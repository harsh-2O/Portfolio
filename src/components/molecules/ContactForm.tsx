import { useCallback, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from '../../lib/motion';
import { iconSwap, transitions } from '../../motion/variants';
import { CONTACT } from '../../config/site';
import { media } from '../../styles/mixins';

/*
 * TODO_CONTENT: there is no form backend in this project. Submitting composes a
 * mailto: message to CONTACT.email. Swap `submit` for a POST to a real endpoint
 * (Formspree, Resend, a Vercel function) when one exists.
 */

type Status = 'idle' | 'sent';
type Field = 'name' | 'email' | 'message';
type Errors = Partial<Record<Field, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.75rem 1.5rem;
  width: 100%;

  ${media.md} {
    grid-template-columns: minmax(0, 1fr);
    gap: 1.5rem;
  }
`;

const FieldWrap = styled.div<{ $full?: boolean }>`
  position: relative;
  grid-column: ${({ $full }) => ($full ? '1 / -1' : 'auto')};
  min-width: 0;
`;

const sharedInput = `
  width: 100%;
  border: none;
  border-bottom: 1px solid var(--border-strong);
  background: transparent;
  padding: 1.4rem 0 0.6rem;
  font-family: var(--font-primary);
  font-size: 1rem;
  color: var(--text-primary);
  outline: none;

  &::placeholder {
    color: transparent;
  }
`;

const Input = styled.input`
  ${sharedInput}
`;

const Textarea = styled.textarea`
  ${sharedInput}
  resize: vertical;
  min-height: 7rem;
  line-height: 1.6;
`;

/* Floats on focus or when the control holds a value. */
const FloatLabel = styled.label`
  position: absolute;
  left: 0;
  top: 1.4rem;
  font-size: 1rem;
  color: var(--text-muted);
  pointer-events: none;
  transform-origin: 0 0;
  transition: transform var(--transition-fast), color var(--transition-fast);

  input:focus ~ &,
  input:not(:placeholder-shown) ~ &,
  textarea:focus ~ &,
  textarea:not(:placeholder-shown) ~ & {
    transform: translateY(-1.35rem) scale(0.72);
    color: var(--text-faint);
  }
`;

const Underline = styled.span`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: 0 50%;
  transition: transform var(--dur-base) var(--ease-out);

  input:focus ~ &,
  textarea:focus ~ & {
    transform: scaleX(1);
  }
`;

const Error = styled(motion.p)`
  margin-top: 0.4rem;
  font-family: var(--font-mono);
  font-size: 0.66rem;
  letter-spacing: 0.04em;
  color: var(--accent-text);
`;

const Actions = styled.div`
  grid-column: 1 / -1;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
`;

const Submit = styled(motion.button)<{ $sent: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  height: 48px;
  padding: 0 ${({ $sent }) => ($sent ? '1.2rem' : '1.6rem')};
  border-radius: var(--radius-pill);
  background: ${({ $sent }) => ($sent ? 'var(--accent)' : 'var(--ink)')};
  color: ${({ $sent }) => ($sent ? 'var(--text-on-accent)' : 'var(--ink-text)')};
  border: 1px solid ${({ $sent }) => ($sent ? 'var(--accent)' : 'var(--ink)')};
  font-size: 0.95rem;
  font-weight: 500;
  transition: background-color var(--transition), border-color var(--transition), color var(--transition);

  svg {
    width: 15px;
    height: 15px;
    stroke: currentColor;
    stroke-width: 2;
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
`;

const Aside = styled.p`
  font-family: var(--font-mono);
  font-size: 0.66rem;
  letter-spacing: 0.04em;
  color: var(--text-faint);
`;

function validate(values: Record<Field, string>): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = 'Required';
  if (!values.email.trim()) errors.email = 'Required';
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = 'Enter a valid email address';
  if (values.message.trim().length < 10) errors.message = 'A little more detail, please';
  return errors;
}

export default function ContactForm() {
  const [values, setValues] = useState<Record<Field, string>>({ name: '', email: '', message: '' });
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState<Status>('idle');

  // Errors are always derived from the current values, so fixing a field clears
  // its message immediately rather than waiting for another blur.
  const errors = useMemo(() => validate(values), [values]);

  const set = useCallback((field: Field, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setStatus('idle');
  }, []);

  const blur = useCallback((field: Field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }, []);

  const submit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setTouched({ name: true, email: true, message: true });
      if (Object.keys(validate(values)).length > 0) return;

      const subject = encodeURIComponent(`Portfolio enquiry from ${values.name.trim()}`);
      const body = encodeURIComponent(`${values.message.trim()}\n\n— ${values.name.trim()} (${values.email.trim()})`);
      window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
      setStatus('sent');
    },
    [values],
  );

  const fieldError = (field: Field) => (touched[field] ? errors[field] : undefined);

  return (
    <Form onSubmit={submit} noValidate>
      {(['name', 'email'] as const).map((field) => (
        <FieldWrap key={field}>
          <Input
            id={`contact-${field}`}
            name={field}
            type={field === 'email' ? 'email' : 'text'}
            autoComplete={field === 'email' ? 'email' : 'name'}
            placeholder=" "
            value={values[field]}
            onChange={(e) => set(field, e.target.value)}
            onBlur={() => blur(field)}
            aria-invalid={Boolean(fieldError(field))}
            aria-describedby={fieldError(field) ? `contact-${field}-error` : undefined}
          />
          <FloatLabel htmlFor={`contact-${field}`}>{field === 'name' ? 'Your name' : 'Email'}</FloatLabel>
          <Underline aria-hidden="true" />
          <AnimatePresence>
            {fieldError(field) && (
              <Error id={`contact-${field}-error`} initial={{ opacity: 0, y: -3 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={transitions.fast}>
                {fieldError(field)}
              </Error>
            )}
          </AnimatePresence>
        </FieldWrap>
      ))}

      <FieldWrap $full>
        <Textarea
          id="contact-message"
          name="message"
          rows={4}
          placeholder=" "
          value={values.message}
          onChange={(e) => set('message', e.target.value)}
          onBlur={() => blur('message')}
          aria-invalid={Boolean(fieldError('message'))}
          aria-describedby={fieldError('message') ? 'contact-message-error' : undefined}
        />
        <FloatLabel htmlFor="contact-message">What are you building?</FloatLabel>
        <Underline aria-hidden="true" />
        <AnimatePresence>
          {fieldError('message') && (
            <Error id="contact-message-error" initial={{ opacity: 0, y: -3 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={transitions.fast}>
              {fieldError('message')}
            </Error>
          )}
        </AnimatePresence>
      </FieldWrap>

      <Actions>
        <Submit type="submit" $sent={status === 'sent'} layout transition={transitions.base} data-cursor="Send">
          <AnimatePresence mode="wait" initial={false}>
            {status === 'sent' ? (
              <motion.svg key="check" viewBox="0 0 24 24" variants={iconSwap} initial="hidden" animate="visible" exit="exit" aria-hidden="true">
                <path d="M5 12.5l4.5 4.5L19 7.5" />
              </motion.svg>
            ) : (
              <motion.svg key="arrow" viewBox="0 0 24 24" variants={iconSwap} initial="hidden" animate="visible" exit="exit" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </motion.svg>
            )}
          </AnimatePresence>
          <motion.span layout transition={transitions.base}>
            {status === 'sent' ? 'Opening your mail app' : 'Send message'}
          </motion.span>
        </Submit>
        <Aside aria-live="polite">
          {status === 'sent' ? 'Draft ready — send it from your mail app.' : 'Opens in your mail app'}
        </Aside>
      </Actions>
    </Form>
  );
}
