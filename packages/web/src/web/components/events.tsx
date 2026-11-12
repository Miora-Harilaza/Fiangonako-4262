import { useState } from "react";
import { ArrowUpRight, Clock, MapPin, CalendarPlus, Search } from "lucide-react";
import { useEvents, type ChurchEvent } from "../queries/church";
import { Modal } from "./church-ui";
export const months = [
  "Janoary",
  "Febroary",
  "Martsa",
  "Aprily",
  "Mey",
  "Jona",
  "Jolay",
  "Aogositra",
  "Septambra",
  "Oktobra",
  "Novambra",
  "Desambra",
];
export function dateLabel(date: string) {
  const [y, m, d] = date.split("-");
  return `${Number(d)} ${months[Number(m) - 1]} ${y}`;
}
function exportCalendar(event: ChurchEvent) {
  const escape = (v: string) =>
    v
      .replaceAll("\\", "\\\\")
      .replaceAll("\n", "\\n")
      .replaceAll(",", "\\,")
      .replaceAll(";", "\\;");
  const start = new Date(`${event.date}T${event.time}:00+03:00`);
  const end = new Date(start.getTime() + 3600000);
  const date = (d: Date) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const text = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//FJKM ANTSOMAFI//MG",
    "BEGIN:VEVENT",
    `UID:${event.id}@fjkm-antsomafi`,
    `DTSTAMP:${date(new Date())}`,
    `DTSTART:${date(start)}`,
    `DTEND:${date(end)}`,
    `SUMMARY:${escape((event.demo ? "[OHATRA] " : "") + event.title)}`,
    `LOCATION:${escape(event.location)}`,
    `DESCRIPTION:${escape(event.description)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const url = URL.createObjectURL(new Blob([text], { type: "text/calendar;charset=utf-8" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = `hetsika-${event.id}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}
export function EventList({ compact = false }: { compact?: boolean }) {
  const events = useEvents();
  const [filter, setFilter] = useState("Rehetra");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<ChurchEvent | null>(null);
  const visible = (events.data ?? []).filter(
    (e) =>
      (filter === "Rehetra" || e.category === filter) &&
      e.title.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <>
      {!compact && (
        <div className="event-filters">
          <div className="filter-tabs">
            {["Rehetra", "Fanompoam-pivavahana", "Tanora", "Fiaraha-mivavaka", "Hira"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={filter === f ? "selected" : ""}
              >
                {f}
              </button>
            ))}
          </div>
          <label className="search-field">
            <Search size={17} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Hitady hetsika…"
              aria-label="Hitady hetsika"
            />
          </label>
        </div>
      )}
      {events.isLoading ? (
        <div className="loading-box">Eo am-pamakiana ny hetsika…</div>
      ) : events.isError ? (
        <div className="error-box">
          Tsy voaray ny hetsika. <button onClick={() => events.refetch()}>Andramo indray</button>
        </div>
      ) : visible.length === 0 ? (
        <div className="empty-box">Tsy misy hetsika mifanaraka amin’ny fikarohana.</div>
      ) : (
        <div className="event-list">
          {(compact ? visible.slice(0, 3) : visible).map((e) => (
            <button key={e.id} className="event-row" onClick={() => setSelected(e)}>
              <span className="event-date">
                <b>{Number(e.date.slice(8))}</b>
                <small>{months[Number(e.date.slice(5, 7)) - 1].slice(0, 3).toUpperCase()}</small>
              </span>
              <span className="event-name">
                <span className="event-category">
                  {e.category} {e.demo && <em>Ohatra</em>}
                </span>
                <h3>{e.title}</h3>
              </span>
              <span className="event-meta">
                <span>
                  <Clock size={14} />
                  {e.time}
                </span>
                <span>
                  <MapPin size={14} />
                  {e.location}
                </span>
              </span>
              <span className="round-arrow">
                <ArrowUpRight size={21} />
              </span>
            </button>
          ))}
        </div>
      )}
      {selected && (
        <Modal title={selected.title} onClose={() => setSelected(null)}>
          <span className="tag">{selected.category}</span>
          <p className="detail-date">
            {dateLabel(selected.date)} · {selected.time}
          </p>
          <p className="detail-location">
            <MapPin size={17} />
            {selected.location}
          </p>
          <p>{selected.description}</p>
          {selected.demo && (
            <div className="notice">
              Ohatra ihany ity hetsika ity. Hamarinin’ny fiangonana ny daty sy ny
              fandaharam-potoana.
            </div>
          )}
          <button className="pill lime" onClick={() => exportCalendar(selected)}>
            <CalendarPlus size={17} /> Ampidirina ao amin’ny kalandrie
          </button>
        </Modal>
      )}
    </>
  );
}
