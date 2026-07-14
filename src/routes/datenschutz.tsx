import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { COMPANY, SITE_URL } from "@/lib/site";

export const Route = createFileRoute("/datenschutz")({
  head: () => ({
    meta: [
      { title: "Datenschutz – Fuchs Pools" },
      {
        name: "description",
        content:
          "Datenschutzerklärung der Fuchs Pools GmbH – Informationen zur Verarbeitung Ihrer Daten nach DSGVO.",
      },
      { property: "og:url", content: SITE_URL + "/datenschutz" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/datenschutz" }],
  }),
  component: () => (
    <>
      <PageHero title="Datenschutzerklärung" crumbs={[{ label: "Datenschutz" }]} />
      <section className="container-page py-16 max-w-3xl text-foreground/85 leading-relaxed space-y-6">
        <p>
          Der Schutz Ihrer personenbezogenen Daten ist uns ein wichtiges Anliegen. Wir verarbeiten Ihre Daten
          ausschließlich auf Grundlage der gesetzlichen Bestimmungen der Datenschutz-Grundverordnung (DSGVO)
          sowie des Bundesdatenschutzgesetzes (BDSG). In dieser Datenschutzerklärung informieren wir Sie über
          die wichtigsten Aspekte der Datenverarbeitung im Rahmen unserer Website.
        </p>

        <div>
          <h2 className="text-xl font-bold">1. Verantwortlicher</h2>
          <p className="mt-2">
            Verantwortlich für die Datenverarbeitung im Sinne der DSGVO ist:<br />
            {COMPANY.full}<br />
            {COMPANY.street}<br />
            {COMPANY.zip} {COMPANY.city}<br />
            Vertreten durch: {COMPANY.owner}<br />
            Telefon: {COMPANY.phone}<br />
            E-Mail: {COMPANY.email}
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold">2. Allgemeines und Geltungsbereich</h2>
          <p className="mt-2">
            Diese Datenschutzerklärung gilt für unsere Website und die darüber angebotenen Funktionen. Sie klärt
            Sie über Art, Umfang und Zweck der Verarbeitung personenbezogener Daten auf. Personenbezogene Daten
            sind alle Informationen, die sich auf eine identifizierte oder identifizierbare natürliche Person
            beziehen. Wir verarbeiten personenbezogene Daten nur im erforderlichen Umfang und ausschließlich zu
            den in dieser Erklärung genannten Zwecken.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold">3. Server-Logfiles und Hosting</h2>
          <p className="mt-2">
            Beim Aufruf unserer Website werden durch den Browser Ihres Endgeräts automatisch technisch
            notwendige Zugriffsdaten an den Server unseres Hosting-Anbieters übermittelt und in sogenannten
            Server-Logfiles gespeichert. Hierzu gehören unter anderem die IP-Adresse, Datum und Uhrzeit des
            Zugriffs, die angeforderte Datei sowie Informationen zum verwendeten Browser und Betriebssystem.
            Diese Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes
            Interesse liegt in der sicheren, stabilen und funktionsfähigen Bereitstellung unserer Website.
          </p>
          <p className="mt-2">
            Diese Website wird bei der Netlify Inc. (512 2nd Street, Suite 200, San Francisco, CA 94107, USA)
            gehostet. Netlify verarbeitet die anfallenden Server-Logdaten (u.&nbsp;a. Ihre IP-Adresse) als
            Auftragsverarbeiter in unserem Auftrag. Grundlage hierfür ist ein Auftragsverarbeitungsvertrag nach
            Art. 28 DSGVO. Da es sich bei Netlify um einen US-amerikanischen Anbieter handelt, kann dabei eine
            Übermittlung personenbezogener Daten in die USA und damit in ein Drittland erfolgen. Diese
            Übermittlung wird über die von der EU-Kommission erlassenen Standardvertragsklauseln (Art. 46
            DSGVO) und – soweit Netlify entsprechend zertifiziert ist – über das EU-US Data Privacy Framework
            abgesichert. Rechtsgrundlage für den Einsatz des Hosting-Anbieters ist Art. 6 Abs. 1 lit. f DSGVO;
            unser berechtigtes Interesse besteht in einer sicheren und performanten Bereitstellung unserer
            Website.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold">4. Kontaktformular und Kontaktaufnahme</h2>
          <p className="mt-2">
            Wenn Sie über das Kontaktformular oder per E-Mail Kontakt mit uns aufnehmen, werden die von Ihnen
            eingegebenen Daten zur Bearbeitung Ihrer Anfrage sowie für den Fall von Anschlussfragen bei uns
            verarbeitet. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage auf den Abschluss
            oder die Durchführung eines Vertrags gerichtet ist, sowie Art. 6 Abs. 1 lit. f DSGVO aufgrund unseres
            berechtigten Interesses an der Beantwortung Ihres Anliegens. Diese Daten löschen wir, sobald sie für
            die Erreichung des Zwecks ihrer Erhebung nicht mehr erforderlich sind und keine gesetzlichen
            Aufbewahrungspflichten entgegenstehen.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold">5. Cookies und Einwilligung</h2>
          <p className="mt-2">
            Für den technischen Betrieb dieser Website setzen wir Cookies ein, die für die grundlegende
            Funktion und Sicherheit erforderlich sind (technisch notwendige Cookies). Diese werden auf Grundlage
            von Art. 6 Abs. 1 lit. f DSGVO gesetzt und bedürfen keiner Einwilligung.
          </p>
          <p className="mt-2">
            Darüber hinaus setzen wir – ausschließlich mit Ihrer vorherigen Einwilligung – Cookies und
            vergleichbare Technologien für Statistik- und Marketingzwecke ein (siehe Ziffer 6). Beim ersten
            Besuch unserer Website erhalten Sie hierzu einen Cookie-Hinweis (Consent-Banner), über den Sie frei
            entscheiden können, ob Sie diese Verarbeitung zulassen oder ablehnen. Ohne Ihre Einwilligung werden
            keine Statistik- oder Marketing-Cookies gesetzt und keine entsprechenden Dienste geladen.
            Rechtsgrundlage ist Ihre Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO sowie § 25 Abs. 1 TDDDG. Ihre
            Einwilligung ist freiwillig und kann jederzeit mit Wirkung für die Zukunft widerrufen werden – über
            den Link „Cookie-Einstellungen“ im Fußbereich (Footer) unserer Website.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold">6. Google Tag Manager, Google-Dienste und Werbung</h2>
          <p className="mt-2">
            Nach Ihrer Einwilligung setzen wir den Google Tag Manager ein, einen Dienst der Google Ireland
            Limited (Gordon House, Barrow Street, Dublin 4, Irland). Der Google Tag Manager dient dazu, weitere
            Dienste und sogenannte Tags – etwa zur Reichweitenmessung/Statistik sowie zu Marketing- und
            Werbezwecken (z.&nbsp;B. Google Ads) – zu verwalten und auf der Website einzubinden. Über diese
            Dienste können Cookies gesetzt und Nutzungsdaten (u.&nbsp;a. IP-Adresse, Geräte- und
            Browserinformationen, aufgerufene Seiten) verarbeitet werden.
          </p>
          <p className="mt-2">
            Der Google Tag Manager und die darüber eingebundenen Google-Dienste werden erst geladen, nachdem Sie
            im Consent-Banner aktiv eingewilligt haben. Rechtsgrundlage ist Ihre Einwilligung gemäß Art. 6 Abs. 1
            lit. a DSGVO und § 25 Abs. 1 TDDDG. Anbieter ist Google; dabei kann eine Verarbeitung bzw.
            Übermittlung personenbezogener Daten in die USA (Drittland) erfolgen. Diese wird über die
            EU-Standardvertragsklauseln (Art. 46 DSGVO) sowie – soweit Google entsprechend zertifiziert ist –
            über das EU-US Data Privacy Framework abgesichert. Sie können Ihre Einwilligung jederzeit über die
            „Cookie-Einstellungen“ im Footer mit Wirkung für die Zukunft widerrufen. Weitere Informationen zur
            Datenverarbeitung durch Google finden Sie unter https://policies.google.com/privacy.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold">7. Schriftarten</h2>
          <p className="mt-2">
            Die auf dieser Website verwendeten Schriftarten werden lokal von unserem eigenen Server ausgeliefert
            (self-hosted). Es besteht dabei keine Verbindung zu Servern von Google oder anderen Dritten, und es
            werden hierfür keine personenbezogenen Daten an Dritte übertragen.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold">8. Kartendienst (OpenStreetMap)</h2>
          <p className="mt-2">
            Auf unserer Kontaktseite binden wir eine Karte des Dienstes OpenStreetMap ein. Die Karte wird erst
            nach Ihrer ausdrücklichen Einwilligung, also durch aktives Anklicken, geladen. Bei diesem Vorgang
            wird Ihre IP-Adresse an die OpenStreetmap Foundation übertragen, um die Kartendarstellung
            auszuliefern. Rechtsgrundlage für diese Verarbeitung ist Ihre Einwilligung gemäß Art. 6 Abs. 1
            lit. a DSGVO. Solange Sie die Karte nicht aktiv laden, findet keine Übertragung statt.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold">9. Ihre Rechte als betroffene Person</h2>
          <p className="mt-2">
            Ihnen stehen nach der DSGVO folgende Rechte zu: das Recht auf Auskunft (Art. 15 DSGVO), auf
            Berichtigung (Art. 16 DSGVO), auf Löschung (Art. 17 DSGVO), auf Einschränkung der Verarbeitung
            (Art. 18 DSGVO), auf Datenübertragbarkeit (Art. 20 DSGVO) sowie das Recht auf Widerspruch gegen die
            Verarbeitung (Art. 21 DSGVO). Soweit die Verarbeitung auf einer Einwilligung beruht, haben Sie das
            Recht, diese jederzeit mit Wirkung für die Zukunft zu widerrufen. Zur Ausübung Ihrer Rechte genügt
            eine formlose Mitteilung an die oben genannten Kontaktdaten.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold">10. Beschwerderecht bei der Aufsichtsbehörde</h2>
          <p className="mt-2">
            Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die Verarbeitung Ihrer
            personenbezogenen Daten zu beschweren. Die für uns zuständige Aufsichtsbehörde ist:<br />
            Bayerisches Landesamt für Datenschutzaufsicht (BayLDA)<br />
            Promenade 27<br />
            91522 Ansbach
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold">11. Speicherdauer</h2>
          <p className="mt-2">
            Wir speichern personenbezogene Daten grundsätzlich nur so lange, wie es für die Erreichung des
            jeweiligen Verarbeitungszwecks erforderlich ist. Darüber hinaus können sich längere Speicherfristen
            aus gesetzlichen Aufbewahrungspflichten ergeben, insbesondere aus handels- und steuerrechtlichen
            Vorgaben. Nach Ablauf der jeweiligen Fristen werden die entsprechenden Daten routinemäßig gelöscht.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold">12. SSL-/TLS-Verschlüsselung</h2>
          <p className="mt-2">
            Diese Website nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine
            SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die
            Adresszeile des Browsers von „http://“ auf „https://“ wechselt und am Schloss-Symbol in Ihrer
            Browserzeile. Bei aktivierter Verschlüsselung können die Daten, die Sie an uns übermitteln, nicht von
            Dritten mitgelesen werden.
          </p>
        </div>
      </section>
    </>
  ),
});
