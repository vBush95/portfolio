import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
  projectId: "1x87zz4g",
  dataset: "production",
  apiVersion: "2022-02-01",
  useCdn: true,
  token: import.meta.env.VITE_REACT_APP_SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: any) => builder.image(source);
