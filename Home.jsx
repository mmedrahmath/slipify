import { images } from "../data/images";
import ImageCard from "../components/ImageCard";

export default function Home() {
  return (
    <div className="p-4 columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
      {images.map((img) => (
        <div key={img.id} className="mb-4 break-inside-avoid">
          <ImageCard url={img.url} title={img.title} />
        </div>
      ))}
    </div>
  );
}
