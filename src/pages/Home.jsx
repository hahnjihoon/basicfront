import '../css/home.css';

export default function Home() {
  return (
    <main className="home">
      <section className="home__panel">
        <p className="home__label">React Frontend</p>
        <h1 className="home__title">basicfront</h1>
        <p className="home__description">Frontend home is ready.</p>
        <a className="home__button" href="/users">
          사용자 목록
        </a>
      </section>
    </main>
  );
}
