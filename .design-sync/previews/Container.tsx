import { Container } from '@bitperfect/website-ds';

export function PageColumn() {
  return (
    <div className="bg-surface-base py-10">
      <Container>
        <p className="text-eyebrow text-gold">Inside the page column</p>
        <p className="mt-3 text-body text-text-secondary">
          Every band's content sits in a Container: 1280px wide at most, with a 20px gutter on phones and 80px on desktop.
        </p>
      </Container>
    </div>
  );
}
