import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("chronoscroll", "routes/chronoscroll.tsx"),
  route("chronoscroll/new", "routes/chronoscroll.new.tsx"),
  route("chronoscroll/:id", "routes/chronoscroll.$id.tsx"),
  route("chronoscroll/:id/edit", "routes/chronoscroll.$id.edit.tsx"),
  route("echo-gallery", "routes/echo-gallery.tsx"),
] satisfies RouteConfig;
