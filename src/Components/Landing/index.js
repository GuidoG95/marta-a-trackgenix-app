import styles from './landing.module.css';

const Landing = () => {
  return (
    <section className={styles.sectionContainer}>
      <section className={styles.welcomeContainer}>
        <div className={styles.logoContainer}>
          <h2 className={styles.welcomeTitle}>Welcome to</h2>
          <img
            alt="TrackGENIX"
            className={styles.logoLanding}
            src={`${process.env.PUBLIC_URL}/assets/images/logoTG.svg`}
          />
        </div>
        <h3 className={styles.welcomeSubTitle}>
          Fueled by <span className={styles.creditsSpan}>GigaTech Software Solutions SA</span>
        </h3>
      </section>
      <section className={styles.infoContainer}>
        <p className={styles.welcomeParagraph}>
          Unify all your teams — drive growth and productivity across your business.
        </p>
      </section>
    </section>
  );
};

export default Landing;
