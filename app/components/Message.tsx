type MessageProps = {
  texte: string;
};

// Composant réutilisable (cours 8.1) avec une prop typée (TypeScript)
export default function Message({ texte }: MessageProps) {
  return (
    <p className="rounded-lg border border-sky-200 bg-sky-50 px-4 py-3 text-sky-800">
      {texte}
    </p>
  );
}
