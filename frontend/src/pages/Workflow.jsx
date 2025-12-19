export default function Workflow() {
  const steps = [
    { id: 1, title: "Register Repository", desc: "Admin adds Git repository to monitoring" },
    { id: 2, title: "Create Baseline", desc: "Establish approved configuration state" },
    { id: 3, title: "Monitor Changes", desc: "System continuously tracks repository" },
    { id: 4, title: "Detect Drift", desc: "Identify unauthorized modifications" },
    { id: 5, title: "Submit Change", desc: "Developer raises formal change request" },
    { id: 6, title: "Review & Approve", desc: "Admin reviews diff and approves changes" },
    { id: 7, title: "Update Baseline", desc: "Approved state becomes new baseline" },
    { id: 8, title: "Audit Trail", desc: "All actions logged for compliance" },
  ];

  return (
    <section
      id="workflow"
      className="py-24 bg-black text-white px-6"
    >
      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold">
          End-to-End <span className="text-green-400">Workflow</span>
        </h2>
        <p className="text-gray-400 mt-4">
          Complete change control lifecycle from submission to compliance
        </p>
      </div>

      {/* Timeline */}
      <div className="max-w-3xl mx-auto relative">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-800"></div>

        <div className="space-y-8">
          {steps.map((step) => (
            <div key={step.id} className="flex items-start gap-6">
              {/* Step number */}
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-black font-bold text-sm z-10">
                {step.id}
              </div>

              {/* Step content */}
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 w-full">
                <h3 className="font-semibold text-white">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-sm mt-1">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
