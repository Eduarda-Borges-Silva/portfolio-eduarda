const technologyIcons: Record<string, string> = {
  "cloud firestore": "firebase/firebase-plain.svg",
  "css": "css3/css3-original.svg",
  "dart": "dart/dart-original.svg",
  "docker": "docker/docker-original.svg",
  "express": "express/express-original.svg",
  "figma": "figma/figma-original.svg",
  "firebase auth": "firebase/firebase-plain.svg",
  "flutter": "flutter/flutter-original.svg",
  "git": "git/git-original.svg",
  "github": "github/github-original.svg",
  "google calendar": "google/google-original.svg",
  "grafana": "grafana/grafana-original.svg",
  "graphql": "graphql/graphql-plain.svg",
  "html": "html5/html5-original.svg",
  "java": "java/java-original.svg",
  "javascript": "javascript/javascript-original.svg",
  "kotlin": "kotlin/kotlin-original.svg",
  "mongodb": "mongodb/mongodb-original.svg",
  "mongoose": "mongodb/mongodb-original.svg",
  "nest": "nestjs/nestjs-original.svg",
  "node.js": "nodejs/nodejs-original.svg",
  "oracle": "oracle/oracle-original.svg",
  "postgresql": "postgresql/postgresql-original.svg",
  "prisma": "prisma/prisma-original.svg",
  "python": "python/python-original.svg",
  "react": "react/react-original.svg",
  "react router": "reactrouter/reactrouter-original.svg",
  "sqlite": "sqlite/sqlite-original.svg",
  "streamlit": "streamlit/streamlit-original.svg",
  "swagger": "swagger/swagger-original.svg",
  "tailwind css": "tailwindcss/tailwindcss-original.svg",
  "typescript": "typescript/typescript-original.svg",
  "vite": "vitejs/vitejs-original.svg",
  "wsl": "linux/linux-original.svg"
};
const technologyIconEntries = Object.entries(technologyIcons).sort(([first], [second]) => second.length - first.length);

function getIconPath(technology: string) {
  const normalized = technology.toLowerCase();
  return technologyIconEntries.find(([candidate]) => normalized.includes(candidate))?.[1];
}

export function TechnologyIcon({ technology }: { technology: string }) {
  const path = getIconPath(technology);

  if (!path) return null;

  return (
    <img
      className="technology-icon"
      src={`https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/${path}`}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      onError={(event) => {
        event.currentTarget.hidden = true;
      }}
    />
  );
}
