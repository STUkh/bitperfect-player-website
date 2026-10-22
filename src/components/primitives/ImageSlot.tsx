import { clsx as cx } from 'clsx';
import { imagePrompts } from '../../data/imagePrompts';
import { plates } from '../../data/plates';
import { withBase } from '../../utils/nav';
import Picture from './Picture';
import { PROMPT_CHEVRON_PATH } from './glyphs';
import type { ClassProps } from '../_lib/class-props';

/**
 * An image slot: a real plate once one exists, a registration frame until then.
 *
 * The frame is deliberately NOT a dashed box, a diagonal cross, a mountain-and-sun
 * icon or a skeleton shimmer. Every one of those reads as broken, and a page full of
 * broken-looking boxes is worse than a page with no imagery at all. This reads as a
 * plate that has been specified and is on its way.
 *
 * The frame survives the swap. When `src` lands, only the inside changes, so the
 * aspect ratio holds and the layout cannot move.
 *
 * The generation prompt renders UNDER the frame, behind a disclosure. A prompt that
 * lives only in a markdown file in the repo is a prompt nobody pastes into an image
 * model; on the slot it belongs to, the person looking at the empty plate is one
 * click from the thing that fills it. It sits outside the frame rather than inside
 * it because the frame is `overflow: hidden` at a fixed ratio, and a 6:1 band is
 * 240px tall at 1440, which clips a long prompt to nothing.
 *
 * Everything here disappears the moment `src` is passed — and in a production build
 * a slot with no `src` disappears entirely. See `showFrame` below.
 *
 * Full spec, including the per-slot rejection checks: design/SECTION-IMAGES.md.
 * The rules a page obeys either way: DESIGN.md, "Imagery".
 */

export interface ImageSlotProps extends ClassProps {
  /**
   * Kebab-case slot id. Doubles as the filename, `/img/<name>.webp`, and is the key
   * into `imagePrompts`.
   *
   * Deliberately NOT called `slot`. Astro reads a `slot` attribute on a component's
   * child as a named-slot directive, so `<ImageSlot slot="home-interstitial-1" />`
   * is assigned to a slot of that name, finds none, and is dropped from the output
   * with no error and no warning.
   */
  name: string;
  /** CSS aspect-ratio, e.g. `5 / 1`. */
  ratio: string;
  /**
   * `band` is full-bleed and must be a sibling of the sections, never inside one.
   * `plate` is contained in the content column, on graphite.
   * `ivory` is contained, on a WHITE band, and is a different object: the dark
   * chassis cannot be reused there, because #2a2a2a on #ffffff is a hole punched in
   * the paper. The variant keeps its old name; the band is white.
   */
  variant?: 'band' | 'plate' | 'ivory';
  /** The shipping pixel size, shown on the frame so the slot documents itself. */
  ships?: string;
  /** One line of art direction shown on a band's label row. */
  note?: string;
  /** The real plate, once it exists. Everything below is then skipped. */
  src?: string;
  /** Required whenever `src` is set and the plate carries meaning. */
  alt?: string;
}

/*
  The copy handler, as a STRING rendered through `dangerouslySetInnerHTML`, dev
  server only.

  A bundled client `<script>` (or a `.client.ts` behaviour) is hoisted into the page
  bundle whether or not the markup around it rendered, so gating the panel on
  `import.meta.env.DEV` would leave this shipping on its own: dead code listening for
  `[data-copy]` elements production never emits, with the art direction's vocabulary
  still in the bundle. (That is what happened in the Astro version of this component
  before it moved to a string.)

  Held as a module constant and emitted only inside an `import.meta.env.DEV` branch,
  it is neither executed nor shipped in production: the component renders on the
  server, and the build replaces `import.meta.env.DEV` with `false`. `String.raw`
  keeps `\n` and the regex escapes intact. DESIGN.md, "The Prompt Never Ships".
*/
const PROMPT_COPY_CSS = String.raw`
  /* Safari still paints the default triangle without this. */
  .slot-prompt summary::-webkit-details-marker { display: none; }
`;

