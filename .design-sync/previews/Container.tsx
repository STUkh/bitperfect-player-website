import { Container } from '@bitperfect/website-ds';

export function PageColumn() {
  return (
    <div className="bg-surface-base py-10">
      <Container>
        <p className="text-body text-text-secondary">
          Every band's content sits in a Container: 1280px wide at most, with a 20px gutter on phones and 32px from the sm breakpoint.
        </p>
      </Container>
    </div>
  );
}
