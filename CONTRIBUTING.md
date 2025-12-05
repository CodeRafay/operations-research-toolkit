# Contributing to Operations Research Toolkit

Thank you for your interest in contributing to the Operations Research Toolkit! This document provides guidelines and instructions for contributing to this project.

## 📜 Code of Conduct

By participating in this project, you agree to maintain a respectful and professional environment. We are committed to providing a welcoming experience for everyone.

### Our Standards

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

## 🚀 How to Contribute

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the problem
- **Expected behavior** vs **actual behavior**
- **Screenshots** if applicable
- **Environment details** (OS, Python version, Node version, browser)
- **Error messages** or console logs

**Template:**

```markdown
**Description:**
Brief description of the bug

**Steps to Reproduce:**

1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior:**
What you expected to happen

**Actual Behavior:**
What actually happened

**Environment:**

- OS: [e.g., Windows 11]
- Python: [e.g., 3.10]
- Node: [e.g., 18.0]
- Browser: [e.g., Chrome 120]

**Screenshots/Logs:**
Add any relevant screenshots or error logs
```

### Suggesting Features

Feature suggestions are welcome! Please provide:

- **Clear and descriptive title**
- **Detailed explanation** of the feature
- **Use cases** and benefits
- **Possible implementation** approach (if applicable)
- **Mockups or examples** (if applicable)

### Pull Requests

We actively welcome your pull requests! Follow these steps:

1. **Fork the repository** and create your branch from `main`
2. **Make your changes** following our coding standards
3. **Test your changes** thoroughly
4. **Update documentation** if needed
5. **Commit with clear messages**
6. **Submit a pull request**

#### Pull Request Process

1. **Branch naming convention:**

   - Feature: `feature/description-of-feature`
   - Bug fix: `fix/description-of-bug`
   - Documentation: `docs/description`
   - Enhancement: `enhance/description`

2. **Commit message format:**

   ```
   type: subject

   body (optional)

   footer (optional)
   ```

   Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

   Example:

   ```
   feat: add dual simplex method solver

   Implemented dual simplex algorithm with step-by-step
   iteration tracking and infeasibility detection.

   Closes #42
   ```

3. **Pull request checklist:**

   - [ ] Code follows project style guidelines
   - [ ] Self-review completed
   - [ ] Comments added for complex logic
   - [ ] Documentation updated
   - [ ] No new warnings generated
   - [ ] Tests added/updated and passing
   - [ ] Dependent changes merged

4. **Pull request template:**

   ```markdown
   ## Description

   Brief description of changes

   ## Type of Change

   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation update

   ## Testing

   Describe testing performed

   ## Screenshots (if applicable)

   Add screenshots

   ## Related Issues

   Fixes #(issue number)
   ```

## 💻 Development Guidelines

### Setting Up Development Environment

1. Clone the repository:

   ```bash
   git clone https://github.com/CodeRafay/operations-research-toolkit.git
   cd operations-research-toolkit
   ```

2. Set up backend:

   ```bash
   cd backend
   python -m venv venv
   venv\Scripts\activate  # Windows
   pip install -r requirements.txt
   ```

3. Set up frontend:
   ```bash
   cd frontend
   npm install
   ```

### Coding Standards

#### Python (Backend)

- Follow **PEP 8** style guide
- Use **type hints** where applicable
- Write **docstrings** for functions and classes
- Keep functions **small and focused**
- Use **meaningful variable names**

Example:

```python
def solve_simplex(coefficients: list[float], constraints: list[list[float]],
                  rhs: list[float], objective_type: str = "max") -> dict:
    """
    Solve linear programming problem using Simplex method.

    Args:
        coefficients: Objective function coefficients
        constraints: Constraint coefficient matrix
        rhs: Right-hand side values
        objective_type: 'max' or 'min'

    Returns:
        Dictionary containing solution and iterations
    """
    # Implementation
    pass
```

#### JavaScript/React (Frontend)

- Follow **ESLint** configuration
- Use **functional components** with hooks
- Write **clear component names** (PascalCase)
- Keep components **modular and reusable**
- Add **PropTypes** or TypeScript types
- Use **meaningful state variable names**

Example:

```jsx
const SimplexSolver = ({ problemData }) => {
  const [solution, setSolution] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSolve = async () => {
    setLoading(true);
    try {
      const result = await solveSimplex(problemData);
      setSolution(result);
    } catch (error) {
      console.error('Solving failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    // JSX
  );
};
```

### Testing

- Write tests for new features
- Ensure all tests pass before submitting PR
- Aim for meaningful test coverage
- Test edge cases and error conditions

### Documentation

- Update README.md for new features
- Add inline comments for complex logic
- Update API documentation if endpoints change
- Include usage examples

## 🔍 Review Process

1. **Automated checks** run on all PRs (linting, tests)
2. **Code review** by maintainers
3. **Feedback implementation** (if needed)
4. **Approval and merge** by project owner

## 📝 Important Notes

### Intellectual Property

- By contributing, you agree that your contributions will be licensed under the same proprietary license as the project
- You retain copyright to your contributions but grant the project owner full rights to use, modify, and distribute them
- Do not submit code you don't have rights to use
- Ensure third-party dependencies are compatible with project license

### Deployment Restrictions

- **Contributors cannot deploy** or publish this project under their own name
- **No unauthorized distribution** of modified versions
- **Explicit written permission** required for any commercial use
- All deployments must be approved by the project owner

### Attribution

- Significant contributions will be acknowledged in release notes
- Major contributors may be listed in CONTRIBUTORS.md
- Attribution does not grant deployment or publishing rights

## 🤔 Questions?

- Open an issue with the `question` label
- Contact the repository owner
- Check existing issues and documentation first

## 📌 Resources

- [Project README](README.md)
- [License](LICENSE)
- [Issue Tracker](https://github.com/CodeRafay/operations-research-toolkit/issues)

---

**Thank you for contributing to Operations Research Toolkit!** 🎉

Your contributions help make this tool better for everyone in the OR community.
