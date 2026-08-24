# Kontaktformular: E-Mail-Versand über Resend einrichten

Das Formular auf `/kontakt` schickt die Anfrage an die eigene API-Route
`/api/anfrage`, die sie per Resend an **info@fuchspools.de** weitermailt –
identisch zum Setup bei Brandhuber und KE Frästechnik.

Fehlt noch: der Resend-Account für Fuchs Pools (Domain verifizieren + API-Key).

---

## Schritt 1 – Domain in Resend anlegen

1. https://resend.com → einloggen (derselbe Account wie für Brandhuber /
   KE Frästechnik ist möglich, Domains und Keys sind pro Account trennbar).
2. **Domains → Add Domain** → `fuchspools.de`, Region `eu-west-1` (Irland).
3. Resend zeigt jetzt 3–4 DNS-Records an (MX + TXT für den Return-Path,
   TXT/DKIM, optional DMARC).

## Schritt 2 – DNS-Records bei IONOS eintragen

DNS für `fuchspools.de` **und** `fuchspools.com` liegt bei IONOS
(Nameserver `ui-dns.*`), die Postfächer ebenfalls (`mx00/mx01.ionos.de`).

1. IONOS → **Domains & SSL → fuchspools.de → DNS**.
2. Die von Resend angezeigten Records 1:1 anlegen.
   Wichtig: Resend nutzt eine eigene Subdomain (z. B. `send.fuchspools.de`)
   für MX/SPF – der bestehende IONOS-Mailempfang auf `fuchspools.de` bleibt
   dadurch unberührt.
3. Zurück in Resend auf **Verify** klicken (DNS-Propagierung: Minuten bis
   wenige Stunden).

## Schritt 3 – API-Key erzeugen

Resend → **API Keys → Create API Key**
- Name: `fuchspools`
- Permission: `Sending access`
- Domain: `fuchspools.de`

Den Key (`re_…`) einmal kopieren – er wird danach nicht mehr angezeigt.

## Schritt 4 – Key in Netlify hinterlegen

Netlify-Projekt **fuchspool** → Site settings → Environment variables:

| Variable | Wert | Status |
|---|---|---|
| `RESEND_API_KEY` | `re_…` (Secret) | **fehlt noch** |
| `RESEND_FROM` | `Fuchs Pools Website <info@fuchspools.de>` | ✅ gesetzt |
| `RESEND_TO` | `info@fuchspools.de` | ✅ gesetzt |

Oder per CLI im Projektordner (die Site ist bereits verlinkt):

```bash
netlify env:set RESEND_API_KEY "re_..." --secret
```

Danach **einmal neu deployen** – Umgebungsvariablen greifen erst im nächsten Build.

---

### Hinweise

**Muss `info@fuchspools.de` als Absender existieren?**
Ein echtes Postfach ist für den Versand nicht nötig – Resend versendet über die
verifizierte Domain. Da `info@fuchspools.de` bei IONOS aber ohnehin existiert,
kommen auch direkte Antworten an. Antworten auf die Anfrage-Mail gehen per
`Reply-To` automatisch an den Interessenten.

**Spam-Schutz:** Das Formular enthält ein verstecktes Honeypot-Feld (`company`).
Füllt ein Bot es aus, meldet der Server `ok`, verschickt aber keine E-Mail.

**Nicht mehr aktuell:** `ANLEITUNG-WEB3FORMS.md` und `Anleitung-Web3Forms.pdf` –
der Web3Forms-Weg wird nicht verwendet und kann gelöscht werden.
