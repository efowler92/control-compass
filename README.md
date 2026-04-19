# Control Compass

  **A cybersecurity readiness checker for small businesses.**

  Control Compass helps small business owners, solo founders, and lean teams understand their security posture in plain English — no technical background required. Answer 12 questions, get a score, and walk away with a clear, prioritized action plan.

  ---

  ## Live Demo

  [control-compass-goa.replit.app](https://control-compass-goa.replit.app)

  ---

  ## What It Does

  Most cybersecurity tools are built for IT professionals. Control Compass is built for the business owner who wears every hat — and needs to know what to fix first, not what every acronym means.

  The app walks users through a short assessment covering the most impactful security controls for small organizations. Based on their answers, it produces:

  - An **overall readiness score** from 0 to 100
  - A **risk level classification** — Low, Moderate, or High
  - **Domain-level scores** across five control areas
  - A **prioritized action plan** ranked by control weight
  - A **print-ready summary** for sharing or record-keeping

  ---

  ## Scoring Model

  Questions are weighted by the real-world impact of each control. The full 100-point model:

  | Control | Weight |
  |---|---|
  | Multi-factor authentication | 15 pts |
  | Regular data backups | 15 pts |
  | Device encryption | 10 pts |
  | Patch management | 10 pts |
  | Restricted admin privileges | 10 pts |
  | Backup testing | 8 pts |
  | Unique user accounts | 8 pts |
  | Endpoint protection | 8 pts |
  | Incident response process | 8 pts |
  | Secure data storage | 8 pts |
  | Vendor review process | 6 pts |
  | Security awareness training | 4 pts |

  **Risk thresholds:**
  - 80–100 → Low Risk
  - 60–79 → Moderate Risk
  - 0–59 → High Risk

  ---

  ## Control Domains

  Scores are grouped into five domains aligned with common security frameworks:

  | Domain | Controls Covered |
  |---|---|
  | Access Control | MFA, Unique accounts, Admin restrictions |
  | Data Protection | Device encryption, Secure data storage |
  | Resilience | Backups, Backup testing, Incident response |
  | Operational Security | Patch management, Endpoint protection, Security training |
  | Third-Party Risk | Vendor review process |

  ---

  ## Tech Stack

  - **React** — UI framework
  - **Vite** — Build tool and dev server
  - **Tailwind CSS** — Utility-first styling
  - **Framer Motion** — Page transitions and score animations
  - **shadcn/ui** — Component primitives (Radix UI)
  - **Wouter** — Lightweight client-side routing
  - **TypeScript** — Full type safety throughout

  No backend. No database. No authentication. All state is local — this is an educational tool, not a data collection platform.

  ---

  ## Project Structure

  ```
  artifacts/control-compass/
  ├── src/
  │   ├── App.tsx                  # Router setup and providers
  │   ├── index.css                # Theme tokens and global styles
  │   ├── lib/
  │   │   ├── context.tsx          # Assessment state (React Context)
  │   │   └── utils.ts             # Shared utilities
  │   └── pages/
  │       ├── home.tsx             # Landing page
  │       ├── assessment.tsx       # 12-question questionnaire
  │       ├── results.tsx          # Results dashboard + scoring logic
  │       └── not-found.tsx        # 404 fallback
  ```

  ---

  ## Running Locally

  ```bash
  # Install dependencies
  pnpm install

  # Start the dev server
  pnpm --filter @workspace/control-compass run dev
  ```

  The app will be available at `http://localhost:<PORT>`.

  > This project uses [pnpm workspaces](https://pnpm.io/workspaces). Make sure pnpm is installed: `npm install -g pnpm`

  ---

  ## Editing the Scoring Logic

  All scoring weights and recommendations live in `src/pages/results.tsx` in the `questionsData` array. Each entry has:

  ```ts
  {
    text: "Question text",
    weight: 15,             // Points awarded for a "Yes" answer
    rec: "Recommendation",  // Shown in priority action plan for "No" answers
    domain: "Access Control" // Groups into domain score cards
  }
  ```

  To update a weight, add a question, or change a recommendation — edit that array. The rest of the scoring, category grouping, and risk classification updates automatically.

  ---

  ## Disclaimer

  Control Compass is an educational tool. It provides general cybersecurity guidance based on common baseline controls and is not a substitute for a professional security assessment, legal advice, or regulatory compliance review.

  ---

  ## License

  MIT — free to use, fork, and build on.
  