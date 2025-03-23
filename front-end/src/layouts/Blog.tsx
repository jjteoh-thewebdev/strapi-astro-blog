import PreviewCard, {
  type PreviewCardPost,
} from "@/components/PreviewCard.tsx";
import SearchBar from "@/components/SearchBar";
import config from "@/config/config.json";
import type Post from "@/interfaces/post";
import fetchApi, { type StrapiMeta } from "@/lib/strapi/strapi";
import { useEffect, useState } from "react";

interface Props {
  backendBaseUrl: string;
  backendToken: string;
}

const Blog = ({ backendBaseUrl, backendToken }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [parsedPosts, setParsedPosts] = useState<PreviewCardPost[]>(
    new Array<PreviewCardPost>(),
  );

  const pageSize = config.settings.pagination || 9;

  const handleScroll = () => {
    if (isLoading || !hasMore) return;

    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const clientHeight =
      window.innerHeight || document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 200) {
      console.log(`Triggering fetch for page ${currentPage + 1}`);
      setCurrentPage(currentPage + 1);
      fetchMorePosts();
    }
  };

  const fetchMorePosts = async (keyword?: string) => {
    setIsLoading(true);

    try {
      const filter =
        keyword && keyword.trim().length > 0
          ? `filters[title][$containsi]=${keyword}`
          : undefined;
      const fields = `fields[0]=title&fields[1]=excerpt&populate[banner]=*&fields[3]=category&fields[4]=tags&fields[5]=publishedAt&fields[6]=slug`;
      const pagination = `pagination[page]=${currentPage}&pagination[pageSize]=${pageSize}`;
      const sort = `sort[0]=publishedAt:desc`;

      let q = `posts?${fields}&${pagination}&${sort}`;
      if (filter) {
        q += `&${filter}`;
      }

      //  API call
      const response = await fetchApi<{
        data: Post[];
        meta: StrapiMeta;
      }>({
        baseUrl: backendBaseUrl,
        authToken: backendToken,
        endpoint: q,
      });

      if (response && response.data && response.meta) {
        //await fetch(`/api/articles?page=${currentPage + 1}`);
        const { data, meta } = response;

        setCurrentPage(meta.pagination.page);

        setHasMore(meta.pagination.pageCount > currentPage);

        if (data.length > 0) {
          setParsedPosts(
            data.map((d) => ({
              id: d.id,
              slug: d.attributes.slug,
              image: {
                url: d.attributes.banner.data.attributes.url,
                alt: d.attributes.banner.data.attributes.alternativeText,
              },
              excerpt: d.attributes.excerpt,
              title: d.attributes.title,
              category: d.attributes.category,
            })),
          );
        } else {
          setParsedPosts([]);
        }
      }
    } catch (error) {
      console.error("Error fetching more articles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // call fetch once
  useEffect(() => {
    fetchMorePosts();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading, hasMore]);

  return (
    <div className="mt-20 container">
      <div className="w-auto px-4 py-4 bg-[rgba(242,242,242,0.89)] flex">
        <SearchBar key="searchbar" onSearch={fetchMorePosts} />
      </div>

      <div className="posts-wrapper flex flex-wrap mt-8">
        {parsedPosts
          ? parsedPosts.map((post) => (
              <div
                key={post.id}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 px-2 mb-4"
              >
                <PreviewCard post={post} section="blog" extraClass="p-4" />
              </div>
            ))
          : "No posts found."}
      </div>

      <div id="posts-loader" className="hidden">
        Loading more posts...
      </div>
    </div>
  );
};

export default Blog;
