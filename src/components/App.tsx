"use client";
import Image from "next/image";
import me1 from "../../public/me1.jpeg";
import me2 from "../../public/me2.jpeg";
import { useEffect, useRef } from "react";
import { Draggable } from "gsap/all";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(Draggable);

const App = () => {
  const container = useRef<HTMLDivElement>(null);
  const draggableRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      const dragEl = draggableRef.current;
      const maskEl = maskRef.current;
      const container = document.getElementById("draggable-container");

      if (!dragEl || !maskEl || !container) return;

      const dragWidth = dragEl.offsetWidth;
      const containerWidth = container.offsetWidth;

      Draggable.create(dragEl, {
        type: "x",
        bounds: {
          minX: 0,
          maxX: containerWidth - dragWidth,
        },
        onDrag: function () {
          const x = this.x;
          maskEl.style.maskPosition = `${x}px 50%`;
        },
        onRelease: function () {
          gsap.to(dragEl, {
            duration: 0.5,
            x: 0,
            onUpdate: () => {
              const x = gsap.getProperty(dragEl, "x") as number;
              maskEl.style.maskPosition = `${x}px 50%`;
            },
          });
        },
      });
    },
    { scope: container }
  );

  return (
    <div
      ref={container}
      className="relative w-screen h-screen flex justify-center items-center"
    >
      <div id="draggable-container" className="relative w-[80%] h-[500px] ">
        <div
          ref={maskRef}
          className="mask h-full w-full mx-auto  flex justify-between items-center rounded-lg"
        >
          <div className="relative overflow-hidden rounded-lg h-full w-[400px] pointer-events-none ">
            <Image
              src={me1}
              fill
              style={{ objectFit: "cover" }}
              alt="me"
              ref={imageRef}
            />
          </div>
          <div className="relative overflow-hidden rounded-lg h-full w-[400px] pointer-events-none">
            <Image src={me2} fill style={{ objectFit: "cover" }} alt="me" />
          </div>
          <div
            ref={draggableRef}
            className=" absolute  bg-blue-500/15 overflow-hidden rounded-lg  top-0 left-0 z-50  h-full w-[400px] flex justify-center items-center group"
          >
            <div className="circle text-sm w-24 h-24 rounded-full bg-blue-600 text-white scale-0 group-hover:scale-100 transition-all duration-700 flex justify-center items-center font-semibold uppercase">
              DRAG ME <span className="chevrons text-xl">→</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
