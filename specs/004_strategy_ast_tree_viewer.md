# SPEC-004: Strategy DSL AST Tree Viewer & Proof Annotations

## 1. Context & Motivation (DL Book Section 14.5A)
Renders synthesized algorithmic programs as interactive collapsible syntax trees with type safety proof badges.

## 2. Technical Specification
- **Tree Layout**: Hierarchical SVG tree showing `Expr`, `Action`, `Condition`, and `Guard` nodes.
- **Interactive Inspection**: Clicking a node displays evaluated sub-expressions and neural heuristic scores.
- **Proof Overlay**: Displays green validation badges confirming formal termination and safety typechecks.
