import type { Domain } from '@/types';

export const DOMAINS: Domain[] = [
  {
    id: 'cloud-concepts',
    name: 'Describe cloud concepts',
    shortName: 'Cloud Concepts',
    examWeight: '25–30%',
    description: 'Cloud models, consumption-based pricing, and the differences between CapEx vs. OpEx.',
    color: '#2f87f5',
    icon: 'Cloud',
    subtopics: [
      { id: 'cc-cloud-models', name: 'Public, Private & Hybrid cloud', weight: 30 },
      { id: 'cc-shared-resp', name: 'Shared responsibility model', weight: 25 },
      { id: 'cc-consumption', name: 'Consumption-based & pricing models', weight: 25 },
      { id: 'cc-capex-opex', name: 'CapEx vs. OpEx', weight: 20 },
    ],
  },
  {
    id: 'azure-architecture',
    name: 'Describe Azure architecture and services',
    shortName: 'Azure Architecture',
    examWeight: '35–40%',
    description: 'Regions, availability zones, compute, storage, networking, and identity services.',
    color: '#10b981',
    icon: 'Server',
    subtopics: [
      { id: 'aa-regions', name: 'Regions & availability zones', weight: 20 },
      { id: 'aa-compute', name: 'Compute services (VMs, AKS, Functions)', weight: 25 },
      { id: 'aa-storage', name: 'Storage services & redundancy', weight: 25 },
      { id: 'aa-networking', name: 'Networking (VNet, Load Balancer)', weight: 15 },
      { id: 'aa-identity', name: 'Identity, governance & Entra ID', weight: 15 },
    ],
  },
  {
    id: 'management-governance',
    name: 'Describe Azure management and governance',
    shortName: 'Management & Governance',
    examWeight: '30–35%',
    description: 'Cost management, monitoring, governance tools, and resource lifecycle.',
    color: '#f59e0b',
    icon: 'ShieldCheck',
    subtopics: [
      { id: 'mg-cost', name: 'Cost management & pricing calculator', weight: 25 },
      { id: 'mg-governance', name: 'Policy, RBAC & Blueprints', weight: 25 },
      { id: 'mg-monitoring', name: 'Monitor, Log Analytics & alerts', weight: 25 },
      { id: 'mg-tooling', name: 'Portal, CLI, PowerShell & ARM', weight: 25 },
    ],
  },
];

export const DOMAIN_MAP: Record<string, Domain> = Object.fromEntries(
  DOMAINS.map((d) => [d.id, d]),
);
