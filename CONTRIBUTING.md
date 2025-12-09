# Contributing to Jjigit

Thank you for your interest in contributing! Jjigit is an open-source backend service under the Apache 2.0 License.  
This document describes the essential rules for contributing, including how to create Issues, submit Pull Requests, follow the branching model, and understand the maintainer review process.

Repository: **https://github.com/OSS-Group11/jjigit-be**

---

## 🧭 Code of Conduct

All contributors must follow the rules stated in `CODE_OF_CONDUCT.md`.  
Please refer to that file for full details.

---

## 📝 Creating an Issue

Before writing code, create an Issue in the repository’s Issues tab.  
Please include:

- A clear description of the bug or requested feature
- Steps to reproduce the issue in the frontend
- Screenshots, error messages, or console logs if applicable
- Browser, OS, Node.js, or npm/yarn version

Issue types include:

- Bug Report
- Feature Request
- Documentation
- Refactor
- Discussion

---

## 🔀 Branching Strategy
All development must take place in **separate branches** created from the main branch.

Branch naming conventions:
```
feature/<feature-name>
fix/<bug-name>
refactor/<topic>
```

Examples:
```
feature/create-vote-api
fix/invalid-token-bug
refactor/jpa-entity-structure
```

The **main branch is protected** — direct pushes are not allowed.  
All changes must go through a Pull Request.

---

## 🚀 Creating a Pull Request

A **PR template is already configured** in this repository.  
Please fill it out completely and include:

- Summary of changes  
- Reason for the change or the problem solved  
- Linked Issue (e.g., `Closes #12`)  
- Whether API or entity structures were affected  
- Description of how the changes were tested

Keep your PRs small and focused on a single purpose.

---

## 🔎 Maintainer Review Policy
All PRs require approval from at least one Maintainer before being merged.

A PR can be merged only if:

- At least one Maintainer approves
- All GitHub Action checks pass
- There are no conflicts with main
- The PR template is fully completed
- Changes are clearly explained so they can be reviewed

Maintainers verify code quality, structural consistency, and frontend stability before merging.

---

## 🛠 Development Setup

### Required environment

- Frontend Library / Framework: React (JavaScript ES6+ or TypeScript)  
  - SPA (Single Page Application) architecture
  - Component-based UI development
- Frontend Tooling: Node.js 20+, npm or yarn

### Run locally

```
npm install
npm start
```

### Run tests
```
npm test
```

### Notes

FE development focuses on React component logic, UI/UX implementation, and SPA behavior.

Backend services (Spring Boot APIs) should be running locally or mocked to test frontend integration.

Ensure database and backend services are available for full-stack testing.


## 📚 Documentation Contributions

Documentation contributions are welcome, including:

- Improvements to README  
- API documentation updates (SpringDoc / Swagger)  
- Development environment guides  
- Architecture or ERD documentation  

All documentation updates must also be submitted through a Pull Request.

---

## 🔒 Security

For security-related issues, **do not create a public Issue**.  
Instead, contact a Maintainer privately.

---

## ❤️ Thanks

All contributions — big or small — help improve Jjigit.  
Thank you for taking the time to contribute! 🚀
