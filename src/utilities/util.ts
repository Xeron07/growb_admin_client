import {
  BuildingStorefrontIcon,
  CalculatorIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  HomeIcon,
  SwatchIcon,
} from "@heroicons/react/24/outline";
// Function to concatenate multiple CSS class names
export const ClassNames = (...classNames: (string | undefined)[]): string => {
  return classNames.filter(Boolean).join(" ");
};

//"https://res.cloudinary.com/emerging-it/image/upload/v1697923562/Growb/nbj932fhmcgeqahmn9x1.png";

export const projectLogo = "/android-chrome-192x192.png";
// ("https://res.cloudinary.com/emerging-it/image/upload/v1690594985/demo-task/GrowB/logo_v6uhgm.png");

export const navigation = [
  { name: "Dashboard", href: "/", icon: HomeIcon, current: true },
  {
    name: "Retailers",
    href: "/retailer",
    icon: BuildingStorefrontIcon,
    current: false,
  },
  {
    name: "Transections",
    href: "/transection",
    icon: CalculatorIcon,
    current: false,
  },
  { name: "Manufacturers", href: "#", icon: SwatchIcon, current: false },
  { name: "Documents", href: "#", icon: DocumentDuplicateIcon, current: false },
  { name: "Reports", href: "#", icon: ChartPieIcon, current: false },
];
