import type { NextConfig } from "next";

// El Split 2 vive ahora en /split2. Los enlaces que se compartieron cuando
// estaba en la raíz (actas, playoffs, equipos y fichas) redirigen allí.
// Los ids del Split 3 empiezan por "s3-" y sus equipos tienen otros slugs,
// así que nunca chocan con estos patrones.
const EQUIPOS_SPLIT2 = ["torre-beldes", "filosofos", "atalaya", "bodo-dream", "spiti2", "acai-boys", "old-school"];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/partidos/:id(j\\d+-.*)", destination: "/split2/partidos/:id", permanent: false },
      { source: "/playoffs/:id(qf1|qf2|qf3|sf1|sf2|final)", destination: "/split2/playoffs/:id", permanent: false },
      { source: `/equipos/:slug(${EQUIPOS_SPLIT2.join("|")})`, destination: "/split2/equipos/:slug", permanent: false },
      {
        source: `/jugadores/:id(${EQUIPOS_SPLIT2.map((slug) => `${slug}-.*`).join("|")})`,
        destination: "/split2/jugadores/:id",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
