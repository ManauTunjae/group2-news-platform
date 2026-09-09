import { storyblokEditable, StoryblokServerComponent } from "@storyblok/react/rsc";
import Link from "next/link";

export default function Header({ blok }) {
  return (
    <header
      className="grid grid-cols-3 items-center px-6 py-4 border-b border-gray-200 bg-white"
      {...storyblokEditable(blok)}
    >
      <Link href="/" className="text-xl font-bold tracking-tight text-gray-900 uppercase">
        Nyheter
      </Link>

      <nav className="justify-self-center">
        <ul className="flex gap-6 items-center">
          {blok.navigation?.map((navBlok) => (
            <StoryblokServerComponent blok={navBlok} key={navBlok._uid} depth={0} />
          ))}
        </ul>
      </nav>

      <div />
    </header>
  );
}