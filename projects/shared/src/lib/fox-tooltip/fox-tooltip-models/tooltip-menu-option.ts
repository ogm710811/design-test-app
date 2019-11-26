export interface TooltipMenuOption {
  icon?: string;
  label: string;
  action?(action?: string): void;
}
