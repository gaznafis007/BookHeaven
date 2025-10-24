import { Card } from "@/components/ui/card";
import { BookOpen, Truck, Gift, Users } from "lucide-react";

export function Services() {
  const services = [
    {
      icon: BookOpen,
      title: "Curated Collections",
      description:
        "Hand-picked selections from our expert librarians to match your reading preferences.",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description:
        "Get your books delivered to your doorstep within 2-3 business days.",
    },
    {
      icon: Gift,
      title: "Gift Wrapping",
      description:
        "Beautiful gift wrapping available for all occasions and special moments.",
    },
    {
      icon: Users,
      title: "Book Club",
      description:
        "Join our community of readers and participate in monthly book discussions.",
    },
  ];

  return (
    <section
      id="services"
      className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-background"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary font-semibold text-sm uppercase tracking-wide mb-2">
            What We Provide
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Everything for Book Lovers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're committed to providing the best reading experience with
            premium services and support.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-shadow bg-card border-border"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
