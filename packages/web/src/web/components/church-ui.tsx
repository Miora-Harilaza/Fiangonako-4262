import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import {
  ArrowUpRight,
  ArrowRight,
  Clock,
  Cross,
  Download,
  LockKeyhole,
  MapPin,
  Menu,
  X,
} from "lucide-react";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className={`brand ${light ? "brand-light" : ""}`}
      aria-label="FJKM ANTSOMAFI — Fandraisana"
    >
      <span className="brand-mark">
        <Cross size={24} strokeWidth={1.8} />
      </span>
      <span>
        <b>FJKM</b>
        <strong>ANTSOMAFI</strong>
      </span>
    </Link>
  );
}
const nav = [
  ["/", "Fandraisana"],
  ["/momba", "Momba anay"],
  ["/hetsika", "Hetsika"],
  ["/vondrona", "Vondrona"],
  ["/toriteny", "Toriteny"],
];
export function Header({ light = false }: { light?: boolean }) {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  useEffect(() => {
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);
  return (
    <header className={`site-header ${light ? "on-photo" : ""}`}>
      <Logo light={light} />
      <nav className={open ? "nav-links mobile-open" : "nav-links"} aria-label="Fizahana">
        {nav.map(([href, text]) => (
          <Link key={href} href={href} className={location === href ? "active" : ""}>
            {text}
          </Link>
        ))}
      </nav>
      <div className="header-actions">
        <Link href="/admin" className="icon-button" aria-label="Sehatra manokana">
          <LockKeyhole size={17} />
        </Link>
        <Link href="/fifandraisana" className="pill lime">
          Hifandray <ArrowUpRight size={16} />
        </Link>
        <button
          className="menu-toggle icon-button"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Hanakatona ny menu" : "Hanokatra ny menu"}
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <Logo light />
          <p>
            Miara-mitombo amin’ny finoana.
            <br />
            Miara-manompo amin’ny fitiavana.
          </p>
          <a
            href="/downloads/fjkm-antsomafi.apk"
            className="footer-download"
            download
          >
            <Download size={16} />
            Sintomy ny app Android
          </a>
        </div>
        <div>
          <h4>Ny fiangonana</h4>
          <Link href="/momba">Momba anay</Link>
          <Link href="/vondrona">Vondrona sy tompon’andraikitra</Link>
          <Link href="/sary">Tahirin-tsary</Link>
        </div>
        <div>
          <h4>Andao hihaona</h4>
          <span>
            <MapPin size={15} /> Antsongo, Antsirabe
          </span>
          <span>
            <Clock size={15} /> Fotoam-pivavahana · 09:00
          </span>
          <Link href="/fifandraisana">
            Toerana sy fifandraisana <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} FJKM ANTSOMAFI</span>
        <span>Logo naroso · Sary fanoharana, tsy sarin’ny fiangonana</span>
        <Link href="/admin">
          Sehatra manokana <LockKeyhole size={12} />
        </Link>
      </div>
    </footer>
  );
}
export function Page({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="page-nav">
        <Header />
      </div>
      <main>{children}</main>
      <Footer />
    </>
  );
}
export function PageTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="page-title content">
      <span className="eyebrow">
        <span /> {eyebrow}
      </span>
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </div>
  );
}
export function More({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="text-link">
      {children}{" "}
      <span className="round-arrow">
        <ArrowUpRight size={18} />
      </span>
    </Link>
  );
}
export function Modal({
  children,
  title,
  onClose,
  wide = false,
}: {
  children: ReactNode;
  title: string;
  onClose: () => void;
  wide?: boolean;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    dialog?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
      dialog?.close();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className={`modal ${wide ? "wide" : ""}`}
      aria-label={title}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
    >
      <div className="modal-head">
        <h2>{title}</h2>
        <button className="icon-button" onClick={onClose} aria-label="Hanakatona">
          <X />
        </button>
      </div>
      {children}
    </dialog>
  );
}
export function Invitation() {
  return (
    <section className="invitation content">
      <div>
        <span className="eyebrow">TONGA SOA IANAO</span>
        <h2>
          Misy toerana ho anao
          <br />
          eto amin’ny fiangonana.
        </h2>
        <p>Andao hiara-hivavaka, hifampahery ary hiara-hitombo.</p>
      </div>
      <Link href="/fifandraisana" className="pill dark">
        Hitsidika anay <ArrowRight size={18} />
      </Link>
      <Cross className="invitation-cross" size={250} strokeWidth={0.6} />
    </section>
  );
}
export const groups = [
  {
    name: "Tanora",
    label: "Finoana sy fiaraha-mientana",
    description:
      "Sehatra ho an’ny tanora hifampahery, hianatra ny Tenin’Andriamanitra ary hanompo miaraka.",
    icon: "01",
  },
  {
    name: "Sekoly Alahady",
    label: "Mitombo amin’ny Tenin’Andriamanitra",
    description: "Fampianarana ny finoana ho an’ny ankizy sy ny fianakaviana.",
    icon: "02",
  },
  {
    name: "Antoko mpihira",
    label: "Midera amin’ny hira",
    description: "Fiderana sy fanompoana amin’ny alalan’ny mozika sy ny hira.",
    icon: "03",
  },
  {
    name: "Fiaraha-mivavaka",
    label: "Mifampitondra am-bavaka",
    description: "Fotoana hifampizarana sy hitondrana am-bavaka ny fiangonana.",
    icon: "04",
  },
];
