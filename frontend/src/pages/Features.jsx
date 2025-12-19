import FeatureCard from "../components/FeatureCard";

export default function Features() {
  return (
    <section
      id="features"
      className="py-24 bg-black text-white px-6"
    >
      {/* Section Heading */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold">
          Core <span className="text-green-400">SCM Capabilities</span>
        </h2>
        <p className="text-gray-400 mt-4">
          Built on industry-standard Software Configuration Management principles
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        <FeatureCard
          icon="🔗"
          title="Repository Management"
          description="Register and monitor multiple Git repositories with branch-level tracking and real-time status."
        />

        <FeatureCard
          icon="📌"
          title="Baseline Control"
          description="Create approved configuration baselines from specific commits with rollback support."
        />

        <FeatureCard
          icon="⚠️"
          title="Drift Detection"
          description="Automatically detect unauthorized changes by comparing current states with baselines."
        />

        <FeatureCard
          icon="🔄"
          title="Change Workflows"
          description="Formal submission, review, and approval of configuration changes with audit trails."
        />

        <FeatureCard
          icon="📜"
          title="Audit Logging"
          description="Immutable logs tracking system events, changes, and approvals for compliance."
        />

        <FeatureCard
          icon="🛡️"
          title="Role-Based Access"
          description="Admin, Developer, and Viewer roles with controlled permissions."
        />
      </div>
    </section>
  );
}
