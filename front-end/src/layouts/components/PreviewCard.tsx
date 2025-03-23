/**
 * react version of PreviewCard
 */
import config from "@/config/config.json";

export interface PreviewCardPost {
  id: number;
  slug: string;
  image: {
    url: string;
    alt: string;
  };
  title: string;
  excerpt: string;
  category: string;
}

export interface PreviewCardProps {
  extraClass: string | undefined;
  section: string;
  post: PreviewCardPost;
}

const PreviewCard = ({ extraClass, section, post }: PreviewCardProps) => {
  const { slug, image, title, excerpt } = post;
  const { summary_length = 50, title_preview_length = 30 } = config.settings;

  return (
    <div
      className={
        `bg-gray-800 p-6 rounded-lg h-full flex flex-col ` + extraClass
      }
    >
      <div className="w-full">
        <a
          href={`/` + section + `/` + slug}
          className="rounded-lg block hover:text-primary overflow-hidden group"
        >
          <img
            src={image.url}
            alt={image.alt ?? `undefined`}
            className="rounded-lg mb-4 hover:cursor-pointer w-full max-h-[300px] object-fit"
          />
        </a>
      </div>
      <h3 className="text-xl text-white font-bold mb-2 group relative cursor-pointer">
        <a
          href={`/` + section + `/` + slug}
          className="rounded-lg block hover:text-primary overflow-hidden group"
        >
          {title
            ? title.length > title_preview_length
              ? `${title.slice(0, Number(title_preview_length))}...`
              : title
            : ""}
          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {title}
          </span>
        </a>
      </h3>
      <p className="text-gray-400 flex-grow">
        {excerpt
          ? excerpt.length > summary_length
            ? excerpt.slice(0, Number(summary_length ?? 50)) + "..."
            : excerpt
          : ""}
        ...
      </p>

      <div className="w-full pt-4 mt-auto text-right">
        <a
          href={`/` + section + `/` + slug}
          className="text-blue-500 hover:underline"
        >
          Read post
        </a>
      </div>
    </div>
  );
};

export default PreviewCard;
