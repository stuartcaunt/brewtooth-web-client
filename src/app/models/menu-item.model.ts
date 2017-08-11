export interface MenuItem {
  title: string;
  route?: string;
  description?: string;
  children?: MenuItem[];
}
