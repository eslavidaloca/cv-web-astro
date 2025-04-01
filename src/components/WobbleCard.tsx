"use client";
import { WobbleCard as WC } from "@/components/ui/wobble-card";

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

export default function WobbleCard(props: {index: number; className: string, title: string, description: string }) {
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
            <WC
                containerClassName="h-full bg-pink-800"
                className=""
            >
                <div className="max-w-xs">
                    <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                        {props.title}
                    </h2>
                    <p className="mt-4 text-left  text-base/6 text-neutral-200">
                        {props.description}
                    </p>
                </div>
            </WC>
        </div>
        // <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
        //     {/* <WC containerClassName="col-span-1 min-h-[300px]">
        //         <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
        //             No shirt, no shoes, no weapons.
        //         </h2>
        //         <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
        //             If someone yells “stop!”, goes limp, or taps out, the fight is over.
        //         </p>
        //     </WC>
        //     <WC containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
        //         <div className="max-w-sm">
        //             <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
        //                 Signup for blazing-fast cutting-edge state of the art Gippity AI
        //                 wrapper today!
        //             </h2>
        //             <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
        //                 With over 100,000 mothly active bot users, Gippity AI is the most
        //                 popular AI platform for developers.
        //             </p>
        //         </div>
        //     </WC> */}
        // </div>
    );
}
