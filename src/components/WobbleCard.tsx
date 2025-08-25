"use client";
import { WobbleCard as WobbleCardComponent } from "@/components/ui/wobble-card";

const bento = `
    @keyframes Bento {
        0% {
            opacity: 0;
            filter: blur(8px);
            transform: scale(0.50) translateY(50%) translateX(20%);
        }
        100% {
            opacity: 1;
            filter: blur(0px);
            transform: scale(1) translateY(0%) translateX(0%);
        }
    }
`;

const colors = [
    "bg-iris-800",
    "bg-jade-800",
    "bg-tomato-800",
    "bg-ruby-800",
    "bg-olive-800",
    "bg-gunmetal-800",
    "bg-zircon",
]

export default function WobbleCard(props: {index: number; className: string, title: string, description: string, href: string}) {
    const boxNumber = props.index + 1;
    return (
        <div className={props.className + " box-" + boxNumber}
        style={{
            gridArea: "box-" + boxNumber,
            animation: "Bento 1.4s ease 0.1s 1 normal both",
        }}
        >
            <style>
                {bento}
            </style>
            <a href={props.href} data-astro-prefetch="tap">
                <WobbleCardComponent
                    containerClassName={colors[props.index] + " h-full"}
                    className=""
                >
                    <div className="max-w-xs">
                        <h2 className="text-center text-pretty text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                            {props.title}
                        </h2>
                        {/* <p className="mt-4 text-left  text-base/6 text-neutral-200">
                            {props.description}
                        </p> */}
                    </div>
                </WobbleCardComponent>
            </a>
        </div>

    );
}
