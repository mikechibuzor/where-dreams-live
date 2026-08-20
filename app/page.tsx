import Image from "next/image";
import { DownloadButton } from "./components/DownloadButton";
import { MotionObserver } from "./components/MotionObserver";

const INSTAGRAM_URL =
  "https://www.instagram.com/where_dreamslive?igsi=MWRkdDZoMXpwOWZwYg%3D%3D&utm_source=qr";

const issueSections = [
  { number: "01", title: "Editor’s Note", page: "01" },
  { number: "02", title: "Featured Poem", page: "02" },
  { number: "03", title: "The Winners", page: "03" },
  { number: "04", title: "Top Three Entries", page: "04" },
  { number: "05", title: "Winning Poems", page: "10" },
  { number: "06", title: "Flash Fiction", page: "19" },
  { number: "07", title: "Winning Stories", page: "25" },
];

const previewPages = [
  { src: "/magazine/top-poems.jpg", alt: "The Top Poems section opener" },
  { src: "/magazine/flash-fiction.jpg", alt: "The Top Flash Fiction section opener" },
  { src: "/magazine/short-stories.jpg", alt: "The Top Short Stories section opener" },
];

export default function Home() {
  return (
    <main>
      <MotionObserver />
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Where Dreams Live home">
          <span className="brand-mark">
            <Image src="/magazine/mark.jpg" alt="" width={64} height={64} priority />
          </span>
          <span>Where Dreams Live</span>
        </a>
        <nav className="site-nav" aria-label="Main navigation">
          <a href="#inside">Inside the issue</a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram ↗</a>
        </nav>
        <span className="issue-label">Issue 01 · August 2026</span>
      </header>

      <section className="hero" id="top">
        <span className="hero-issue" aria-hidden="true">01</span>
        <div className="hero-copy">
          <p className="eyebrow">A magazine for lovers of creative writing</p>
          <h1>Stories that stay<br />with you</h1>
          <p className="hero-intro">
            <em>Becoming</em> is our first collection of poems, flash fiction,
            and stories from writers finding the courage to become
          </p>
          <DownloadButton />
        </div>

        <div className="cover-stage">
          <div className="cover-orbit cover-orbit--one" />
          <div className="cover-orbit cover-orbit--two" />
          <Image
            className="cover-image"
            src="/magazine/issue-01-cover.jpg"
            alt="Cover of Where Dreams Live Issue 01: Becoming"
            width={720}
            height={1020}
            priority
          />
          <p className="cover-note">49 pages · Read anywhere</p>
        </div>
        <a className="scroll-cue" href="#letter"><span />Scroll to enter</a>
      </section>

      <section className="editor-letter paper-section" id="letter">
        <div className="letter-body">
          <div className="letter-heading" data-reveal="up">
            <span className="section-index">01</span>
            <p className="eyebrow eyebrow--dark">A letter from the editor</p>
            <h2>For stories that finally have somewhere to go</h2>
          </div>
          <div className="letter-copy" data-reveal="up">
            <p className="drop-cap">
              This magazine began as a whisper of an idea, while I clung to that
              little girl who discovered the beauty in writing.
            </p>
            <p>
              The first theme, “Becoming,” felt right for a first issue. Everyone
              has a story that aligns with this theme, and every writer featured
              here brought a special version of themselves.
            </p>
            <p className="signature">With gratitude,<br /><em>Adeosun Oluwatunmise Ifeoluwa</em></p>
          </div>
        </div>
        <div className="editor-visual">
          <div className="portrait-petal" aria-hidden="true">
            <Image src="/magazine/mark.jpg" alt="" width={1000} height={1000} />
          </div>
          <figure className="editor-portrait">
            <div className="portrait-media">
              <Image
                src="/magazine/editor-portrait.jpg"
                alt="Adeosun Oluwatunmise Ifeoluwa, editor of Where Dreams Live"
                width={4024}
                height={5030}
                sizes="(max-width: 760px) 82vw, 30vw"
                priority
              />
            </div>
            <figcaption>
              <span>Adeosun Oluwatunmise Ifeoluwa</span>
              <span>Editor &amp; creator</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="contents-section" id="inside">
        <div className="contents-intro" data-reveal="up">
          <p className="eyebrow">Inside Issue 01</p>
          <h2>Twenty winning entries</h2>
          <p>
            Poetry, flash fiction, and short stories gathered into one issue.
          </p>
        </div>
        <ol className="contents-list" data-reveal="list">
          {issueSections.map((section) => (
            <li key={section.number}>
              <span>{section.number}</span>
              <strong>{section.title}</strong>
              <span>p. {section.page}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="featured-section" aria-labelledby="featured-title">
        <div className="featured-art" data-reveal="left" aria-hidden="true">
          <span className="vertical-caption">A featured poem · page 02</span>
          <span className="poem-orbit poem-orbit--outer" />
          <span className="poem-orbit poem-orbit--inner" />
          <div className="poem-keepsake">
            <div className="poem-keepsake__topline">
              <span>Where Dreams Live</span>
              <span>02</span>
            </div>
            <span className="poem-keepsake__title">Fly</span>
            <div className="poem-keepsake__seal">
              <Image src="/magazine/mark.jpg" alt="" width={1000} height={1000} />
            </div>
            <div className="poem-keepsake__footer">
              <span>Kept inside</span>
              <span>Issue 01</span>
            </div>
          </div>
        </div>
        <div className="featured-copy" data-reveal="up">
          <p className="eyebrow eyebrow--dark">In Issue 01 · Page 02</p>
          <h2 id="featured-title">A featured poem<br />by the Creator</h2>
          <p className="featured-poem-name"><span>The poem</span> Fly</p>
          <p className="featured-summary">
            <em>Fly</em> waits inside the issue, unexcerpted and exactly where it
            belongs. Meet it on page 02, in full and in context.
          </p>
          <p className="byline">Written by Adeosun Oluwatunmise</p>
          <DownloadButton compact className="featured-download" />
        </div>
      </section>

      <section className="winners-section">
        <div className="winners-heading" data-reveal="up">
          <p className="eyebrow">The top three entries</p>
          <h2>Three voices<br />Three forms<br />One theme</h2>
        </div>
        <div className="winner-list" data-reveal="list">
          <article>
            <span>1st · Poetry</span>
            <h3>Becoming Me Beyond the Mirror</h3>
            <p>Abiola</p>
          </article>
          <article>
            <span>2nd · Short story</span>
            <h3>Becoming Ada</h3>
            <p>Similoluwa</p>
          </article>
          <article>
            <span>3rd · Flash fiction</span>
            <h3>The Potter and Her Creation</h3>
            <p>Theversatilepharmacist</p>
          </article>
        </div>
      </section>

      <section className="preview-section" aria-labelledby="preview-title">
        <div className="preview-heading" data-reveal="up">
          <p className="eyebrow eyebrow--dark">A look inside</p>
          <h2 id="preview-title">Three forms of story telling</h2>
        </div>
        <div className="page-fan" data-reveal="fan">
          {previewPages.map((page, index) => (
            <Image
              key={page.src}
              src={page.src}
              alt={page.alt}
              width={720}
              height={1020}
              className={`page-preview page-preview--${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="final-cta">
        <div className="final-cta-content" data-reveal="up">
          <p className="eyebrow">Issue 01 · Becoming</p>
          <h2>Start reading</h2>
          <DownloadButton compact />
        </div>
      </section>

      <footer>
        <a className="brand brand--footer" href="#top">
          <span className="brand-mark">
            <Image src="/magazine/mark.jpg" alt="" width={64} height={64} />
          </span>
          <span>Where Dreams Live</span>
        </a>
        <p>Stories that stay with you</p>
        <p>© 2026 Where Dreams Live</p>
      </footer>
    </main>
  );
}
