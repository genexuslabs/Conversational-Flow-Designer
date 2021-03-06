import { Config } from "@stencil/core";
import { sass } from "@stencil/sass";

export const config: Config = {
  namespace: "gxcf-conversational-flows",
  outputTargets: [
    {
      type: "dist"
    },
    {
      type: "www",
      serviceWorker: null,
      copy: [
        { src: "../node_modules/@genexus/gemini/dist/gemini", dest: "build" }
      ]
    }
  ],
  plugins: [
    sass({
      injectGlobalPaths: [
        "src/global/global.scss",
        "src/global/mixins.scss",
        "src/global/token-animations.scss",
        "src/global/token-fonts.scss",
        "src/global/token-icons.scss",
        "src/global/token-boxing.scss"
      ]
    })
  ]
};
