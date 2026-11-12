import { useState, type FormEvent } from "react";
import { Link } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import {
  ArrowUpRight,
  LockKeyhole,
  CalendarDays,
  Users,
  Plus,
  Pencil,
  Trash2,
  LogOut,
  Search,
} from "lucide-react";
import { authClient } from "../lib/auth";
import {
  useAccess,
  useEvents,
  useMembers,
  useSaveEvent,
  useSaveMember,
  useDeleteEvent,
  useDeleteMember,
  type ChurchEvent,
  type ChurchMember,
} from "../queries/church";
import { Page, PageTitle, Modal } from "../components/church-ui";
import { dateLabel } from "../components/events";

function SignIn() {
  const [signup, setSignup] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const q = useQueryClient();
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const f = new FormData(e.currentTarget);
    try {
      const values = { email: String(f.get("email")), password: String(f.get("password")) };
      const r = signup
        ? await authClient.signUp.email({ ...values, name: String(f.get("name")) })
        : await authClient.signIn.email(values);
      if (r.error) setError(`Tsy nahomby. ${r.error.message}`);
      else await q.invalidateQueries();
    } catch {
      setError("Tsy afaka mifandray. Andramo indray.");
    } finally {
      setBusy(false);
    }
  }
  async function google() {
    setBusy(true);
    setError("");
    try {
      const r = await authClient.managedAuth.signIn({ provider: "google" });
      if (r.error && r.error.code !== "POPUP_CLOSED")
        setError("Tsy nahomby ny fidirana Google. Andramo indray.");
      await q.invalidateQueries();
    } catch {
      setError("Tsy nahomby ny fidirana Google.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="auth-layout content">
      <div className="auth-story">
        <span className="eyebrow">SEHATRA MANOKANA</span>
        <LockKeyhole size={48} strokeWidth={1} />
        <h2>
          Miaro ny olona.
          <br />
          Mandamina ny fiangonana.
        </h2>
        <p>
          Ny annuaire sy ny fitantanana dia natokana ho an’ireo tompon’andraikitra nahazo alalana.
        </p>
        <Link href="/" className="text-link">
          Hiverina amin’ny fandraisana <ArrowUpRight size={18} />
        </Link>
      </div>
      <div className="auth-card">
        <div className="auth-tabs">
          <button
            className={!signup ? "selected" : ""}
            onClick={() => {
              setSignup(false);
              setError("");
            }}
          >
            Hiditra
          </button>
          <button
            className={signup ? "selected" : ""}
            onClick={() => {
              setSignup(true);
              setError("");
            }}
          >
            Hamorona kaonty
          </button>
        </div>
        <h2>{signup ? "Hamorona kaonty" : "Tonga soa indray."}</h2>
        <p>
          {signup
            ? "Tsy manome alalana hitantana avy hatrany ny famoronana kaonty."
            : "Midira amin’ny kaontinao hanohy."}
        </p>
        <button className="google-button" disabled={busy} onClick={google}>
          <span className="google-g">G</span>Hiditra amin’ny Google
        </button>
        <div className="auth-divider">
          <span>na amin’ny mailaka</span>
        </div>
        <form onSubmit={submit}>
          {signup && (
            <label>
              Anarana
              <input
                aria-label="Anarana"
                name="name"
                required
                autoComplete="name"
                maxLength={150}
              />
            </label>
          )}
          <label>
            Mailaka
            <input aria-label="Mailaka" name="email" type="email" required autoComplete="email" />
          </label>
          <label>
            Teny miafina
            <input
              aria-label="Teny miafina"
              name="password"
              type="password"
              required
              minLength={10}
              autoComplete={signup ? "new-password" : "current-password"}
            />
            <small>Litera 10 farafahakeliny.</small>
          </label>
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <button className="pill lime full" disabled={busy}>
            {busy ? "Eo am-pidirana…" : signup ? "Hamorona kaonty" : "Hiditra"}
            <ArrowUpRight size={18} />
          </button>
        </form>
        <small className="auth-note">
          <LockKeyhole size={13} /> Voaaro ny mombamomba ny mpikambana.
        </small>
      </div>
    </div>
  );
}
type EventDraft = Omit<ChurchEvent, "id"> & { id?: number };
type MemberDraft = Omit<ChurchMember, "id"> & { id?: number };
const blankEvent: EventDraft = {
  title: "",
  date: "",
  time: "09:00",
  category: "Fanompoam-pivavahana",
  location: "FJKM ANTSOMAFI",
  description: "",
  demo: false,
};
const blankMember: MemberDraft = { name: "", email: "", phone: "", group: "" };
function AdminPanel() {
  const events = useEvents();
  const members = useMembers();
  const [tab, setTab] = useState<"events" | "members">("events");
  const [search, setSearch] = useState("");
  const [event, setEvent] = useState<EventDraft | null>(null);
  const [member, setMember] = useState<MemberDraft | null>(null);
  const [remove, setRemove] = useState<{
    id: number;
    name: string;
    type: "events" | "members";
  } | null>(null);
  const saveEvent = useSaveEvent();
  const saveMember = useSaveMember();
  const deleteEvent = useDeleteEvent();
  const deleteMember = useDeleteMember();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const q = useQueryClient();
  const pending =
    saveEvent.isPending || saveMember.isPending || deleteEvent.isPending || deleteMember.isPending;
  async function save(e: FormEvent) {
    e.preventDefault();
    setError("");
    try {
      if (event) {
        await saveEvent.mutateAsync({
          ...event,
          category: event.category as
            | "Tanora"
            | "Hira"
            | "Fiaraha-mivavaka"
            | "Fanompoam-pivavahana",
        });
        setEvent(null);
      }
      if (member) {
        await saveMember.mutateAsync(member);
        setMember(null);
      }
      setSuccess("Voatahiry ny fanovana.");
    } catch {
      setError("Tsy voatahiry. Hamarino ny saha ary andramo indray.");
    }
  }
  async function confirmDelete() {
    if (!remove) return;
    setError("");
    try {
      if (remove.type === "events") await deleteEvent.mutateAsync({ id: remove.id });
      else await deleteMember.mutateAsync({ id: remove.id });
      setRemove(null);
      setSuccess("Voafafa.");
    } catch {
      setError("Tsy voafafa. Andramo indray.");
    }
  }
  const eventRows = (events.data ?? []).filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase()),
  );
  const memberRows = (members.data ?? []).filter((m) =>
    (m.name + " " + m.group).toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <>
      <PageTitle
        eyebrow="FITANTANANA"
        title="Sehatry ny fiangonana"
        description="Hetsika sy mombamomba ny mpikambana, voaaro ary voalamina."
      />
      <section className="content admin-section">
        <div className="admin-toolbar">
          <div className="filter-tabs">
            <button
              className={tab === "events" ? "selected" : ""}
              onClick={() => {
                setTab("events");
                setSearch("");
              }}
            >
              <CalendarDays size={17} /> Hetsika ({events.data?.length ?? 0})
            </button>
            <button
              className={tab === "members" ? "selected" : ""}
              onClick={() => {
                setTab("members");
                setSearch("");
              }}
            >
              <Users size={17} /> Mpikambana ({members.data?.length ?? 0})
            </button>
          </div>
          <button
            className="pill pale"
            onClick={async () => {
              await authClient.signOut();
              q.clear();
              window.location.assign("/admin");
            }}
          >
            <LogOut size={16} /> Hivoaka
          </button>
        </div>
        <div className="admin-table-toolbar">
          <label className="search-field">
            <Search size={17} />
            <input
              aria-label="Fikarohana"
              placeholder="Hitady…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
          <button
            className="pill lime"
            onClick={() => {
              setError("");
              if (tab === "events") setEvent({ ...blankEvent });
              else setMember({ ...blankMember });
            }}
          >
            <Plus size={18} /> {tab === "events" ? "Hetsika vaovao" : "Mpikambana vaovao"}
          </button>
        </div>
        {success && <output className="success-box">{success}</output>}
        {tab === "members" && (
          <div className="notice">
            Angona manokana ireto. Ampidiro ihany ireo mombamomba nahazoana alalana; aza zaraina
            ampahibemaso.
          </div>
        )}
        {(tab === "events" ? events : members).isLoading ? (
          <div className="loading-box">Eo am-pamakiana…</div>
        ) : (tab === "events" ? events : members).isError ? (
          <div className="error-box">
            Tsy voaray ny angona.{" "}
            <button onClick={() => (tab === "events" ? events.refetch() : members.refetch())}>
              Andramo indray
            </button>
          </div>
        ) : (
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  {(tab === "events"
                    ? ["Hetsika", "Daty / Ora", "Sokajy", "Asa"]
                    : ["Anarana", "Fifandraisana", "Vondrona", "Asa"]
                  ).map((c) => (
                    <th key={c}>{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tab === "events"
                  ? eventRows.map((e) => (
                      <tr key={e.id}>
                        <td>
                          <b>{e.title}</b>
                          {e.demo && <span className="tag">Ohatra</span>}
                        </td>
                        <td>
                          {dateLabel(e.date)}
                          <br />
                          {e.time}
                        </td>
                        <td>{e.category}</td>
                        <td>
                          <div className="table-actions">
                            <button
                              aria-label={`Hanova ${e.title}`}
                              onClick={() => {
                                setError("");
                                setEvent(e);
                              }}
                            >
                              <Pencil size={17} />
                            </button>
                            <button
                              aria-label={`Hamafa ${e.title}`}
                              onClick={() => {
                                setError("");
                                setRemove({ id: e.id, name: e.title, type: "events" });
                              }}
                            >
                              <Trash2 size={17} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  : memberRows.map((m) => (
                      <tr key={m.id}>
                        <td>
                          <b>{m.name}</b>
                        </td>
                        <td>
                          {m.email || "—"}
                          <br />
                          {m.phone || "—"}
                        </td>
                        <td>{m.group || "—"}</td>
                        <td>
                          <div className="table-actions">
                            <button
                              aria-label={`Hanova ${m.name}`}
                              onClick={() => {
                                setError("");
                                setMember(m);
                              }}
                            >
                              <Pencil size={17} />
                            </button>
                            <button
                              aria-label={`Hamafa ${m.name}`}
                              onClick={() => {
                                setError("");
                                setRemove({ id: m.id, name: m.name, type: "members" });
                              }}
                            >
                              <Trash2 size={17} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
            {!(tab === "events" ? eventRows.length : memberRows.length) && (
              <div className="empty-box">
                Tsy misy {tab === "events" ? "hetsika" : "mpikambana"} hita.
              </div>
            )}
          </div>
        )}
      </section>
      {(event || member) && (
        <Modal
          title={
            event
              ? event.id
                ? "Hanova hetsika"
                : "Hetsika vaovao"
              : member?.id
                ? "Hanova mpikambana"
                : "Mpikambana vaovao"
          }
          onClose={() => {
            if (!pending) {
              setEvent(null);
              setMember(null);
            }
          }}
        >
          <form onSubmit={save}>
            {event ? (
              <>
                <label>
                  Lohateny
                  <input
                    aria-label="Lohateny"
                    required
                    minLength={3}
                    maxLength={200}
                    value={event.title}
                    onChange={(e) => setEvent({ ...event, title: e.target.value })}
                  />
                </label>
                <div className="form-grid">
                  <label>
                    Daty
                    <input
                      aria-label="Daty"
                      type="date"
                      required
                      value={event.date}
                      onChange={(e) => setEvent({ ...event, date: e.target.value })}
                    />
                  </label>
                  <label>
                    Ora
                    <input
                      aria-label="Ora"
                      type="time"
                      required
                      value={event.time}
                      onChange={(e) => setEvent({ ...event, time: e.target.value })}
                    />
                  </label>
                </div>
                <label>
                  Sokajy
                  <select
                    aria-label="Sokajy"
                    value={event.category}
                    onChange={(e) => setEvent({ ...event, category: e.target.value })}
                  >
                    {["Fanompoam-pivavahana", "Tanora", "Fiaraha-mivavaka", "Hira"].map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Toerana
                  <input
                    aria-label="Toerana"
                    required
                    minLength={2}
                    maxLength={200}
                    value={event.location}
                    onChange={(e) => setEvent({ ...event, location: e.target.value })}
                  />
                </label>
                <label>
                  Fanazavana
                  <textarea
                    aria-label="Fanazavana"
                    required
                    minLength={5}
                    maxLength={5000}
                    rows={4}
                    value={event.description}
                    onChange={(e) => setEvent({ ...event, description: e.target.value })}
                  />
                </label>
                <label className="checkbox-label">
                  <input
                    aria-label="Hetsika santionany"
                    type="checkbox"
                    checked={event.demo}
                    onChange={(e) => setEvent({ ...event, demo: e.target.checked })}
                  />{" "}
                  Hetsika santionany (Ohatra)
                </label>
              </>
            ) : (
              member && (
                <>
                  <label>
                    Anarana
                    <input
                      aria-label="Anarana"
                      required
                      minLength={2}
                      maxLength={150}
                      value={member.name}
                      onChange={(e) => setMember({ ...member, name: e.target.value })}
                    />
                  </label>
                  <label>
                    Mailaka
                    <input
                      aria-label="Mailaka"
                      type="email"
                      value={member.email}
                      onChange={(e) => setMember({ ...member, email: e.target.value })}
                    />
                  </label>
                  <label>
                    Finday
                    <input
                      aria-label="Finday"
                      type="tel"
                      maxLength={50}
                      value={member.phone}
                      onChange={(e) => setMember({ ...member, phone: e.target.value })}
                    />
                  </label>
                  <label>
                    Vondrona
                    <input
                      aria-label="Vondrona"
                      maxLength={150}
                      value={member.group}
                      onChange={(e) => setMember({ ...member, group: e.target.value })}
                    />
                  </label>
                </>
              )
            )}
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
            <button className="pill lime full" disabled={pending}>
              {pending ? "Eo am-pitehirizana…" : "Hitahiry"}
            </button>
          </form>
        </Modal>
      )}
      {remove && (
        <Modal
          title="Hamafa ity angona ity?"
          onClose={() => {
            if (!pending) setRemove(null);
          }}
        >
          <p>« {remove.name} » dia ho voafafa tanteraka.</p>
          {error && <p className="form-error">{error}</p>}
          <div className="modal-actions">
            <button className="pill pale" disabled={pending} onClick={() => setRemove(null)}>
              Hanafoana
            </button>
            <button className="pill danger" disabled={pending} onClick={confirmDelete}>
              {pending ? "Eo am-pamafana…" : "Hamafa"}
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
export default function AdminPage() {
  const { data: session, isPending } = authClient.useSession();
  const access = useAccess(!!session);
  const q = useQueryClient();
  return (
    <Page>
      {isPending ? (
        <div className="content loading-box">Eo am-pamakiana ny kaonty…</div>
      ) : !session ? (
        <SignIn />
      ) : access.isLoading ? (
        <div className="content loading-box">Eo am-panamarinana ny alalana…</div>
      ) : access.isError ? (
        <div className="content error-box">
          Tsy voamarina ny alalana. <button onClick={() => access.refetch()}>Andramo indray</button>
        </div>
      ) : access.data?.isAdmin ? (
        <AdminPanel />
      ) : (
        <div className="content pending-account">
          <LockKeyhole size={44} />
          <h1>Miandry fanomezan-dalana.</h1>
          <p>
            Tafiditra amin’ny kaonty <b>{session.user.email}</b> ianao.
            <br />
            Ny kaonty nahazo alalana ihany no afaka mitantana ny fiangonana.
            <br />
            Mifandraisa amin’ny tompon’andraikitry ny tranonkala hampandeha ny alalana.
          </p>
          <div className="notice">
            Tsy miseho eto ny angon’ny mpikambana mandra-pahazoanao alalana.
          </div>
          <button
            className="pill dark"
            onClick={async () => {
              await authClient.signOut();
              q.clear();
              window.location.assign("/admin");
            }}
          >
            Hivoaka <LogOut size={17} />
          </button>
        </div>
      )}
    </Page>
  );
}
