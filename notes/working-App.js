import { useEffect, useState } from "react";

function App() {
  const [dishes, setDishes] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://104.197.222.229:5000/dishes") // Ensure Ingress or proxy handles this routing
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setDishes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load dishes");
        setLoading(false);
      });
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🍽️ West African Dishes</h1>

      {loading && <p style={{ textAlign: "center" }}>Loading dishes...</p>}
      {error && <p style={styles.error}>{error}</p>}

      {!loading && !error && dishes.length === 0 && (
        <p style={{ textAlign: "center" }}>No dishes found.</p>
      )}

      <div style={styles.grid}>
        {dishes.map((dish) => (
          <div
            key={dish.id}
            style={{...styles.card,
              ...(selected === dish.id ? styles.cardActive : {}),
            }}
            onClick={() => setSelected(selected === dish.id ? null : dish.id)}
          >
            <h3 style={styles.name}>{dish.name}</h3>
            <p style={styles.country}>🌍 {dish.country}</p>

            {selected === dish.id && (
              <div style={styles.details}>
                <p>
                  <strong>Description:</strong> {dish.description}
                </p>
                <p>
                  <strong>Key Ingredient:</strong> {dish.key_ingredient}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "30px",
    backgroundColor: "#1a1a1a",
    minHeight: "100vh",
    color: "white",
  },
  title: {
    textAlign: "center",
    color: "#f4c542",
    marginBottom: "30px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "#2c2c2c",
    padding: "20px",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "0.3s",
    border: "1px solid #444",
  },
  cardActive: {
    border: "2px solid #f4c542",
    background: "#3a2a00",
  },
  name: {
    margin: 0,
    color: "#f4c542",
  },
  country: {
    fontSize: "0.9rem",
    marginBottom: "10px",
    color: "#ccc",
  },
  details: {
    marginTop: "10px",
    fontSize: "0.9rem",
    lineHeight: "1.5",
  },
  error: {
    color: "red",
    textAlign: "center",
  },
};

export default App;