# 🧑‍💻 Task Sheet: Sprint 0 Onboarding & Local Environment Setup

Welcome to the **Luminex Logistics Ltd.** website repository. This sprint focuses on configuring your local workspace, understanding the project architecture, and setting up repository guidelines for clean contributions.

---

## 🛠️ Onboarding Instructions

### 1. Repository Setup & Installation
- Clone the repository locally:
  ```bash
  git clone <repository_url>
  cd luminex_website
  ```
- Install required packages and Tailwind dependencies:
  ```bash
  npm install
  ```

### 2. Local Environment Check
- Start the local development server:
  ```bash
  npm run dev
  ```
- Open `http://localhost:3000` in your web browser. Confirm that the default header and layout placeholder render correctly.

---

## 🔒 Code Contribution & Git Rules

To maintain high build quality and prevent trunk conflicts, adhere to the following workflow:

### Branch Naming Conventions
- Never push changes directly to the `main` branch.
- Checkout a local feature branch branching off of **`main`** using the format:
  `feature/LMX-S1-<feature_name>` (e.g., `feature/LMX-S1-navbar`)

### Local Build Checks (Required Before Pushing)
1. Run local TypeScript and Next.js compiler checks:
   ```bash
   npm run build
   ```
   Ensure the output is clean of any compiler warnings, route mapping failures, or TypeScript typings errors.
2. Run standard linter validations:
   ```bash
   npm run lint
   ```

### Push & Code Review Workflow
1. Push your feature branch to remote origin:
   ```bash
   git push origin feature/LMX-S1-<feature_name>
   ```
2. Open a Pull Request (PR) on GitHub targeting the **`main`** branch.
3. Assign the PR to the **Tech Lead** for review. Merging into `main` requires at least one approval.

---

## 📋 Acceptance Criteria for Sprint 0 Completion
- [ ] Dependencies install successfully without lockfile conflicts.
- [ ] Next.js development server launches locally on port 3000.
- [ ] `npm run build` runs successfully on your local features branch without warnings.
