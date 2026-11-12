import { useState } from "react";
import { Link } from "wouter";
import {
  ArrowUpRight,
  BookOpen,
  Cross,
  MapPin,
  Clock,
  Mail,
  Phone,
  Users,
  Music,
  HeartHandshake,
} from "lucide-react";
import { Page, PageTitle, Invitation, groups, Modal } from "../components/church-ui";
import { EventList } from "../components/events";

export function EventsPage() {
  return (
    <Page>
      <PageTitle
        eyebrow="NY FIAINAN’NY FIANGONANA"
        title="Hetsika sy fihaonana"
        description="Ny fotoana hiaraha-mivavaka, hifampizarana ary hiara-manompo."
      />
      <section className="content page-section">
        <div className="notice">
          Ny hetsika misy marika « Ohatra » dia santionany, fa tsy fandaharam-potoana voamarina.
        </div>
        <EventList />
      </section>
      <Invitation />
    </Page>
  );
}
export function AboutPage() {
  return (
    <Page>
      <PageTitle
        eyebrow="MOMBA ANAY"
        title="Fiangonana. Fianakaviana."
        description="FJKM ANTSOMAFI · Antsongo, Antsirabe"
      />
      <section className="content about-layout">
        <div className="about-image">
          <img src="/images/interior.jpg" alt="Sary fanohorana: trano fiangonana" />
          <small>Sary fanoharana, tsy sarin’ny FJKM ANTSOMAFI.</small>
        </div>
        <div>
          <span className="eyebrow">TONGA SOA ETO AMINAY</span>
          <h2>
            Finoana mampiray.
            <br />
            Fitiavana ifampizarana.
          </h2>
          <p>
            Toerana hiaraha-mivavaka sy hianarana ny Tenin’Andriamanitra ny fiangonana. Miombona
            amin’ny finoana isika, ary mifampahery amin’ny fiainana andavanandro.
          </p>
          <p>
            Tonga soa ny tsirairay: ankizy, tanora, ray aman-dreny ary ny fianakaviana rehetra. Samy
            manana anjara amin’ny fanompoana isika.
          </p>
          <Link href="/fifandraisana" className="pill lime">
            Hitsidika anay <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
      <section className="content values-grid">
        {[
          {
            icon: BookOpen,
            title: "Ny finoana",
            text: "Mihaino, mianatra ary miaina ny Tenin’Andriamanitra.",
          },
          {
            icon: Users,
            title: "Ny firaisana",
            text: "Mifampihaino, mifampahery ary miara-mitombo.",
          },
          {
            icon: HeartHandshake,
            title: "Ny fanompoana",
            text: "Mizara fitiavana sy mandray andraikitra amin’ny fiaraha-monina.",
          },
        ].map((v) => (
          <article key={v.title}>
            <v.icon size={30} />
            <h3>{v.title}</h3>
            <p>{v.text}</p>
          </article>
        ))}
      </section>
      <div className="content notice">
        Lahatsoratra naroso ho an’ny tranonkala ity. Mbola ampiana ny tantara sy ny mombamomba
        ofisialin’ny fiangonana.
      </div>
      <Invitation />
    </Page>
  );
}
export function GroupsPage() {
  const [selected, setSelected] = useState<(typeof groups)[number] | null>(null);
  return (
    <Page>
      <PageTitle
        eyebrow="MIARA-MANOMPO"
        title="Samy manana toerana."
        description="Ny vondrona sy ireo tompon’andraikitra eo amin’ny fiainam-piangonana."
      />
      <section className="content page-section">
        <div className="section-heading">
          <h2>Vondrona ao amin’ny fiangonana</h2>
          <span className="tag">Vondrona naroso · Hamarinin’ny fiangonana</span>
        </div>
        <div className="group-grid">
          {groups.map((g, i) => {
            const Icon = [Users, BookOpen, Music, HeartHandshake][i];
            return (
              <button key={g.name} className="group-card" onClick={() => setSelected(g)}>
                <div>
                  <span className="group-number">{g.icon}</span>
                  <Icon size={30} />
                </div>
                <h2>{g.name}</h2>
                <p>{g.description}</p>
                <span className="text-link">
                  Fantaro bebe kokoa <ArrowUpRight size={20} />
                </span>
              </button>
            );
          })}
        </div>
        <div className="leaders-section">
          <span className="eyebrow">TOMPON’ANDRAIKITRA</span>
          <h2>Ireo mitarika sy manompo</h2>
          <div className="leaders-grid">
            {["Mpitandrina", "Birao sy diakona", "Mpitari-bondrona"].map((role) => (
              <article key={role}>
                <span className="leader-avatar">
                  <Users size={27} />
                </span>
                <h3>{role}</h3>
                <p>Mbola ampiana ny anarana sy ny sary ofisialy.</p>
              </article>
            ))}
          </div>
          <div className="notice">
            Ny tompon’andraikitra ihany no aseho ampahibemaso. Voaaro ao amin’ny sehatra manokana ny
            mombamomba ny mpikambana.
          </div>
        </div>
      </section>
      <Invitation />
      {selected && (
        <Modal title={selected.name} onClose={() => setSelected(null)}>
          <span className="eyebrow">{selected.label}</span>
          <p>{selected.description}</p>
          <div className="notice">
            Vondrona naroso ity. Mbola hofaritan’ny fiangonana ny tompon’andraikitra sy ny
            fandaharam-potoana.
          </div>
          <Link href="/fifandraisana" className="pill lime">
            Hifandray amin’ny fiangonana <ArrowUpRight size={17} />
          </Link>
        </Modal>
      )}
    </Page>
  );
}
const reflections = [
  {
    title: "Ny finoana amin’ny fiainana andavanandro",
    subtitle: "Mandeha amim-pinoana",
    text: "Tsy ao anatin’ny fotoam-pivavahana ihany no iainana ny finoana. Miseho amin’ny fomba ifandraisantsika amin’ny hafa, amin’ny fahitsiana ary amin’ny fanampiana izay mila tohana izany. Andao haka fotoana hisaintsainana ny fomba ahafahantsika mizara fitiavana androany.",
    image: "bible",
  },
  {
    title: "Ny fitiavana mampiray antsika",
    subtitle: "Mifampahery sy mifampikarakara",
    text: "Ny fifampihainoana sy ny fifanampiana dia mampitombo ny firaisana. Samy manana ny zava-tsarotra iainany ny tsirairay. Ny fiangonana dia toerana hiaraha-mitondra ireo vesatra ireo sy hifampahery amim-pitiavana.",
    image: "community",
  },
  {
    title: "Samy manana anjara amin’ny fanompoana",
    subtitle: "Ny talenta ho an’ny hafa",
    text: "Samy manana fanomezana sy talenta azo zaraina isika. Misy manompo amin’ny hira, amin’ny fampianarana, amin’ny fihainoana na amin’ny asa tsotra andavanandro. Na kely aza ny asa atao amim-pitiavana, dia sarobidy ho an’ny hafa izany.",
    image: "choir",
  },
];
export function SermonsPage() {
  const [selected, setSelected] = useState<(typeof reflections)[number] | null>(null);
  return (
    <Page>
      <PageTitle
        eyebrow="MIHAINO SY MISAINTSAINA"
        title="Teny mampahery."
        description="Toerana natokana ho an’ny toriteny sy ny fandalinana ny Tenin’Andriamanitra."
      />
      <section className="content page-section">
        <div className="notice">
          Lahatsoratra fisaintsainana santionany ireo. Tsy toriteny ofisialy. Mbola ampiana ny feo
          sy ny horonan-tsarin’ny fiangonana.
        </div>
        <div className="sermon-grid">
          {reflections.map((r) => (
            <button className="sermon-card" key={r.title} onClick={() => setSelected(r)}>
              <div>
                <img src={`/images/${r.image}.jpg`} alt="Sary fanoharana" />
                <span className="sermon-icon">
                  <BookOpen size={22} />
                </span>
              </div>
              <span className="eyebrow">FISAINTSAINANA · OHATRA</span>
              <h2>{r.title}</h2>
              <p>{r.subtitle}</p>
              <span className="text-link">
                Hamaky <ArrowUpRight size={20} />
              </span>
            </button>
          ))}
        </div>
      </section>
      <Invitation />
      {selected && (
        <Modal title={selected.title} onClose={() => setSelected(null)}>
          <span className="tag">Lahatsoratra santionany</span>
          <p className="reading-text">{selected.text}</p>
          <div className="notice">
            Tsy toriteny ofisialy avy amin’ny FJKM ANTSOMAFI ity lahatsoratra ity.
          </div>
        </Modal>
      )}
    </Page>
  );
}
const photos = [
  { src: "hero", title: "Miara-mivavaka" },
  { src: "bible", title: "Ny Tenin’Andriamanitra" },
  { src: "choir", title: "Midera amin’ny hira" },
  { src: "community", title: "Ny fiaraha-mientana" },
  { src: "interior", title: "Toerana fivavahana" },
];
export function GalleryPage() {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <Page>
      <PageTitle
        eyebrow="TAHIRIN-TSARY"
        title="Ny fotoana iombonantsika."
        description="Sary fanoharana naroso ho an’ny endriky ny tranonkala. Tsy sarin’ny FJKM ANTSOMAFI ireo."
      />
      <section className="content photo-grid page-section">
        {photos.map((p, i) => (
          <button key={p.src} onClick={() => setSelected(i)}>
            <img src={`/images/${p.src}.jpg`} alt={`Sary fanoharana: ${p.title}`} />
            <span>
              {p.title}
              <ArrowUpRight size={20} />
            </span>
          </button>
        ))}
      </section>
      {selected !== null && (
        <Modal title={photos[selected].title} wide onClose={() => setSelected(null)}>
          <img
            className="lightbox-image"
            src={`/images/${photos[selected].src}.jpg`}
            alt={`Sary fanoharana: ${photos[selected].title}`}
          />
          <div className="lightbox-controls">
            <button
              className="pill pale"
              onClick={() => setSelected((selected + photos.length - 1) % photos.length)}
            >
              Teo aloha
            </button>
            <span>
              {selected + 1} / {photos.length} · Sary fanoharana
            </span>
            <button
              className="pill pale"
              onClick={() => setSelected((selected + 1) % photos.length)}
            >
              Manaraka
            </button>
          </div>
        </Modal>
      )}
    </Page>
  );
}
export function ContactPage() {
  return (
    <Page>
      <PageTitle
        eyebrow="TONGA SOA IANAO"
        title="Andao hihaona."
        description="Faly handray anao eto amin’ny FJKM ANTSOMAFI izahay."
      />
      <section className="content contact-layout">
        <div className="contact-card">
          <span className="eyebrow">TOERANA SY FOTOANA</span>
          <h2>FJKM ANTSOMAFI</h2>
          <div className="contact-line">
            <MapPin />
            <div>
              <h3>Antsongo, Antsirabe</h3>
              <p>Madagasikara</p>
            </div>
          </div>
          <div className="contact-line">
            <Clock />
            <div>
              <h3>09:00 maraina</h3>
              <p>Fotoam-pivavahana. Mbola hofaritana ny andro.</p>
            </div>
          </div>
          <div className="contact-line">
            <Phone />
            <div>
              <h3>Finday</h3>
              <p>Mbola ampiana ny laharana ofisialy.</p>
            </div>
          </div>
          <div className="contact-line">
            <Mail />
            <div>
              <h3>Adiresy mailaka</h3>
              <p>Mbola ampiana ny mailaka ofisialy.</p>
            </div>
          </div>
          <a
            className="pill lime"
            href="https://www.google.com/maps/search/?api=1&query=Antsongo%2C%20Antsirabe%2C%20Madagascar"
            target="_blank"
            rel="noreferrer"
          >
            Hijery ny faritra amin’ny sarintany <ArrowUpRight size={18} />
          </a>
          <small className="sample-caption">
            Ny faritra no aseho, fa tsy toerana marina voamarina.
          </small>
        </div>
        <div className="contact-visual">
          <img src="/images/interior.jpg" alt="Sary fanoharana: toerana fivavahana" />
          <div>
            <Cross size={42} />
            <h2>
              Misy toerana
              <br />
              ho anao eto.
            </h2>
            <p>Miara-mivavaka. Miara-mitombo.</p>
            <small>Sary fanoharana</small>
          </div>
        </div>
      </section>
    </Page>
  );
}
export function NotFoundPage() {
  return (
    <Page>
      <PageTitle eyebrow="404" title="Tsy hita ity pejy ity." />
      <div className="content page-section">
        <Link href="/" className="pill lime">
          Hiverina amin’ny fandraisana
        </Link>
      </div>
    </Page>
  );
}
