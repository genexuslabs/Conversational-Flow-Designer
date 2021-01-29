if (process.env.NODE_ENV === "development") {
  import("@genexus/gemini");
}
export { Components, JSX } from "./components";
export { GXCFModel } from "./components/common/model";
