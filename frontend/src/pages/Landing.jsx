import Hero from "./Hero";
import Features from "./Features";
import Architecture from "./Architecture";
import Workflow from "./Workflow";

export default function Landing({ onLogin }) {
  return (
    <>
      <Hero onLogin={onLogin} />
      <Features />
      <Architecture />
      <Workflow />
    </>
  );
}
