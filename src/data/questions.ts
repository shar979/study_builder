import type { Question } from '@/types';

export const QUESTIONS: Question[] = [
  // ─────────────────────────────────────────────────────────────────────
  // DOMAIN 1 — CLOUD CONCEPTS
  // ─────────────────────────────────────────────────────────────────────

  // cc-cloud-models
  {
    id: 'q-001',
    domainId: 'cloud-concepts',
    subtopicId: 'cc-cloud-models',
    difficulty: 'foundation',
    prompt:
      'An organization wants to host a customer-facing web application in Azure but does not want to maintain physical servers or networking hardware. Which cloud model best fits this scenario?',
    options: [
      'Private cloud',
      'Public cloud',
      'Hybrid cloud',
      'On-premises datacenter',
    ],
    correctIndex: 1,
    whyCorrect:
      'A public cloud is owned and operated by a third-party provider (Microsoft) and delivered over the internet. You consume compute, storage, and networking as services without owning or maintaining the underlying physical hardware — exactly what this organization wants.',
    whyWrong: [
      'A private cloud is infrastructure used exclusively by one organization, often hosted on-premises or by a hosted provider. It still requires you to own/operate the hardware, which contradicts the requirement.',
      'A hybrid cloud combines public and private clouds with data and workload portability. The scenario describes no existing private infrastructure to integrate with, so hybrid is not the best fit.',
      'An on-premises datacenter means you own and maintain all servers, networking, and cooling — the opposite of offloading hardware maintenance.',
    ],
    learnRef: '/training/modules/intro-to-azure-cloud/',
    learnTitle: 'Introduction to Azure cloud services',
  },
  {
    id: 'q-002',
    domainId: 'cloud-concepts',
    subtopicId: 'cc-cloud-models',
    difficulty: 'intermediate',
    prompt:
      'A company keeps sensitive customer data in a private cloud hosted in their own datacenter, while running their analytics workload on Azure public cloud resources. Which cloud model describes this arrangement?',
    options: [
      'Public cloud only',
      'Private cloud only',
      'Hybrid cloud',
      'Multi-cloud',
    ],
    correctIndex: 2,
    whyCorrect:
      'A hybrid cloud intentionally combines a private cloud with public cloud services, allowing data and workloads to move between them. Keeping sensitive data private while running compute-heavy analytics in the public cloud is the textbook hybrid pattern.',
    whyWrong: [
      'Public cloud only would mean all workloads run in the shared provider infrastructure — but the sensitive data is explicitly kept in a private cloud.',
      'Private cloud only would mean everything runs in the on-premises datacenter, but the analytics workload runs on Azure public resources.',
      'Multi-cloud refers to using multiple public cloud providers (e.g. Azure + AWS). Using one public cloud plus a private cloud is hybrid, not multi-cloud.',
    ],
    learnRef: '/training/modules/intro-to-azure-cloud/',
    learnTitle: 'Introduction to Azure cloud services',
  },
  {
    id: 'q-003',
    domainId: 'cloud-concepts',
    subtopicId: 'cc-cloud-models',
    difficulty: 'foundation',
    prompt:
      'Which characteristic is a key advantage of the public cloud over a private cloud?',
    options: [
      'Complete control over physical hardware',
      'No shared responsibility with the provider',
      'Pay-as-you-go pricing with no upfront capital expenditure',
      'Data never leaves your own network',
    ],
    correctIndex: 2,
    whyCorrect:
      'The public cloud’s headline advantage is consumption-based pricing — you pay only for what you use, with no upfront hardware purchases (CapEx). This dramatically lowers the barrier to entry versus building a private cloud.',
    whyWrong: [
      'You actually have less control over physical hardware in a public cloud — the provider owns and operates it. Control over hardware is a private-cloud advantage.',
      'The shared responsibility model always applies; in a public cloud you share responsibility with the provider. It is never eliminated.',
      'In a public cloud, data does leave your network to reside in provider datacenters. Keeping data on your own network is a private-cloud characteristic.',
    ],
    learnRef: '/training/modules/intro-to-azure-cloud/',
    learnTitle: 'Introduction to Azure cloud services',
  },

  // cc-shared-resp
  {
    id: 'q-004',
    domainId: 'cloud-concepts',
    subtopicId: 'cc-shared-resp',
    difficulty: 'foundation',
    prompt:
      'In the shared responsibility model, which of the following is ALWAYS the responsibility of the cloud customer, regardless of whether they use IaaS, PaaS, or SaaS?',
    options: [
      'Physical security of the datacenter',
      'Information and data stored in the cloud',
      'Host operating system patching',
      'Networking infrastructure (routers, switches)',
    ],
    correctIndex: 1,
    whyCorrect:
      'Data and information security is always the customer’s responsibility — the provider never controls what data you put into the service or who you grant access to. This responsibility is retained across IaaS, PaaS, and SaaS.',
    whyWrong: [
      'Physical datacenter security (buildings, power, cooling) is always the provider’s responsibility — you never touch it in any cloud model.',
      'Host OS patching is your job in IaaS, but in PaaS and SaaS the provider patches the underlying OS. It is not "always" the customer’s responsibility.',
      'Networking infrastructure (physical routers, switches, cables) is the provider’s responsibility in all cloud service models.',
    ],
    learnRef: '/training/modules/shared-responsibility-model/',
    learnTitle: 'The shared responsibility model',
  },
  {
    id: 'q-005',
    domainId: 'cloud-concepts',
    subtopicId: 'cc-shared-resp',
    difficulty: 'intermediate',
    prompt:
      'You deploy an Azure Virtual Machine running Linux. Under the shared responsibility model, which task remains your responsibility?',
    options: [
      'Maintaining the physical host server hardware',
      'Patching the guest Linux operating system inside the VM',
      'Maintaining the Azure hypervisor',
      'Providing power and cooling to the datacenter',
    ],
    correctIndex: 1,
    whyCorrect:
      'An IaaS VM gives you the VM but you own everything above the hypervisor — including the guest OS. You must install security updates, configure the OS firewall, and manage users inside that Linux instance.',
    whyWrong: [
      'The physical host server running the hypervisor is owned and maintained by Microsoft. You have no access to it.',
      'The Azure hypervisor is Microsoft’s responsibility. This is part of the virtualization layer that is never exposed to customers.',
      'Power, cooling, and facility management are always the provider’s responsibility in any cloud model.',
    ],
    learnRef: '/training/modules/shared-responsibility-model/',
    learnTitle: 'The shared responsibility model',
  },

  // cc-consumption
  {
    id: 'q-006',
    domainId: 'cloud-concepts',
    subtopicId: 'cc-consumption',
    difficulty: 'foundation',
    prompt:
      'Which pricing characteristic is fundamental to cloud services and distinguishes them from traditional on-premises hosting?',
    options: [
      'Fixed annual contracts with minimum spend',
      'Consumption-based pricing — pay only for resources you use',
      'Upfront hardware purchase required for every service',
      'Perpetual licenses tied to physical servers',
    ],
    correctIndex: 1,
    whyCorrect:
      'Consumption-based pricing means you are billed for what you actually use, typically per-second or per-hour, and can stop paying the moment you stop a resource. This elasticity is the core economic differentiator of the cloud.',
    whyWrong: [
      'While some reserved instances offer discounts for committed use, the foundational cloud model is not fixed contracts with minimum spend — you can pay as you go.',
      'Upfront hardware purchase is the opposite of cloud; it describes the traditional on-premises CapEx model.',
      'Perpetual licenses tied to physical servers are a legacy on-premises licensing pattern, not the cloud consumption model.',
    ],
    learnRef: '/training/modules/azure-cloud-services-pricing/',
    learnTitle: 'Azure cloud services pricing',
  },
  {
    id: 'q-007',
    domainId: 'cloud-concepts',
    subtopicId: 'cc-consumption',
    difficulty: 'intermediate',
    prompt:
      'A workload has unpredictable, bursty traffic. Which combination of cloud pricing traits is MOST advantageous here?',
    options: [
      'High fixed cost, low variable cost',
      'Agility and elasticity — scale up on demand and scale down to zero',
      'Reserved capacity for 3 years to maximize discount',
      'Long-term contracts that lock in capacity',
    ],
    correctIndex: 1,
    whyCorrect:
      'Agility lets you provision resources quickly, and elasticity lets you scale them to match bursty demand — then release them (even to zero) when traffic subsides, so you never pay for idle capacity. This is ideal for unpredictable workloads.',
    whyWrong: [
      'High fixed cost is the opposite of what you want for a bursty workload — it means paying the same whether traffic is high or low.',
      'Reserved capacity for 3 years commits you to a steady baseline. For a bursty, unpredictable workload this risks either overpaying at low traffic or being under-provisioned at peaks.',
      'Long-term contracts lock capacity and reduce the flexibility needed to follow unpredictable demand.',
    ],
    learnRef: '/training/modules/azure-cloud-services-pricing/',
    learnTitle: 'Azure cloud services pricing',
  },

  // cc-capex-opex
  {
    id: 'q-008',
    domainId: 'cloud-concepts',
    subtopicId: 'cc-capex-opex',
    difficulty: 'foundation',
    prompt:
      'Purchasing physical servers and racking them in your own datacenter is an example of which type of expenditure?',
    options: [
      'Operational expenditure (OpEx)',
      'Capital expenditure (CapEx)',
      'Consumption expenditure',
      'Variable expenditure',
    ],
    correctIndex: 1,
    whyCorrect:
      'Buying physical servers is a capital expenditure (CapEx) — a one-time, up-front investment in a tangible asset that is depreciated over time. It requires significant cash outlay before any value is delivered.',
    whyWrong: [
      'OpEx is ongoing spending on services consumed over time (like a monthly cloud bill). Buying hardware is not OpEx.',
      'Consumption expenditure is a cloud-era term for usage-based spend; it describes OpEx-style cloud billing, not buying servers.',
      'Variable expenditure describes costs that scale with usage. A server purchase is a fixed up-front cost regardless of how much it is used.',
    ],
    learnRef: '/training/modules/azure-cloud-services-pricing/',
    learnTitle: 'Azure cloud services pricing',
  },
  {
    id: 'q-009',
    domainId: 'cloud-concepts',
    subtopicId: 'cc-capex-opex',
    difficulty: 'intermediate',
    prompt:
      'A startup wants to validate a new product with minimal financial risk. Why does the cloud’s OpEx model suit them better than a CapEx model?',
    options: [
      'OpEx requires a large up-front server purchase, which builds equity',
      'OpEx spreads cost over time with no up-front investment, so they can start small and scale as revenue grows',
      'CapEx lets you deduct the full cost immediately, which is better for cash flow',
      'OpEx locks you into multi-year contracts that guarantee lower prices',
    ],
    correctIndex: 1,
    whyCorrect:
      'OpEx is pay-as-you-go with no up-front capital. A startup can spin up a small environment today, validate the product, and scale only if it succeeds — minimizing financial risk and preserving cash.',
    whyWrong: [
      'OpEx does not require a large up-front server purchase; that is CapEx. The statement reverses the definitions.',
      'CapEx is typically depreciated over several years, not fully deducted immediately, and the up-front purchase hurts cash flow — the opposite of what the option claims.',
      'OpEx is not inherently tied to multi-year contracts; pay-as-you-go is the default. Reserved-capacity discounts are an optional optimization, not a requirement.',
    ],
    learnRef: '/training/modules/azure-cloud-services-pricing/',
    learnTitle: 'Azure cloud services pricing',
  },

  // ─────────────────────────────────────────────────────────────────────
  // DOMAIN 2 — AZURE ARCHITECTURE AND SERVICES
  // ─────────────────────────────────────────────────────────────────────

  // aa-regions
  {
    id: 'q-010',
    domainId: 'azure-architecture',
    subtopicId: 'aa-regions',
    difficulty: 'foundation',
    prompt:
      'What is an Azure region?',
    options: [
      'A single physical datacenter building',
      'A set of datacenters deployed within a latency-defined perimeter and connected through a regional low-latency network',
      'A country-level boundary used only for billing',
      'A logical grouping of subscriptions owned by one customer',
    ],
    correctIndex: 1,
    whyCorrect:
      'An Azure region is a set of one or more datacenters connected via a low-latency regional network, deployed within a defined perimeter. This gives you in-region redundancy and low latency between resources in the same region.',
    whyWrong: [
      'A region is not a single building — it typically contains multiple datacenters (often with availability zones) to provide resilience.',
      'Regions are about physical geography and connectivity, not billing boundaries. Billing is organized by subscriptions and meters.',
      'A grouping of subscriptions is a management group or tenant, not a region.',
    ],
    learnRef: '/training/modules/azure-architecture-fundamentals/',
    learnTitle: 'Azure architecture and service guarantees',
  },
  {
    id: 'q-011',
    domainId: 'azure-architecture',
    subtopicId: 'aa-regions',
    difficulty: 'intermediate',
    prompt:
      'You need to deploy a mission-critical application that must continue running even if an entire datacenter fails. Which feature should you use?',
    options: [
      'Availability set',
      'Availability zone',
      'Region pair',
      'Resource group',
    ],
    correctIndex: 1,
    whyCorrect:
      'An availability zone is a physically separate location within an Azure region with its own power, cooling, and networking. Deploying across zones protects you from the failure of a single datacenter, giving a 99.99% SLA for VMs.',
    whyWrong: [
      'An availability set protects against rack-level failures (update and fault domains) within a single datacenter — it does not protect against the loss of an entire datacenter.',
      'A region pair pairs two regions for disaster recovery across a geography. It protects against a whole region going down, but is overkill and slower than zones for a single-datacenter failure within one region.',
      'A resource group is a logical container for organizing resources; it provides no availability guarantees.',
    ],
    learnRef: '/training/modules/azure-architecture-fundamentals/',
    learnTitle: 'Azure architecture and service guarantees',
  },
  {
    id: 'q-012',
    domainId: 'azure-architecture',
    subtopicId: 'aa-regions',
    difficulty: 'intermediate',
    prompt:
      'What is the primary purpose of an Azure region pair?',
    options: [
      'To reduce latency between two unrelated customer applications',
      'To provide replication and disaster recovery across two geographically separated regions within the same geography',
      'To combine multiple subscriptions into one billing entity',
      'To enforce network isolation between two regions',
    ],
    correctIndex: 1,
    whyCorrect:
      'Each Azure region is paired with another within the same geography (e.g., East US ↔ West US). Azure replicates certain services across the pair and prioritizes failover there during regional outages, giving you a built-in disaster-recovery story.',
    whyWrong: [
      'Region pairs are about paired regions for DR, not reducing latency between unrelated customer apps — those apps may not even be in the paired region.',
      'Region pairing has nothing to do with subscriptions or billing. It is a platform-level resilience feature.',
      'Region pairs enable cross-region replication, not isolation. You can explicitly connect them for failover scenarios.',
    ],
    learnRef: '/training/modules/azure-architecture-fundamentals/',
    learnTitle: 'Azure architecture and service guarantees',
  },

  // aa-compute
  {
    id: 'q-013',
    domainId: 'azure-architecture',
    subtopicId: 'aa-compute',
    difficulty: 'foundation',
    prompt:
      'Which Azure compute service provides servers in the cloud that you fully configure and manage, including the operating system?',
    options: [
      'Azure App Service',
      'Azure Virtual Machines',
      'Azure Functions',
      'Azure Container Apps',
    ],
    correctIndex: 1,
    whyCorrect:
      'Azure Virtual Machines is IaaS — you provision a VM and are responsible for the OS, patches, software, and configuration. It gives you maximum control and is the most flexible compute option.',
    whyWrong: [
      'App Service is a PaaS offering where Microsoft manages the underlying OS and runtime; you only bring your application code.',
      'Azure Functions is serverless — you run code on demand without managing any server or OS at all.',
      'Container Apps is a managed container platform; Microsoft manages the Kubernetes underpinning and you deploy containers, not full VMs.',
    ],
    learnRef: '/training/modules/azure-compute-services/',
    learnTitle: 'Explore Azure compute services',
  },
  {
    id: 'q-014',
    domainId: 'azure-architecture',
    subtopicId: 'aa-compute',
    difficulty: 'intermediate',
    prompt:
      'A team needs to run a small piece of code that processes a message whenever it is added to a queue. They want to pay only for execution time and avoid managing servers. Which service is the best fit?',
    options: [
      'Azure Virtual Machines',
      'Azure App Service',
      'Azure Functions',
      'Azure Kubernetes Service (AKS)',
    ],
    correctIndex: 2,
    whyCorrect:
      'Azure Functions is a serverless, event-driven compute service that runs code on a trigger (such as a queue message). You pay only for execution time and never manage servers — ideal for this event-driven scenario.',
    whyWrong: [
      'A VM requires you to provision, pay for, and manage a server continuously, even when no messages arrive — wasteful for an intermittent workload.',
      'App Service is always-on PaaS; you pay for the App Service Plan whether or not messages arrive, so it does not match the "pay only for execution" requirement.',
      'AKS is a full Kubernetes cluster for orchestrating containers. It is far too heavy for a single small event-driven function and still requires cluster management.',
    ],
    learnRef: '/training/modules/azure-compute-services/',
    learnTitle: 'Explore Azure compute services',
  },
  {
    id: 'q-015',
    domainId: 'azure-architecture',
    subtopicId: 'aa-compute',
    difficulty: 'advanced',
    prompt:
      'You need to deploy and manage a large number of microservices as containers, with automatic scaling and rolling updates. Which Azure service is purpose-built for this?',
    options: [
      'Azure Virtual Machine Scale Sets',
      'Azure Kubernetes Service (AKS)',
      'Azure App Service',
      'Azure Batch',
    ],
    correctIndex: 1,
    whyCorrect:
      'AKS is a managed Kubernetes service designed for orchestrating containerized microservices at scale — it handles scheduling, scaling, rolling updates, and self-healing of containers across a cluster.',
    whyWrong: [
      'VM Scale Sets scale identical VMs, not containers. You would have to manage container runtime and orchestration yourself on top of the VMs.',
      'App Service hosts web applications, not a fleet of orchestrated microservice containers with cluster-level scheduling.',
      'Azure Batch is for large-scale parallel and HPC batch processing jobs, not for running long-lived microservice containers.',
    ],
    learnRef: '/training/modules/azure-compute-services/',
    learnTitle: 'Explore Azure compute services',
  },

  // aa-storage
  {
    id: 'q-016',
    domainId: 'azure-architecture',
    subtopicId: 'aa-storage',
    difficulty: 'foundation',
    prompt:
      'Which Azure Storage service is optimized for storing massive amounts of unstructured data such as images, videos, and documents?',
    options: [
      'Azure Blob Storage',
      'Azure Queue Storage',
      'Azure Table Storage',
      'Azure SQL Database',
    ],
    correctIndex: 0,
    whyCorrect:
      'Blob Storage is Azure’s object store, purpose-built for unstructured data (images, video, documents, backups). It scales to petabytes and is accessible via HTTP/HTTPS REST APIs.',
    whyWrong: [
      'Queue Storage is for storing small messages to decouple application components — not for binary unstructured data.',
      'Table Storage is a NoSQL key-attribute store for structured/semi-structured tabular data, not large binary blobs.',
      'Azure SQL Database is a relational database for structured, tabular, queryable data — not the right place for raw images and videos.',
    ],
    learnRef: '/training/modules/azure-storage-services/',
    learnTitle: 'Explore Azure storage services',
  },
  {
    id: 'q-017',
    domainId: 'azure-architecture',
    subtopicId: 'aa-storage',
    difficulty: 'intermediate',
    prompt:
      'You require storage that keeps three copies of your data within a single datacenter in the primary region. Which redundancy option meets this requirement at the lowest cost?',
    options: [
      'Locally redundant storage (LRS)',
      'Zone-redundant storage (ZRS)',
      'Geo-redundant storage (GRS)',
      'Read-access geo-redundant storage (RA-GRS)',
    ],
    correctIndex: 0,
    whyCorrect:
      'Locally redundant storage (LRS) replicates your data three times within a single datacenter in the primary region. It is the lowest-cost redundancy option and protects against rack/hardware failure but not a datacenter-wide outage.',
    whyWrong: [
      'ZRS replicates across three availability zones in the primary region — more resilient than a single datacenter, and more expensive than LRS.',
      'GRS replicates asynchronously to a second paired region in addition to LRS in the primary — far more than the requirement, and pricier.',
      'RA-GRS is GRS plus read access to the secondary region. It is even more expensive and beyond what was asked.',
    ],
    learnRef: '/training/modules/azure-storage-services/',
    learnTitle: 'Explore Azure storage services',
  },
  {
    id: 'q-018',
    domainId: 'azure-architecture',
    subtopicId: 'aa-storage',
    difficulty: 'intermediate',
    prompt:
      'Which Azure storage performance tier is best for storing infrequently accessed data that must still be available within seconds, at a lower storage price than the hot tier?',
    options: [
      'Hot access tier',
      'Cool access tier',
      'Archive access tier',
      'Premium block blob',
    ],
    correctIndex: 1,
    whyCorrect:
      'The cool tier is optimized for data that is infrequently accessed but still needs to be available within seconds (typically minutes of latency at most). It charges lower storage costs than hot but has a minimum storage duration and slightly higher access fees.',
    whyWrong: [
      'Hot is optimized for frequent access — higher storage cost, which does not match "infrequently accessed at lower price".',
      'Archive is the cheapest tier but retrieval can take hours (must be rehydrated first), not seconds — too slow for this requirement.',
      'Premium block blob is optimized for very low latency and high transaction rates; it is the most expensive option and overkill for infrequently accessed data.',
    ],
    learnRef: '/training/modules/azure-storage-services/',
    learnTitle: 'Explore Azure storage services',
  },

  // aa-networking
  {
    id: 'q-019',
    domainId: 'azure-architecture',
    subtopicId: 'aa-networking',
    difficulty: 'foundation',
    prompt:
      'What is the primary purpose of an Azure Virtual Network (VNet)?',
    options: [
      'To provide a global CDN for static assets',
      'To enable Azure resources to securely communicate with each other, the internet, and on-premises networks',
      'To act as a managed DNS service for the internet',
      'To store network configuration as code',
    ],
    correctIndex: 1,
    whyCorrect:
      'A VNet is the fundamental building block for your private network in Azure. It lets VMs and other resources communicate securely with each other, reach the internet, and connect back to your on-premises network via VPN/ExpressRoute.',
    whyWrong: [
      'A CDN (Azure Front Door / CDN) is a separate service for caching content at the edge — that is not the VNet’s role.',
      'Azure DNS is a separate managed DNS service. While VNets can use private DNS zones, that is not the primary purpose of a VNet.',
      'Storing configuration as code is the role of ARM templates/Bicep, not the VNet itself.',
    ],
    learnRef: '/training/modules/azure-network-services/',
    learnTitle: 'Explore Azure network services',
  },
  {
    id: 'q-020',
    domainId: 'azure-architecture',
    subtopicId: 'aa-networking',
    difficulty: 'intermediate',
    prompt:
      'You need to distribute incoming web traffic across multiple virtual machines to improve availability and responsiveness. Which Azure service should you use?',
    options: [
      'Azure Application Gateway',
      'Azure VPN Gateway',
      'Azure ExpressRoute',
      'Azure DNS',
    ],
    correctIndex: 0,
    whyCorrect:
      'Application Gateway is a layer-7 load balancer designed for web traffic. It can distribute HTTP/HTTPS requests across backend VMs and offers features like URL-based routing, cookie affinity, and SSL termination.',
    whyWrong: [
      'VPN Gateway connects your on-premises network to Azure over an encrypted tunnel — it is not for distributing web traffic across VMs.',
      'ExpressRoute is a private, dedicated connection to Azure — used for hybrid connectivity, not load balancing web traffic.',
      'Azure DNS resolves domain names to IP addresses; it does not load-balance traffic across backend VMs.',
    ],
    learnRef: '/training/modules/azure-network-services/',
    learnTitle: 'Explore Azure network services',
  },

  // aa-identity
  {
    id: 'q-021',
    domainId: 'azure-architecture',
    subtopicId: 'aa-identity',
    difficulty: 'foundation',
    prompt:
      'Which Azure service provides cloud-based identity and access management and is the directory behind Microsoft 365 and Azure?',
    options: [
      'Azure Key Vault',
      'Microsoft Entra ID (formerly Azure AD)',
      'Azure Information Protection',
      'Azure Active Directory B2C',
    ],
    correctIndex: 1,
    whyCorrect:
      'Microsoft Entra ID (formerly Azure Active Directory) is Azure’s multi-tenant, cloud-based identity and directory service. It underpins authentication for Azure, Microsoft 365, and thousands of SaaS apps.',
    whyWrong: [
      'Azure Key Vault stores secrets, keys, and certificates — it is a secrets-management service, not an identity directory.',
      'Azure Information Protection classifies and protects documents and emails — it is not an identity provider.',
      'Entra External ID (formerly B2C) is a specialized CIAM flavor of Entra ID for customer-facing apps, not the core enterprise directory.',
    ],
    learnRef: '/training/modules/azure-identity-services/',
    learnTitle: 'Explore Azure identity services',
  },
  {
    id: 'q-022',
    domainId: 'azure-architecture',
    subtopicId: 'aa-identity',
    difficulty: 'intermediate',
    prompt:
      'Which Entra ID feature lets users sign in once and then be automatically signed in to multiple SaaS applications without re-entering credentials?',
    options: [
      'Multi-factor authentication (MFA)',
      'Single sign-on (SSO)',
      'Conditional Access',
      'Privileged Identity Management (PIM)',
    ],
    correctIndex: 1,
    whyCorrect:
      'Single sign-on (SSO) lets a user authenticate once with Entra ID and then access many integrated applications without signing in again. Entra ID issues tokens that each app accepts, giving a seamless experience.',
    whyWrong: [
      'MFA adds a second verification factor at sign-in for stronger security, but it does not eliminate re-authentication across apps.',
      'Conditional Access evaluates conditions (user, location, device) to allow or block access — it is a policy engine, not the SSO mechanism itself.',
      'PIM manages just-in-time elevation of privileged roles; it is unrelated to cross-app sign-in convenience.',
    ],
    learnRef: '/training/modules/azure-identity-services/',
    learnTitle: 'Explore Azure identity services',
  },

  // ─────────────────────────────────────────────────────────────────────
  // DOMAIN 3 — MANAGEMENT AND GOVERNANCE
  // ─────────────────────────────────────────────────────────────────────

  // mg-cost
  {
    id: 'q-023',
    domainId: 'management-governance',
    subtopicId: 'mg-cost',
    difficulty: 'foundation',
    prompt:
      'Which Azure tool helps you estimate the monthly cost of a planned set of Azure resources before you deploy them?',
    options: [
      'Azure Cost Management',
      'Azure Pricing Calculator',
      'Azure Advisor',
      'Azure Monitor',
    ],
    correctIndex: 1,
    whyCorrect:
      'The Azure Pricing Calculator lets you add the services you plan to use, configure their options and region, and see an estimated monthly cost before you spend anything — ideal for pre-deployment budgeting.',
    whyWrong: [
      'Cost Management analyzes and manages costs for resources you have already deployed; it is not a forward-looking estimation tool.',
      'Azure Advisor gives best-practice recommendations for reliability, security, cost, and performance — it is advisory, not a pricing estimator.',
      'Azure Monitor collects metrics and logs to observe the health of running resources; it does not estimate prices.',
    ],
    learnRef: '/training/modules/azure-cost-management/',
    learnTitle: 'Plan and manage your Azure costs',
  },
  {
    id: 'q-024',
    domainId: 'management-governance',
    subtopicId: 'mg-cost',
    difficulty: 'intermediate',
    prompt:
      'Your monthly Azure bill varies significantly because of unpredictable workloads. Which feature lets you set spending limits and receive alerts when you approach them?',
    options: [
      'Azure Reservations',
      'Azure Cost Management budgets and alerts',
      'Azure Blueprints',
      'Azure Policy',
    ],
    correctIndex: 1,
    whyCorrect:
      'Cost Management lets you create budgets per subscription or resource group and configure alert thresholds (e.g., 50%, 90%, 100%). When actual or forecasted spend crosses a threshold, you get notifications — perfect for unpredictable bills.',
    whyWrong: [
      'Reservations commit you to a 1- or 3-year term for a discount on predictable usage; they do not set spending limits or alerts.',
      'Blueprints package governance artifacts (policies, RBAC, ARM templates) for repeatable environments; they do not track spend.',
      'Azure Policy enforces compliance rules on resource configurations; it is not a cost-alerting tool.',
    ],
    learnRef: '/training/modules/azure-cost-management/',
    learnTitle: 'Plan and manage your Azure costs',
  },
  {
    id: 'q-025',
    domainId: 'management-governance',
    subtopicId: 'mg-cost',
    difficulty: 'advanced',
    prompt:
      'You have a workload that runs 24/7 on a specific VM size for the next year. What is the most cost-effective way to pay for that compute?',
    options: [
      'Pay-as-you-go pricing',
      'Azure Reserved Virtual Machine Instances (1-year reservation)',
      'Spot VM pricing',
      'Azure Dev/Test subscription rate',
    ],
    correctIndex: 1,
    whyCorrect:
      'Reserved VM Instances commit you to a 1- or 3-year term on a specific VM size in a region, yielding up to ~72% savings versus pay-as-you-go. For a steady, 24/7, 1-year workload this is the most cost-effective choice.',
    whyWrong: [
      'Pay-as-you-go is the most flexible but most expensive option for continuous usage — you forfeit the reservation discount.',
      'Spot VMs use spare capacity at deep discounts but can be evicted at any time. A 24/7 mission workload cannot tolerate eviction risk.',
      'Dev/Test rates apply only to non-production subscriptions for dev/test workloads, not a production 24/7 workload.',
    ],
    learnRef: '/training/modules/azure-cost-management/',
    learnTitle: 'Plan and manage your Azure costs',
  },

  // mg-governance
  {
    id: 'q-026',
    domainId: 'management-governance',
    subtopicId: 'mg-governance',
    difficulty: 'foundation',
    prompt:
      'Which Azure service enforces compliance rules on resources, such as "only allow resources to be deployed in approved regions"?',
    options: [
      'Azure Role-Based Access Control (RBAC)',
      'Azure Policy',
      'Azure Blueprints',
      'Azure Advisor',
    ],
    correctIndex: 1,
    whyCorrect:
      'Azure Policy evaluates resources against rules you define (allowed locations, required tags, allowed SKU sizes) and can block non-compliant deployments or mark existing resources non-compliant. It is the core enforcement tool for governance.',
    whyWrong: [
      'RBAC controls who can perform actions on resources (authorization), not what resource configurations are allowed.',
      'Blueprints bundles policies, RBAC, and templates together for repeatable environments, but the actual enforcement engine is Azure Policy inside the blueprint.',
      'Advisor recommends best practices but does not enforce them; it is advisory only.',
    ],
    learnRef: '/training/modules/azure-policy-governance/',
    learnTitle: 'Configure Azure Policy and governance',
  },
  {
    id: 'q-027',
    domainId: 'management-governance',
    subtopicId: 'mg-governance',
    difficulty: 'intermediate',
    prompt:
      'A user needs to be able to restart a specific virtual machine but must NOT be able to delete it or change its configuration. Which authorization mechanism lets you grant exactly this scoped ability?',
    options: [
      'Azure Policy assignment',
      'Azure RBAC with a custom role scoped to that VM',
      'Azure Blueprints',
      'Management group hierarchy',
    ],
    correctIndex: 1,
    whyCorrect:
      'RBAC uses roles (collections of permissions) assigned at a specific scope (subscription, resource group, or single resource). A custom role with only the "Microsoft.Compute/virtualMachines/restart/action" permission, scoped to that VM, grants exactly the restart ability — nothing more.',
    whyWrong: [
      'Azure Policy enforces configuration compliance (what is allowed), not who can perform which actions.',
      'Blueprints package governance artifacts for environment creation; they do not grant fine-grained runtime permissions to users.',
      'Management groups organize subscriptions hierarchically for policy and RBAC inheritance; they are a scoping container, not a permission mechanism themselves.',
    ],
    learnRef: '/training/modules/azure-policy-governance/',
    learnTitle: 'Configure Azure Policy and governance',
  },
  {
    id: 'q-028',
    domainId: 'management-governance',
    subtopicId: 'mg-governance',
    difficulty: 'advanced',
    prompt:
      'Which Azure service provides centralized locking, compliance scanning, and an audit trail of resources across multiple subscriptions, enabling governance at scale?',
    options: [
      'Azure Resource Manager (ARM) templates',
      'Azure Resource Graph',
      'Azure Blueprints',
      'Azure Monitor',
    ],
    correctIndex: 2,
    whyCorrect:
      'Azure Blueprints orchestrates the deployment of a compliant environment — policies, RBAC, ARM templates, and resource locks — across one or many subscriptions, with an auditable assignment trail. It is the at-scale governance orchestration tool.',
    whyWrong: [
      'ARM templates declaratively deploy resources but do not package policies, role assignments, and locks as a reusable governed package with an audit trail.',
      'Resource Graph lets you query resources across subscriptions at scale, but it is a query/inventory tool, not a deployment + governance orchestration package.',
      'Azure Monitor collects telemetry and alerts; it does not package governance artifacts or deploy compliant environments.',
    ],
    learnRef: '/training/modules/azure-policy-governance/',
    learnTitle: 'Configure Azure Policy and governance',
  },

  // mg-monitoring
  {
    id: 'q-029',
    domainId: 'management-governance',
    subtopicId: 'mg-monitoring',
    difficulty: 'foundation',
    prompt:
      'Which Azure service provides a single platform for collecting and analyzing telemetry (metrics, logs, and traces) from Azure and on-premises resources?',
    options: [
      'Azure Service Health',
      'Azure Monitor',
      'Azure Network Watcher',
      'Azure Advisor',
    ],
    correctIndex: 1,
    whyCorrect:
      'Azure Monitor is the unified telemetry platform — it collects metrics, activity logs, diagnostic logs, and application traces, stores them in Log Analytics workspaces, and lets you query, visualize, and alert on them.',
    whyWrong: [
      'Service Health tells you about Azure platform incidents and planned maintenance affecting your subscriptions; it is not the general telemetry platform.',
      'Network Watcher is specifically for diagnosing and monitoring Azure network scenarios — a subset, not the whole picture.',
      'Advisor is a recommendation service for best practices, not a telemetry collection and analysis platform.',
    ],
    learnRef: '/training/modules/azure-monitor/',
    learnTitle: 'Monitor your Azure services',
  },
  {
    id: 'q-030',
    domainId: 'management-governance',
    subtopicId: 'mg-monitoring',
    difficulty: 'intermediate',
    prompt:
      'You want to be notified by email when the average CPU usage of a VM stays above 80% for 5 minutes. Which Azure Monitor capability should you configure?',
    options: [
      'A Log Analytics workspace',
      'An alert rule with a metric threshold and an action group',
      'A diagnostic setting',
      'A workbook',
    ],
    correctIndex: 1,
    whyCorrect:
      'An alert rule evaluates a metric (CPU %) against a threshold (80%) over an aggregation window (5 min). When the condition is met, it fires an action group — which can send email, SMS, push, or trigger a webhook/runbook.',
    whyWrong: [
      'A Log Analytics workspace is the storage and query engine for logs; it does not itself evaluate thresholds or send notifications.',
      'A diagnostic setting routes logs/metrics to a destination (workspace, storage, Event Hub); it does not evaluate conditions or alert.',
      'A workbook is an interactive visualization/dashboard; it cannot evaluate thresholds and trigger notifications on its own.',
    ],
    learnRef: '/training/modules/azure-monitor/',
    learnTitle: 'Monitor your Azure services',
  },

  // mg-tooling
  {
    id: 'q-031',
    domainId: 'management-governance',
    subtopicId: 'mg-tooling',
    difficulty: 'foundation',
    prompt:
      'Which Azure management interface is a web-based, graphical portal suitable for first-time users who want to manage resources visually?',
    options: [
      'Azure CLI',
      'Azure PowerShell',
      'Azure portal',
      'Azure REST API',
    ],
    correctIndex: 2,
    whyCorrect:
      'The Azure portal is a browser-based graphical interface for creating, configuring, and monitoring Azure resources. It is ideal for visual exploration and one-off tasks, especially for users new to Azure.',
    whyWrong: [
      'The Azure CLI is a cross-platform command-line tool — powerful but text-based, not graphical.',
      'Azure PowerShell is a command-line and scripting environment for Windows-centric automation — not a GUI.',
      'The Azure REST API is a programmatic interface used by code and tools; it is not a visual portal.',
    ],
    learnRef: '/training/modules/azure-management-tools/',
    learnTitle: 'Explore Azure management tools',
  },
  {
    id: 'q-032',
    domainId: 'management-governance',
    subtopicId: 'mg-tooling',
    difficulty: 'intermediate',
    prompt:
      'You need to deploy an identical set of 50 resources across three environments (dev, test, prod) repeatedly and consistently. Which approach is best?',
    options: [
      'Manually create each resource in the Azure portal',
      'Use Azure Resource Manager (ARM) templates or Bicep for declarative, repeatable deployments',
      'Use the Azure CLI interactively, typing each command at deploy time',
      'Email a runbook to each environment administrator',
    ],
    correctIndex: 1,
    whyCorrect:
      'ARM templates (and Bicep, their modern DSL) are declarative Infrastructure-as-Code files. You define the desired resources once and deploy the same template to dev, test, and prod — guaranteeing consistency and repeatability.',
    whyWrong: [
      'Manual portal clicks are error-prone, non-repeatable, and impossible to scale across three environments reliably.',
      'Interactive CLI typing is better than portal clicks but still error-prone across repeated deployments — scripts/automation are preferable for repeatability.',
      'Emailing runbooks to administrators is a manual, untracked process with no consistency guarantees.',
    ],
    learnRef: '/training/modules/azure-management-tools/',
    learnTitle: 'Explore Azure management tools',
  },
  {
    id: 'q-033',
    domainId: 'management-governance',
    subtopicId: 'mg-tooling',
    difficulty: 'advanced',
    prompt:
      'Which statement best describes the relationship between Azure CLI and Azure PowerShell?',
    options: [
      'They are competing Microsoft products and only one can be installed at a time',
      'They are two different command-line tools that both call the Azure REST API and can accomplish the same management tasks',
      'Azure CLI is a graphical tool and PowerShell is a scripting tool',
      'Azure PowerShell is deprecated and replaced by the Azure CLI',
    ],
    correctIndex: 1,
    whyCorrect:
      'Both the Azure CLI and Azure PowerShell are cross-platform command-line tools that ultimately call the Azure REST API. They are functionally equivalent for most management tasks; the choice is a matter of scripting-language preference (Bash vs. PowerShell).',
    whyWrong: [
      'They can both be installed and used side-by-side on the same machine; they are not mutually exclusive.',
      'Both are text-based command-line tools — neither is graphical.',
      'Neither is deprecated; both are actively developed and supported by Microsoft.',
    ],
    learnRef: '/training/modules/azure-management-tools/',
    learnTitle: 'Explore Azure management tools',
  },
];

export const QUESTION_MAP: Record<string, Question> = Object.fromEntries(
  QUESTIONS.map((q) => [q.id, q]),
);

export function questionsForDomain(domainId: string): Question[] {
  return QUESTIONS.filter((q) => q.domainId === domainId);
}

export function allQuestionIds(): string[] {
  return QUESTIONS.map((q) => q.id);
}
