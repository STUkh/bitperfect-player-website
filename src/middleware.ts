import { defineMiddleware } from "astro:middleware";
import { isDevOnlyRoute } from "./config/dev-pages";

export const onRequest = defineMiddleware(async (context, next) => {
  const pathname = context.url.pathname;

  // In production builds, block dev-only routes from being output/accessed
  if (import.meta.env.PROD && isDevOnlyRoute(pathname)) {
    return new Response("Not Found", {
      status: 404,
      statusText: "Not Found",
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  return next();
});
