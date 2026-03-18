import type {
  QuartzComponent,
  QuartzComponentProps,
  QuartzComponentConstructor,
} from "@quartz-community/types";
import style from "./styles/pseudo.scss";
import script from "./scripts/pseudo.inline.ts";

export interface PseudoOptions {}

export default ((_opts?: PseudoOptions) => {
  const Pseudo: QuartzComponent = ({ children }: QuartzComponentProps) => {
    return <>{children}</>;
  };

  Pseudo.css = style;
  Pseudo.afterDOMLoaded = script as string;

  return Pseudo;
}) satisfies QuartzComponentConstructor;
