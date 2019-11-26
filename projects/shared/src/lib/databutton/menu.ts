export class Menu {
  key?: string;
  kind?: MenuKind;
  title?: string;
  visible?: Function;
  disabled?: Function;
  isVisible?: boolean = true;
  isDisabled?: boolean = false;

}

export enum MenuKind {
  MenuItem, Divider
}
