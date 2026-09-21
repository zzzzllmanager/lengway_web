declare module "galaxyjs-vendored" {
  type GalaxyController = {
    start: () => GalaxyController;
    stop: () => GalaxyController;
    pause: () => GalaxyController;
    resume: () => GalaxyController;
    update: (options: Record<string, unknown>) => GalaxyController;
    options: () => Record<string, unknown>;
    destroy: () => void;
    el: HTMLElement;
    canvas: HTMLCanvasElement;
  };

  type GalaxyAPI = {
    create: (
      type: string,
      target: string | HTMLElement,
      options?: Record<string, unknown>,
    ) => GalaxyController;
    rendererOf: (name: string) => "2d" | "webgl2" | "three";
    destroyAll: () => void;
    prefersReducedMotion: boolean;
    VERSION?: string;
  };

  const Galaxy: GalaxyAPI;
  export default Galaxy;
}
