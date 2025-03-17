import React, { JSX } from "react";
import ProjectCard from "../layout/ProjectCard";
import PixelSolitaireImg from '../../assets/PixelSolitaire.png'



export default function ProjectSummary(): JSX.Element {
  return (
    <div className='flex flex-col items-center w-full '>
      <ProjectCard 
      projectImg={PixelSolitaireImg}
      text={<p>Growing up, I spent summers with my grandfather, who often passed the evenings playing solitaire at the kitchen table with a well-worn deck of cards from his Air Force days. As a gift to him, and a challenge to myself, I wanted to create a desktop version of the game that he could to easily install and play on his Windows machine. Rather than use a simplified game engine such as Unity or Godot, I wanted to write as much of the game myself as I could in a feasible timeframe. I settled on using LibGDX, which is a basic game framework written in Java and has a small but dedicated userbase.</p>}
      />
    </div>
  );
}
