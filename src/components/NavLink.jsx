import Link from "next/link";
import { storyblokEditable, StoryblokServerComponent } from "@storyblok/react/rsc";

function getNavHref(link) {
  if (!link) return null;
  const raw = link.cached_url || link.url || "";
  if (!raw) return null;
  if (raw.startsWith("http") || raw.startsWith("/")) return raw;
  return `/${raw}`;
}

export default function NavLink({ blok, depth = 0 }) {
  const href = getNavHref(blok.link);
  const hasChildren = blok.children?.length > 0;

  const linkClasses =
    depth === 0
      ? "text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
      : "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 whitespace-nowrap";

  return (
    <li
      {...storyblokEditable(blok)}
      className={`list-none ${depth === 0 ? "relative group" : ""}`}
    >
      {href ? (
        <Link href={href} className={linkClasses}>
          {blok.label}
        </Link>
      ) : (
        <span className={linkClasses}>{blok.label}</span>
      )}

      {hasChildren && depth === 0 && (
        <ul className="hidden group-hover:block group-focus-within:block absolute top-full left-1/2 -translate-x1/2 min-w-[10rem] bg-white border border-gray-200 rounded-lg shadow-sm py-2 z-10">
          {blok.children.map((child) => (
            <StoryblokServerComponent blok={child} key={child._uid} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}