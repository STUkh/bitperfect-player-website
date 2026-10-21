import Container from '../common/Container';
import PhoneFrame from '../feature/PhoneFrame';
import PhoneScreen from '../feature/PhoneScreen';
import { useBehaviour } from '../behaviour';
import { setupPhoneShowcase } from './PhoneShowcase.client';
import './PhoneShowcase.css';

/**
 * The held moment: three phones that arrive as one.
 *
 * The section is one viewport plus a 200vh track, and the stage inside it is
 * sticky, so the track length IS the pin duration. Writing the height as
 * `calc(100vh + var(--track))` avoids the usual off-by-one-screen mistake.
 *
 * The resting state is the finished lineup, declared in plain CSS: the centre
 * phone carries no transform at rest and the siblings sit one width plus the
 * gap out to either side. Scroll animates AWAY from that, so a crawler, a
 * blocked bundle and a reduced-motion visitor all get a real composition
 * rather than a broken one. Every frame writes transform only.
 *
 * The heading does not move (DESIGN.md, "The Still Fold Rule"): the phones are
 * the gesture, and a second one competing with them reads as a slideshow.
 */

export default function PhoneShowcase() {
  const ref = useBehaviour<HTMLElement>(setupPhoneShowcase);

  /* Half a step up from the hero above it. Two graphite sections at the same
     value read as one long block, which is exactly the complaint the white
     close and this half-step are both answering. */
  return (
    <section ref={ref} className="phone-showcase relative bg-surface-raised" data-showcase="">
      <div className="phone-showcase-stage bg-[radial-gradient(ellipse_120%_62%_at_50%_-6%,rgba(255,255,255,0.035)_0%,rgba(255,255,255,0.012)_42%,transparent_72%)]">
        <Container className="lg:px-20">
          {/*
        No eyebrow. `The app itself` sat above `Every screen runs on the same
        engine.` and captioned a picture that captions itself, on a page that had
        eight of them. DESIGN.md, "The Eyebrow Budget Rule".
      */}
          <div className="text-center">
            <h2 className="text-section-sm text-balance text-text-primary lg:text-headline-sm">
              Every screen runs on the same engine.
            </h2>
          </div>
        </Container>
        <div className="phone-showcase-riser" data-riser="">
          <div className="phone-showcase-fitbox">
            {/*
          Below 1024px this becomes a snapping strip rather than a lineup, and
          `data-strip` is what the script attaches a tab stop to there. The three
          screens are captures of the app carrying empty alt text, because this
          label already names all three; it is what carries them to anyone who is
          not looking at the picture.
        */}
            <div
              className="phone-showcase-fit"
              data-strip=""
              role="group"
              aria-label="Three app screens: Now Playing, the 32-band EQ, and the library"
            >
              <div className="phone-showcase-phone phone-showcase-side phone-showcase-left" data-phone="left">
                <PhoneFrame fill>
                  <PhoneScreen name="eq" />
                </PhoneFrame>
              </div>
              <div className="phone-showcase-phone phone-showcase-centre" data-phone="centre">
                <PhoneFrame fill>
                  <PhoneScreen name="now-playing" />
                </PhoneFrame>
              </div>
              <div className="phone-showcase-phone phone-showcase-side phone-showcase-right" data-phone="right">
                <PhoneFrame fill>
                  <PhoneScreen name="library" />
                </PhoneFrame>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
