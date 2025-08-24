import { Badge } from "@/components/ui/badge";
import { Leaf, Egg, Beef } from "lucide-react";

interface FoodCategoryBadgeProps {
  category: "veg" | "non-veg" | "egg";
  className?: string;
}

const FoodCategoryBadge = ({ category, className }: FoodCategoryBadgeProps) => {
  const getConfig = () => {
    switch (category) {
      case "veg":
        return {
          color: "bg-veg text-white",
          icon: <Leaf className="w-3 h-3" />,
          label: "Veg"
        };
      case "non-veg":
        return {
          color: "bg-non-veg text-white",
          icon: <Beef className="w-3 h-3" />,
          label: "Non-Veg"
        };
      case "egg":
        return {
          color: "bg-egg text-white",
          icon: <Egg className="w-3 h-3" />,
          label: "Egg"
        };
    }
  };

  const config = getConfig();

  return (
    <Badge className={`${config.color} gap-1 ${className}`}>
      {config.icon}
      {config.label}
    </Badge>
  );
};

export default FoodCategoryBadge;