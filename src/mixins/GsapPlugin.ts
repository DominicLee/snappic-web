import {gsap} from "gsap";

type gsapPopOptions = {
  scale: number;
  opacity: number;
  duration: number;
  ease: string;
  stagger?: number;
  delay?: number;
}

type gsapSlideOptions = {
  x?: number;
  y?: number;
  opacity: number;
  duration: number;
  ease: string;
  stagger?: number;
  delay?: number;
}

export function useGsap() {

  const popIn = (targetElements: HTMLCollectionOf<Element>, stagger: number = 0, delay: number = 0) => {

    let gsapOptions: gsapPopOptions = {
      scale: 0.01,
      opacity: 0,
      duration: 0.5,
      ease: "back.out(3)",
    }

    if (stagger > 0) {
      gsapOptions.stagger = stagger;
    }

    if (delay > 0) {
      gsapOptions.delay = delay;
    }

    gsap.from(targetElements, gsapOptions);
  };

  const slideInLeft = (targetElements: HTMLCollectionOf<Element>, stagger: number = 0, delay: number = 0) => {

    let gsapOptions: gsapSlideOptions = {
      x: -200,
      opacity: 0,
      duration: 1,
      ease: "back.out(3)",
    }

    if (stagger > 0) {
      gsapOptions.stagger = stagger;
    }

    if (delay > 0) {
      gsapOptions.delay = delay;
    }

    gsap.from(targetElements, gsapOptions);
  };

  const slideInRight = (targetElements: HTMLCollectionOf<Element>, stagger: number = 0, delay: number = 0) => {

    let gsapOptions: gsapSlideOptions = {
      x: 200,
      opacity: 0,
      duration: 1,
      ease: "back.out(3)",
    }

    if (stagger > 0) {
      gsapOptions.stagger = stagger;
    }

    if (delay > 0) {
      gsapOptions.delay = delay;
    }

    gsap.from(targetElements, gsapOptions);
  };

  const slideInUp = (targetElements: HTMLCollectionOf<Element>, distance: number = 50, stagger: number = 0, delay: number = 0, duration: number = 1) => {

    let gsapOptions: gsapSlideOptions = {
      y: distance,
      opacity: 0,
      duration: duration,
      ease: "back.out(3)",
    }

    if (stagger > 0) {
      gsapOptions.stagger = stagger;
    }

    if (delay > 0) {
      gsapOptions.delay = delay;
    }

    gsap.from(targetElements, gsapOptions);
  };

  const slideInDown = (targetElements: HTMLCollectionOf<Element>, stagger: number = 0, delay: number = 0) => {

    let gsapOptions: gsapSlideOptions = {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: "back.out(3)",
    }

    if (stagger > 0) {
      gsapOptions.stagger = stagger;
    }

    if (delay > 0) {
      gsapOptions.delay = delay;
    }

    gsap.from(targetElements, gsapOptions);
  };

  return {
    popIn, slideInLeft, slideInRight, slideInDown, slideInUp
  };
}
