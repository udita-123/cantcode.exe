import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Package, Phone } from "lucide-react";
import FoodCategoryBadge from "./FoodCategoryBadge";

interface DonorItem {
  id: string;
  donorName: string;
  donorType: string;
  mealType: "breakfast" | "lunch" | "dinner";
  foodItems: string[];
  quantity: string;
  packets: number;
  preparedTime: string;
  availableUntil: string;
  location: string;
  contact: string;
  category: "veg" | "non-veg" | "egg";
}

const mockDonors: DonorItem[] = [
  {
    id: "1",
    donorName: "Green Palace Restaurant",
    donorType: "Restaurant",
    mealType: "breakfast",
    foodItems: ["Idli", "Vada", "Sambar", "Chutney"],
    quantity: "5 kg",
    packets: 20,
    preparedTime: "07:30 AM",
    availableUntil: "10:00 AM",
    location: "MG Road, Bangalore",
    contact: "+91 98765 43210",
    category: "veg"
  },
  {
    id: "2",
    donorName: "Hotel Sunset",
    donorType: "Hotel",
    mealType: "lunch",
    foodItems: ["Chicken Curry", "Rice", "Chapati", "Dal"],
    quantity: "8 kg",
    packets: 30,
    preparedTime: "12:00 PM",
    availableUntil: "03:00 PM",
    location: "Brigade Road, Bangalore",
    contact: "+91 98765 43211",
    category: "non-veg"
  },
  {
    id: "3",
    donorName: "Hostel Cafeteria",
    donorType: "Hostel",
    mealType: "dinner",
    foodItems: ["Egg Fried Rice", "Manchurian", "Soup"],
    quantity: "6 kg",
    packets: 25,
    preparedTime: "07:00 PM",
    availableUntil: "09:30 PM",
    location: "Koramangala, Bangalore",
    contact: "+91 98765 43212",
    category: "egg"
  }
];

const DailyDonorList = () => {
  const getMealTimeColor = (mealType: string) => {
    switch (mealType) {
      case "breakfast": return "bg-warning text-white";
      case "lunch": return "bg-primary text-white";
      case "dinner": return "bg-secondary text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const groupedDonors = mockDonors.reduce((acc, donor) => {
    if (!acc[donor.mealType]) acc[donor.mealType] = [];
    acc[donor.mealType].push(donor);
    return acc;
  }, {} as Record<string, DonorItem[]>);

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Today's Food Donors
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real-time list of available food donations for breakfast, lunch, and dinner
          </p>
        </div>

        <div className="space-y-8">
          {Object.entries(groupedDonors).map(([mealType, donors]) => (
            <div key={mealType}>
              <div className="flex items-center gap-3 mb-6">
                <Badge className={`${getMealTimeColor(mealType)} px-4 py-2 text-lg font-semibold capitalize`}>
                  {mealType}
                </Badge>
                <span className="text-muted-foreground">
                  {donors.length} donor{donors.length !== 1 ? 's' : ''} available
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {donors.map((donor) => (
                  <Card key={donor.id} className="hover:shadow-elevated transition-all duration-300 border-l-4 border-l-primary">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{donor.donorName}</CardTitle>
                          <p className="text-sm text-muted-foreground">{donor.donorType}</p>
                        </div>
                        <FoodCategoryBadge category={donor.category} />
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Food Items:</h4>
                        <p className="text-sm text-muted-foreground">
                          {donor.foodItems.join(", ")}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-primary" />
                          <span>{donor.quantity}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {donor.packets} packets
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>Prepared: {donor.preparedTime}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>Available until: {donor.availableUntil}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span>{donor.location}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button size="sm" className="flex-1 bg-gradient-primary hover:shadow-food">
                          <Phone className="w-4 h-4 mr-2" />
                          Contact
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <MapPin className="w-4 h-4 mr-2" />
                          Navigate
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DailyDonorList;