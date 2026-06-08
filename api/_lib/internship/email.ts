import type { JobListing } from './types';

const TO_EMAIL = process.env.INTERNSHIP_ALERT_TO ?? 'hdmehta406@gmail.com';
/** Resend sandbox sender — works without a custom domain; verify hdmehta406@gmail.com in Resend. */
const FROM_EMAIL = process.env.RESEND_FROM ?? 'onboarding@resend.dev';
const FROM_NAME = process.env.INTERNSHIP_ALERT_FROM_NAME ?? 'Portfolio Internship Scanner';

function renderHtml(jobs: JobListing[]) {
  const rows = jobs
    .map(
      (job) => `
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #eee;">
          <div style="font-weight:600;font-size:15px;">${escapeHtml(job.title)}</div>
          <div style="color:#555;margin-top:4px;">${escapeHtml(job.company)} · ${escapeHtml(job.location)}</div>
          <div style="color:#888;font-size:12px;margin-top:4px;">Source: ${escapeHtml(job.source)}</div>
          <a href="${escapeAttr(job.url)}" style="color:#0071e3;font-size:13px;display:inline-block;margin-top:6px;">View posting</a>
        </td>
      </tr>`,
    )
    .join('');

  return `<!doctype html>
<html><body style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;color:#111;padding:24px;">
  <h2 style="margin:0 0 8px;">New US AI internships for 2027</h2>
  <p style="color:#555;margin:0 0 20px;">${jobs.length} new listing(s) matched your profile (AI / quant / software, US, internship).</p>
  <table style="width:100%;border-collapse:collapse;">${rows}</table>
  <p style="color:#888;font-size:12px;margin-top:24px;">Automated scan from your portfolio</p>
</body></html>`;
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function escapeAttr(value: string) {
  return escapeHtml(value).replaceAll("'", '&#39;');
}

export async function sendInternshipAlert(jobs: JobListing[]) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || !jobs.length) return false;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: [TO_EMAIL],
      subject: `[Internship Alert] ${jobs.length} new US AI internship(s) for 2027`,
      html: renderHtml(jobs),
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error('Resend email failed:', err);
  }

  return res.ok;
}
