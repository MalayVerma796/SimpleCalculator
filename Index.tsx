import { Calculator } from "@/components/Calculator";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[hsl(250,60%,12%)] via-[hsl(262,70%,20%)] to-[hsl(250,60%,12%)] p-4">
      <div className="mb-8 text-center">
        <h1 className="text-5xl font-bold text-foreground mb-2 tracking-tight">Calculator</h1>
        <p className="text-muted-foreground">Simple & elegant</p>
      </div>
      <Calculator />
    </div>
  );
};

export default Index;
