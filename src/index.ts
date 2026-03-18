import type { QuartzComponent, QuartzComponentConstructor } from "@quartz-community/types";
import Pseudo from "./components/Pseudo";
import type { PseudoOptions } from "./components/Pseudo";

const defaultOptions: PseudoOptions = {};

const PseudoComponent: QuartzComponentConstructor<PseudoOptions> = (userOpts?: PseudoOptions) => {
  const opts = { ...defaultOptions, ...userOpts };

  const Component: QuartzComponent = Pseudo(opts);

  return Component;
};

export default PseudoComponent;
export { PseudoComponent as Pseudo };
export type { PseudoOptions };

// Export the init function so YAML users can configure it in quartz.config.yaml
export function init(options?: Record<string, unknown>): void {
  // If you add features to PseudoOptions later,
  // you can capture and process them here.
  const _myOpts = options as PseudoOptions | undefined;
}

// Re-export shared types from @quartz-community/types
export type {
  QuartzComponent,
  QuartzComponentProps,
  QuartzComponentConstructor,
  StringResource,
  QuartzTransformerPlugin,
  QuartzFilterPlugin,
  QuartzEmitterPlugin,
  QuartzPageTypePlugin,
  QuartzPageTypePluginInstance,
  PageMatcher,
  PageGenerator,
  VirtualPage,
} from "@quartz-community/types";
