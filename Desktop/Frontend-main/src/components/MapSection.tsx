import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation, Package, Clock } from "lucide-react";

// Mock map interface - Replace with actual Google Maps integration
const MapSection = () => {
  const [apiKey, setApiKey] = useState("");
  const [showKeyInput, setShowKeyInput] = useState(true);
  const mapRef = useRef<HTMLDivElement>(null);

  // Mock donor and receiver locations
  const locations = [
    {
      id: "1",
      type: "donor",
      name: "Green Palace Restaurant",
      lat: 12.9716,
      lng: 77.5946,
      food: "Breakfast - Idli, Vada",
      status: "available",
      time: "Available until 10:00 AM"
    },
    {
      id: "2",
      type: "donor",
      name: "Hotel Sunset",
      lat: 12.9667,
      lng: 77.6000,
      food: "Lunch - Chicken Curry, Rice",
      status: "in-transit",
      time: "Pickup in progress"
    },
    {
      id: "3",
      type: "receiver",
      name: "Hope Foundation",
      lat: 12.9800,
      lng: 77.5800,
      food: "Requested: 50 meals",
      status: "waiting",
      time: "Urgent need"
    }
  ];

  useEffect(() => {
    if (apiKey && mapRef.current) {
      // This would initialize Google Maps with the API key
      initializeMap();
    }
  }, [apiKey]);

  const initializeMap = () => {
    // Mock map initialization - Replace with actual Google Maps setup
    console.log("Initializing map with API key:", apiKey);
    setShowKeyInput(false);
  };

  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Real-Time Food Map
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Track food donations and deliveries in real-time. See available food near you and connect instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Container */}
          <div className="lg:col-span-2">
            <Card className="h-[500px]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Live Food Distribution Map
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[400px] relative">
                {showKeyInput ? (
                  <div className="flex flex-col items-center justify-center h-full space-y-4 bg-muted/30 rounded-lg">
                    <MapPin className="w-16 h-16 text-muted-foreground" />
                    <h3 className="text-lg font-semibold">Google Maps Integration</h3>
                    <p className="text-sm text-muted-foreground text-center max-w-sm">
                      Enter your Google Maps API key to enable real-time location tracking
                    </p>
                    <div className="flex gap-2 w-full max-w-md">
                      <Input
                        placeholder="Enter Google Maps API Key"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        type="password"
                      />
                      <Button onClick={initializeMap} disabled={!apiKey}>
                        Enable Map
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Get your API key from{" "}
                      <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        Google Cloud Console
                      </a>
                    </p>
                  </div>
                ) : (
                  <div className="h-full bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                      <p className="text-lg font-semibold">Map Loading...</p>
                      <p className="text-sm text-muted-foreground">
                        Google Maps would be initialized here with real locations
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Location List */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Active Locations</h3>
            {locations.map((location) => (
              <Card key={location.id} className="border-l-4 border-l-primary hover:shadow-gentle transition-all">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-sm">{location.name}</h4>
                      <p className="text-xs text-muted-foreground">{location.food}</p>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        location.status === 'available' ? 'border-veg text-veg' :
                        location.status === 'in-transit' ? 'border-egg text-egg' :
                        'border-non-veg text-non-veg'
                      }`}
                    >
                      {location.type === 'donor' ? '🍽️' : '🏠'} {location.type}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{location.time}</span>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 h-8 text-xs">
                      <Navigation className="w-3 h-3 mr-1" />
                      Navigate
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 h-8 text-xs">
                      <Package className="w-3 h-3 mr-1" />
                      Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <div className="text-center pt-4">
              <Button variant="outline" className="w-full">
                <MapPin className="w-4 h-4 mr-2" />
                View All Locations
              </Button>
            </div>
          </div>
        </div>

        {/* Map Instructions */}
        <Card className="mt-8 bg-gradient-to-r from-primary/5 to-secondary/5">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">How to Use the Map</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-veg flex items-center justify-center text-white text-xs font-bold">1</div>
                <div>
                  <h4 className="font-semibold">Find Food Donors</h4>
                  <p className="text-muted-foreground">Red markers show restaurants and hotels with available food</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-white text-xs font-bold">2</div>
                <div>
                  <h4 className="font-semibold">Track Deliveries</h4>
                  <p className="text-muted-foreground">Follow real-time progress of food pickup and delivery</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center text-white text-xs font-bold">3</div>
                <div>
                  <h4 className="font-semibold">Connect Instantly</h4>
                  <p className="text-muted-foreground">Contact donors or receivers directly through the map</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default MapSection;