const PROMPT_COPY_JS = String.raw`
  /* One delegated listener for the whole page rather than one per slot: a home page
     carries five of these and a feature route one, and six listeners to do one job is
     six chances for one of them to be attached to a stale node. */
  document.addEventListener('click', async (event) => {
    const button = event.target && event.target.closest('[data-copy]');
    if (!button) return;
    const panel = button.closest('.slot-prompt');
    if (!panel) return;

    const read = (key) => {
      const node = panel.querySelector('[data-prompt="' + key + '"]');
      return node && node.textContent ? node.textContent.trim() : '';
    };

    const kind = button.dataset.copy;
    /* The MJ tail is appended to the prose; the negative block never goes with it,
       because --no already covers it and pasting both double-negates. */
    const text =
      kind === 'mj'
        ? read('prompt') + '\n\n' + read('mj').replace(/^MJ tail\s*/, '')
        : kind === 'negative'
          ? read('negative').replace(/^Negative\s*/, '')
          : read('prompt');
    if (!text) return;

    const label = button.textContent || '';
    try {
      await navigator.clipboard.writeText(text);
      button.textContent = 'Copied';
    } catch {
      /* Clipboard is blocked without a secure context or user permission. Say so
         rather than silently doing nothing: the text is selectable right above. */
      button.textContent = 'Select above';
    }
    button.disabled = true;
    window.setTimeout(() => {
      button.textContent = label;
      button.disabled = false;
    }, 1600);
  });
`;

