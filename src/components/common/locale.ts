import { PropertiesDefinition } from "./helpers";

export class Locale {
  private static defaultLanguage = "en";
  private static folder = "assets/";
  private static folderSuffix = "-lang/";
  private static langPrefix = ".lang.";
  private static langExt = ".json";
  public static commonAssetsPath = "";

  private static getLang(): string {
    return document
      .getElementsByTagName("html")[0]
      .getAttribute("lang")
      .valueOf();
  }

  private static getStrings(
    component: string,
    lang: string,
    folder: string
  ): Promise<any> {
    if (folder === "") folder = component;
    return new Promise((resolve, reject): void => {
      fetch(
        Locale.commonAssetsPath +
          Locale.folder +
          folder +
          Locale.folderSuffix +
          component +
          Locale.langPrefix +
          lang +
          Locale.langExt
      ).then(
        langFile => {
          if (langFile.ok) resolve(langFile.json());
          else reject();
        },
        () => reject()
      );
    });
  }

  public static async getComponentStrings(
    element: HTMLElement,
    folder = "",
    component = ""
  ): Promise<any> {
    if (component == "") component = element.tagName.toLowerCase();
    const lang = Locale.getLang();
    let strings;
    try {
      strings = await Locale.getStrings(component, lang, folder);
    } catch (e) {
      strings = await Locale.getStrings(
        component,
        Locale.defaultLanguage,
        folder
      );
    }
    return strings;
  }

  public static format(text: string, parms: string[]): string {
    let ret: string = text;
    parms.forEach(parm => {
      ret = ret.replace(`{${parms.indexOf(parm)}}`, parm);
    });
    return ret;
  }

  public static async getHint(property: string): Promise<string> {
    const external: any = window.external;
    let hint = "";
    if (external.GetHint) {
      hint = await external.GetHint(property);
    }
    if (hint == "") hint = PropertiesDefinition.GetDescription(property);
    return hint;
  }
}
