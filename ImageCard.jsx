export default function ImageCard({ url, title }) {
  return (
    <div className="rounded-xl overflow-hidden shadow-md hover:scale-105 transition">
      <img src={url} alt={title} className="w-full h-auto" />
    </div>
  );
}
