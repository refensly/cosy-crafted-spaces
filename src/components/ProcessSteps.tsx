interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

interface ProcessStepsProps {
  steps: ProcessStep[];
  className?: string;
}

const ProcessSteps = ({ steps, className = '' }: ProcessStepsProps) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 ${className}`}>
      {steps.map((step, index) => (
        <div key={step.number} className="text-center space-y-4">
          {/* Step number */}
          <div className="text-accent-primary font-heading font-light text-4xl md:text-5xl tracking-wider">
            {step.number}
          </div>
          
          {/* Content */}
          <div className="space-y-2">
            <h3 className="font-heading font-light text-text-primary text-xl md:text-2xl">
              {step.title}
            </h3>
            <p className="text-text-secondary text-sm md:text-base font-light leading-relaxed">
              {step.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProcessSteps;