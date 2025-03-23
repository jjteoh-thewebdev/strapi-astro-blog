interface PostImage {
  ext: string; // file extension
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string;
  size: number; // float, two decimal places
  width: number;
  height: number;
  sizeInBytes: number;
}

interface PostBanner {
  data: {
    id: number;
    attributes: {
      name: string;
      alternativeText: string;
      caption: string;
      width: number; // original size
      height: number; // original size
      hash: string;
      mime: string;
      size: number;
      url: string;
      previewUrl: string;
      provider: string;
      provider_metadata: any;
      createdAt: Date;
      updatedAt: Date;
      // variations
      formats: {
        large: PostImage;
        medium: PostImage;
        small: PostImage;
        thumbnail: PostImage;
      };
    };
  };
}

interface PostTag {
  name: string;
}

export default interface Post {
  id: number;
  attributes: {
    title: string;
    excerpt: string;
    content: string;
    category: string;
    Tags: PostTag[];
    author: string;
    banner: PostBanner;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
    locale: string;
    viewCount: number;
    slug: string;
  };
}