export default function ImageSlot(props: ImageSlotProps) {
  const { name, ratio, variant = 'plate', ships, note, src, alt = '', className } = props;

  /*
    A slot resolves its OWN plate.

    The name is already the filename, so a `src` at every call site would be the same
    string written twice, in two files, with nothing keeping them in step. `plates` is
    the generated manifest of what exists in `public/img` (see design/plates.mjs), so
    dropping a plate in and re-running the script fills the slot on every page that
    uses it, and deleting one empties it back to the section's own ground. No page is
    edited either way. An explicit `src` still wins, for a one-off that is not a plate.
  */
  const platePath = src ? undefined : plates.has(name) ? `img/${name}.webp` : undefined;
  const plateSrc = src ?? (platePath ? withBase(platePath) : undefined);

  const spec = imagePrompts[name];

  /*
    A registration frame is a PROMISE, and a promise only works while someone is
    still able to keep it. In the dev server it says "this plate is specified and on
    its way" to the person who can generate it. In a build it says nothing to anyone,
    and eight of them shipped: five on the home page, 1,634px of labelled empty
    rectangle, 14% of the scroll. On a site whose whole argument is that nothing is
    missing from your music, visible holes argue against the product.

    So in production a slot with no `src` renders NOTHING AT ALL — no frame, no
    reserved height, no margins, because the caller's spacing rides on this
    component's own class. The dark-to-light seams the band slots were performing
    become hard edges between graphite and ivory, which is a cut the page already
    makes elsewhere and reads as deliberate rather than pending.

    This is the same conclusion DESIGN.md's Backdrop Rule reached for the seven
    backdrop slots; it had simply never been extended to the contained ones.
  */
  const showFrame = import.meta.env.DEV || Boolean(plateSrc);
  const label = ratio.replace('/', ':');
  const isIvory = variant === 'ivory';
  const isBand = variant === 'band';

  /* Bright gold measures 1.06:1 on white and is completely invisible there, so the
     light frame runs the deep gold ink instead, and its ground steps half a value
     DOWN from the band. */
  const tick = isIvory ? 'border-band-gold-ink/42' : 'border-gold/30';
  const tickPos = isBand
    ? ['top-6 left-6', 'top-6 right-6', 'bottom-6 left-6', 'bottom-6 right-6']
    : ['top-5 left-5', 'top-5 right-5', 'bottom-5 left-5', 'bottom-5 right-5'];
  const tickSize = isBand ? 'h-[26px] w-[26px]' : 'h-[22px] w-[22px]';

  const shell = isIvory
    ? 'rounded-tile border border-band-rule bg-[linear-gradient(160deg,var(--color-slot-ivory-hi)_0%,var(--color-slot-ivory)_55%,var(--color-slot-ivory-lo)_100%)]'
    : isBand
      ? 'w-full border-y border-border-subtle bg-[linear-gradient(180deg,var(--color-surface-raised)_0%,var(--color-glass-elevated-surface)_52%,var(--color-slot-dark-lo)_100%)]'
      : 'rounded-card-inner border border-border-subtle shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] bg-[linear-gradient(160deg,var(--color-glass-elevated-surface)_0%,var(--color-glass-surface)_46%,var(--color-slot-dark-lo)_100%)]';

  /* Every interactive surface in here shares one treatment, so the disclosure and the
     two copy actions read as one control group rather than three loose widgets. */
  const quiet = isIvory ? 'text-band-ink-muted hover:text-band-gold-ink' : 'text-white/45 hover:text-gold';
  const copyBtn = [
    'focus-visible:focus-ring inline-flex h-8 cursor-pointer items-center gap-2 rounded-full border px-3.5',
    'font-mono text-[11px] tracking-[0.6px] uppercase',
    'transition-[color,border-color,transform] duration-[180ms] ease-ui active:translate-y-px',
    isIvory
      ? 'border-band-rule text-band-ink-muted hover:border-band-gold-ink/45 hover:text-band-gold-ink'
      : 'border-border-subtle text-white/45 hover:border-gold/45 hover:text-gold',
  ].join(' ');

  return (
    <>
      {showFrame && (
        <div className={cx([isBand ? 'w-full' : '', className])} data-img-slot={name}>
          <div className={cx(['relative overflow-hidden', shell])} style={{ aspectRatio: ratio }}>
            {plateSrc ? (
              /* Decorative by default: these plates carry no information a reader loses
                 without them, so `alt` stays empty unless a caller passes one. Lazy and
                 async because every one of them is below the fold — the first is 1400px
                 down — and a 2560px band blocking the render of a page whose argument is
                 that it is fast would be its own kind of contradiction. */
              platePath ? (
                <Picture
                  src={platePath}
                  alt={alt}
                  sizes={isBand ? '100vw' : '(max-width: 1279px) 100vw, 1280px'}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <img
                  src={plateSrc}
                  alt={alt}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )
            ) : (
              <>
                {/* Registration ticks, four corners. */}
                {tickPos.map((pos, i) => (
                  <div
                    key={pos}
                    className={cx([
                      'absolute',
                      tick,
                      tickSize,
                      pos,
                      i === 0 && 'border-t border-l',
                      i === 1 && 'border-t border-r',
                      i === 2 && 'border-b border-l',
                      i === 3 && 'border-b border-r',
                    ])}
                    aria-hidden="true"
                  />
                ))}
                {/*
                  A band's label sits left at the gutter, not centred: a centred label on a
                  6:1 strip looks lost. A contained plate centres its stack.
                */}
                <div
                  className={cx([
                    'absolute inset-0 flex',
                    isBand ? 'items-center px-5 lg:px-20' : 'flex-col items-center justify-center gap-3',
                  ])}
                >
                  <div className={cx(['flex', isBand ? 'items-center gap-[18px]' : 'flex-col items-center gap-3'])}>
                    <div
                      className={cx(['h-px', isBand ? 'w-14' : 'w-11', isIvory ? 'bg-band-gold-ink/55' : 'bg-gold/50'])}
                      aria-hidden="true"
                    />
                    <span
                      className={cx([
                        'font-mono text-xs tracking-[1.4px] tabular-nums uppercase',
                        isIvory ? 'text-band-gold-ink' : 'text-gold',
                      ])}
                    >
                      {name}
                    </span>{' '}
                    <span
                      className={cx([
                        'font-mono text-[11px] tracking-[0.6px] tabular-nums',
                        isIvory ? 'text-band-ink-muted' : 'text-text-tertiary',
                      ])}
                    >
                      {/*
                        At 390 a 6:1 band is 65px tall and the gutter is 20px, so only the
                        ratio survives beside the slot id. The ship size and the note are
                        desktop-only rather than wrapped: a wrapped mono label inside a
                        letterbox strip reads as an error message.
                      */}
                      {label}{' '}
                      <span className="hidden lg:inline">
                        {ships && ` · ships ${ships}`}
                        {note && ` · ${note}`}
                      </span>
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
          {
            /*
              Authoring tool, dev server only. The registration frame above is for the
              visitor; this is for whoever generates the plate, and it was shipping: the
              built home page carried `Copy prompt`, `Copy with MJ tail` and `Copy negative`
              five times over, with `--ar 5:1 --style raw --v 7` and the whole negative list
              down to `cyberpunk, glossy 3D render, sparkles, bokeh`, readable by anyone who
              opened the page. Nothing about writing a tool inside a rendered component makes
              you think about the build, so the gate goes on when the tool is written.
              DESIGN.md, "The Prompt Never Ships".
            */
            import.meta.env.DEV && !plateSrc && spec && (
              <details
                className={cx([
                  'slot-prompt group border-b',
                  isIvory ? 'border-band-rule' : 'border-border-subtle',
                  isBand ? '' : isIvory ? 'rounded-b-tile' : 'rounded-b-card-inner',
                ])}
              >
                <summary
                  className={cx([
                    'focus-visible:focus-ring flex cursor-pointer list-none items-center gap-2 px-5 py-3',
                    'font-mono text-[11px] tracking-[0.6px] uppercase',
                    'transition-colors duration-[180ms] ease-ui lg:px-20',
                    quiet,
                  ])}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="shrink-0 transition-transform duration-[180ms] ease-ui group-open:rotate-90"
                    aria-hidden="true"
                  >
                    <path d={PROMPT_CHEVRON_PATH} />
                  </svg>{' '}
                  Generation prompt{' '}
                  <span className={cx(['ml-1', isIvory ? 'text-band-ink-muted/70' : 'text-white/30'])}>
                    {spec.title}
                  </span>
                </summary>
                <div
                  className={cx([
                    'max-h-[46vh] overflow-y-auto border-t px-5 pt-4 pb-5 text-left lg:px-20',
                    isIvory ? 'border-band-rule bg-band-well' : 'border-border-subtle bg-black/28',
                  ])}
                >
                  <p
                    className={cx([
                      'font-mono text-[11px] leading-[1.75] whitespace-pre-wrap',
                      isIvory ? 'text-band-ink' : 'text-white/72',
                    ])}
                    data-prompt="prompt"
                  >
                    {spec.prompt}
                  </p>
                  {spec.mj && (
                    <p
                      className={cx([
                        'mt-3 font-mono text-[11px] leading-[1.75]',
                        isIvory ? 'text-band-ink-muted' : 'text-white/45',
                      ])}
                      data-prompt="mj"
                    >
                      <span className={cx([isIvory ? 'text-band-gold-ink' : 'text-gold'])}>MJ tail </span> {spec.mj}
                    </p>
                  )}
                  {spec.negative && (
                    <p
                      className={cx([
                        'mt-3 font-mono text-[11px] leading-[1.75]',
                        isIvory ? 'text-band-ink-muted' : 'text-white/45',
                      ])}
                      data-prompt="negative"
                    >
                      <span className={cx([isIvory ? 'text-band-gold-ink' : 'text-gold'])}>Negative </span>{' '}
                      {spec.negative}
                    </p>
                  )}
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button type="button" className={copyBtn} data-copy="prompt">
                      Copy prompt
                    </button>{' '}
                    {spec.mj && (
                      <button type="button" className={copyBtn} data-copy="mj">
                        Copy with MJ tail
                      </button>
                    )}
                    {spec.negative && (
                      <button type="button" className={copyBtn} data-copy="negative">
                        Copy negative
                      </button>
                    )}
                  </div>
                  {spec.safe && (
                    <p
                      className={cx([
                        'mt-4 border-t pt-3 text-[11px] leading-[1.6]',
                        isIvory ? 'border-band-rule text-band-ink-muted' : 'border-border-subtle text-white/40',
                      ])}
                    >
                      <span className={cx(['font-semibold', isIvory ? 'text-band-ink' : 'text-white/72'])}>
                        Safe area.{' '}
                      </span>{' '}
                      {spec.safe}
                    </p>
                  )}
                </div>
              </details>
            )
          }
        </div>
      )}
      {/*
        Both dev-only, and both delivered as strings for the reason the handler above
        is. A co-located stylesheet would also ship this rule on every page that
        mounts a slot, to style an element production never emits.
      */}
      {import.meta.env.DEV && <style dangerouslySetInnerHTML={{ __html: PROMPT_COPY_CSS }} />}
      {import.meta.env.DEV && <script dangerouslySetInnerHTML={{ __html: PROMPT_COPY_JS }} />}
    </>
  );
}
