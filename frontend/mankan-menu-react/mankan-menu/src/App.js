import { useEffect, useState } from "react";

const styles = {
  body: {
    margin: 0,
    fontFamily: "'Georgia', 'Times New Roman', serif",
    background: "linear-gradient(135deg, #1a0a00 0%, #3e1c00 50%, #1a0a00 100%)",
    minHeight: "100vh",
    color: "#fff8e7",
  },
  header: {
    background: "linear-gradient(180deg, #000000 0%, #5c2a00 100%)",
    borderBottom: "4px solid #d4af37",
    padding: "0",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
  },
  headerPattern: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage:
      "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(212,175,55,0.08) 10px, rgba(212,175,55,0.08) 20px)",
    pointerEvents: "none",
  },
  headerContent: {
    position: "relative",
    padding: "40px 20px 30px",
  },
  emoji: {
    fontSize: "3rem",
    display: "block",
    marginBottom: "8px",
  },
  title: {
    fontSize: "clamp(2rem, 5vw, 3.5rem)",
    color: "#d4af37",
    margin: "0 0 8px",
    textShadow: "2px 2px 8px rgba(0,0,0,0.8)",
    letterSpacing: "3px",
    textTransform: "uppercase",
  },
  subtitle: {
    fontSize: "1.1rem",
    color: "#e8c97a",
    margin: "0 0 6px",
    fontStyle: "italic",
    letterSpacing: "1px",
  },
  divider: {
    width: "120px",
    height: "3px",
    background: "linear-gradient(90deg, transparent, #d4af37, transparent)",
    margin: "16px auto 0",
    border: "none",
  },
  main: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "40px 20px 60px",
  },
  sectionTitle: {
    textAlign: "center",
    fontSize: "1.4rem",
    color: "#e8c97a",
    letterSpacing: "4px",
    textTransform: "uppercase",
    marginBottom: "32px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "24px",
  },
  card: {
    background: "linear-gradient(160deg, #4a2200 0%, #2e1400 100%)",
    border: "1px solid #6b3a1f",
    borderRadius: "12px",
    padding: "24px",
    cursor: "pointer",
    transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
    position: "relative",
    overflow: "hidden",
  },
  cardHover: {
    transform: "translateY(-6px)",
    boxShadow: "0 12px 32px rgba(212,175,55,0.25)",
    borderColor: "#d4af37",
  },
  cardSelected: {
    background: "linear-gradient(160deg, #7a3b00 0%, #4a2200 100%)",
    border: "2px solid #d4af37",
    boxShadow: "0 0 24px rgba(212,175,55,0.4)",
  },
  cardAccent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    background: "linear-gradient(90deg, #c84b31, #d4af37, #e8861a)",
  },
  cardAccentSelected: {
    background: "linear-gradient(90deg, #d4af37, #fff8e7, #d4af37)",
  },
  dishName: {
    fontSize: "1.35rem",
    fontWeight: "bold",
    color: "#d4af37",
    marginBottom: "8px",
    letterSpacing: "1px",
  },
  countryBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    background: "rgba(200,75,49,0.25)",
    border: "1px solid #c84b31",
    borderRadius: "20px",
    padding: "3px 12px",
    fontSize: "0.8rem",
    color: "#e8a07a",
    marginBottom: "14px",
    letterSpacing: "0.5px",
  },
  selectHint: {
    fontSize: "0.8rem",
    color: "#a07050",
    fontStyle: "italic",
  },
  detailsPanel: {
    marginTop: "16px",
    padding: "16px",
    background: "rgba(0,0,0,0.3)",
    borderRadius: "8px",
    borderLeft: "3px solid #d4af37",
  },
  detailRow: {
    marginBottom: "12px",
  },
  detailLabel: {
    fontSize: "0.72rem",
    color: "#d4af37",
    textTransform: "uppercase",
    letterSpacing: "2px",
    marginBottom: "3px",
  },
  detailValue: {
    fontSize: "0.95rem",
    color: "#fff8e7",
    lineHeight: "1.5",
  },
  ingredientBadge: {
    display: "inline-block",
    background: "rgba(212,175,55,0.15)",
    border: "1px solid #d4af37",
    borderRadius: "6px",
    padding: "3px 10px",
    fontSize: "0.9rem",
    color: "#e8c97a",
  },
  loading: {
    textAlign: "center",
    padding: "80px 20px",
    color: "#a07050",
    fontSize: "1.2rem",
  },
  loadingDot: {
    display: "inline-block",
    animation: "pulse 1.4s ease-in-out infinite",
  },
  footer: {
    textAlign: "center",
    padding: "24px",
    color: "#6b3a1f",
    fontSize: "0.85rem",
    borderTop: "1px solid #3e1c00",
  },
};

const countryFlags = {
  Mali: "🇲🇱",
  Guinee: "🇬🇳",
  Ghana: "🇬🇭",
  "Burkina Faso": "🇧🇫",
  "Cote Divoire": "🇨🇮",
  Senegal: "🇸🇳",
};

function DishCard({ dish }) {
  const [selected, setSelected] = useState(false);
  const [hovered, setHovered] = useState(false);

  const cardStyle = {
    ...styles.card,
    ...(hovered && !selected ? styles.cardHover : {}),
    ...(selected ? styles.cardSelected : {}),
  };

  const accentStyle = {
    ...styles.cardAccent,
    ...(selected ? styles.cardAccentSelected : {}),
  };

  const flag = countryFlags[dish.country] || "🌍";

  return (
    <div
      style={cardStyle}
      onClick={() => setSelected((s) => !s)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={accentStyle} />
      <div style={styles.dishName}>{dish.name}</div>
      <div style={styles.countryBadge}>
        <span>{flag}</span>
        <span>{dish.country}</span>
      </div>

      {!selected && (
        <div style={styles.selectHint}>Tap to explore this dish →</div>
      )}

      {selected && (
        <div style={styles.detailsPanel}>
          <div style={styles.detailRow}>
            <div style={styles.detailLabel}>Description</div>
            <div style={styles.detailValue}>{dish.description}</div>
          </div>
          <div style={{ ...styles.detailRow, marginBottom: 0 }}>
            <div style={styles.detailLabel}>Key Ingredient</div>
            <div>
              <span style={styles.ingredientBadge}>🌿 {dish.key_ingredient}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://104.197.222.229:5000/dishes")
      .then((res) => res.json())
      .then((data) => {
        setDishes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={styles.body}>
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; background: #1a0a00; }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>

      <header style={styles.header}>
        <div style={styles.headerPattern} />
        <div style={styles.headerContent}>
          <span style={styles.emoji}>🍽️</span>
          <h1 style={styles.title}>Taste of West Africa</h1>
          <p style={styles.subtitle}>
            A culinary journey through the heart of the continent
          </p>
          <hr style={styles.divider} />
        </div>
      </header>

      <main style={styles.main}>
        <h2 style={styles.sectionTitle}>✦ Our Traditional Dishes ✦</h2>

        {loading ? (
          <div style={styles.loading}>
            <span style={styles.loadingDot}>Loading dishes</span>
            <span>...</span>
          </div>
        ) : (
          <div style={styles.grid}>
            {dishes.map((dish) => (
              <DishCard key={dish.name} dish={dish} />
            ))}
          </div>
        )}
      </main>

      <footer style={styles.footer}>
        🌍 Celebrating the rich culinary heritage of West Africa
      </footer>
    </div>
  );
}

export default App;
