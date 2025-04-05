import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="gap-4">
      <Button variant="primary">Get Started</Button>
      <Button variant="secondary">secondary</Button>
      <Button variant="destructive">destructive</Button>
      <Button variant="outline">outline</Button>
      <Button variant="ghost">ghost</Button>
      <Button variant="muted">muted</Button>
      <Button variant="teritary">teritary</Button>
    </div>
  );
}
