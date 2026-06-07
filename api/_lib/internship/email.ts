import type { JobListing } from './types';

const TO_EMAIL = process.env.INTERNSHIP_ALERT_TO ?? 'hdmehta406@gmail.com';
const FROM_EMAIL = process.env.INTERNSHIP_ALERT_FROM ?? 'harsh.mehta@tamu.edu';
const FROM_NAME = process.env.INTERNSHIP_ALERT_FROM_NAME ?? 'Harsh Mehta';

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
  <p style="color:#888;font-size:12px;margin-top:24px;">Automated scan — Texas A&amp;M MS AI · hourly check</p>
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

async function sendViaResend(jobs: JobListing[]) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: [TO_EMAIL],
      reply_to: FROM_EMAIL,
      subject: `[Internship Alert] ${jobs.length} new US AI internship(s) for 2027`,
      html: renderHtml(jobs),
    }),
  });

  return res.ok;
}

/** Microsoft 365 / TAMU SMTP via fetch is unreliable — use Resend with reply-to, or add nodemailer later. */
async function sendViaMicrosoftGraph(jobs: JobListing[]) {
  const tenantId = process.env.MS_TENANT_ID;
  const clientId = process.env.MS_CLIENT_ID;
  const clientSecret = process.env.MS_CLIENT_SECRET;
  if (!tenantId || !clientId || !clientSecret) return false;

  const tokenRes = await fetch(
    `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        scope: 'https://graph.microsoft.com/.default',
        grant_type: 'client_credentials',
      }),
    },
  );

  if (!tokenRes.ok) return false;
  const { access_token } = (await tokenRes.json()) as { access_token?: string };
  if (!access_token) return false;

  const mailRes = await fetch(`https://graph.microsoft.com/v1.0/users/${FROM_EMAIL}/sendMail`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: {
        subject: `[Internship Alert] ${jobs.length} new US AI internship(s) for 2027`,
        body: { contentType: 'HTML', content: renderHtml(jobs) },
        toRecipients: [{ emailAddress: { address: TO_EMAIL } }],
      },
      saveToSentItems: true,
    }),
  });

  return mailRes.ok;
}

export async function sendInternshipAlert(jobs: JobListing[]) {
  if (!jobs.length) return false;
  if (await sendViaMicrosoftGraph(jobs)) return true;
  return sendViaResend(jobs);
}
