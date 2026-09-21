declare module "../../vendor/webgpu-galaxy/galaxy.js" {
  export class GalaxySimulation {
    constructor(scene: unknown, config: unknown, cloudTexture?: unknown);
    createGalaxySystem(): void;
    createClouds(): void;
    update(
      renderer: unknown,
      deltaTime: number,
      mouse3D: unknown,
      mousePressed: boolean,
    ): Promise<void>;
  }
}

declare module "three/webgpu";
declare module "three/tsl";
declare module "three/addons/tsl/display/BloomNode.js";
