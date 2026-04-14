import {
  Text, View, FlatList, TouchableOpacity,
  Linking, TextInput, ScrollView
} from 'react-native';
import { useState } from 'react';

export default function App() {

  const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState("Todos");
  const [reseñas, setReseñas] = useState({});
  const [textoReseña, setTextoReseña] = useState({});

  const juegos = [

    // CELULAR (5)
    { id: 1, nombre: "Among Us", plataforma: "Celular", descripcion: "Juego de deducción social.", comoJugar: "Encuentra al impostor.", link: "https://play.google.com", entorno: "Online", conQuien: "Amigos" },
    { id: 2, nombre: "Free Fire", plataforma: "Celular", descripcion: "Battle royale.", comoJugar: "Sobrevive.", link: "https://play.google.com", entorno: "Online", conQuien: "Amigos" },
    { id: 3, nombre: "Clash Royale", plataforma: "Celular", descripcion: "Estrategia en tiempo real.", comoJugar: "Destruye torres.", link: "https://play.google.com", entorno: "Online", conQuien: "Solo o amigos" },
    { id: 4, nombre: "PUBG Mobile", plataforma: "Celular", descripcion: "Shooter táctico.", comoJugar: "Elimina rivales.", link: "https://play.google.com", entorno: "Online", conQuien: "Amigos" },
    { id: 5, nombre: "8 Ball Pool", plataforma: "Celular", descripcion: "Simulador de billar.", comoJugar: "Gana partidas.", link: "https://play.google.com", entorno: "Online", conQuien: "Amigos" },

    // COMPUTADOR (5)
    { id: 6, nombre: "Minecraft", plataforma: "Computador", descripcion: "Construcción libre.", comoJugar: "Explora mundos.", link: "https://minecraft.net", entorno: "Online / Offline", conQuien: "Solo o amigos" },
    { id: 7, nombre: "Fortnite", plataforma: "Computador", descripcion: "Battle royale.", comoJugar: "Sobrevive.", link: "https://epicgames.com", entorno: "Online", conQuien: "Amigos" },
    { id: 8, nombre: "Valorant", plataforma: "Computador", descripcion: "Shooter competitivo.", comoJugar: "Trabajo en equipo.", link: "https://playvalorant.com", entorno: "Online", conQuien: "Amigos" },
    { id: 9, nombre: "League of Legends", plataforma: "Computador", descripcion: "MOBA.", comoJugar: "Destruye base rival.", link: "https://leagueoflegends.com", entorno: "Online", conQuien: "Amigos" },
    { id: 10, nombre: "GTA V", plataforma: "Computador", descripcion: "Mundo abierto.", comoJugar: "Misiones y exploración.", link: "https://rockstargames.com", entorno: "Online / Offline", conQuien: "Solo o amigos" },

    // PLAYSTATION (5)
    { id: 11, nombre: "FIFA 24", plataforma: "PlayStation", descripcion: "Simulación fútbol.", comoJugar: "Partidos.", link: "https://ea.com", entorno: "Online", conQuien: "Amigos" },
    { id: 12, nombre: "God of War", plataforma: "PlayStation", descripcion: "Aventura.", comoJugar: "Historia y combate.", link: "https://playstation.com", entorno: "Offline", conQuien: "Solo" },
    { id: 13, nombre: "Spider-Man", plataforma: "PlayStation", descripcion: "Acción.", comoJugar: "Explora ciudad.", link: "https://playstation.com", entorno: "Offline", conQuien: "Solo" },
    { id: 14, nombre: "The Last of Us", plataforma: "PlayStation", descripcion: "Historia.", comoJugar: "Supervivencia.", link: "https://playstation.com", entorno: "Offline", conQuien: "Solo" },
    { id: 15, nombre: "Call of Duty", plataforma: "PlayStation", descripcion: "Shooter.", comoJugar: "Multijugador.", link: "https://callofduty.com", entorno: "Online", conQuien: "Amigos" },

    // XBOX (5)
    { id: 16, nombre: "Halo Infinite", plataforma: "Xbox", descripcion: "Shooter.", comoJugar: "Combate.", link: "https://xbox.com", entorno: "Online", conQuien: "Amigos" },
    { id: 17, nombre: "Forza Horizon", plataforma: "Xbox", descripcion: "Carreras.", comoJugar: "Compite.", link: "https://xbox.com", entorno: "Online", conQuien: "Amigos" },
    { id: 18, nombre: "Gears 5", plataforma: "Xbox", descripcion: "Acción.", comoJugar: "Disparos.", link: "https://xbox.com", entorno: "Online", conQuien: "Amigos" },
    { id: 19, nombre: "Minecraft Dungeons", plataforma: "Xbox", descripcion: "Aventura.", comoJugar: "Explora.", link: "https://xbox.com", entorno: "Online", conQuien: "Amigos" },
    { id: 20, nombre: "Sea of Thieves", plataforma: "Xbox", descripcion: "Piratas.", comoJugar: "Exploración.", link: "https://xbox.com", entorno: "Online", conQuien: "Amigos" },

    // NINTENDO (5)
    { id: 21, nombre: "Mario Kart", plataforma: "Nintendo", descripcion: "Carreras.", comoJugar: "Compite.", link: "https://nintendo.com", entorno: "Casa", conQuien: "Amigos o familia" },
    { id: 22, nombre: "Zelda", plataforma: "Nintendo", descripcion: "Aventura.", comoJugar: "Explora.", link: "https://nintendo.com", entorno: "Offline", conQuien: "Solo" },
    { id: 23, nombre: "Animal Crossing", plataforma: "Nintendo", descripcion: "Simulación.", comoJugar: "Construye.", link: "https://nintendo.com", entorno: "Offline", conQuien: "Solo" },
    { id: 24, nombre: "Super Smash Bros", plataforma: "Nintendo", descripcion: "Peleas.", comoJugar: "Combate.", link: "https://nintendo.com", entorno: "Casa", conQuien: "Amigos" },
    { id: 25, nombre: "Pokémon", plataforma: "Nintendo", descripcion: "RPG.", comoJugar: "Captura.", link: "https://nintendo.com", entorno: "Offline", conQuien: "Solo" }
  ];

  const juegosFiltrados = juegos.filter(j =>
    j.nombre.toLowerCase().includes(busqueda.toLowerCase()) &&
    (filtro === "Todos" || j.plataforma === filtro)
  );

  const agregarReseña = (id) => {
    if (!textoReseña[id]) return;

    setReseñas(prev => ({
      ...prev,
      [id]: [...(prev[id] || []), textoReseña[id]]
    }));

    setTextoReseña({ ...textoReseña, [id]: "" });
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#0f172a', padding: 20, marginTop: 40 }}>

      <Text style={{ fontSize: 28, fontWeight: 'bold', color: 'white', marginBottom: 10 }}>
        Game Ideas
      </Text>

      <TextInput
        placeholder="Buscar juego..."
        placeholderTextColor="#aaa"
        value={busqueda}
        onChangeText={setBusqueda}
        style={{
          backgroundColor: '#1e293b',
          color: 'white',
          padding: 10,
          borderRadius: 10,
          marginBottom: 10
        }}
      />

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 15 }}>
        {["Todos","Celular","Computador","PlayStation","Xbox","Nintendo"].map((item) => (
          <TouchableOpacity
            key={item}
            onPress={() => setFiltro(item)}
            style={{
              backgroundColor: filtro === item ? '#38bdf8' : '#1e293b',
              padding: 8,
              borderRadius: 10,
              marginRight: 5,
              marginBottom: 5
            }}
          >
            <Text style={{ color: filtro === item ? '#0f172a' : 'white' }}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {juegosFiltrados.map(item => (
        <View key={item.id} style={{
          backgroundColor: '#1e293b',
          padding: 15,
          borderRadius: 15,
          marginBottom: 15
        }}>

          <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>
            {item.nombre}
          </Text>

          <Text style={{ color: '#cbd5f5' }}>{item.descripcion}</Text>
          <Text style={{ color: '#94a3b8' }}>Como jugar: {item.comoJugar}</Text>
          <Text style={{ color: '#94a3b8' }}>Plataforma: {item.plataforma}</Text>

          <TouchableOpacity onPress={() => Linking.openURL(item.link)}>
            <Text style={{ color: '#38bdf8', marginTop: 5 }}>
              Ver juego
            </Text>
          </TouchableOpacity>

          {/* FORO DE RESEÑAS */}
          <View style={{ marginTop: 10 }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
              Reseñas:
            </Text>

            {(reseñas[item.id] || []).map((r, i) => (
              <Text key={i} style={{ color: '#94a3b8' }}>
                - {r}
              </Text>
            ))}

            <TextInput
              placeholder="Escribe una reseña..."
              placeholderTextColor="#aaa"
              value={textoReseña[item.id] || ""}
              onChangeText={(text) =>
                setTextoReseña({ ...textoReseña, [item.id]: text })
              }
              style={{
                backgroundColor: '#0f172a',
                color: 'white',
                padding: 8,
                borderRadius: 8,
                marginTop: 5
              }}
            />

            <TouchableOpacity
              onPress={() => agregarReseña(item.id)}
              style={{
                backgroundColor: '#38bdf8',
                padding: 8,
                borderRadius: 8,
                marginTop: 5
              }}
            >
              <Text style={{ textAlign: 'center' }}>
                Publicar reseña
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      ))}

    </ScrollView>
  );
}