import type { ComponentPropsWithoutRef, CSSProperties, FC } from "react";

import { cn } from "@/lib/utils";

export interface AnimatedShinyTextProps
  extends ComponentPropsWithoutRef<"span"> {
  shimmerWidth?: number;
}

export const AnimatedShinyText: FC<AnimatedShinyTextProps> = ({
  children,
  className,
  shimmerWidth = 100,
  ...props
}) => {
  return (
    <span
      style={
        {
          "--shiny-width": `${shimmerWidth}px`,
        } as CSSProperties
      }
      className={cn(
        "mx-auto max-w-md text-neutral-600/80 dark:text-neutral-400/70",

        // Shine effect
        "animate-shiny-text bg-clip-text bg-no-repeat [background-position:0_0] [background-size:var(--shiny-width)_100%] [transition:background-position_1s_cubic-bezier(.6,.6,0,1)_infinite]",

        // Shine gradient
        "bg-gradient-to-r from-transparent via-black/80 via-50% to-transparent  dark:via-white/80",

        className,
      )}
      {...props}
    >
      {children}
    </span>
    
  );
};


// import { useEffect, useRef, useState } from "react";
// import type { ComponentPropsWithoutRef, FC, CSSProperties } from "react";
// import { cn } from "@/lib/utils";

// export interface AnimatedShinyTextProps extends ComponentPropsWithoutRef<"span"> {
//   shimmerWidth?: number; // valor por default si no se detecta ancho
// }

// export const AnimatedShinyText: FC<AnimatedShinyTextProps> = ({
//   children,
//   className,
//   shimmerWidth = 100,
//   ...props
// }) => {
//   const spanRef = useRef<HTMLSpanElement>(null);
//   const [calculatedShimmerWidth, setCalculatedShimmerWidth] = useState(shimmerWidth);

//   useEffect(() => {
//     const span = spanRef.current;
//     if (span) {
//       const resizeObserver = new ResizeObserver(() => {
//         const width = span.clientWidth;
//         // Adjust brightness based on the width of the text
//         setCalculatedShimmerWidth(Math.max(80, Math.min(width * 1.2, 300))); 
//       });

//       resizeObserver.observe(span);

//       return () => resizeObserver.disconnect();
//     }
//   }, []);

//   return (
//     <span
//       ref={spanRef}
//       style={
//         {
//           "--shiny-width": `${calculatedShimmerWidth}px`,
//         } as CSSProperties
//       }
//       className={cn(
//         "mx-auto max-w-md text-neutral-600/80 dark:text-neutral-400/70",
//         "animate-shiny-text bg-clip-text bg-no-repeat [background-position:0_0] [background-size:var(--shiny-width)_100%] [transition:background-position_1s_cubic-bezier(.6,.6,0,1)_infinite]",
//         "bg-gradient-to-r from-transparent via-black/80 via-50% to-transparent dark:via-white/80",
//         className,
//       )}
//       {...props}
//     >
//       {children}
//     </span>
//   );
// };
