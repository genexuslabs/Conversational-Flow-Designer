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

  private static getStrings(component: string, lang: string): Promise<any> {
    return new Promise((resolve, reject): void => {
      fetch(
        Locale.commonAssetsPath +
          Locale.folder +
          component +
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

  public static async getComponentStrings(element: HTMLElement): Promise<any> {
    const component = element.tagName.toLowerCase();
    const lang = Locale.getLang();
    let strings;
    try {
      strings = await Locale.getStrings(component, lang);
    } catch (e) {
      strings = await Locale.getStrings(component, Locale.defaultLanguage);
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
    let hint = await external.GetHint(property);

    if (hint == "") hint = PropertiesDefinition.GetDescription(property);

    return hint;
  }
}
