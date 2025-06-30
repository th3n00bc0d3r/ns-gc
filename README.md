# ns-gc

A lightweight command-line tool to generate **standalone NativeScript Angular components** and **Angular services** with clean structure and zero config.

## 🚀 Features

- ✅ Generate standalone Angular components for NativeScript
- ✅ Auto-create `.ts`, `.html`, and `.css` files
- ✅ Generate injectable services
- ✅ Automatically handles folders and nesting
- ✅ Easy to install and use

## 📦 Installation

Install globally using npm:

```bash
npm install -g ns-gc
````

## 🛠 Usage

### ➤ Generate a Component

```bash
ns-gc c component-name
```

**Example:**

```bash
ns-gc c login
```

Creates:

```
app/login/
├── login.component.ts
├── login.component.html
└── login.component.css
```

**Nested Components:**

```bash
ns-gc c auth/login
```

Creates:

```
app/auth/login/
├── login.component.ts
├── login.component.html
└── login.component.css
```

### ➤ Generate a Service

```bash
ns-gc s service-name
```

**Example:**

```bash
ns-gc s auth
```

Creates:

```
app/auth.service.ts
```

**Nested Services:**

```bash
ns-gc s auth/user
```

Creates:

```
app/auth/user.service.ts
```

## 🤝 Contribution

Contributions are welcome!

If you have suggestions for improvements, bug fixes, or new features:

* Fork the repository
* Create a new branch (`git checkout -b feature-name`)
* Commit your changes
* Push and open a pull request

For major changes, please open an issue first to discuss the proposed update.


## 📜 License

This project is licensed under the [MIT License](LICENSE).

MIT © 2025 Muhammad Bilal

```
