import { Link } from "wouter";
import { ArrowUpRight, Clock, MapPin, HeartHandshake, BookOpen, Users, Cross } from "lucide-react";
import { Header, Footer, More, Invitation } from "../components/church-ui";
import { EventList } from "../components/events";

export default function Home() {
  return (
    <>
      <section className="hero-shell">
        <img
          className="hero-photo"
          src="/images/hero.jpg"
          alt="Sary fanoharana: fiangonana miara-mivavaka"
        />
        <div className="hero-shade" />
        <Header light />
        <div className="hero-content">
          <span className="hero-eyebrow">
            <span /> FJKM ANTSOMAFI · ANTSIRABE
          </span>
          <h1>
            Finoana iray.
            <br />
            Fianakaviana iray.
            <br />
            <span>Fitiavana iombonana.</span>
          </h1>
          <p>
            Fiangonana velona, mifampahery ary miara-manompo.
            <br />
            Tonga soa eto amin’ny fianakaviantsika.
          </p>
          <Link href="/momba" className="hero-cta">
            <span>Fantaro ny fiangonanay</span>
            <span className="cta-arrow">
              <ArrowUpRight size={24} />
            </span>
          </Link>
        </div>
        <span className="hero-photo-note">Sary fanoharana</span>
        <div className="hero-info">
          <Link href="/fifandraisana">
            <span className="info-symbol">
              <Clock size={20} />
            </span>
            <span>
              <small>FOTOAM-PIVAVAHANA</small>
              <b>Manomboka amin’ny 09:00</b>
            </span>
            <ArrowUpRight size={19} />
          </Link>
          <Link href="/fifandraisana">
            <span className="info-symbol">
              <MapPin size={20} />
            </span>
            <span>
              <small>ETO NO MISY ANAY</small>
              <b>Antsongo, Antsirabe</b>
            </span>
            <ArrowUpRight size={19} />
          </Link>
          <Link href="/hetsika">
            <span className="info-symbol">
              <Users size={20} />
            </span>
            <span>
              <small>NY FIAINAN’NY FIANGONANA</small>
              <b>Miara-mivavaka, miara-mitombo</b>
            </span>
            <ArrowUpRight size={19} />
          </Link>
        </div>
      </section>
      <main>
        <section className="content intro-section">
          <div className="section-top">
            <span className="eyebrow">
              <span /> NY FIANGONANAY
            </span>
            <p>
              Ny finoana no mampiray antsika.
              <br />
              Ny fitiavana no mampandroso antsika.
            </p>
          </div>
          <div className="feature-grid">
            <Link href="/momba" className="feature-card">
              <div className="card-top">
                <span className="eyebrow">MOMBA ANAY</span>
                <span className="round-arrow">
                  <ArrowUpRight size={19} />
                </span>
              </div>
              <h2>
                Toerana hinoana.
                <br />
                Toerana hitomboana.
              </h2>
              <p>
                Fantaro ny fiangonana sy ny iraka
                <br />
                hiombonantsika.
              </p>
              <img
                src="/images/community.jpg"
                alt="Sary fanoharana: fiaraha-mivavaka"
                loading="lazy"
              />
              <span className="image-caption">Sary fanoharana</span>
            </Link>
            <Link href="/vondrona" className="feature-card featured">
              <div className="card-top">
                <span className="eyebrow">FIARAHA-MIENTANA</span>
                <span className="round-arrow">
                  <ArrowUpRight size={19} />
                </span>
              </div>
              <div className="abstract-cross">
                <Cross size={210} strokeWidth={0.8} />
                <Users size={58} strokeWidth={1} />
              </div>
              <div>
                <h2>
                  Samy manana anjara.
                  <br />
                  Samy manana toerana.
                </h2>
                <p>
                  Vondrona, talenta ary fanompoana.
                  <br />
                  Andao hiara-handray anjara.
                </p>
              </div>
            </Link>
            <Link href="/toriteny" className="feature-card">
              <div className="card-top">
                <span className="eyebrow">NY TENIN’ANDRIAMANITRA</span>
                <span className="round-arrow">
                  <ArrowUpRight size={19} />
                </span>
              </div>
              <h2>
                Teny mampahery.
                <br />
                Finoana havaozina.
              </h2>
              <p>
                Fotoana hianarana sy hisaintsainana
                <br />
                ny Tenin’Andriamanitra.
              </p>
              <img
                src="/images/bible.jpg"
                alt="Sary fanoharana: Baiboly misokatra"
                loading="lazy"
              />
              <span className="image-caption">Sary fanoharana</span>
            </Link>
          </div>
        </section>
        <section className="mission-section">
          <div className="mission-inner">
            <span className="eyebrow">NY IRAKA IOMBONANTSIKA</span>
            <h2>
              Miara-mitombo amin’ny finoana.
              <br />
              <span>Miara-manompo amin’ny fitiavana.</span>
            </h2>
            <p>
              Mampiray antsika ny Tenin’Andriamanitra. Mifampahery isika,
              <br />
              mifampikarakara ary mizara ny fitiavan’i Kristy.
            </p>
            <div className="values">
              <span>
                <BookOpen size={23} /> Finoana
              </span>
              <span>
                <Users size={23} /> Firaisana
              </span>
              <span>
                <HeartHandshake size={23} /> Fanompoana
              </span>
            </div>
          </div>
        </section>
        <section className="content events-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                <span /> ANDAO HIARA-HIHAONA
              </span>
              <h2>Ny hetsika eto amintsika</h2>
            </div>
            <More href="/hetsika">Hetsika rehetra</More>
          </div>
          <p className="sample-caption">
            Fandaharam-potoana santionany · Hamarinin’ny fiangonana ny daty.
          </p>
          <EventList compact />
        </section>
        <section className="content gallery-teaser">
          <div className="gallery-copy">
            <span className="eyebrow">
              <span /> NY FIAINANA IOMBONANA
            </span>
            <h2>
              Fotoana tsotra.
              <br />
              Fifaliana lehibe.
            </h2>
            <p>
              Fiaraha-mivavaka, fiderana ary fiaraha-mientana. Indro toerana natokana hitahirizana
              ny fotoana sarobidy eto amin’ny fiangonana.
            </p>
            <More href="/sary">Hijery ny tahirin-tsary</More>
            <small>Sary fanoharana, hosoloina ny sarin’ny fiangonana.</small>
          </div>
          <Link href="/sary" className="gallery-photo">
            <img src="/images/choir.jpg" alt="Sary fanoharana: fiderana" loading="lazy" />
            <span>
              Ny fifaliana miara-manompo <ArrowUpRight />
            </span>
          </Link>
        </section>
        <Invitation />
      </main>
      <Footer />
    </>
  );
}
