import type { JSX } from "react";
import ProjectCard from "../layout/ProjectCard";
import PixelSolitaireImg from "../../assets/PixelSolitaire.png";
import GarminAppImg from "../../assets/jwbBlock.png";

type Project = {
  id: string;
  title: string;
  description: string;
  img: string;
  tags?: string[];
  year?: number | string;
  links?: { label: string; href: string }[];
};

const projects: Project[] = [
  {
    id: "garmin-watchface",
    title: "Garmin Watch Face",
    description:
      "A custom Garmin watch face written in MonkeyC that collects and displays biometrics in real time.",
    img: GarminAppImg,
    tags: ["MonkeyC", "Embedded"],
    year: 2024,
    links: [{ label: "Repo (GitHub)", href: "https://github.com/jwbmarten/jwblock" }],
  },
  {
    id: "pixel-solitaire",
    title: "Pixel Solitaire",
    description:
      "A desktop Solitaire implementation built with LibGDX (Java). I aimed to implement the game logic myself rather than rely on a full game engine so it would be lightweight and easy to ship to family members.",
    img: PixelSolitaireImg,
    tags: ["Java", "LibGDX", "Game"],
    year: 2023,
    links: [
      { label: "Repo (GitHub)", href: "https://github.com/jwbmarten/PixelSolitaireREDUX" },
    ],
  },
];

export default function ProjectsSection(): JSX.Element {
  return (
    <div className="w-full flex flex-col items-center">
      {projects.map((p) => (
        <div key={p.id} className="w-full flex justify-center max-w-[1400px] rounded-lg p-6 gap-6 ">
          <div className="w-full max-w-[1400px] px-6">
            <ProjectCard
              projectImg={p.img}
              text={
                (
                  <div>
                    <h3 className="text-3xl font-arvo text-[#fdd262] mb-2">{p.title}</h3>
                    <p className="text-sm text-white">{p.description}</p>
                    {p.links && p.links.length > 0 && (
                      <div className="mt-4 flex gap-3">
                        {p.links.map((l) => (
                          <a
                            key={l.href}
                            href={l.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block rounded bg-[#fdd262] text-black px-3 py-1 text-sm font-medium"
                          >
                            {l.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )
              }
            />
          </div>
        </div>
      ))}
    </div>
  );
}
