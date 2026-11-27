# United Care Center

Support Today, Greater Independence Tomorrow.

Compassionate, high-quality support services that help individuals live safely, independently, and with dignity.

## Services

- **Home & Personal Support Services** — Personal Care, Homemaker services, Supportive Living, Residential Services, and Individual Residential Services & Supports (IRSS) under the DD waiver
- **Respite Care** — Short-term relief for caregivers, available under CES and SLS waivers
- **Community-Based Skill Building & Social Support** — Community Connector services and Supported Community Connection
- **Non-Medical (NMT) Transportation** — Safe, reliable transportation to shopping, social activities, work, Day Program, and other everyday needs

## Contact

- Email: unitedcarecenterinfo@gmail.com
- Phone: (303) 335-7064

## Website

Open `index.html` in a browser, or enable GitHub Pages on the `main` branch to publish this site.

## Security

- Browser security headers are defined in `vercel.json` for Vercel deployments and `_headers` for Netlify-compatible hosting.
- The site removes third-party font requests and uses local system fonts.
- The contact form sends directly via `api/send.js` (Vercel serverless function) using Resend to `ibelete2000@gmail.com` for now — no email app needed. It requires `RESEND_API_KEY` set in Vercel (Production). Switch to `unitedcarecenterinfo@gmail.com` after a domain is verified in Resend.
- Style matched to the brochures Nov 27, 2026: heavy Arial/Helvetica bold headings in brochure navy (#16265e), brochure blue (#0b56a8), gold/orange brand name, uppercase pill banners (blue Home Care Agency, red Respite Services, green SCC, blue/red SODAK NEMT/NMT), bold navy list copy, and the actual SODAK logo cropped from the SODAK brochure on the Transportation page. No Google Fonts (system fonts only, as before).
- Content updated Nov 27, 2026 from three client brochures: Home Care Agency (full Personal Care + Homemaker lists), Community & Residential Support (Host Home, Supported Community Connections / SCC, Respite details, Residential and Community Connections Manager), and SODAK Transportation (NEMT medical rides, NMT everyday rides, wheelchair accessible, We accept Medicaid, Operations Manager, sodaktransportation@gmail.com).
- The site supports automatic system light/dark colors and includes a persistent manual theme button.
- Responsibility and security reporting instructions are published at `.well-known/security.txt`.
